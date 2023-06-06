import { memo, useCallback, useMemo } from 'react';
import useTranslate from '../../hooks/use-translate';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import Select from '../../components/select';
import Input from '../../components/input';
import SideLayout from '../../components/side-layout';
import { createCategorySelect } from '../../utils';

function CatalogFilter() {
	const store = useStore();
	const { t } = useTranslate();

	const select = useSelector((state) => ({
		sort: state.catalog.params.sort,
		query: state.catalog.params.query,
		categoryList: state.category.categoryList,
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

	const filterSelect = createCategorySelect(select.categoryList);

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
