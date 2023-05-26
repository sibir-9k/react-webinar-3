import React from 'react';
import BasketTool from '../../components/basket-tool';
import './style.css'

function About() {
	return (
		<>
			<BasketTool />
			<div className='About'>
				<p className=''>
					Описание товара из множества букв. Описание товара из букв. В АПИ может быть меньше букв.
					Описание товара из множества букв.
				</p>
				<div className=''>Страна производитель:<b>Россия (RU)</b></div>
				<div>Категория:<b>Электронника123a</b></div>
				<div>Год выпуска:<b>2015</b></div>
				<div><b>Цена:  12,57 ₽</b></div>
        <button>Добавить</button>
			</div>
		</>
	);
}

export default About;
