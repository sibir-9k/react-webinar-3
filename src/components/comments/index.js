import React from 'react';
import PropTypes from 'prop-types';
import Comment from '../comment';
import { useDispatch, useSelector as useSelectorRedux } from 'react-redux';

import './style.css';

function Comments(props) {
	const comments = useSelectorRedux((state) => state.comments.comments);
  console.log(comments)
  
	function handleDate(dateCreate) {
		const dateString = dateCreate;
		const date = new Date(dateString);

		const options = {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: 'numeric',
			minute: 'numeric',
		};
		const formattedDate = date.toLocaleDateString('ru-RU', options);

		return formattedDate;
	}

	return (
		<>
			<div className="Comments">
				<h2 className="Comments-all">Комментарии ({comments.length})</h2>
				{comments.map((comment) => (
					<Comment
						key={comment._id}
						text={comment.text}
						userName={comment.author.profile.name}
						date={handleDate(comment.dateCreate)}
					/>
				))}

				{/* <Comment lvl='lvl-1'/> */}
			</div>
		</>
	);
}

Comments.propTypes = {};

export default Comments;
