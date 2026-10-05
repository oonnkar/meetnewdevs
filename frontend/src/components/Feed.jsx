import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BACKEND_API } from "../utils/constants";
import { addFeed } from "../utils/__redux_store__/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feedData = useSelector((store) => store.feed);
  const [isLoading, setIsLoading] = useState(!Array.isArray(feedData));
  const [loadError, setLoadError] = useState("");
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    let isMounted = true;

    async function getFeed() {
      if (Array.isArray(feedData)) return;

      try {
        const res = await axios.get(`${BACKEND_API}/user/feed`, {
          withCredentials: true,
        });
        dispatch(addFeed(res.data.data));
      } catch (error) {
        console.error(
          "Failed to fetch feed:",
          error.response?.status,
          error.response?.data ?? error.message,
        );
        if (isMounted) setLoadError("We couldn't load your feed. Please try again.");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    getFeed();
    return () => {
      isMounted = false;
    };
  }, [dispatch, feedData, retryCount]);

  const users = Array.isArray(feedData) ? feedData : [];

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-[radial-gradient(ellipse_at_top,_rgba(34,211,238,0.08),_transparent_42%)] px-4 py-10 text-slate-100 sm:px-6 sm:py-14">
      <section className="mx-auto flex w-full max-w-5xl flex-col items-center">
        <div className="mb-8 w-full max-w-xl text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-cyan-300">
            Find your next connection
          </p>
          <h1 className="bg-gradient-to-r from-white via-slate-100 to-cyan-200 bg-clip-text text-3xl font-extrabold tracking-tight text-transparent sm:text-5xl">
            Discover developers
          </h1>
          <p className="mt-3 text-base leading-7 text-slate-400">
            Swipe right if you&apos;re interested, or left to pass.
          </p>
        </div>

        {isLoading ? (
          <div className="flex min-h-96 items-center justify-center" role="status">
            <span className="loading loading-spinner loading-lg text-primary" />
            <span className="sr-only">Loading your feed</span>
          </div>
        ) : loadError ? (
          <div className="alert alert-error max-w-lg" role="alert">
            <span>{loadError}</span>
            <button
              type="button"
              className="btn btn-sm"
              onClick={() => {
                setLoadError("");
                setIsLoading(true);
                setRetryCount((count) => count + 1);
              }}
            >
              Try again
            </button>
          </div>
        ) : users.length > 0 ? (
          <>
            <div className="mb-4 flex w-full max-w-md items-center justify-between text-sm text-slate-400">
              <span>People to discover</span>
              <span>{users.length} remaining</span>
            </div>
            <div className="w-full max-w-md">
              <UserCard user={users[0]} />
            </div>
            <p className="mt-5 text-center text-sm text-base-content/50">
              Drag the card left or right, or use the buttons below
            </p>
          </>
        ) : (
          <div className="card w-full max-w-md rounded-3xl border border-white/10 bg-slate-900/70 shadow-2xl shadow-black/20">
            <div className="card-body items-center py-16 text-center">
            <div className="mb-2 flex size-16 items-center justify-center rounded-2xl bg-emerald-400/10 text-3xl text-emerald-300 ring-1 ring-emerald-300/20">
                <span aria-hidden="true">✓</span>
              </div>
              <h2 className="card-title text-2xl text-white">You&apos;re all caught up</h2>
              <p className="text-slate-400">
                Check back later to meet more developers.
              </p>
            </div>
          </div>
        )}
      </section>
    </main>
  );
};

export default Feed;
