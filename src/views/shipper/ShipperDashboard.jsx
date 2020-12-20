import React, { useState, useEffect } from 'react';
import { StatsCard } from './components/StatsCard';
import { UserBio } from './components/UserBio';
import MainContainer from '../../components/Containers/MainContainer';
import { useTransition, animated } from 'react-spring';
import { dashboardApi } from '../../Api/shipperApi';
import { toast } from 'react-toastify';
import Loading from '../../components/Loading/Loading';

function ShipperDashboard(props) {
	const user = JSON.parse(localStorage.getItem('user'));
	const [response, setresponse] = useState({ loading: true });
	console.log(response);

	useEffect(() => {
		dashboardApi()
			.then((res) => {
				setresponse({ loading: false, data: res });
			})
			.catch((err) => {
				toast.error(err.message);
			});
	}, []);

	const transitions = useTransition(!response.loading, null, {
		from: { opacity: 0, transform: 'translate3d(-290px,0,0)' },
		enter: {
			opacity: 1,
			transform: 'translate3d(0,0px,0)',
			transition: 'ease-out 0.3s',
		},
	});

	return response.loading ? (
		<Loading />
	) : (
		transitions.map(
			({ item, props, key }) =>
				item && (
					<animated.div key={key} style={props}>
						<MainContainer>
							<UserBio data={user} />
							<StatsCard response={response.data} />
						</MainContainer>
					</animated.div>
				)
		)
	);
}

export default React.memo(ShipperDashboard);
