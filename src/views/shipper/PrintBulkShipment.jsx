import React, { useState, useEffect } from 'react';
import Container from '../../components/Containers/ListingContainer';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loading from '../../components/Loading/Loading';
import { getPendingTrackingNumberApi } from '../../Api/shipperApi';

export default function PrintBulkShipment(props) {
	const { register, errors, handleSubmit } = useForm();
	const [response, setresponse] = useState({ loading: true });

	useEffect(() => {
		getPendingTrackingNumberApi()
			.then((res) => {
				if (res.length === 0) {
					toast.info('No Tracking Numbers found');
				}
				setresponse({ loading: false, data: res });
			})
			.catch((err) => {
				toast.error(err.message);
			});
	}, []);

	console.log(response);
	const onSubmit = async (data) => {
		setresponse({ ...response, link: undefined });
		await axios
			.post(`${process.env.REACT_APP_API}/order/print-bulk-shipments/`, {
				...data,
			})
			.then((res) => {
				if (res.status === 200) {
					setresponse({ ...response, link: res.data.data });
				} else {
					toast.error('Internal Server Error 500');
				}
			})
			.catch((err) => {
				window.alert(err.message);
			});
	};

	return response.loading ? (
		<Loading />
	) : (
		<Container>
			<div className="card-header">
				<h2>Print Bulk Shipment</h2>
			</div>
			<div className="card-body">
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="form-row mb-3">
						<div className="col">
							<label htmlFor="sarokhWarehouseId">Start Tracking Number</label>
							<select
								className="form-control"
								name="startTrackingNumber"
								defaultValue={'true'}
								ref={register({
									required: true,
									validate: (value) => value !== 'true',
								})}
							>
								<option key={12345} value="true">
									--- Select Start Tracking Number ---
								</option>
								{response.data.map((doc, i) => {
									return (
										<option key={i} value={doc.id}>
											{doc.id}
										</option>
									);
								})}
							</select>
							<span style={{ color: 'red' }}>
								{' '}
								{errors.startTrackingNo && 'this field is required *'}
							</span>
						</div>
						<div className="col">
							<label htmlFor="sarokhWarehouseId">End Tracking Number</label>
							<select
								className="form-control"
								name="endTrackingNumber"
								defaultValue={'true'}
								ref={register({
									required: true,
									validate: (value) => value !== 'true',
								})}
							>
								<option key={12345} value="true">
									--- Select End Tracking Number ---
								</option>
								{response.data.map((doc, i) => {
									return (
										<option key={i} value={doc.id}>
											{doc.id}
										</option>
									);
								})}
							</select>
							<span style={{ color: 'red' }}>
								{' '}
								{errors.EndTrackingNo && 'this field is required *'}
							</span>
						</div>
					</div>
					<div className="form-row float-right">
						<button className="btn btn-success" type="submit">
							Print Shipment
						</button>
					</div>
					<div className="clearfix"></div>
					{response.link === undefined ? null : (
						<div style={{ textAlign: 'center' }}>
							<a
								style={{ fontWeight: 'bold', fontSize: '18px' }}
								href={response.link}
								download={true}
							>
								Download File
							</a>
						</div>
					)}
				</form>
			</div>
		</Container>
	);
}
