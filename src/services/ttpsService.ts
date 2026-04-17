import apiClient from './apiClient';
import { TTP } from '../types/ttp.types';

export const getTtps = () => {
  return apiClient.get<TTP[]>('/ttps');
};

export const getTtpById = (id: string | number) => {
  return apiClient.get<TTP>(`/ttps/${id}`);
};

export const createTtp = (ttpData: Omit<TTP, 'id'>) => {
  return apiClient.post<TTP>('/ttps', ttpData);
};

export const updateTtp = (id: number | string, ttpData: Partial<TTP>) => {
  return apiClient.put<TTP>(`/ttps/${id}`, ttpData);
};

export const deleteTtp = (id: number | string) => {
  return apiClient.delete(`/ttps/${id}`);
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
