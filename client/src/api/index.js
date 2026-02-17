import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5001/api",
  timeout: 8000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const checkInteraction = async (payload) => {
  if (payload.file) {
    const formData = new FormData();
    formData.append("file", payload.file);
    const response = await api.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  }

  const response = await api.post("/check-interaction", payload);
  return response.data;
};

export const askAI = async (question, attachments = []) => {
  const response = await api.post("/ask-ai", { question, attachments });
  return response.data;
};

export default api;

