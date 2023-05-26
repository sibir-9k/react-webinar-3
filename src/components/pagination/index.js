import React from 'react';
import { getPagesArray } from '../../utils.js';
import './style.css';

export const Pagination = ({ totalPages, changePage, currentPage }) => {
	const pagesArray = getPagesArray(totalPages, currentPage);

	return (
		<div className='pagination'>
			{pagesArray.map((number,i) => (
				<button
        className={number === "..." ? "pagination-ellipsis" : `pagination-btn${number === currentPage ? " active" : ""}`}
					key={i}
					onClick={() => changePage(number)}>
					 {number === "..." ? "..." : number + 1}
				</button>
			))}
		</div>
	);
};
