import axios, { AxiosResponse } from "axios";
import { backend } from "../shared/constants";
import INote from "../shared/interfaces/INote";

const notesRoute: string = `${backend}/notes`;

const getNotes = (): Promise<INote[]> => {
  const request = axios.get<INote[]>(notesRoute);
  return request.then(response => response.data);
};

const createNote = (note: INote): Promise<INote> => {
  const request = axios.post<INote>(notesRoute, note);
  return request.then(response => response.data);
};

const updateNote = (id: number, note: INote): Promise<INote> => {
  let request = axios.put(`${notesRoute}/${id}`, note);
  return request.then(response => response.data);
};

export default {
  getNotes,
  createNote,
  updateNote
};