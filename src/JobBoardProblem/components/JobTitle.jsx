import React from 'react';

export const JobTitle = ({ as: Tag, job, ...delegated }) => {
	return (
		<div>
			<Tag {...delegated}>{job.title}</Tag>
		</div>
	);
};
