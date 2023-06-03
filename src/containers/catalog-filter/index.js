import { memo, useCallback, useMemo } from 'react';
import useTranslate from '../../hooks/use-translate';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import Select from '../../components/select';
import Input from '../../components/input';
import SideLayout from '../../components/side-layout';

function CatalogFilter() {
	const store = useStore();

	const select = useSelector((state) => ({
		sort: state.catalog.params.sort,
		query: state.catalog.params.query,
		categoryList: state.filter.categoryList,
	}));

	const callbacks = {
		// Сортировка
		onSort: useCallback((sort) => store.actions.catalog.setParams({ sort }), [store]),
		// Поиск
		onSearch: useCallback((query) => store.actions.catalog.setParams({ query, page: 1 }), [store]),
		// Сброс
		onReset: useCallback(() => store.actions.catalog.resetParams(), [store]),
    // 
		onFilterSelect: useCallback((filter) => store.actions.catalog.setParams({ filter, page: 1 }),[store]),
	};

	const { t } = useTranslate();

	function createFilterSelect() {
		let filter = [{ value: 'all', title: 'Все' }];
		function addCategoryFilter(data, prefix) {
			filter.push({ value: data._id, title: prefix + data.title });
		}

		let categories = select.categoryList.map((item) => ({ ...item }));
		let list = categories.filter((item) => item.parent === null);

		list.forEach((elem) => {
			addCategoryFilter(elem, '');
			elem.children = categories.filter((item) => item.parent?._id === elem._id);

			elem.children.forEach((child) => {
				addCategoryFilter(child, '- ');
				child.children = categories.filter((item) => item.parent?._id === child._id);

				child.children.forEach((element) => {
					addCategoryFilter(element, '- - ');
				});
			});
		});

		return filter;
	}
	const filterSelect = createFilterSelect();

	const options = {
		sort: useMemo(
			() => [
				{ value: 'order', title: 'По порядку' },
				{ value: 'title.ru', title: 'По именованию' },
				{ value: '-price', title: 'Сначала дорогие' },
				{ value: 'edition', title: 'Древние' },
			],
			[]
		),
		filterSelect: filterSelect,
	};

	const optionsSelectOne = {
		sort: useMemo(
			() => [
				{ value: 'order', title: 'По порядку' },
				{ value: 'title.ru', title: 'По именованию' },
				{ value: '-price', title: 'Сначала дорогие' },
				{ value: 'edition', title: 'Древние' },
			],
			[]
		),
	};

	return (
		<SideLayout padding="medium">
			<Select
				options={options.filterSelect}
				value={options.filterSelect.value}
				onChange={callbacks.onFilterSelect}
			/>
			<Select options={options.sort} value={select.sort} onChange={callbacks.onSort} />
			<Input
				value={select.query}
				onChange={callbacks.onSearch}
				placeholder={'Поиск'}
				delay={1000}
			/>
			<button onClick={callbacks.onReset}>{t('filter.reset')}</button>
		</SideLayout>
	);
}

export default memo(CatalogFilter);
