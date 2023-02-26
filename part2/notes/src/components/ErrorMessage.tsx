import React from "react";

const ErrorMessage = (props: { message: string | null }): JSX.Element => (
  <>
    {props.message ? (
      <div className="error">
        {props.message}
      </div>
    ) : null}
  </>
);

export default ErrorMessage;