import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

function TopNav(props) {
	return (
		<nav className="main-header navbar navbar-expand navbar-white navbar-light">
			{/* Left navbar links */}
			<ul className="navbar-nav">
				<li className="nav-item">
					<a className="nav-link" data-widget="pushmenu" role="button">
						<i className="fas fa-bars" />
					</a>
				</li>
				{props.links === 'shipper' ? (
					<Fragment>
						<li className="nav-item d-none d-sm-inline-block">
							<Link to="/shipper/printwaybill" className="nav-link">
								Print Way Bill
							</Link>
						</li>
						<li className="nav-item d-none d-sm-inline-block">
							<Link to="/shipper/newshipment/step1" className="nav-link">
								New Shipment
							</Link>
						</li>
						<li className="nav-item d-none d-sm-inline-block">
							<Link to="/shipper/bulkshipmentupload" className="nav-link">
								Bulk Shipment Upload
							</Link>
						</li>
						<li className="nav-item d-none d-sm-inline-block">
							<Link to="/shipper/printbulkshipment" className="nav-link">
								Print Bulk Shipment
							</Link>
						</li>
					</Fragment>
				) : null}
			</ul>

			{/* Right navbar links */}
			<ul className="navbar-nav ml-auto">
				{/* Notifications Dropdown Menu */}
				<li className="nav-item dropdown">
					<a className="nav-link" data-toggle="dropdown" href="#">
						<i className="far fa-user" />
					</a>
					<div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
						<div className="dropdown-divider" />
						<a href="#" className="dropdown-item">
							<i className="far fa-user mr-2" /> Profile
						</a>
						<div className="dropdown-divider" />
						<Link to="/logout" className="dropdown-item">
							<i className="fas fa-users mr-2" /> Logout
						</Link>
					</div>
				</li>
			</ul>
		</nav>
	);
}

export default TopNav;
