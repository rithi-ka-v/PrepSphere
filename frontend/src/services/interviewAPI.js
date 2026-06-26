import API from "./api";

// ==========================
// Start Interview
// ==========================
export const startInterview = async (data) => {
  return await API.post("/interview/start", data);
};

// ==========================
// Submit Interview
// ==========================
export const submitInterview = async (data) => {
  return await API.post("/interview/submit", data);
};

// ==========================
// Get Interview History
// ==========================
export const getInterviewHistory = async (userId) => {
  return await API.get(`/interview/history/${userId}`);
};

// ==========================
// Dashboard Statistics
// ==========================
export const getDashboardStats = async (userId) => {
  return await API.get(`/interview/dashboard/${userId}`);
};