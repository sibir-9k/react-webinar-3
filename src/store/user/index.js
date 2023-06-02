import StoreModule from '../module';

class User extends StoreModule {
	initState() {
		return {
			user: null,
		};
	}

	async singIn(data) {
		try {
			const responce = await fetch('api/v1/users/sign', {
				method: 'POST',
				headers: {
					'Content-type': 'application/json',
				},
				body: JSON.stringify(data),
			});
			const resultUser = await responce.json();

			localStorage.setItem('token', resultUser.result.token);

			this.setState({
				...this.getState(),
				user: resultUser.result.user,
			});
		} catch (error) {
			console.error(error);
		}
	}

	async singOut() {
		try {
			const responce = await fetch('api/v1/users/sing', {
				method: 'DELETE',
				headers: {
					'X-Token': localStorage.getItem('token'),
					'Content-type': 'application/json',
				},
			});
			const data = await responce.json();
      
			localStorage.removeItem('token')

			this.setState({
				...this.getState(),
				user: null,
			});
		} catch (error) {
			console.error(error);
		}
	}

	async getUser() {
		if (!localStorage.getItem('token')) return;
		try {
			const responce = await fetch('api/v1/users/self', {
				method: 'GET',
				headers: {
					'X-Token': localStorage.getItem('token'),
					'Content-type': 'application/json',
				},
			});
			const resultUser = await responce.json();
			this.setState({
				...this.getState(),
				user: resultUser.result,
			});
		} catch (error) {
			console.error(error);
		}
	}
}

export default User;
