import { memo, useCallback, useEffect, useState } from 'react';
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import List from '../../components/list';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import { getPageCount, getPagesArray } from '../../utils';
import { Pagination } from '../../components/pagination';

function Main() {
	const [totalCount, setTotalCount] = useState(0);
	const [totalPages, setTotalPages] = useState();
  const [currentPage, setCurrentPage] = useState(1)
  const limit = 10
  const skip = 0

	const store = useStore();

	useEffect(() => {
    initLoad()
	}, []);

	const initLoad = async () => {
		setTotalCount(await store.actions.catalog.getAllLoad());
		store.actions.catalog.load(limit, skip);
	};

	const select = useSelector((state) => ({
		list: state.catalog.list,
		amount: state.basket.amount,
		sum: state.basket.sum,
	}));

	useEffect(() => {
    if(totalCount === 0) return 
    let count = getPageCount(totalCount, limit)
		setTotalPages(count);
	},[totalCount]);

  const changePage = (number) => {
    let newSkip = number * limit
    store.actions.catalog.load(limit, newSkip)
    setCurrentPage(number)
  }

	const callbacks = {
		// Добавление в корзину
		addToBasket: useCallback((_id) => store.actions.basket.addToBasket(_id), [store]),
		// Открытие модалки корзины
		openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
	};

	const renders = {
		item: useCallback(
			(item) => {
				return <Item item={item} onAdd={callbacks.addToBasket} />;
			},
			[callbacks.addToBasket]
		),
	};

	return (
		<PageLayout>
			<Head title="Магазин" />
			<BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
			<List list={select.list} renderItem={renders.item} />
			<Pagination totalPages={totalPages} changePage={changePage} currentPage={currentPage}/>
		</PageLayout>
	);
}

export default memo(Main);
