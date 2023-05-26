import React from 'react';
import { getPagesArray } from '../../utils.js';
import './style.css'

export const Pagination = ({ totalPages, changePage }) => {
	const pagesArray = getPagesArray(totalPages);
  // const currentPage = pagesArray.indexOf(changePage);


	return (
		<div>
			{pagesArray.map((number) => (
				<button className="pagination-btn" key={number} onClick={() => changePage(number)}>{number}</button>
			))}
		</div>
	);
};
