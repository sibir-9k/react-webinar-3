import React from 'react';
import PropTypes from 'prop-types';
import './style.css'

function Comment(props) {
	return (
		<div className={`Comment ${props.lvl}`}>
			<div className="Comment-header">
				<span className="Comment-user">{props.userName}</span>
				<p className="Comment-date">{props.date}</p>
			</div>
			<div className="Comment-body">
				<p className="Comment-text">
					{props.text}
				</p>
			</div>
			<button className="Comment-reply">Ответить</button>
		</div>
	);
}

Comment.propTypes = {};

export default Comment;
