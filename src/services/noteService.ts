import axios from "axios";
import type { AxiosResponse } from "axios";

import type { Note, NoteTag } from "../types/note";

const BASE_URL = "https://notehub-public.goit.study/api";

const token = import.meta.env.VITE_NOTEHUB_TOKEN;

if (!token) {
  throw new Error("VITE_NOTEHUB_TOKEN is not defined");
}

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

/* ---------- TYPES ---------- */

export interface FetchNotesParams {
  page: number;
  perPage: number;
  search?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface CreateNoteParams {
  title: string;
  content?: string;
  tag: NoteTag;
}

export interface DeleteNoteResponse {
  note: Note;
}

/* ---------- API ---------- */

export const fetchNotes = async ({
  page,
  perPage,
  search,
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const response: AxiosResponse<FetchNotesResponse> = await api.get("/notes", {
    params: {
      page,
      perPage,
      search,
    },
  });

  return response.data;
};

export const createNote = async (data: CreateNoteParams): Promise<Note> => {
  const response: AxiosResponse<Note> = await api.post("/notes", data);
  return response.data;
};

export const deleteNote = async (id: string): Promise<DeleteNoteResponse> => {
  const response: AxiosResponse<DeleteNoteResponse> = await api.delete(
    `/notes/${id}`
  );

  return response.data;
};
