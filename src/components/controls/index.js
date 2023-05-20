import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Controls({ store, onOpenModal }) {
	let allCount = store.getSelectedItemCount();
	let allPrice = store.getPrice();
	let formattedAllPrice = allPrice.toLocaleString('en-US').replace(/,/g, ' ');

	return (
		<div className="Controls">
			<div className="Controls-count">
        В корзине: {allCount > 0 ? <b>{allCount} товара / {formattedAllPrice} ₽</b> : <b>пусто</b>}
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
