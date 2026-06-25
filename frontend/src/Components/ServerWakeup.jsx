import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import PropTypes from "prop-types";

// Derive the ping URL from the same env var used for API calls:
//   VITE_BASEURL = "https://fedex-new.onrender.com/api/"
//   PING_URL     = "https://fedex-new.onrender.com/ping"
const PING_URL = import.meta.env.VITE_BASEURL
  ? import.meta.env.VITE_BASEURL.replace(/\/api\/?$/, "/ping")
  : null;

// Skip the wakeup screen entirely in local development
const IS_LOCAL = !PING_URL || PING_URL.includes("localhost");

// Phase messages shown as time passes (gives the user helpful context)
const PHASES = [
  { after: 0,  text: "loading.." },
  { after: 8,  text: "loading..." },
  { after: 18, text: "Almost there" },
  { after: 30, text: "Taking a little longer than usual — hang tight" },
];

function getPhaseText(elapsed) {
  let text = PHASES[0].text;
  for (const phase of PHASES) {
    if (elapsed >= phase.after) text = phase.text;
  }
  return text;
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function ServerWakeup({ children }) {
  // 'waking' | 'done' | 'error' | 'ready'
  const [status, setStatus] = useState(IS_LOCAL ? "ready" : "waking");
  const [elapsed, setElapsed] = useState(0);
  const [dots, setDots] = useState("");

  // ── Elapsed-second counter ──────────────────────────────────────────────
  useEffect(() => {
    if (status !== "waking") return;
    const t = setInterval(() => setElapsed((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [status]);

  // ── Animated trailing dots ──────────────────────────────────────────────
  useEffect(() => {
    if (status !== "waking") return;
    const t = setInterval(
      () => setDots((d) => (d.length >= 3 ? "" : d + ".")),
      450
    );
    return () => clearInterval(t);
  }, [status]);

  // ── Ping the backend ────────────────────────────────────────────────────
  const ping = useCallback(async () => {
    setStatus("waking");
    setElapsed(0);
    setDots("");
    try {
      await axios.get(PING_URL, { timeout: 65_000 }); // Render can take ~50 s
      setStatus("done"); // briefly show the success state…
      setTimeout(() => setStatus("ready"), 1800); // …then mount the real app
    } catch {
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    if (!IS_LOCAL) ping();
  }, [ping]);

  // ── Already ready — render the real app ────────────────────────────────
  if (status === "ready") return children;

  // ── Progress bar width: crawls to 90 % over 40 s, jumps to 100 % on done
  const progressPct =
    status === "done"
      ? 100
      : Math.min(90, Math.round((elapsed / 40) * 90));

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-blue-950 to-purple-900 px-6">
      {/* ── Glow blobs ─────────────────────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative flex flex-col items-center max-w-sm w-full">
        {/* ── Logo / icon ────────────────────────────────────────────── */}
        <div className="relative mb-8">
          <div
            className={`w-24 h-24 rounded-3xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-2xl ${
              status === "waking" ? "animate-pulse" : ""
            }`}
          >
            <span className="text-5xl">
              {status === "done" ? "✅" : "🚚"}
            </span>
          </div>
          {/* Spinning ring while waking */}
          {status === "waking" && (
            <div className="absolute inset-0 rounded-3xl border-4 border-transparent border-t-blue-400 animate-spin" />
          )}
        </div>

        {/* ── Brand name ─────────────────────────────────────────────── */}
        <h1 className="text-3xl font-extrabold text-white tracking-tight mb-1">
          Fedy<span className="text-orange-400">Transit</span>
        </h1>
        <p className="text-blue-300 text-sm mb-8 tracking-wide">
          GLOBAL LOGISTICS PLATFORM
        </p>

        {/* ── Status message ─────────────────────────────────────────── */}
        {status === "waking" && (
          <p className="text-white/80 text-base font-medium text-center mb-2 min-h-[1.5rem]">
            {getPhaseText(elapsed)}
            <span className="inline-block w-8 text-left">{dots}</span>
          </p>
        )}
        {status === "done" && (
          <p className="text-green-400 text-base font-semibold text-center mb-2 animate-pulse">
            ✓ Server is ready — loading the app…
          </p>
        )}
        {status === "error" && (
          <p className="text-red-400 text-base font-semibold text-center mb-2">
            Could not reach the server please check your internet connection and try again.
          </p>
        )}

        {/* ── Progress bar ───────────────────────────────────────────── */}
        {(status === "waking" || status === "done") && (
          <div className="w-full bg-white/10 rounded-full h-2 mb-4 overflow-hidden">
            <div
              className={`h-2 rounded-full transition-all duration-1000 ${
                status === "done"
                  ? "bg-green-400"
                  : "bg-gradient-to-r from-blue-400 to-purple-400"
              }`}
              style={{ width: `${progressPct}%` }}
            />
          </div>
        )}

        {/* ── Sub-hint ───────────────────────────────────────────────── */}
        {status === "waking" && (
          <p className="text-white/40 text-xs text-center mt-1">
            Loading please wait...
            {elapsed > 0 && (
              <span className="block mt-1 text-white/30">{elapsed}s elapsed</span>
            )}
          </p>
        )}

        {/* ── Error state ────────────────────────────────────────────── */}
        {status === "error" && (
          <div className="text-center mt-2">
            <p className="text-white/50 text-xs mb-4">
              The server may be temporarily unavailable. Please try again.
            </p>
            <button
              onClick={ping}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Retry
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

ServerWakeup.propTypes = {
  children: PropTypes.node.isRequired,
};
