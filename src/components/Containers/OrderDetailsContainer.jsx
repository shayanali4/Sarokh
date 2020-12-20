import React from "react";

export default function OrderDetailsContainer(props) {
  return (
    <div className="container-fluid">
      <div className="custom-margin">
        <div className="order-detail card margintop30 padding15">
          <div id="print-section">{props.children}</div>
        </div>
      </div>
    </div>
  );
}
