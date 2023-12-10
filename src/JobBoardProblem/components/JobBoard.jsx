import React from 'react';
import { JobTitle } from './JobTitle';

export const JobBoard = ({ jobsData = [] }) => {
	return jobsData.map((job) => {
		const date = new Date(job?.time);
		return (
			<div className="parent" key={job.id}>
				<JobTitle
					job={job}
					as={job.hasOwnProperty('url') ? 'a' : 'h4'}
					href={job.hasOwnProperty('url') ? job?.url : undefined}
				/>
				<div className="child">
					<h6>{`By ${job?.by}`}</h6>
					<h6>{date.toDateString()}</h6>
				</div>
			</div>
		);
	});
};
