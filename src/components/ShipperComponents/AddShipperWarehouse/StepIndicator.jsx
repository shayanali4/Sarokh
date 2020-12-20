import React from 'react';

export default function StepIndicator({
	step1 = '',
	step2 = '',
	step3 = '',
	step4 = '',
	type = 'Shipper',
}) {
	if (type === 'Shipper') {
		return (
			<div className="horizontal small">
				<ul className="steps-indicator steps-3">
					<li className={step1}>
						<a href="#">
							<div className="label">&nbsp;&nbsp;&nbsp;WAREHOUSE ADDRESS</div>
							<div className="step-indicator"></div>
						</a>
					</li>
					<li className={step2}>
						<a href="#">
							<div className="label">&nbsp;&nbsp;&nbsp;WAREHOUSE MANAGER</div>
							<div className="step-indicator"></div>
						</a>
					</li>
					<li className={step3}>
						<a href="#">
							<div className="label">&nbsp;&nbsp;&nbsp;AMENITIES</div>
							<div className="step-indicator"></div>
						</a>
					</li>
				</ul>
			</div>
		);
	} else {
		return (
			<div className="horizontal small">
				<ul className="steps-indicator steps-3">
					<li className={step1}>
						<a href="#">
							<div className="label">&nbsp;&nbsp;&nbsp;WAREHOUSE ADDRESS</div>
							<div className="step-indicator"></div>
						</a>
					</li>
					<li className={step3}>
						<a href="#">
							<div className="label">&nbsp;&nbsp;&nbsp;AMENITIES</div>
							<div className="step-indicator"></div>
						</a>
					</li>
					<li className={step4}>
						<a href="#">
							<div className="label">&nbsp;&nbsp;&nbsp;STORAGE CAPACITY</div>
							<div className="step-indicator"></div>
						</a>
					</li>
				</ul>
			</div>
		);
	}
}
