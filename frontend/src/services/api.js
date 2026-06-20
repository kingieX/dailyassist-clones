import axios from "axios";

// ── Base instance ─────────────────────────────────────────────────────────────
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ── Request interceptor — attach token to every request ───────────────────────
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ── Response interceptor — handle token expiry globally ───────────────────────
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid — clear storage and redirect to login
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/staff-login";
    }
    return Promise.reject(error);
  }
);

// ── Auth ──────────────────────────────────────────────────────────────────────
// export const authAPI = {
//   login:   (data)  => api.post("/auth/login", data),
//   logout:  ()      => api.post("/auth/logout"),
//   me:      ()      => api.get("/auth/me"),
//   refresh: ()      => api.post("/auth/refresh"),
// };
// export const authAPI = {
//   adminLogin:  (data) => api.post("/auth/admin/login", data),
//   workerLogin: (data) => api.post("/auth/worker/login", data),
//   logout:      ()     => api.post("/auth/logout"),
//   me:          ()     => api.get("/auth/me"),
//   refresh:     ()     => api.post("/auth/refresh"),
// };

export const authAPI = {
  adminLogin:  (data) => api.post("/auth/admin/login", data),
  workerLogin: (data) => api.post("/auth/worker/login", data),
  logout:      ()     => api.post("/auth/logout"),
  me:          ()     => api.get("/auth/me"),
  refresh:     ()     => api.post("/auth/refresh"),
};

// ── Staff ─────────────────────────────────────────────────────────────────────
export const staffAPI = {
  getAll:  ()          => api.get("/admin/staff"),
  getById: (id)        => api.get(`/admin/staff/${id}`),
  create:  (data)      => api.post("/admin/staff", data),
  update:  (id, data)  => api.put(`/admin/staff/${id}`, data),
  delete:  (id)        => api.delete(`/admin/staff/${id}`),
};

// ── Clients ───────────────────────────────────────────────────────────────────
export const clientsAPI = {
  getAll:  ()          => api.get("/clients"),
  getById: (id)        => api.get(`/clients/${id}`),
  create:  (data)      => api.post("/clients", data),
  update:  (id, data)  => api.put(`/clients/${id}`, data),
  delete:  (id)        => api.delete(`/clients/${id}`),
};

// ── Bookings ──────────────────────────────────────────────────────────────────
export const bookingsAPI = {
  getAll:       (params)    => api.get("/admin/bookings", { params }),
  getById:      (id)        => api.get(`/admin/bookings/${id}`),
  updateStatus: (id, data)  => api.patch(`/admin/bookings/${id}`, data),
  assign:       (id, data)  => api.post(`/admin/bookings/${id}/assign`, data),
  cancel:       (id, data)  => api.post(`/admin/bookings/${id}/cancel`, data),
  complete:     (id)        => api.post(`/admin/bookings/${id}/complete`),
};

// ── Visits ────────────────────────────────────────────────────────────────────
export const visitsAPI = {
  // GET /admin/visits
  // Params (all optional): { page, limit, status, staffId, bookingId, sortBy, sortOrder }
  // Status enum: ASSIGNED | ACKNOWLEDGED | IN_PROGRESS | COMPLETED | CANCELLED | NO_SHOW
  // sortBy enum: scheduledStartAt | createdAt | updatedAt (default scheduledStartAt)
  // sortOrder: asc | desc (default desc)
  getAll: (params) => api.get("/admin/visits", { params }),

  // GET /admin/visits/{id}
  getById: (id) => api.get(`/admin/visits/${id}`),

  // POST /admin/visits
  // Required body: { bookingId, staffId, scheduledStartAt, scheduledEndAt }
  // Optional body: { adminNotes }
  create: (data) => api.post("/admin/visits", data),

  // PATCH /admin/visits/{id}
  // Body fields (all optional): { scheduledStartAt, scheduledEndAt, adminNotes, staffNotes }
  update: (id, data) => api.patch(`/admin/visits/${id}`, data),

  // POST /admin/visits/{id}/reassign
  // Body: { staffId }
  reassign: (id, data) => api.post(`/admin/visits/${id}/reassign`, data),

  // POST /admin/visits/{id}/cancel
  // Body: { reason }
  cancel: (id, data) => api.post(`/admin/visits/${id}/cancel`, data),
};

// ── Reports ───────────────────────────────────────────────────────────────────
export const reportsAPI = {
  getAll:  (params)    => api.get("/admin/reports", { params }),
  create:  (data)      => api.post("/admin/reports", data),
  update:  (id, data)  => api.put(`/admin/reports/${id}`, data),
  delete:  (id)        => api.delete(`/admin/reports/${id}`),
};
// ── Messages ──────────────────────────────────────────────────────────────────
export const messagesAPI = {
  getAll:  ()      => api.get("/messages"),
  send:    (data)  => api.post("/messages", data),
};

export const dashboardAPI = {
  getSummary: () => api.get("/admin/dashboard/summary"),
  getCharts:  () => api.get("/admin/dashboard/charts"),
  getAlerts:  () => api.get("/admin/dashboard/alerts"),
};

// ── Packages ──────────────────────────────────────────────────────────────────
export const packagesAPI = {
  getAll:  ()          => api.get("/packages"),
  getById: (id)        => api.get(`/packages/${id}`),
  create:  (data)      => api.post("/packages", data),
  update:  (id, data)  => api.put(`/packages/${id}`, data),
  delete:  (id)        => api.delete(`/packages/${id}`),
};

// ── Dashboard ──────────────────────────────────────────────────────────────────
export const recruitmentAPI = {
  getAll:  ()          => api.get("/recruitment"),
  getById: (id)        => api.get(`/recruitment/${id}`),
  create:  (data)      => api.post("/recruitment", data),
  update:  (id, data)  => api.put(`/recruitment/${id}`, data),
  delete:  (id)        => api.delete(`/recruitment/${id}`),
};

export const jobPostsAPI = {
  getAll:  ()          => api.get("/job-posts"),
  getById: (id)        => api.get(`/job-posts/${id}`),
  create:  (data)      => api.post("/job-posts", data),
  update:  (id, data)  => api.put(`/job-posts/${id}`, data),
  delete:  (id)        => api.delete(`/job-posts/${id}`),
};
export default api;

