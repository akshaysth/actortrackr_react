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

export const deleteActor = (id: number | string) => {
  return apiClient.delete(`/actors/${id}`);
};