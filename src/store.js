import { generateCode } from './utils';

/**
 * Хранилище состояния приложения
 */
class Store {
	constructor(initState = {}) {
		this.state = initState;
		this.listeners = []; // Слушатели изменений состояния
		this.listItem = []; // массив для добавденных товаров в корзину
		this.price = 0;
	}

	/**
	 * Подписка слушателя на изменения состояния
	 * @param listener {Function}
	 * @returns {Function} Функция отписки
	 */
	subscribe(listener) {
		this.listeners.push(listener);
		// Возвращается функция для удаления добавленного слушателя
		return () => {
			this.listeners = this.listeners.filter((item) => item !== listener);
		};
	}

	/**
	 * Выбор состояния
	 * @returns {Object}
	 */
	getState() {
		return this.state;
	}

	/**
	 * Установка состояния
	 * @param newState {Object}
	 */
	setState(newState) {
		this.state = newState;
		// Вызываем всех слушателей
		for (const listener of this.listeners) listener();
	}

	/**
	 * Добавление новой записи
	 */
	addItem() {
		this.setState({
			...this.state,
			list: [...this.state.list, { code: generateCode(), title: 'Новая запись' }],
		});
	}

	/**
	 * Удаление записи по коду
	 * @param code
	 */
	deleteItem(code) {
		this.setState({
			...this.state,
			// Новый список, в котором не будет удаляемой записи
			list: this.state.list.filter((item) => item.code !== code),
		});
	}

	/**
	 * Выделение записи по коду
	 * @param code
	 */
	selectItem(code) {
		this.setState({
			...this.state,
			list: this.state.list.map((item) => {
				if (item.code === code) {
					// Смена выделения и подсчёт
					return {
						...item,
						selected: !item.selected,
						count: item.selected ? item.count : item.count + 1 || 1,
					};
				}
				// Сброс выделения если выделена
				return item.selected ? { ...item, selected: false } : item;
			}),
		});
	}

	addItemInBucket(code) {
		const existingItem = this.listItem.find((item) => item.code === code);
		if (existingItem) {
			existingItem.count++;
		} else {
			const product = this.state.list.find((elem) => elem.code === code);
			if (product) {
				this.listItem.push({ ...product, count: 1 });
			}
		}
		this.setState({
			...this.state,
			listItem: this.listItem,
		});
	}

	getPrice() {
		return this.price;
	}

	getSelectedItemCount() {
    return this.listItem.length
  }
}

export default Store;
