import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../utils/__redux_store__/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_API } from "../utils/constants";
import { removeAllConnections } from "../utils/__redux_store__/connectionsSlice";
import { removeFeed } from "../utils/__redux_store__/feedSlice";
import BrandLogo from "./BrandLogo";
const Navbar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await axios.post(
        BACKEND_API + "/auth/logout",
        {},
        { withCredentials: true },
      );
      dispatch(removeUser());
      dispatch(removeAllConnections());
      dispatch(removeFeed())
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  return (
    <div className="sticky top-0 z-40 border-b border-white/[0.08] bg-slate-950/85 px-2 text-slate-100 shadow-lg shadow-black/10 backdrop-blur-xl sm:px-5">
      <div className="navbar mx-auto min-h-16 max-w-7xl">
      <div className="flex-1">
      <Link
        to="/feed"
        aria-label="MeetNewDevs home"
        className="btn btn-ghost rounded-xl px-2 hover:bg-white/[0.06]"
      >
        <BrandLogo />
      </Link>
      </div>
      <div className="flex gap-2">
        {user && (
          <div className="dropdown dropdown-end mx-5">
            <button
              tabIndex={0}
              className="btn btn-ghost btn-circle avatar ring-2 ring-white/10 transition hover:ring-cyan-300/50"
              aria-label="Open user menu"
            >
              <div className="w-10 rounded-full">
                <img alt="User profile" src={user.profilePicture} />
              </div>
            </button>
            <ul
              tabIndex={0}
              className="menu dropdown-content z-50 mt-3 w-56 rounded-2xl border border-white/10 bg-slate-900 p-2 text-slate-200 shadow-2xl shadow-black/40"
            >
              <li>
                <Link to="/profile" className="rounded-lg">
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/feed" className="rounded-lg">
                  Feed
                </Link>
              </li>
              <li>
                <Link to="/connections" className="rounded-lg">
                  Connections
                </Link>
              </li>
              <li>
                <Link to="/requests" className="rounded-lg">
                  Requests
                </Link>
              </li>
               <li>
                <Link to="/premium" className="rounded-lg">
                  Premium
                </Link>
              </li>
              <li>
                <button onClick={handleLogout} className="rounded-lg">
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
      </div>
    </div>
  );
};

export default Navbar;
