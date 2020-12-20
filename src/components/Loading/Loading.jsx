import React from 'react';

export default function Loading({ marginTop = '25%' }) {
	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				marginTop: marginTop,
			}}
		>
			<div
				className="spinner-border"
				style={{ width: '4rem', height: '4rem' }}
			></div>
		</div>
	);
}
