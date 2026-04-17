import apiClient from './apiClient';
import { Report } from '../types/report.types';

export const getReports = () => {
  return apiClient.get<Report[]>('/reports');
};

export const getReportById = (id: string | number) => {
  return apiClient.get<Report>(`/reports/${id}`);
};

export const createReport = (reportData: Omit<Report, 'id'>) => {
  return apiClient.post<Report>('/reports', reportData);
};

export const updateReport = (id: number | string, reportData: Partial<Report>) => {
  return apiClient.put<Report>(`/reports/${id}`, reportData);
};

export const deleteReport = (id: number | string) => {
  return apiClient.delete(`/reports/${id}`);
};

export const getReportTtps = (reportId: string | number) => {
  return apiClient.get<import('../types/ttp.types').TTP[]>(`/reports/${reportId}/ttps`);
};

export const linkTtpToReport = (reportId: string | number, ttpId: number) => {
  return apiClient.post(`/reports/${reportId}/ttps`, { ttp_id: ttpId });
};

export const unlinkTtpFromReport = (reportId: string | number, ttpId: number) => {
  return apiClient.delete(`/reports/${reportId}/ttps/${ttpId}`);
};
