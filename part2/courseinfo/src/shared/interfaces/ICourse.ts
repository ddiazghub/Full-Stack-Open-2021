import ICoursePart from "./ICoursePart";

export default interface ICourse {
  id: number,
  name: string,
  parts: ICoursePart[]
}