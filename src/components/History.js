import React from 'react';
import PropTypes from 'prop-types';

function History(props) {	
	return (
		<>
			<h4>History</h4>
			<table className="table table-striped">
				<thead>
					<tr>
						<th>Input</th>
						<th>Rotation</th>
						<th>Result</th>
					</tr>
				</thead>
				<tbody>
					{props.history.map((record, i) => {
						return (
							<tr key={i}>
								<td>{record.before}</td>
								<td>{record.rotation}</td>
								<td>{record.after}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</>
	)
}

History.propTypes = {
	history: PropTypes.arrayOf(PropTypes.shape({
		before: PropTypes.string,
		rotation: PropTypes.number,
		after: PropTypes.string,
	})),
};

export default History;