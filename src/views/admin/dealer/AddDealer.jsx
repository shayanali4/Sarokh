import React from 'react';
import { useHistory, Route, Switch } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import Step1 from '../../../components/DealerFormSteps/BasicInformation';
import Step2 from '../../../components/DealerFormSteps/BusinessInformation';
import AllDealers from './AllDealers';

export default function AddDriver(props) {
	const routes = {
		step1: '/admin/dealer/adddealer/step1',
		step2: '/admin/dealer/adddealer/step2',
		alldealers: '/admin/dealer/alldealers',
	};

	/* next in the steps define the next route after the form is submitted on a step. default path is the path that leads to
	the first step in case of refresh or incase the global state data is lost. redirect is the route which leads to the
	path after the final form is submitted */

	/* next prop in the step2 is basically sending all the routes, it needs only step3 and step4 but for cleaner code routes
	object is passed. The logic in the form will decide whether the steps will redirect to step3 or step4, incase of employee
	it will redirect to step4 and incase of freelancer it will redirect to step step3 which is the vechicle detail page */

	return (
		<RecoilRoot>
			<Switch>
				<Route exact path={routes.alldealers}>
					<AllDealers />
				</Route>
				<Route exact path={routes.step1}>
					<Step1 next={routes.step2} />
				</Route>
				<Route exact path={routes.step2}>
					<Step2 next={routes.alldealers} defaultPath={routes.step1} />
				</Route>
			</Switch>
		</RecoilRoot>
	);
}
