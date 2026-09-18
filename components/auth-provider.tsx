"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

const API = "https://api.mccluster.org";
const STORAGE_KEY = "we.auth.session.v1";

type User = {
  id: string;
  email?: string;
  user_metadata?: Record<string, unknown>;
};

type StoredSession = {
  access_token: string;
  refresh_token?: string;
  expires_at?: number;
  user?: User;
};

type AuthContextValue = {
  ready: boolean;
  user: User | null;
  session: StoredSession | null;
  login: (email: string, password: string) => Promise<User | null>;
  signup: (email: string, password: string) => Promise<{ user: User | null; needsConfirmation: boolean }>;
  logout: () => Promise<void>;
  authFetch: (path: string, init?: RequestInit) => Promise<Response>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function persist(session: StoredSession | null) {
  if (typeof window === "undefined") return;
  if (!session) {
    window.localStorage.removeItem(STORAGE_KEY);
    return;
  }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
}

function readStored(): StoredSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as StoredSession) : null;
  } catch {
    return null;
  }
}

async function jsonRequest(path: string, init: RequestInit = {}) {
  const response = await fetch(`${API}${path}`, {
    ...init,
    headers: {
      "content-type": "application/json",
      ...(init.headers || {}),
    },
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw Object.assign(
      new Error(typeof data?.error === "string" ? data.error : "Request failed"),
      { status: response.status },
    );
  }
  return data;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [session, setSession] = useState<StoredSession | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const adopt = useCallback((next: StoredSession | null) => {
    setSession(next);
    setUser(next?.user || null);
    persist(next);
  }, []);

  const refresh = useCallback(async (current: StoredSession) => {
    if (!current.refresh_token) return null;
    const data = await jsonRequest("/api/auth/refresh", {
      method: "POST",
      body: JSON.stringify({ refresh_token: current.refresh_token }),
    });
    const next: StoredSession = {
      access_token: data.access_token,
      refresh_token: data.refresh_token || current.refresh_token,
      expires_at: data.expires_at,
      user: data.user,
    };
    adopt(next);
    return next;
  }, [adopt]);

  const fetchMe = useCallback(async (current: StoredSession) => {
    const response = await fetch(`${API}/api/auth/me`, {
      headers: { authorization: `Bearer ${current.access_token}` },
    });
    if (response.ok) {
      const data = await response.json();
      const next = { ...current, user: data.user as User };
      adopt(next);
      return data.user as User;
    }
    if (response.status === 401 && current.refresh_token) {
      const next = await refresh(current);
      if (!next) return null;
      const retry = await fetch(`${API}/api/auth/me`, {
        headers: { authorization: `Bearer ${next.access_token}` },
      });
      if (retry.ok) {
        const data = await retry.json();
        adopt({ ...next, user: data.user as User });
        return data.user as User;
      }
    }
    adopt(null);
    return null;
  }, [adopt, refresh]);

  useEffect(() => {
    const stored = readStored();
    if (!stored?.access_token) {
      setReady(true);
      return;
    }
    setSession(stored);
    setUser(stored.user || null);
    fetchMe(stored).finally(() => setReady(true));
  }, [fetchMe]);

  const login = useCallback(async (email: string, password: string) => {
    const data = await jsonRequest("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    const next: StoredSession = {
      access_token: data.access_token,
      refresh_token: data.refresh_token,
      expires_at: data.expires_at,
      user: data.user,
    };
    adopt(next);
    return (data.user || null) as User | null;
  }, [adopt]);

  const signup = useCallback(async (email: string, password: string) => {
    const data = await jsonRequest("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    if (data.access_token) {
      const next: StoredSession = {
        access_token: data.access_token,
        refresh_token: data.refresh_token,
        expires_at: data.expires_at,
        user: data.user,
      };
      adopt(next);
    }
    return {
      user: (data.user || null) as User | null,
      needsConfirmation: !data.access_token,
    };
  }, [adopt]);

  const logout = useCallback(async () => {
    const current = session;
    adopt(null);
    if (!current?.access_token) return;
    await fetch(`${API}/api/auth/logout`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${current.access_token}`,
      },
      body: "{}",
    }).catch(() => undefined);
  }, [adopt, session]);

  const authFetch = useCallback(async (path: string, init: RequestInit = {}) => {
    const current = session || readStored();
    if (!current?.access_token) {
      return new Response(JSON.stringify({ error: "Authentication required" }), {
        status: 401,
        headers: { "content-type": "application/json" },
      });
    }

    const run = (token: string) =>
      fetch(`${API}${path}`, {
        ...init,
        headers: {
          "content-type": "application/json",
          ...(init.headers || {}),
          authorization: `Bearer ${token}`,
        },
      });

    let response = await run(current.access_token);
    if (response.status === 401 && current.refresh_token) {
      const next = await refresh(current);
      if (next) response = await run(next.access_token);
    }
    return response;
  }, [refresh, session]);

  const value = useMemo<AuthContextValue>(() => ({
    ready,
    user,
    session,
    login,
    signup,
    logout,
    authFetch,
  }), [ready, user, session, login, signup, logout, authFetch]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error("useAuth must be used inside AuthProvider");
  return value;
}
