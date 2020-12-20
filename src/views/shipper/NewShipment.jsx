import React from 'react';
import { useHistory, Route, Switch } from 'react-router-dom';
import AllShipments from './AllShipments';
import Step1 from '../../components/ShipperComponents/NewShipmentSteps/Step1';
import Step2 from '../../components/ShipperComponents/NewShipmentSteps/Step2';
import Step3 from '../../components/ShipperComponents/NewShipmentSteps/Step3';
import Container from '../../components/Containers/ListingContainer';
import { RecoilRoot } from 'recoil';

export default function NewShipment(props) {
	return (
		<Switch>
			<Container>
				<div className="card-header">
					<h2>New Shipment</h2>
				</div>
				<div className="card-body">
					<Route exact path="/shipper/newshipment/step1">
						<Step1 />
					</Route>
					<Route exact path="/shipper/newshipment/step2">
						<Step2 />
					</Route>
					<Route exact path="/shipper/newshipment/step3">
						<Step3 />
					</Route>
				</div>
			</Container>
		</Switch>
	);
}
