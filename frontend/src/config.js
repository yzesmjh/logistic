/**
 * Central API configuration.
 *
 * Vercel sometimes ends up with the entire .env line stored as the value, e.g.:
 *   VITE_BASEURL = https://logistic-zuol.onrender.com/api/
 * instead of just:
 *   https://logistic-zuol.onrender.com/api/
 *
 * This module sanitises that so every import gets a clean URL.
 */
const raw = (import.meta.env.VITE_BASEURL ?? "").trim();

// Strip accidental "KEY = " prefix (space-equals-space pattern from .env lines)
export const BASE_URL = raw.includes(" = ") ? raw.split(" = ").pop().trim() : raw;
