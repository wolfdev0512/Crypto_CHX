import axios from "axios";
import { IAdminDashboard } from "../constants/types";

// const API = axios.create({ baseURL: "http://localhost:4001/api" });
const API = axios.create({
  baseURL: "http://ec2-3-109-203-159.ap-south-1.compute.amazonaws.com:4001/api",
});

const multipartConfig = { headers: { "Content-Type": "multipart/form-data" } };

export const getDashboardApi = () =>
  API.get<{ data: IAdminDashboard }>("/dashboard");
export const updateDashboardAPi = (formData) =>
  API.patch<{ data: IAdminDashboard }>(`/dashboard`, formData, {
    headers: {
      "Access-Control-Allow-Origin": true,
    },
  });

export const updateWhitePaper = (formData) =>
  API.patch<{ data: IAdminDashboard }>(
    `/dashboard/whitepaper`,
    formData,
    multipartConfig
  );
export const deleteWhitePaper = () =>
  API.delete<{ data: IAdminDashboard }>(`/dashboard/whitepaper`);

// FAQS API

export const getAllFaqs = () => API.get("/faqs");
export const createFaq = (formData) => API.post("/faqs/create", formData);
export const updateFaq = (id: string, formData) =>
  API.patch(`/faqs/${id}`, formData);
export const deleteFaq = (id: string) => API.delete(`/faqs/${id}`);

// VIDEOS API

export const getAllVideos = () => API.get("/video");
export const createVideo = (formData) =>
  API.post("/video/create", formData, multipartConfig);
export const updateVideo = (id: string, formData) =>
  API.patch(`/video/${id}`, formData, multipartConfig);
export const deleteVideo = (id: string) => API.delete(`/video/${id}`);

// TEAMS API

export const getAllTeams = () => API.get("/teams");
export const createTeam = (formData) => API.post("/teams/create", formData);
export const updateTeam = (id: string, formData) =>
  API.patch(`/teams/${id}`, formData);
export const deleteTeam = (id: string) => API.delete(`/teams/${id}`);
