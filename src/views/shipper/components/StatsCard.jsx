import React from 'react';

export const StatsCard = ({ response }) => {

    const stats = [
        {
          title: "Total Earning",
          value: "SAR " + response.totalEarning + " /-",
          iconClass: "fa fa-dollar-sign font40",
        },
        {
          title: "Completed Orders",
          value: response.completedOrders,
          iconClass: "fas fa-dolly-flatbed font40",
        },
        {
          title: "Pending Delivery Charges",
          value: "SAR " + response.pendingDeliveryCharges + " /-",
          iconClass: "fa fa-money-bill font40",
        },
        {
          title: "Pending COD",
          value: "SAR " + response.pendingCOD + " /-",
          iconClass: "fa fa-money-bill font40",
        },
        {
          title: "Total Orders",
          value: response.totalOrders,
          iconClass: "fas fa-dolly-flatbed font40",
        },
        {
          title: "Pending Orders (pickups)",
          value: response.pendingOrders,
          iconClass: "fas fa-dolly-flatbed font40",
        },
        {
          title: "Return Orders",
          value: response.returnOrders,
          iconClass: "fas fa-dolly-flatbed font40",
        },
        {
          title: "Order Pending Deliveries",
          value: response.ordersPendingDeliveries,
          iconClass: "fas fa-dolly-flatbed font40",
        },
        {
          title: "Active Shipment issues",
          value: response.activeShipmentIssues,
          iconClass: "fa fa-exclamation-circle font40",
        },
      ];

  return (
    <div className="row">
      <div className="col-md-6 ">
        <div className="row mt-2">
          {stats.map((doc, i) => {
            return (
              <div key={i} className="flex-row col-md-6">
                <div className="thumnail-box">
                  <div className="icon color-default fs-26 mr-10 float-left">
                    <i className={doc.iconClass} />
                  </div>
                  <div className="float-left">
                    <p>
                      <span className="font20">{doc.value}</span>
                      <br />
                      {doc.title}
                    </p>
                  </div>
                  <div className="clearfix" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
      <div className="col-md-6">
        <h4>Account Users</h4>
        <div className="profile__avatar-small">
          <img src="../../../../../assets/img/avatar-png-icon-6.png" />
        </div>
        <div className="profile__avatar_small_addnew">
          <a>
            <i className="fa fa-user-plus" aria-hidden="true" />
          </a>
        </div>
        <div className="profile__avatar_small_addnew marginleft10">
          <a>
            <i className="fas fa-users" aria-hidden="true" />
          </a>
        </div>
        <div></div>
      </div>
    </div>
  );
};