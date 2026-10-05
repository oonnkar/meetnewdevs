import { useRef, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/__redux_store__/feedSlice";
import { BACKEND_API } from "../utils/constants";

const SWIPE_THRESHOLD = 100;

const UserCard = ({ user }) => {
  const { _id: userId, firstName, lastName, emailId, profilePicture } = user;
  const dispatch = useDispatch();
  const [dragX, setDragX] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [actionError, setActionError] = useState("");
  const pointerStart = useRef(null);

  async function handleAction(status) {
    if (isSubmitting) return;

    setIsSubmitting(true);
    setActionError("");
    try {
      await axios.post(
        `${BACKEND_API}/request/send/${status}/${userId}`,
        {},
        { withCredentials: true },
      );
      dispatch(removeUserFromFeed(userId));
    } catch (error) {
      console.error(
        `Failed to ${status} user:`,
        error.response?.status,
        error.response?.data ?? error.message,
      );
      setActionError(
        error.response?.data?.message ??
          "Your choice couldn't be saved. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
      pointerStart.current = null;
      setIsDragging(false);
      setDragX(0);
    }
  }

  function handlePointerDown(event) {
    if (isSubmitting || (event.pointerType === "mouse" && event.button !== 0)) {
      return;
    }

    pointerStart.current = { x: event.clientX, y: event.clientY };
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event) {
    if (!pointerStart.current || isSubmitting) return;

    const offsetX = event.clientX - pointerStart.current.x;
    const offsetY = event.clientY - pointerStart.current.y;
    if (Math.abs(offsetX) > Math.abs(offsetY)) {
      setDragX(offsetX);
    }
  }

  function handlePointerUp(event) {
    if (!pointerStart.current) return;

    const offsetX = event.clientX - pointerStart.current.x;
    const offsetY = event.clientY - pointerStart.current.y;
    const swipeRight =
      offsetX >= SWIPE_THRESHOLD && Math.abs(offsetX) > Math.abs(offsetY);
    const swipeLeft =
      offsetX <= -SWIPE_THRESHOLD && Math.abs(offsetX) > Math.abs(offsetY);
    pointerStart.current = null;
    setIsDragging(false);

    if (swipeRight) {
      handleAction("interested");
    } else if (swipeLeft) {
      handleAction("ignore");
    } else {
      setDragX(0);
    }
  }

  function handlePointerCancel() {
    pointerStart.current = null;
    setIsDragging(false);
    setDragX(0);
  }

  const swipeLabel =
    dragX >= SWIPE_THRESHOLD
      ? "INTERESTED"
      : dragX <= -SWIPE_THRESHOLD
        ? "IGNORE"
        : "";

  return (
    <article
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
      className={`card relative w-full select-none overflow-hidden rounded-3xl border border-white/10 bg-slate-900 shadow-2xl shadow-black/30 ${
        isSubmitting ? "cursor-wait" : "cursor-grab active:cursor-grabbing"
      }`}
      style={{
        transform: `translateX(${dragX}px) rotate(${dragX * 0.04}deg)`,
        transition: isDragging ? "none" : "transform 180ms ease-out",
        touchAction: "pan-y",
      }}
      aria-label={`Developer profile: ${firstName} ${lastName}`}
    >
      <figure className="relative h-80 bg-slate-800 sm:h-96">
        <img
          src={profilePicture}
          alt={`${firstName} ${lastName}`}
          draggable="false"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
        {swipeLabel && (
          <span
            className={`absolute top-8 rounded-lg border-4 px-4 py-2 text-xl font-black tracking-widest ${
              swipeLabel === "INTERESTED"
                ? "right-6 rotate-12 border-success text-success"
                : "left-6 -rotate-12 border-error text-error"
            }`}
          >
            {swipeLabel}
          </span>
        )}
        <div className="absolute inset-x-0 bottom-0 p-6 text-white">
          <span className="mb-3 inline-flex w-fit items-center rounded-full border border-cyan-200/20 bg-cyan-300/15 px-3 py-1 text-xs font-semibold tracking-wide text-cyan-100 backdrop-blur">
            Developer
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            {firstName} {lastName}
          </h2>
          <p className="mt-2 break-all text-sm text-white/75">{emailId}</p>
        </div>
      </figure>

      <div
        className="card-body gap-4 bg-gradient-to-b from-slate-900 to-slate-950 p-5 sm:p-6"
        onPointerDownCapture={(event) => {
          if (event.target.closest("button")) event.stopPropagation();
        }}
      >
        {userId && (
          <p className="truncate text-xs text-slate-500">ID: {userId}</p>
        )}
        {actionError && (
          <p className="text-sm text-error" role="alert">
            {actionError}
          </p>
        )}
        <div className="flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => handleAction("ignore")}
            disabled={isSubmitting}
            className="btn btn-circle btn-lg border border-rose-300/20 bg-rose-400/10 text-rose-300 shadow-lg shadow-rose-950/20 hover:border-rose-300 hover:bg-rose-500 hover:text-white"
            aria-label="Ignore this developer"
          >
            <span aria-hidden="true" className="text-2xl">×</span>
          </button>
          <span className="px-2 text-center text-xs font-medium text-slate-500">
            Swipe to choose
          </span>
          <button
            type="button"
            onClick={() => handleAction("interested")}
            disabled={isSubmitting}
            className="btn btn-circle btn-lg border border-emerald-300/20 bg-emerald-400/10 text-emerald-300 shadow-lg shadow-emerald-950/20 hover:border-emerald-300 hover:bg-emerald-500 hover:text-white"
            aria-label="I'm interested in this developer"
          >
            <span aria-hidden="true" className="text-xl">♥</span>
          </button>
        </div>
      </div>
    </article>
  );
};

export default UserCard;
