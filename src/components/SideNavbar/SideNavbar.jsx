import React, { useEffect } from 'react';
import TopNav from '../TopNav/TopNav';
import Footer from '../Footer/Footer';
import { NavLink, Link } from 'react-router-dom';

function NavBar(props) {
	useEffect(() => {
		const trees = window.$('[data-widget="treeview"]');
		trees.Treeview('init');
	}, []);
	return (
		<div className="hold-transition sidebar-mini layout-fixed">
			<div className="wrapper">
				<TopNav links={props.links} />

				<aside className="main-sidebar sidebar-dark-primary elevation-4">
					<Link to={props.redirect} className="brand-link">
						<img
							src="http://app.sarokh.net/web/assets/img/brand/sarokh-logo.png"
							alt="AdminLTE Logo"
							style={{
								opacity: '.8',
								lineHeight: '.8',
								marginLeft: '4.8rem',
								marginRight: '.5rem',
								marginTop: '7px',
								maxHeight: '44px',
							}}
						/>
					</Link>

					<div className="sidebar">
						<nav className="mt-2">
							<ul
								className="nav nav-pills nav-sidebar flex-column"
								data-widget="treeview"
								role="menu"
								data-accordion="false"
							>
								<NavigationLinks routes={props.routes} />
							</ul>
						</nav>
					</div>
				</aside>

				<div className="content-wrapper">{props.children}</div>

				<Footer />
			</div>
		</div>
	);
}

const NavigationLinks = ({ routes }) => {
	return (
		<>
			{' '}
			{routes.map((doc, j) => {
				if (doc.subRoutes === undefined) {
					return (
						<li key={j} className="nav-item">
							<NavLink
								to={doc.to}
								className="nav-link"
								activeClassName="active"
							>
								<i className={doc.iconClass} />
								<p>{doc.name}</p>
							</NavLink>
						</li>
					);
				} else {
					return (
						<li key={j} className="nav-item has-treeview">
							<NavLink
								to={doc.to}
								className="nav-link"
								activeClassName="active"
							>
								<i className={doc.iconClass} />
								<p>
									{doc.name}
									<i className="fas fa-angle-left right" />
								</p>
							</NavLink>
							<ul className="nav nav-treeview">
								{doc.subRoutes.map((doc, i) => {
									return (
										<li key={i} className="nav-item">
											<NavLink
												to={doc.to}
												className="nav-link"
												activeClassName="active"
											>
												<i className={doc.iconClass} />
												<p>{doc.name}</p>
											</NavLink>
										</li>
									);
								})}
							</ul>
						</li>
					);
				}
			})}
		</>
	);
};

export default NavBar;
