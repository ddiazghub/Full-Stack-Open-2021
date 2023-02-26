import IUser from "./iuser"

export default interface IBlog {
    id?: string,
    title: string,
    author: string,
    user: string | IUser,
    url?: string,
    likes: number
}