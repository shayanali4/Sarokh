import React from 'react';
import { useHistory, Route, Switch } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import Step1 from '../../components/SignUps/BusinessSignupSteps/Step1';
import Step2 from '../../components/SignUps/BusinessSignupSteps/Step2';
import Step3 from '../../components/SignUps/BusinessSignupSteps/Step3';
import Step4 from '../../components/SignUps/BusinessSignupSteps/Step4';

export default function BusinessSignup(props) {
	return (
		<RecoilRoot>
			<Switch>
				<Route path="/business/signup/step1">
					<Step1 />
				</Route>
				<Route path="/business/signup/step2">
					<Step2 />
				</Route>
				<Route path="/business/signup/step3">
					<Step3 />
				</Route>
				<Route path="/business/signup/step4">
					<Step4 />
				</Route>
			</Switch>
		</RecoilRoot>
	);
}
