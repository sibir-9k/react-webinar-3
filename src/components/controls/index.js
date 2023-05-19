import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Controls({ store, onOpenModal }) {
	let allCount = store.getSelectedItemCount()
  console.log(allCount)
	return (
		<div className="Controls">
			<div className="Controls-count">
				В корзине: <b>{allCount} товара / ... ₽</b>
			</div>
			<button onClick={() => onOpenModal()}>Перейти</button>
		</div>
	);
}

Controls.propTypes = {
	onOpenModal: PropTypes.func,
};

Controls.defaultProps = {
	onOpenModal: () => {},
};

export default React.memo(Controls);
