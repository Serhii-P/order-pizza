import React, { useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux';
import Categories from '../components/Categories';
import Pagination from '../components/Pagination';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Sort from '../components/Sort';
import { selectFilter } from '../redux/filter/selectors';
import { setCategoryId, setCurrentPage } from '../redux/filter/slice';
import { fetchPizzas } from '../redux/pizza/asyncActions';
import { selectPizzaData } from '../redux/pizza/selectors';
import { useAppDispatch } from '../redux/store';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();

  const {categoryId, sort, currentPage, searchValue} = useSelector(selectFilter);
  const {items, status} = useSelector(selectPizzaData)

  const onChangeCategory = useCallback((idx: number) => {
    dispatch(setCategoryId(idx))
  }, []);

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page))
  }

const getPizzas = async () => {
  const sortBy = sort.sortProperty.replace('-', '');
  const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
  const category = categoryId > 0 ? String(categoryId) : '';
  const search = searchValue;

  dispatch(
    fetchPizzas({
    category, search, sortBy, order, currentPage: String(currentPage)
  }))
    window.scrollTo(0, 0);
  }

useEffect(() => {
      getPizzas();
}, [categoryId, sort.sortProperty, searchValue, currentPage]);

    const pizzas = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />);
    const skeleton = [...new Array(6)].map((_, index) => <Skeleton key={index}/>)

  return (
    <div className='container'>
      <div className="content__top">
            <Categories 
              value={categoryId} 
              onChangeCategory={onChangeCategory} 
            />
            <Sort value={sort} />
          </div>
          <h2 className="content__title">All pizzas</h2>
          {status === 'error' ? (
            <div className='content__error-info'>
              <h2>Oops. Smth went wrong <span>😕</span></h2>
              <p>
                Unfortunately no items available.<br />
                Try again later.
              </p>
            </div>  
            ) : (
            <div className="content__items">
              { status === 'loading' ? skeleton : pizzas}
            </div>
            )}
          <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  )
}

export default Home