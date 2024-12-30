import axios from "axios";

// const baseApi = "http://localhost:5000/api/v1/";
const baseApi = "https://backend-lemon-mu-74.vercel.app/api/v1";

export const createInteraction = async (payload) => {
  try {
    const response = await axios.post(`${baseApi}/addClients`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("🚀response --->", response);
    return response.data;
  } catch (error) {
    return error.response?.data || error.message;
  }
};

export const getInteraction = async () => {
  try {
    const response = await axios.get(`${baseApi}/getClients`);
    console.log("🚀response --->", response);
    return response.data;
  } catch (error) {
    return error.response?.data || error.message;
  }
};
