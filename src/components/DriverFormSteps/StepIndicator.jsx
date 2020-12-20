import React from 'react';
import { useRecoilValue } from 'recoil';
import { driverData } from './state';

export default function StepIndicator({
	step1 = '',
	step2 = '',
	step3 = '',
	step4 = '',
	step5 = '',
}) {
	const { driverType } = useRecoilValue(driverData);
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
						<div className="label">&nbsp;&nbsp;&nbsp;DRIVER DETAIL</div>
						<div className="step-indicator"></div>
					</a>
				</li>
				{driverType === 'FreeLancer' && (
					<li className={step3}>
						<a href="#">
							<div className="label">&nbsp;&nbsp;&nbsp;VEHICLE DETAIL</div>
							<div className="step-indicator"></div>
						</a>
					</li>
				)}
				<li className={step4}>
					<a href="#">
						<div className="label">
							&nbsp;&nbsp;&nbsp;EMPLOYEE/FREELANCER DETAIL
						</div>
						<div className="step-indicator"></div>
					</a>
				</li>
				<li className={step5}>
					<a href="#">
						<div className="label">&nbsp;&nbsp;&nbsp;CREDENTIALS</div>
						<div className="step-indicator"></div>
					</a>
				</li>
			</ul>
		</div>
	);
}
