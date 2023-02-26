import express, { Application, Request, Response } from "express";
import { haveTheSameType } from "./shared/helpers";
import INote from "./shared/interfaces/INote";

const app: Application = express();
const PORT = 3001;

app.use(express.json());

const requestBody: INote = {
  content: "idk",
  important: false
};

let notes: INote[] = [];

const generateId = (): number => {
  return (notes.length > 0 ? Math.max(...notes.map(note => note.id as number)) : 0) + 1;
};

app.get("/", (req: Request, res: Response) => {
  console.log("GET /");
  return res.send("<h1>Hello World!</h1>");
});

app.get("/api/notes", (req: Request, res: Response) => {
  console.log("GET /api/notes");
  return res.json(notes);
});

app.get("/api/notes/:id", (req: Request, res: Response) => {
  const id: number = Number(req.params.id);
  
  if (!isNaN(id) && Number.isInteger(id)) {
    const note: INote | undefined = notes.find(note => note.id === id);

    if (note) {
      
      console.log(`GET /api/notes/${id}`);
      return res.json(note);
    }
  }

  res.sendStatus(404);
});

app.post("/api/notes", (req: Request, res: Response) => {
  if (!haveTheSameType<INote>(requestBody, req.body)) {
    return res.sendStatus(400);
  };

  const note: INote = {
    ...req.body,
    id: generateId(),
    date: new Date()
  };

  notes.push(note);
  return res.json(note);
});

app.delete("/api/notes/:id", (req: Request, res: Response) => {
  const id: number = Number(req.params.id);
  
  if (!isNaN(id) && Number.isInteger(id)) {
    notes = notes.filter(note => note.id !== id);
    return res.sendStatus(204);
  }

  return res.sendStatus(404);
});

app.put("/api/notes/:id", (req: Request, res: Response) => {
  const id: number = Number(req.params.id);
  
  if (!isNaN(id) && Number.isInteger(id)) {
    if (!haveTheSameType<INote>(requestBody, req.body)) {
      return res.sendStatus(400);
    };
    
    const note: INote = {
      ...req.body,
      id: generateId(),
      date: new Date()
    };

    notes.map(savedNote => savedNote.id === note.id ? note : savedNote);
    return res.json(note);
  }

  return res.sendStatus(404);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});