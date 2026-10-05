import React, { useState } from "react";
import axios from "axios";
import { BACKEND_API } from "../utils/constants";
import { useEffect } from "react";

const getErrorMessage = (error, fallback) => {
  return (
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    error?.response?.data?.["Error:"] ||
    error?.message ||
    fallback
  );
};

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [about, setAbout] = useState(user?.about || "");
  const [skills, setSkills] = useState(user?.skills || "");
  const [popupMessage, setPopupMessage] = useState("");
  const [isError, setIsError] = useState(false);

  async function handleFormSubmit() {
    if (!firstName || !lastName || !phoneNumber) {
      setPopupMessage("Please fill in your first name, last name, and phone number.");
      setIsError(true);
      return;
    }

    try {
      await axios.patch(
        BACKEND_API + "/profile/edit",
        {
          firstName: firstName,
          lastName: lastName,
          phoneNumber: phoneNumber,
          gender,
          about: about,
          skills: skills,
        },
        { withCredentials: true },
      );

      setPopupMessage("Profile saved successfully.");
      setIsError(false);
    } catch (error) {
      setPopupMessage(
        getErrorMessage(error, "Could not save your profile. Please try again."),
      );
      setIsError(true);
    }
  }

  useEffect(() => {
    setFirstName(user?.firstName || "");
    setLastName(user?.lastName || "");
    setPhoneNumber(user?.phoneNumber || "");
    setGender(user?.gender || "");
    setAbout(user?.about || "");
    setSkills(user?.skills || "");
  }, [user]);

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-[radial-gradient(ellipse_at_top,_rgba(34,211,238,0.10),_transparent_42%)] px-4 py-10 text-slate-100 sm:py-14">
      {popupMessage && (
        <div
          role="alert"
          className={`fixed left-1/2 top-20 z-50 flex w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 items-center justify-between gap-4 rounded-2xl border px-5 py-4 text-sm shadow-2xl backdrop-blur-xl ${
            isError
              ? "border-red-400/40 bg-red-500/10 text-red-100"
              : "border-emerald-400/40 bg-emerald-500/10 text-emerald-100"
          }`}
        >
          <span>{popupMessage}</span>
          <button
            type="button"
            aria-label="Dismiss notification"
            className="text-slate-300 hover:text-white"
            onClick={() => {
              setPopupMessage("");
              setIsError(false);
            }}
          >
            ×
          </button>
        </div>
      )}
      <div className="mx-auto max-w-2xl rounded-[2rem] border border-white/10 bg-slate-900/75 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-9">
        <div className="mb-8 flex items-center justify-between border-b border-white/10 pb-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-300">
              Profile
            </p>
            <h2 className="mt-2 text-2xl font-bold text-white">Edit profile</h2>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-300 to-indigo-400 text-sm font-black text-slate-950 shadow-lg shadow-cyan-500/20">
            EP
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleFormSubmit();
          }}
          className="space-y-6"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <fieldset className="space-y-2">
              <label
                className="block text-sm font-medium text-slate-200"
                htmlFor="firstName"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white shadow-inner shadow-black/20 outline-none transition duration-200 placeholder:text-slate-500 hover:border-white/20 focus:border-cyan-300 focus:ring-4 focus:ring-cyan-300/10"
                placeholder="John Doe"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </fieldset>

            <fieldset className="space-y-2">
              <label
                className="block text-sm font-medium text-slate-200"
                htmlFor="lastName"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white shadow-inner shadow-black/20 outline-none transition duration-200 placeholder:text-slate-500 hover:border-white/20 focus:border-cyan-300 focus:ring-4 focus:ring-cyan-300/10"
                placeholder="Doe"
                onChange={(e) => setLastName(e.target.value)}
              />
            </fieldset>
          </div>

          <fieldset className="space-y-2">
            <label
              className="block text-sm font-medium text-slate-200"
              htmlFor="phoneNumber"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              value={phoneNumber}
              className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white shadow-inner shadow-black/20 outline-none transition duration-200 placeholder:text-slate-500 hover:border-white/20 focus:border-cyan-300 focus:ring-4 focus:ring-cyan-300/10"
              placeholder="+1 234 567 890"
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
            <select
              id="gender"
              value={gender}
              className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white shadow-inner shadow-black/20 outline-none transition duration-200 hover:border-white/20 focus:border-cyan-300 focus:ring-4 focus:ring-cyan-300/10"
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="others">Others</option>
            </select>
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
              value={about}
              rows="4"
              className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white shadow-inner shadow-black/20 outline-none transition duration-200 placeholder:text-slate-500 hover:border-white/20 focus:border-cyan-300 focus:ring-4 focus:ring-cyan-300/10"
              placeholder="Tell us about yourself"
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
              type="text"
              id="skills"
              value={skills}
              className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white shadow-inner shadow-black/20 outline-none transition duration-200 placeholder:text-slate-500 hover:border-white/20 focus:border-cyan-300 focus:ring-4 focus:ring-cyan-300/10"
              placeholder="React, Node, JavaScript"
              onChange={(e) => setSkills(e.target.value)}
            />
          </fieldset>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r from-cyan-300 via-sky-300 to-indigo-400 px-4 py-3.5 text-base font-bold text-slate-950 shadow-lg shadow-cyan-500/20 transition duration-200 hover:-translate-y-0.5 hover:shadow-cyan-500/40 active:translate-y-0"
            >
              Save changes
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default EditProfile;
