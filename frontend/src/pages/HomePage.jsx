import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  getOutgoingFriendReqs,
  getRecommendedUsers,
  getSuggestedMatches,
  getUserFriends,
  sendFriendRequest,
} from "../lib/api";
import { Link } from "react-router";
import { CheckCircleIcon, MapPinIcon, UserPlusIcon, UsersIcon, SparklesIcon, TrophyIcon, GlobeIcon } from "lucide-react";

import { capitialize } from "../lib/utils";

import FriendCard, { getLanguageFlag } from "../components/FriendCard";
import NoFriendsFound from "../components/NoFriendsFound";
import useSuggestedMatches from "../hooks/useSuggestedMatches";

const HomePage = () => {
  const queryClient = useQueryClient();
  const [outgoingRequestsIds, setOutgoingRequestsIds] = useState(new Set());

  const { data: friends = [], isLoading: loadingFriends } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  const { tier1, tier2, tier3, isLoading: loadingMatches } = useSuggestedMatches();

  const { data: outgoingFriendReqs } = useQuery({
    queryKey: ["outgoingFriendReqs"],
    queryFn: getOutgoingFriendReqs,
  });

  const { mutate: sendRequestMutation, isPending } = useMutation({
    mutationFn: sendFriendRequest,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["outgoingFriendReqs"] }),
  });

  useEffect(() => {
    const outgoingIds = new Set();
    if (outgoingFriendReqs && outgoingFriendReqs.length > 0) {
      outgoingFriendReqs.forEach((req) => {
        outgoingIds.add(req.recipient._id);
      });
      setOutgoingRequestsIds(outgoingIds);
    }
  }, [outgoingFriendReqs]);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto space-y-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Your Friends</h2>
          <Link to="/notifications" className="btn btn-outline btn-sm">
            <UsersIcon className="mr-2 size-4" />
            Friend Requests
          </Link>
        </div>

        {loadingFriends ? (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg" />
          </div>
        ) : friends.length === 0 ? (
          <NoFriendsFound />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {friends.map((friend) => (
              <FriendCard key={friend._id} friend={friend} />
            ))}
          </div>
        )}

        <section>
          <div className="mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Suggested Language Partners</h2>
                <p className="opacity-70">
                  Discover perfect language exchange partners matched to your learning goals
                </p>
              </div>
            </div>
          </div>

          {loadingMatches ? (
            <div className="flex justify-center py-12">
              <span className="loading loading-spinner loading-lg" />
            </div>
          ) : tier1.length === 0 && tier2.length === 0 && tier3.length === 0 ? (
            <div className="card bg-base-200 p-6 text-center">
              <h3 className="font-semibold text-lg mb-2">No matches available</h3>
              <p className="text-base-content opacity-70">
                Complete your profile with language preferences to see matches!
              </p>
            </div>
          ) : (
            <div className="space-y-10">
              {/* Tier 1: Perfect Matches */}
              {tier1.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <TrophyIcon className="size-6 text-yellow-500" />
                    <h3 className="text-xl font-semibold">Perfect Matches</h3>
                    <span className="badge badge-primary">Reciprocal Learners</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tier1.map((user) => {
                      const hasRequestBeenSent = outgoingRequestsIds.has(user._id);
                      return (
                        <UserMatchCard 
                          key={user._id} 
                          user={user} 
                          hasRequestBeenSent={hasRequestBeenSent}
                          isPending={isPending}
                          sendRequestMutation={sendRequestMutation}
                          tierBadge="Perfect Match"
                          tierColor="badge-warning"
                        />
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Tier 2: Native Speakers */}
              {tier2.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <SparklesIcon className="size-6 text-blue-500" />
                    <h3 className="text-xl font-semibold">Native Speakers</h3>
                    <span className="badge badge-info">Great Matches</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tier2.map((user) => {
                      const hasRequestBeenSent = outgoingRequestsIds.has(user._id);
                      return (
                        <UserMatchCard 
                          key={user._id} 
                          user={user} 
                          hasRequestBeenSent={hasRequestBeenSent}
                          isPending={isPending}
                          sendRequestMutation={sendRequestMutation}
                          tierBadge="Native Speaker"
                          tierColor="badge-info"
                        />
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Tier 3: Explore Community */}
              {tier3.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <GlobeIcon className="size-6 text-green-500" />
                    <h3 className="text-xl font-semibold">Explore Community</h3>
                    <span className="badge badge-success">New Learners</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tier3.map((user) => {
                      const hasRequestBeenSent = outgoingRequestsIds.has(user._id);
                      return (
                        <UserMatchCard 
                          key={user._id} 
                          user={user} 
                          hasRequestBeenSent={hasRequestBeenSent}
                          isPending={isPending}
                          sendRequestMutation={sendRequestMutation}
                          tierBadge="Community"
                          tierColor="badge-success"
                        />
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

// User Match Card Component
const UserMatchCard = ({ user, hasRequestBeenSent, isPending, sendRequestMutation, tierBadge, tierColor }) => {
  return (
    <div className="card bg-base-200 hover:shadow-lg transition-all duration-300 border-2 border-base-300">
      <div className="card-body p-5 space-y-4">
        {/* Tier Badge */}
        <div className="flex justify-end">
          <span className={`badge ${tierColor} badge-sm`}>{tierBadge}</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="avatar size-16 rounded-full">
            <img src={user.profilePic} alt={user.fullName} />
          </div>

          <div className="flex-1">
            <h3 className="font-semibold text-lg">{user.fullName}</h3>
            {user.location && (
              <div className="flex items-center text-xs opacity-70 mt-1">
                <MapPinIcon className="size-3 mr-1" />
                {user.location}
              </div>
            )}
          </div>
        </div>

        {/* Languages with flags */}
        <div className="flex flex-wrap gap-1.5">
          <span className="badge badge-secondary">
            {getLanguageFlag(user.nativeLanguage)}
            Native: {capitialize(user.nativeLanguage)}
          </span>
          <span className="badge badge-outline">
            {getLanguageFlag(user.learningLanguage)}
            Learning: {capitialize(user.learningLanguage)}
          </span>
        </div>

        {user.bio && <p className="text-sm opacity-70 line-clamp-2">{user.bio}</p>}

        {/* Action button */}
        <button
          className={`btn w-full mt-2 ${
            hasRequestBeenSent ? "btn-disabled" : "btn-primary"
          } `}
          onClick={() => sendRequestMutation(user._id)}
          disabled={hasRequestBeenSent || isPending}
        >
          {hasRequestBeenSent ? (
            <>
              <CheckCircleIcon className="size-4 mr-2" />
              Request Sent
            </>
          ) : (
            <>
              <UserPlusIcon className="size-4 mr-2" />
              Send Friend Request
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default HomePage;
