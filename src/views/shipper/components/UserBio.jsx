import React from 'react';

export const UserBio = ({ data }) => {
    return (
      <>
       <div className="col-sm-12">
        <div className="profile__header">
          <h4 className=" float-left">{data.user.fullName}</h4>
          <div className="clearfix" />
        </div>

        <div className="float-left mt-2">
          <div>
            <div className="float-left mt-2">
              <div className="icon color-default fs-20 mr-10 float-left">
                <i className="fa fa-user" />
              </div>
              <div style={{ display: "inline-block", marginRight: 30 }}>
                <p>{data.firstName}</p>
              </div>
            </div>
            <div className="float-left mt-2">
              <div className="icon color-default fs-20 mr-10 float-left">
                <i className="fa fa-envelope" />
              </div>
              <div style={{ display: "inline-block", marginRight: 30 }}>
                <p>{data.user.email}</p>
              </div>
            </div>
            <div className="float-left mt-2">
              <div className="icon color-default fs-20 mr-10 float-left">
                <i className="fa fa-mobile" />
              </div>
              <div style={{ display: "inline-block", marginRight: 30 }}>
                <p>{data.user.contact}</p>
              </div>
            </div>
          </div>
        </div>
        </div>
      </>
    );
  };