import API from "./api";

export const createBatch = (data) =>
  API.post("/batch/create", data);

export const getTeacherBatches = (email) =>
  API.get(`/batch/teacher/${email}`);

export const getStudents = (code) =>
  API.get(`/batch/students/${code}`);

export const addStudentToBatch = (data) =>
  API.post("/batch/add-student", data);

export const getStudentBatches = (email) =>
  API.get(`/batch/student/${email}`);



export const getNotes = (batchName) =>
  API.get(`/notes/${batchName}`);

export const addNote = (data) =>
  API.post("/notes/add", data, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });


  export const markAttendance = (data) =>
  API.post("/attendance/mark", data);

export const getStudentAttendance = (batchId, email) =>
  API.get(`/attendance/student/${batchId}/${email}`);

export const sendAnnouncement = (data) =>
  API.post("/announcement/send", data);

export const getAnnouncements = (batchId) =>
  API.get(`/announcement/${batchId}`);

export const createAssignment = (data) =>
  API.post("/assignment/create", data, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });

export const getAssignments = (batchId) =>
  API.get(`/assignment/${batchId}`);

export const submitAssignment = (data) =>
  API.post("/assignment/submit", data, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });

  export const getSubmissions = (batchId, title) =>
  API.get(`/assignment/submissions/${batchId}/${title}`);


// =========================
// TESTS - ONLINE MCQ
// =========================
export const createOnlineTest = (data) =>
  API.post("/test/online/create", data);

export const getOnlineTests = (batchId) =>
  API.get(`/test/online/${batchId}`);

export const submitOnlineTest = (data) =>
  API.post("/test/online/submit", data);

export const getOnlineResults = (batchId, email) =>
  API.get(`/test/online/results/${batchId}/${encodeURIComponent(email)}`);

// =========================
// TESTS - OFFLINE
// =========================
export const createOfflineTest = (data) =>
  API.post("/test/offline/create", data);

export const getOfflineTests = (batchId) =>
  API.get(`/test/offline/${batchId}`);

export const uploadOfflineResult = (data) =>
  API.post("/test/offline/result/upload", data);

export const getOfflineResults = (batchId, email) =>
  API.get(`/test/offline/results/${batchId}/${encodeURIComponent(email)}`);

export const getOfflineLeaderboard = (batchId) =>
  API.get(`/test/offline/leaderboard/${batchId}`);


export const getAllOnlineResults = (batchId) =>
  API.get(`/test/online/all-results/${batchId}`);