import User from "../models/User.js";
import FriendRequest from "../models/FriendRequest.js";

export async function getRecommendedUsers(req, res) {
  try {
    const currentUserId = req.user.id;
    const currentUser = req.user;

    const recommendedUsers = await User.find({
      $and: [
        { _id: { $ne: currentUserId } }, //exclude current user
        { _id: { $nin: currentUser.friends } }, // exclude current user's friends
        { isOnboarded: true },
      ],
    });
    res.status(200).json(recommendedUsers);
  } catch (error) {
    console.error("Error in getRecommendedUsers controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getMyFriends(req, res) {
  try {
    const user = await User.findById(req.user.id)
      .select("friends")
      .populate("friends", "fullName profilePic nativeLanguage learningLanguage");

    res.status(200).json(user.friends);
  } catch (error) {
    console.error("Error in getMyFriends controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function sendFriendRequest(req, res) {
  try {
    const myId = req.user.id;
    const { id: recipientId } = req.params;

    // prevent sending req to yourself
    if (myId === recipientId) {
      return res.status(400).json({ message: "You can't send friend request to yourself" });
    }

    const recipient = await User.findById(recipientId);
    if (!recipient) {
      return res.status(404).json({ message: "Recipient not found" });
    }

    // check if user is already friends
    if (recipient.friends.includes(myId)) {
      return res.status(400).json({ message: "You are already friends with this user" });
    }

    // check if a req already exists
    const existingRequest = await FriendRequest.findOne({
      $or: [
        { sender: myId, recipient: recipientId },
        { sender: recipientId, recipient: myId },
      ],
    });

    if (existingRequest) {
      return res
        .status(400)
        .json({ message: "A friend request already exists between you and this user" });
    }

    const friendRequest = await FriendRequest.create({
      sender: myId,
      recipient: recipientId,
    });

    res.status(201).json(friendRequest);
  } catch (error) {
    console.error("Error in sendFriendRequest controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function acceptFriendRequest(req, res) {
  try {
    const { id: requestId } = req.params;

    const friendRequest = await FriendRequest.findById(requestId);

    if (!friendRequest) {
      return res.status(404).json({ message: "Friend request not found" });
    }

    // Verify the current user is the recipient
    if (friendRequest.recipient.toString() !== req.user.id) {
      return res.status(403).json({ message: "You are not authorized to accept this request" });
    }

    friendRequest.status = "accepted";
    await friendRequest.save();

    // add each user to the other's friends array
    // $addToSet: adds elements to an array only if they do not already exist.
    await User.findByIdAndUpdate(friendRequest.sender, {
      $addToSet: { friends: friendRequest.recipient },
    });

    await User.findByIdAndUpdate(friendRequest.recipient, {
      $addToSet: { friends: friendRequest.sender },
    });

    res.status(200).json({ message: "Friend request accepted" });
  } catch (error) {
    console.log("Error in acceptFriendRequest controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getFriendRequests(req, res) {
  try {
    const incomingReqs = await FriendRequest.find({
      recipient: req.user.id,
      status: "pending",
    }).populate("sender", "fullName profilePic nativeLanguage learningLanguage");

    const acceptedReqs = await FriendRequest.find({
      sender: req.user.id,
      status: "accepted",
    }).populate("recipient", "fullName profilePic");

    res.status(200).json({ incomingReqs, acceptedReqs });
  } catch (error) {
    console.log("Error in getPendingFriendRequests controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getOutgoingFriendReqs(req, res) {
  try {
    const outgoingRequests = await FriendRequest.find({
      sender: req.user.id,
      status: "pending",
    }).populate("recipient", "fullName profilePic nativeLanguage learningLanguage");

    res.status(200).json(outgoingRequests);
  } catch (error) {
    console.log("Error in getOutgoingFriendReqs controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getSuggestedMatches(req, res) {
  try {
    const currentUserId = req.user._id;

    // Fetch current user's language preferences and friends
    const user = await User.findById(currentUserId).select('friends nativeLanguage learningLanguage');

    // Validate user has set language preferences
    if (!user.nativeLanguage || !user.learningLanguage) {
      return res.status(400).json({
        message: "Please set your language preferences to see matches"
      });
    }

    // Initialize exclusion set with current user and friends
    const excludedIds = new Set([
      currentUserId.toString(),
      ...user.friends.map(f => f.toString())
    ]);

    // Fetch pending friend requests (sent OR received)
    const pendingRequests = await FriendRequest.find({
      $or: [
        { sender: currentUserId, status: "pending" },
        { recipient: currentUserId, status: "pending" },
      ],
    });

    // Add pending request users to exclusion set
    pendingRequests.forEach(req => {
      const otherId = req.sender.toString() === currentUserId.toString()
        ? req.recipient.toString()
        : req.sender.toString();
      excludedIds.add(otherId);
    });

    const TOTAL_SLOTS = 10;
    const SAFE_FIELDS = "fullName profilePic nativeLanguage learningLanguage bio";

    // Tier 1: Perfect Matches (Reciprocal)
    // My Native == Their Learning AND My Learning == Their Native
    const tier1 = await User.find({
      nativeLanguage: user.learningLanguage,
      learningLanguage: user.nativeLanguage,
      isOnboarded: true,
      _id: { $nin: Array.from(excludedIds) }
    })
      .limit(5)
      .select(SAFE_FIELDS);

    // Add Tier 1 IDs to exclusion set to prevent duplicates in lower tiers
    tier1.forEach(u => excludedIds.add(u._id.toString()));

    // Tier 2: Native Speakers (Water-filling)
    // They speak what I want to learn.
    // Limit = Remaining slots (up to 10 if T1 is empty)
    const slotsForTier2 = TOTAL_SLOTS - tier1.length;
    let tier2 = [];

    if (slotsForTier2 > 0) {
      tier2 = await User.find({
        nativeLanguage: user.learningLanguage,
        isOnboarded: true,
        _id: { $nin: Array.from(excludedIds) }
      })
        .limit(slotsForTier2)
        .select(SAFE_FIELDS);

      tier2.forEach(u => excludedIds.add(u._id.toString()));
    }

    // Tier 3: Explore Community (Fallback)
    // Anyone active recently
    // Limit = Remaining slots
    const slotsForTier3 = TOTAL_SLOTS - (tier1.length + tier2.length);
    let tier3 = [];

    if (slotsForTier3 > 0) {
      tier3 = await User.find({
        isOnboarded: true,
        _id: { $nin: Array.from(excludedIds) }
      })
        .sort({ updatedAt: -1 })
        .limit(slotsForTier3)
        .select(SAFE_FIELDS);
    }

    res.status(200).json({ tier1, tier2, tier3 });
  } catch (error) {
    console.error("Error in getSuggestedMatches controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

