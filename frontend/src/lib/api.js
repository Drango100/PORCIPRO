const API = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

export async function api(path, { method = "GET", body, headers } = {}) {
  const res = await fetch(`${API}${path}`, {
    method,
    headers: { "Content-Type": "application/json", ...(headers || {}) },
    credentials: "include", // importante para cookies httpOnly
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || "Error de red");
  return data;
}

export const authApi = {
  register(payload) {
    return api("/auth/register", { method: "POST", body: payload });
  },
  login(payload) {
    return api("/auth/login", { method: "POST", body: payload });
  },
  me() {
    return api("/auth/me");
  },
  logout() {
    return api("/auth/logout", { method: "POST" });
  },
};
