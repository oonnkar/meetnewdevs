import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  addConnectionRequests,
  removeConnectionRequest,
} from "../utils/__redux_store__/connectionsSlice";
import { BACKEND_API } from "../utils/constants";

const Requests = () => {
  const connectionRequests = useSelector((store) => store.connection?.requests);

  const dispatch = useDispatch();
  const fetchData = async () => {
    try {
      if (connectionRequests !== null && connectionRequests !== undefined)
        return;
      const res = await axios.get(
        BACKEND_API+"/user/requests/received",
        { withCredentials: true },
      );
      dispatch(addConnectionRequests(res.data.data));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRequestClick = async (reqStatus, reqId) => {
    try {
      await axios.post(
        `${BACKEND_API}/request/review/${reqStatus}/${reqId}`,
        {},
        { withCredentials: true },
      );
      dispatch(removeConnectionRequest(reqId));
    } catch (error) {
      console.error(error);
    }
  };
  return !connectionRequests || connectionRequests.length === 0 ? (
    <main className="flex min-h-[70vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-slate-900/70 px-8 py-14 text-center shadow-2xl shadow-black/20">
        <div className="mx-auto mb-5 flex size-14 items-center justify-center rounded-2xl bg-indigo-300/10 text-indigo-200 ring-1 ring-indigo-200/15">
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            className="size-7"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2m16 0v-2a4 4 0 0 0-3-3.87M14 3.13a4 4 0 0 1 0 7.75M14 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.7"
            />
            <path
              d="M19 8v4m-2-2h4"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="1.7"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-white">No requests yet</h1>
        <p className="mt-3 text-sm leading-6 text-slate-400">When someone is interested in connecting, you&apos;ll find their request here.</p>
      </div>
    </main>
  ) : (
    <main className="min-h-[calc(100vh-4rem)] bg-[radial-gradient(ellipse_at_top_right,_rgba(99,102,241,0.10),_transparent_40%)] px-4 py-10 text-slate-100 sm:px-6 sm:py-14">
      <div className="mx-auto max-w-3xl">
        <header className="mb-8">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-indigo-200">New connections</p>
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">Connection requests</h1>
          <p className="mt-2 text-sm text-slate-400">Meet the people who would like to connect.</p>
        </header>
        <ul className="space-y-4">
          {connectionRequests.map((request) => {
            const user = request.fromUser;

            return (
              <li
                key={request._id}
                className="overflow-hidden rounded-3xl border border-white/[0.08] bg-slate-900/75 shadow-xl shadow-black/15 transition duration-300 hover:-translate-y-0.5 hover:border-indigo-200/20 hover:shadow-2xl"
              >
                <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:p-6">
                  {user.profilePicture ? (
                    <img
                      src={user.profilePicture}
                      alt={`${user.firstName} ${user.lastName}`}
                      className="h-20 w-20 shrink-0 rounded-2xl object-cover ring-2 ring-indigo-300/20"
                    />
                  ) : (
                    <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-400 to-cyan-400 text-3xl font-bold text-slate-950">
                      {user.firstName?.[0] || "?"}
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <h2 className="text-xl font-bold text-white">
                        {user.firstName} {user.lastName}
                      </h2>
                      {user.gender && (
                        <span className="rounded-full border border-indigo-200/10 bg-indigo-300/10 px-3 py-1 text-xs font-medium capitalize text-indigo-200">
                          {user.gender}
                        </span>
                      )}
                    </div>
                    <p className="mt-3 text-sm leading-6 text-slate-400">
                      {user.about || "This user has not added a bio yet."}
                    </p>
                    {user.phoneNumber && (
                      <p className="mt-3 text-sm text-slate-400">
                        <span className="mr-2 text-slate-500">Phone</span>
                        {user.phoneNumber}
                      </p>
                    )}
                    {user.skills?.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {user.skills.map((skill, index) => (
                          <span
                            key={`${skill}-${index}`}
                            className="rounded-full border border-white/[0.08] bg-slate-800/80 px-3 py-1.5 text-xs font-medium text-slate-300"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex justify-end gap-3 border-t border-white/[0.06] bg-slate-950/30 px-5 py-4 sm:px-6">
                  <button
                    onClick={() => {
                      handleRequestClick("rejected", request._id);
                    }}
                    type="button"
                    className="rounded-xl border border-white/10 px-5 py-2.5 text-sm font-semibold text-slate-300 transition hover:border-rose-300/40 hover:bg-rose-400/10 hover:text-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-300/40"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => {
                      handleRequestClick("accepted", request._id);
                    }}
                    type="button"
                    className="rounded-xl bg-gradient-to-r from-indigo-400 to-cyan-400 px-6 py-2.5 text-sm font-bold text-slate-950 shadow-lg shadow-indigo-950/30 transition hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                  >
                    Accept
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </main>
  );
};

export default Requests;
