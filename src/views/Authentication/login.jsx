import React, { useEffect, Fragment, useRef } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

function Login(props) {
	const hist = useHistory();
	const buttonRef = useRef();

	const onSubmit = async (event) => {
		buttonRef.current.disabled = true;
		event.preventDefault();
		const Form = new FormData(event.target);
		let data = {};
		for (let a of Form.entries()) {
			data[a[0]] = a[1];
		}

		await axios
			.post(
				`http://vps789305.ovh.net:8443/user/login`,
				{
					...data,
				},
				{
					timeout: 20000,
					timeoutErrorMessage: 'No Internet Connection',
				}
			)
			.then(async (response) => {
				if (response.data.status === 401) {
					toast.error('WRONG USERNAME OR PASSWORD');
					buttonRef.current.disabled = false;
				} else {
					await localStorage.setItem(
						'user',
						JSON.stringify(response.data.data)
					);
					const user = await JSON.parse(localStorage.getItem('user'));
					toast.success('LOGIN SUCCESS');
					if (user.user?.userType === 'Shipper') {
						hist.push('/shipper/dashboard');
					} else if (user.user?.userType === 'DealerPoint') {
						hist.push('/dealer/dashboard');
					} else if (user.userType === 'Admin') {
						hist.push('/admin/dashboard');
					} else if (user.userType === 'WarehouseManager') {
						hist.push('/warehousemanager/dashboard');
					}
				}
			})
			.catch((err) => {
				toast.error(err.message);
				buttonRef.current.disabled = false;
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
							<form onSubmit={onSubmit} autoComplete="on">
								<fieldset>
									<h1>Sign In to your account</h1>
									<div className="mb-3">
										<div className="form-group">
											<label>User Name</label>
											<input
												name="username"
												type="text"
												className="form-control"
												formcontrolname="username"
												placeholder="Username"
												autoComplete="username"
												required
											/>
										</div>
									</div>
									<div className="mb-4">
										<div className="form-group">
											<label>Password</label>
											<input
												name="password"
												type="password"
												className="form-control"
												formcontrolname="password"
												placeholder="Password"
												autoComplete="current-password"
												required
											/>
										</div>
									</div>
									<div className="col-12">
										<input
											style={{ marginRight: '5px' }}
											type="checkbox"
											className=" px-0"
										/>
										<label>Remember me</label>
									</div>
									<button
										type="submit"
										className="btn btn-danger px-4 float-right"
										ref={buttonRef}
									>
										Login
									</button>
									<div className="clearfix"></div>
									<div className="col-12">
										<button type="button" className="btn btn-link px-0">
											Forgot password?
										</button>
									</div>
								</fieldset>
							</form>
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
}

export default Login;
