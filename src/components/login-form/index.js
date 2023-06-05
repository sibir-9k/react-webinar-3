import React, { useState, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import './style.css';

function LoginForm(props) {
	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');

	let navigate = useNavigate();

	function onSubmitForm(event) {
		event.preventDefault();
		if (login && password.length > 3) {
			props.singIn({ login, password })
      navigate('/profile');
		}
	}

	return (
		<div className="Form">
			<h2>{props.title}</h2>
			<form onSubmit={onSubmitForm}>
      {props.errorMessage && <div className="error">{props.errorMessage}</div>}
				<div className="Form-login">
					<label htmlFor="name">Логин</label>
					<input
						type="text"
						name="name"
						id="name"
						value={login}
						onChange={(e) => setLogin(e.target.value)}
						required
					/>
				</div>
				<div className="Form-password">
					<label htmlFor="password">Пароль</label>
					<input
						type="password"
						name="password"
						id="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</div>
				<button type="submit">Войти</button>
			</form>
      <span className="error">Введен не верный логин или пароль</span>
		</div>
	);
}

LoginForm.propTypes = {
	title: PropTypes.string.isRequired,
	singIn: PropTypes.func.isRequired,
};

export default memo(LoginForm);
