import React from "react";

const Card = ({ db }) => {
  return (
    <div className="card-container">
      <h2 className="title">{db.name}</h2>
      {db.message ? (
        <>
          <h3 className="message">{db.message}</h3>
          <h3 className="hostname">{db.hostname}</h3>
          <h5 className="time">{db.time}</h5>
        </>
      ) : (
        <>
          <h3 className="err-message">Error</h3>
          <h3 className="err">OUTAGE</h3>
          <h3 className="err">403</h3>
          <h3 className="err">Forbidden</h3>
        </>
      )}
    </div>
  );
};

export default Card;
