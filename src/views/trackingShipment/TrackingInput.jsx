import React, { useEffect, Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { searchOrderApi } from '../../Api/trackingApi';
import { trackingOrderDetail } from './state';
import { useRecoilState } from 'recoil';

export default function TrackingInput(props) {
	const hist = useHistory();
	const [data, setData] = useRecoilState(trackingOrderDetail);
	const { register, errors, handleSubmit } = useForm({
		defaultValues: {},
		shouldFocusError: true,
		mode: 'onChange',
		criteriaMode: 'all',
	});

	const onSubmit = (formData) => {
		searchOrderApi(formData)
			.then((res) => {
				console.log(res);
				setData(res);
				toast.success('Success');
				hist.push('/tracking/details');
			})
			.catch((err) => {
				toast.error(err.message);
			});
	};

	return (
		<Fragment>
			<div className="limiter">
				<div className="container-login100">
					<div className="col-md-8 p-0">
						<div className="wrap-login100">
							<img src={require('../../assets/images/logo.png')} />
						</div>
					</div>
					<div className="col-md-4 p-0 brownbg">
						<div className="login100-more">
							<form onSubmit={handleSubmit(onSubmit)}>
								<fieldset>
									<div className="mb-3">
										<div className="form-group">
											<label htmlFor="1">Enter Tracking Number</label>
											<input
												id="1"
												name="trackingNumber"
												type="number"
												className="form-control"
												formcontrolname="username"
												placeholder="Enter Tracking Number"
												ref={register}
											/>
										</div>
										<div className="form-group">
											<label htmlFor="2">Enter Pin Code</label>
											<input
												id="2"
												name="otp"
												type="number"
												className="form-control"
												formcontrolname="username"
												placeholder="PIN CODE"
												ref={register}
											/>
										</div>
									</div>
									<button
										type="submit"
										className="btn btn-danger px-4 float-right"
									>
										Search
									</button>
									<div className="clearfix"></div>
								</fieldset>
							</form>
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
}
