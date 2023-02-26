import React from "react";
import NotificationType from "../utils/enums/NotificationType";

const Notification = (props: { message?: string, type?: NotificationType }): JSX.Element | null => {
  if (props.message !== undefined && props.type !== undefined) {
    return (
      <div className={props.type === NotificationType.SUCCESS ? "success" : "error"}>
        {props.message}
      </div>
    );
  }

  return null;
};

export default Notification;