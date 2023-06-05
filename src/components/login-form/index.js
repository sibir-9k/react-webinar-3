import React, { useState, memo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import './style.css';

function LoginForm(props) {
	console.log(props);

	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');

	let navigate = useNavigate();

  function onSubmitForm(event) {
		event.preventDefault();
		if (login && password) {
			props.signIn({ login, password });
      setLogin('')
      setPassword('')
		}
	}

	useEffect(() => {
		if (!props.error) {
			navigate('/login');
		} 
	}, [props.error]);


	return (
		<div className="Form">
			<h2>{props.title}</h2>
			<form onSubmit={onSubmitForm}>
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
        {props.error ? <span className="error">{props.error}</span> : ''}
				<button type="submit">Войти</button>
			</form>
		</div>
	);
}

LoginForm.propTypes = {
	title: PropTypes.string.isRequired,
	signIn: PropTypes.func.isRequired,
};

export default memo(LoginForm);
