import apiClient from "./apiClient.js";

export async function getNodeInfo() {
  const response = await apiClient.get("/node/info");
  return response.data;
}