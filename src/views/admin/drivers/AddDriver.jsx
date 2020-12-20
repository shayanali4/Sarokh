import React from 'react';
import { useHistory, Route, Switch } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import Step1 from '../../../components/DriverFormSteps/BasicInformation';
import Step2 from '../../../components/DriverFormSteps/DriverDetail';
import Step3 from '../../../components/DriverFormSteps/VehicleDetail';
import Step4 from '../../../components/DriverFormSteps/DriverAccount';
import Step5 from '../../../components/DriverFormSteps/Credentials';
import AllDrivers from './AllDrivers';

export default function AddDriver(props) {
	const routes = {
		step1: '/admin/drivers/adddriver/step1',
		step2: '/admin/drivers/adddriver/step2',
		step3: '/admin/drivers/adddriver/step3',
		step4: '/admin/drivers/adddriver/step4',
		step5: '/admin/drivers/adddriver/step5',
		alldrivers: '/admin/drivers/alldrivers',
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
				<Route exact path={routes.alldrivers}>
					<AllDrivers />
				</Route>
				<Route exact path={routes.step1}>
					<Step1 next={routes.step2} />
				</Route>
				<Route exact path={routes.step2}>
					<Step2 next={routes} defaultPath={routes.step1} />
				</Route>
				<Route exact path={routes.step3}>
					<Step3 next={routes.step4} defaultPath={routes.step1} />
				</Route>
				<Route exact path={routes.step4}>
					<Step4 next={routes.step5} defaultPath={routes.step1} />
				</Route>
				<Route exact path={routes.step5}>
					<Step5 next={routes.alldrivers} defaultPath={routes.step1} />
				</Route>
			</Switch>
		</RecoilRoot>
	);
}
