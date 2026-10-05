import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/__redux_store__/connectionsSlice";
import { useEffect } from "react";
import { BACKEND_API } from "../utils/constants";
import { Link } from "react-router-dom";

const Connections = () => {
  const connections = useSelector((store) => store.connection?.connections);

  const dispatch = useDispatch();
  const fetchData = async () => {
    try {
      if (Array.isArray(connections)) return;
      const res = await axios.get(BACKEND_API + "/user/connections", {
        withCredentials: true,
      });

      dispatch(addConnections(res.data.connections || []));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [connections]);

  if (!connections)
    return (
      <main className="flex min-h-[70vh] items-center justify-center text-slate-400">
        <span className="loading loading-spinner loading-md mr-3 text-cyan-300" />
        Loading your connections…
      </main>
    );

  if (connections.length === 0) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-slate-900/70 px-8 py-14 text-center shadow-2xl shadow-black/20">
          <div className="mx-auto mb-5 flex size-14 items-center justify-center rounded-2xl bg-cyan-300/10 text-2xl text-cyan-200 ring-1 ring-cyan-200/15">✦</div>
          <h1 className="text-2xl font-bold text-white">Your circle starts here</h1>
          <p className="mt-3 text-sm leading-6 text-slate-400">You don&apos;t have any connections yet. Discover developers in your feed and start a conversation.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-[radial-gradient(ellipse_at_top_left,_rgba(99,102,241,0.10),_transparent_40%)] px-4 py-10 text-slate-100 sm:px-6 sm:py-14">
      <div className="mx-auto max-w-3xl">
        <header className="mb-8">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-cyan-300">Your network</p>
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">Connections</h1>
          <p className="mt-2 text-sm text-slate-400">People you&apos;ve connected with on MeetNewDevs.</p>
        </header>
        <ul className="space-y-4">
          {connections.map((user, index) => {
            const connectionUser = user?.user || user;
            const userId = connectionUser?._id || user?._id || index;

            return (
              <div key={index}>
                <li
                  key={userId}
                  className="overflow-hidden rounded-3xl border border-white/[0.08] bg-slate-900/75 shadow-xl shadow-black/15 transition duration-300 hover:-translate-y-0.5 hover:border-cyan-200/20 hover:shadow-2xl hover:shadow-black/25"
                >
                  <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:p-6">
                    {connectionUser.profilePicture?.trim() ? (
                      <img
                        src={connectionUser.profilePicture}
                        alt={`${connectionUser.firstName} ${connectionUser.lastName}`}
                        className="h-20 w-20 shrink-0 rounded-2xl object-cover ring-2 ring-cyan-300/20"
                      />
                    ) : (
                      <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-indigo-500 text-3xl font-bold text-slate-950">
                        {connectionUser.firstName?.[0] || "?"}
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <h2 className="text-xl font-bold tracking-tight text-white">
                        {connectionUser.firstName} {connectionUser.lastName}
                      </h2>
                      {connectionUser.gender && (
                        <span className="mt-1 inline-block text-sm capitalize text-cyan-200">
                          {connectionUser.gender}
                        </span>
                      )}
                      <p className="mt-3 text-sm leading-6 text-slate-400">
                        {connectionUser.about ||
                          "This user has not added a bio yet."}
                      </p>
                      {connectionUser.phoneNumber && (
                        <p className="mt-3 text-sm text-slate-400">
                          Phone: {connectionUser.phoneNumber}
                        </p>
                      )}
                      {connectionUser.skills?.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {connectionUser.skills.map((skill, index) => (
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
                    <Link to={"/chat/" + userId}>
                      <button
                        type="button"
                        className="rounded-xl bg-gradient-to-r from-cyan-400 to-indigo-400 px-6 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-indigo-950/30 transition hover:-translate-y-0.5 hover:shadow-cyan-400/15 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-900"
                      >
                        Chat
                      </button>
                    </Link>
                  </div>
                </li>
              </div>
            );
          })}
        </ul>
      </div>
    </main>
  );
};
export default Connections;
