import NotificationType from "../enums/NotificationType";

export default interface INotification {
  type: NotificationType,
  message: string
}