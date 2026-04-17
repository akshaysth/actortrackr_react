import apiClient from './apiClient';
import { Actor } from '../types/actor.types';

// The data is wrapped in an AxiosResponse, so we type that
export const getActors = () => {
  return apiClient.get<Actor[]>('/actors');
};

export const getActorById = (id: string | number) => {
  return apiClient.get<Actor>(`/actors/${id}`);
};

export const createActor = (actorData: Omit<Actor, 'id'>) => {
  return apiClient.post<Actor>('/actors', actorData);
};

export const updateActor = (id: number | string, actorData: Partial<Actor>) => {
  return apiClient.put<Actor>(`/actors/${id}`, actorData);
};

export const deleteActor = (id: number | string) => {
  return apiClient.delete(`/actors/${id}`);
};

export const getActorReports = (actorId: string | number) => {
  return apiClient.get<import('../types/report.types').Report[]>(`/actors/${actorId}/reports`);
};

export const linkReportToActor = (actorId: string | number, reportId: number) => {
  return apiClient.post(`/actors/${actorId}/reports`, { report_id: reportId });
};

export const unlinkReportFromActor = (actorId: string | number, reportId: number) => {
  return apiClient.delete(`/actors/${actorId}/reports/${reportId}`);
};