import React from "react";

export default function StepIndicator({ step1="", step2="", step3="", step4="" }) {
  return (
    <div className="horizontal small">
      <ul className="steps-indicator steps-3">
        <li className={step1}>
          <a href="#">
            <div className="label">&nbsp;&nbsp;&nbsp;BASIC INFORMATION</div>
            <div className="step-indicator"></div>
          </a>
        </li>
        <li className={step2}>
          <a href="#">
            <div className="label">&nbsp;&nbsp;&nbsp;BUSINESS DETAIL</div>
            <div className="step-indicator"></div>
          </a>
        </li>
        <li className={step3}>
          <a href="#">
            <div className="label">&nbsp;&nbsp;&nbsp;BILLING DETAIL</div>
            <div className="step-indicator"></div>
          </a>
        </li>
        <li className={step4}>
          <a href="#">
            <div className="label">&nbsp;&nbsp;&nbsp;SECURITY</div>
            <div className="step-indicator"></div>
          </a>
        </li>
      </ul>
    </div>
  );
}
