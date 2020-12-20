import React from "react";

export default function ListingContainer(props) {
  return (
    <div className="container-fluid " style={{ zoom: "92%" }}>
      <div className="card card-accent-primary borderradius40 margintop30 custom-margin">
        <div>
          <div>{props.children}</div>
        </div>
      </div>
    </div>
  );
}
