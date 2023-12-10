import React from 'react';
import { JobBoard } from './JobBoardProblem/components/JobBoard';
import {
	ID_BASE_URL,
	INDIVIDUAL_DATA_URL,
	ITEMS_PER_PAGE,
} from './JobBoardProblem/constants/constants';

function App() {
	const [jobsData, setJobsData] = React.useState([]);
	const [currentPage, setCurrentPage] = React.useState(0);
	const [isLoader, setIsLoader] = React.useState(false);

	React.useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		const response = await fetch(`${ID_BASE_URL}`);
		const data = await response.json();

		const itemsData = data.map(async (item) => {
			const res = await fetch(`${INDIVIDUAL_DATA_URL}${item}.json`);
			return res.json();
		});
		const jobsData = await Promise.all(itemsData);
		setJobsData([...jobsData]);
	};

	return (
		<div className="App">
			<h2 className="parent-heading">Hacker News Jobs Board</h2>
			<JobBoard
				jobsData={jobsData.slice(
					0,
					ITEMS_PER_PAGE + currentPage * ITEMS_PER_PAGE
				)}
			/>
			{Math.floor(jobsData.length / currentPage) >= ITEMS_PER_PAGE && (
				<button
					className="btn"
					onClick={() => {
						setIsLoader(true);

						setTimeout(() => {
							setCurrentPage((prev) => prev + 1);
							setIsLoader(false);
						}, 2000);
					}}
				>
					{isLoader ? '.....Loading' : 'Load More Jobs'}
				</button>
			)}
		</div>
	);
}

export default App;
