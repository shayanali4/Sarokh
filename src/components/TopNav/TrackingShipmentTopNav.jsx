import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { trackingOrderDetail } from '../../views/trackingShipment/state';
import { useRecoilValue } from 'recoil';

import './styles.css';
// import React from 'react';
import { FaInstagram } from 'react-icons/fa';
import { GrTwitter } from 'react-icons/gr'
import { BiMobile } from 'react-icons/bi'
import { HiOutlineChatAlt } from 'react-icons/hi'

function TopNav(props) {
	const data = useRecoilValue(trackingOrderDetail);
	return (
		// <div className="hold-transition sidebar-mini layout-fixed">
		// 	<div className="wrapper whitebg">
		// 		<nav className="main-header tracking-nav navbar navbar-expand navbar-white navbar-light">
		// 			{/* Left navbar links */}
		// 			{data?.order?.deliveryLocationDetail === null ||
		// 			data?.order?.deliveryLocationDetail !== 'To Sarokh Point' ? null : (
		// 				<ul className="navbar-nav">
		// 					<Fragment>
		// 						<li className="nav-item">
		// 							<NavLink
		// 								to="/tracking/addaddress"
		// 								className="nav-link"
		// 								activeClassName="active"
		// 							>
		// 								Last Mile
		// 							</NavLink>
		// 						</li>
		// 						<li className="nav-item">
		// 							<NavLink
		// 								to="/tracking/addarea"
		// 								className="nav-link"
		// 								activeClassName="active"
		// 							>
		// 								Select Point
		// 							</NavLink>
		// 						</li>
		// 					</Fragment>
		// 				</ul>
		// 			)}
		// 		</nav>
		<div>
		 					<div className="right">
						<div className="middle">
							<div>  &ensp;&ensp;    Bringing e-commerce to you</div>
							<div  className="fonts1"> &ensp;  <GrTwitter/> &ensp;  <FaInstagram /> <br/> </div>
						</div>
						<div className="contact">Call Us Today : 920033995</div>
					</div>
					<div className="logo1">
						<div>
							<img src="/logo.png" className="logopng" alt="" />
						</div>
						<div></div>
						<div></div>
						<div></div>
						<div className="first1">
							<div className="circle"><BiMobile style={{fontSize:"20px"}} /></div>
							<div className="callus">
								Call us 
								<p>03000</p>
							</div>
						</div>
						<div className="second1">
							<div className="circle">
								<HiOutlineChatAlt style={{ fontSize: "20px" }} />
							</div>
							<div className="callus">
								Contact Us
								<p>inf0@yahoo.com</p>
							</div>
						</div>
					</div>

				<div className="content-wrapper tracking-nav ">{props.children}</div>
		</div>
		// 	</div>
		// </div>
	);
}

export default TopNav;
