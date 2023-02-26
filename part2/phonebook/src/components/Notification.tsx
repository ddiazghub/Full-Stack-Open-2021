import React from "react";
import NotificationType from "../shared/enums/NotificationType";
import INotification from "../shared/interfaces/INotification";

const Notification = (props: { message?: string, type?: NotificationType }): JSX.Element | null => {
  if (props.message !== undefined && props.type !== undefined) {
    return (
      <div className={props.type === NotificationType.MESSAGE ? "message" : "error"}>
        {props.message}
      </div>
    );
  }

  return null;
};

export default Notification;