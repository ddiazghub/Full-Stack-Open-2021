import NotificationType from "../enums/NotificationType";

export default interface INotification {
  message: string,
  type: NotificationType
}