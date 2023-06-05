import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import PageLayout from '../../components/page-layout';
import HeadLogin from '../../components/head-login';
import Head from '../../components/head';
import Navigation from '../../containers/navigation';
import UserDetails from '../../components/user-details';
import useTranslate from '../../hooks/use-translate';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';

function ProfileUserPage(props) {
	const store = useStore();

	const select = useSelector((state) => ({
		user: state.user.user,
	}));

	const callbacks = {
		singOut: useCallback(() => store.actions.user.singOut(), [store]),
	};

	const { t } = useTranslate();
	return (
		<PageLayout>
			<HeadLogin user={select.user} singOut={callbacks.singOut} />
			<Head title={t('title')} />
			<Navigation />
			<UserDetails user={select.user} />
		</PageLayout>
	);
}

ProfileUserPage.propTypes = {};

export default ProfileUserPage;