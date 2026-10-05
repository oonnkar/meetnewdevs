import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../utils/__redux_store__/userSlice";
import { BACKEND_API } from "../utils/constants";
import BrandLogo from "./BrandLogo";

const getErrorMessage = (error, fallback) => {
  const message =
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    error?.response?.data?.["Error:"] ||
    error?.message ||
    fallback;

  return message || fallback;
};

const Login = () => {
  const urr = {
    emailId: "aarav.sharma1@example.com",
    password: "User@1000Strong",
  };
  const [email, setEmail] = useState(urr.emailId);
  const [password, setPassword] = useState(urr.password);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [about, setAbout] = useState("");
  const [skills, setSkills] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [error, setError] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleLogin(event) {
    event.preventDefault();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      setError("Please enter both your email and password.");
      return;
    }

    setError("");
    try {
      const res = await axios.post(
        `${BACKEND_API}/auth/login`,
        { emailId: trimmedEmail, password: trimmedPassword },
        {
          withCredentials: true,
        },
      );
      dispatch(addUser(res.data.user));
      navigate("/feed");
    } catch (loginError) {
      setError(
        getErrorMessage(loginError, "Unable to log in. Please try again."),
      );
    }
  }

  async function handleSignup(event) {
    event.preventDefault();
    const trimmedFirstName = firstName.trim();
    const trimmedLastName = lastName.trim();
    const trimmedPhoneNumber = phoneNumber.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (
      !trimmedFirstName ||
      !trimmedLastName ||
      !trimmedEmail ||
      !trimmedPassword ||
      !trimmedPhoneNumber
    ) {
      setError("Please complete all required fields.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (trimmedPassword.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (trimmedPhoneNumber.length < 7) {
      setError("Please enter a valid phone number.");
      return;
    }

    setError("");
    try {
      const res = await axios.post(
        `${BACKEND_API}/auth/signup`,
        {
          firstName: trimmedFirstName,
          lastName: trimmedLastName,
          emailId: trimmedEmail,
          password: trimmedPassword,
          phoneNumber: trimmedPhoneNumber,
          gender,
          about,
          skills: skills
            .split(",")
            .map((skill) => skill.trim())
            .filter(Boolean),
          profilePicture,
        },
        { withCredentials: true },
      );

      dispatch(addUser(res.data.data || res.data.user || res.data));
      navigate("/feed");
    } catch (signupError) {
      setError(
        getErrorMessage(
          signupError,
          "Unable to create your account. Please try again.",
        ),
      );
    }
  }

  return (
    <main className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_top,_rgba(34,211,238,0.12),_transparent_45%)] px-4 py-12">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.035]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[27rem] w-[27rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.04]" />
      <div className="relative w-full max-w-md overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/80 shadow-2xl shadow-black/40 backdrop-blur-2xl">
        <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute -bottom-24 -left-20 h-48 w-48 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="relative p-7 sm:p-10">
          <div className="mb-8 text-center">
            <div className="mb-5 flex justify-center">
              <BrandLogo className="size-12" markOnly />
            </div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-300">Welcome to MeetNewDevs</p>
            <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-white">
              {isLogin ? "Log in" : "Create account"}
            </h2>
            <p className="mt-3 text-sm text-slate-400">
              Sign in to continue to your account
            </p>
          </div>

          <form
            onSubmit={isLogin ? handleLogin : handleSignup}
            className="space-y-6"
          >
            <fieldset className="space-y-2">
              <label
                className="block text-sm font-medium text-slate-200"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 hover:border-white/20 focus:border-cyan-300 focus:ring-4 focus:ring-cyan-300/10"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </fieldset>

            {!isLogin && (
              <>
                <fieldset className="space-y-2">
                  <label
                    className="block text-sm font-medium text-slate-200"
                    htmlFor="firstName"
                  >
                    First name
                  </label>
                  <input
                    id="firstName"
                    className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 hover:border-white/20 focus:border-cyan-300 focus:ring-4 focus:ring-cyan-300/10"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </fieldset>
                <fieldset className="space-y-2">
                  <label
                    className="block text-sm font-medium text-slate-200"
                    htmlFor="lastName"
                  >
                    Last name
                  </label>
                  <input
                    id="lastName"
                    className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 hover:border-white/20 focus:border-cyan-300 focus:ring-4 focus:ring-cyan-300/10"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </fieldset>
                <fieldset className="space-y-2">
                  <label
                    className="block text-sm font-medium text-slate-200"
                    htmlFor="phoneNumber"
                  >
                    Phone number
                  </label>
                  <input
                    id="phoneNumber"
                    type="tel"
                    className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 hover:border-white/20 focus:border-cyan-300 focus:ring-4 focus:ring-cyan-300/10"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </fieldset>
                <fieldset className="space-y-2">
                  <label
                    className="block text-sm font-medium text-slate-200"
                    htmlFor="gender"
                  >
                    Gender
                  </label>
                  <input
                    id="gender"
                    className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 hover:border-white/20 focus:border-cyan-300 focus:ring-4 focus:ring-cyan-300/10"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  />
                </fieldset>
                <fieldset className="space-y-2">
                  <label
                    className="block text-sm font-medium text-slate-200"
                    htmlFor="about"
                  >
                    About
                  </label>
                  <textarea
                    id="about"
                    className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 hover:border-white/20 focus:border-cyan-300 focus:ring-4 focus:ring-cyan-300/10"
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                  />
                </fieldset>
                <fieldset className="space-y-2">
                  <label
                    className="block text-sm font-medium text-slate-200"
                    htmlFor="skills"
                  >
                    Skills
                  </label>
                  <input
                    id="skills"
                    placeholder="AWS, JavaScript, Express"
                    className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 hover:border-white/20 focus:border-cyan-300 focus:ring-4 focus:ring-cyan-300/10"
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                  />
                </fieldset>
                <fieldset className="space-y-2">
                  <label
                    className="block text-sm font-medium text-slate-200"
                    htmlFor="profilePicture"
                  >
                    Profile picture URL
                  </label>
                  <input
                    id="profilePicture"
                    type="url"
                    className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 hover:border-white/20 focus:border-cyan-300 focus:ring-4 focus:ring-cyan-300/10"
                    value={profilePicture}
                    onChange={(e) => setProfilePicture(e.target.value)}
                  />
                </fieldset>
              </>
            )}

            <fieldset className="space-y-2">
              <label
                className="block text-sm font-medium text-slate-200"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 hover:border-white/20 focus:border-cyan-300 focus:ring-4 focus:ring-cyan-300/10"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </fieldset>

            {error && (
              <div
                role="alert"
                className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200"
              >
                {error}
              </div>
            )}

            <div className="pt-2">
              <button
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-cyan-300 to-indigo-400 px-4 py-3.5 text-base font-bold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:-translate-y-0.5 hover:shadow-cyan-500/40 active:translate-y-0"
              >
                Log in
              </button>
              <div className="mt-6 flex items-center justify-center gap-2 text-sm text-slate-400">
                <span>
                  {isLogin ? "New to MeetNewDevs?" : "Already have an account?"}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setError("");
                  }}
                  className="font-semibold text-cyan-300 transition hover:text-cyan-200 hover:underline"
                >
                  {isLogin ? "Create an account" : "Log in"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Login;
