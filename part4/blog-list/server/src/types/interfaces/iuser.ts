import IBlog from "./iblog";

export default interface IUser {
    id?: string,
    name?: string,
    username: string,
    password?: string,
    passwordHash?: string,
    blogs: Array<IBlog | string>
}