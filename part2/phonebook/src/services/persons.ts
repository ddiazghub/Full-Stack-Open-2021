import axios from "axios";
import IPerson from "../shared/interfaces/IPerson";

const personsRoute: string = "http://localhost:3001/persons";

const getPersons = (): Promise<IPerson[]> => {
  const request = axios.get<IPerson[]>(personsRoute);
  return request.then(response => response.data);
};

const createPerson = (person: IPerson): Promise<IPerson> => {
  const request = axios.post<IPerson>(personsRoute, person);
  return request.then(response => response.data);
};

const deletePerson = (id: number): Promise<number> => {
  const request = axios.delete(`${personsRoute}/${id}`);
  return request.then(() => id);
};

const updatePerson = (person: IPerson): Promise<IPerson> => {
  const request = axios.put<IPerson>(`${personsRoute}/${person.id}`, person);
  return request.then(response => response.data);
}

export default {
  getPersons,
  createPerson,
  deletePerson,
  updatePerson
};