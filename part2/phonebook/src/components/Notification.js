import React from "react";

const Notification = ({notifications}) => {
  if (notifications.length === 0) {
    return null;
  }

  return (
    <div>
      {notifications.map((n, i) => (
        <div className="notification" style={{ backgroundColor: n.color }} key={i}>
          {n.message}
        </div>
      ))}
    </div>
  );
};
export default Notification;
