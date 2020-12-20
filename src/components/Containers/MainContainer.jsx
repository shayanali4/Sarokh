import React from "react";

export default function MainContainer(props) {
  return (
    <div className="container-fluid " style={{ zoom: "87%" }}>
      <div className="card card-accent-primary borderradius40 margintop30 custom-margin">
        <div className="panel-body">
          <div className="row">{props.children}</div>
        </div>
      </div>
    </div>
  );
}
