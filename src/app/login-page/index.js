import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import LoginForm from '../../components/login-form';
import useTranslate from '../../hooks/use-translate';
import Navigation from '../../containers/navigation';
import HeadLogin from '../../components/head-login';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';

function LoginPage() {
	const store = useStore();

	const select = useSelector((state) => ({
		user: state.user.user,
		error: state.user.error,
	}));

	console.log('в селекте ' + select.error);

	const callbacks = {
		signIn: useCallback((data) => store.actions.user.signIn(data), [store]),
		singOut: useCallback((data) => store.actions.user.singOut(data), [store]),
	};

	const { t } = useTranslate();

	return (
		<PageLayout>
			<HeadLogin user={select.user} singOut={callbacks.singOut} />
			<Head title={t('title')} />
			<Navigation />
			<LoginForm title={'Вход'} signIn={callbacks.signIn} error={select.error} />
		</PageLayout>
	);
}

LoginPage.propTypes = {};

export default LoginPage;
