import React, { useState } from 'react';
import PropTypes from "prop-types";
import './style.css';

function Modal({ active }) {
	return (
		<section className={`Modal ${active ? 'open' : ''}`}>
			<div className="Modal-box">
				<div className="Modal-header">
					<b>Корзина</b>
					<button>Закрыть</button>
				</div>
				<div className="Modal-body">
					<div className="Modal-item">
						<div className="Modal-item__left">
							<div className="Modal-code">1</div>
							<div className="Modal-title">Товар</div>
						</div>
						<div className="Modal-item__right">
							<div className="Modal-price">100 ₽</div>
							<div className="Modal-count">2 шт</div>
							<div className="Modal-actions">
								<button>Удалить</button>
							</div>
						</div>
					</div>
					<div className="Modal-item">
						<div className="Modal-item__left">
							<div className="Modal-code">1</div>
							<div className="Modal-title">Товар</div>
						</div>
						<div className="Modal-item__right">
							<div className="Modal-price">100 ₽</div>
							<div className="Modal-count">2 шт</div>
							<div className="Modal-actions">
								<button>Удалить</button>
							</div>
						</div>
					</div>
					<div className="Modal-item">
						<div className="Modal-item__left">
							<div className="Modal-code">1</div>
							<div className="Modal-title">Товар</div>
						</div>
						<div className="Modal-item__right">
							<div className="Modal-price">100 ₽</div>
							<div className="Modal-count">2 шт</div>
							<div className="Modal-actions">
								<button>Удалить</button>
							</div>
						</div>
					</div>
					<div className="Modal-item">
						<div className="Modal-item__left">
							<div className="Modal-code">1</div>
							<div className="Modal-title">Товар</div>
						</div>
						<div className="Modal-item__right">
							<div className="Modal-price">100 ₽</div>
							<div className="Modal-count">2 шт</div>
							<div className="Modal-actions">
								<button>Удалить</button>
							</div>
						</div>
					</div>
					<div className="Modal-all-count">
						<b>Итого</b>
						<b>223Р</b>
					</div>
				</div>
			</div>
		</section>
	);
}

Modal.propTypes = {
  active: PropTypes.bool.isRequired
};


export default Modal;
