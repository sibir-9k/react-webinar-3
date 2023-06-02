import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import LoginBtn from '../../components/login-btn';
import LoginForm from '../../components/login-form';
import useTranslate from "../../hooks/use-translate";
import Navigation from "../../containers/navigation";
import HeadLogin from '../../components/head-login';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import UserDetails from '../../components/user-details';


function LoginPage() {
  const store = useStore();

  const select = useSelector(state => ({
    user: state.user.user,
  }));



  const callbacks = {
    singIn: useCallback(data => store.actions.user.singIn(data), [store]),
  }

  const {t} = useTranslate();

	return (
		<PageLayout>
			<HeadLogin user={select.user} singOut={callbacks.singOut}/>
			<Head title={t('title')}/>
			<Navigation />
      <LoginForm title={'Вход'} singIn={callbacks.singIn}/>
		</PageLayout>
	);
}

LoginPage.propTypes = {};

export default LoginPage;
