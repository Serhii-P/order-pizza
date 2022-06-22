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
  // const navigate = useNavigate();
  // // const isSearch = useRef(false);
  // const isMounted = useRef(false);

  const {categoryId, sort, currentPage, searchValue} = useSelector(selectFilter);
  const {items, status} = useSelector(selectPizzaData)

  const onChangeCategory = useCallback((idx: number) => {
    dispatch(setCategoryId(idx))
  }, []);

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page))
  }

//   useEffect(() => {
//     if (isMounted.current) {
//      const queryString = qs.stringify({
//        sortProperty: sort.sortProperty,
//        categoryId,
//        currentPage
//      })
   
//      navigate(`?${queryString}`)
//     }
//     isMounted.current = true;
//    }, [categoryId, currentPage, sort.sortProperty]);
   

// useEffect(() => {
// if(window.location.search) {
//   const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams;
//   const sort = sortList.find(obj => obj.sortProperty === params.sortBy) 

// dispatch(setFilters({
//   categoryId:  Number(params.category),
//   currentPage: Number(params.currentPage),
//   searchValue: params.search,
//   sort: sort || sortList[0],
// }))
//   isSearch.current = true;
// }
// }, []);



const getPizzas = async () => {
  const sortBy = sort.sortProperty.replace('-', '');
  const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
  const category = categoryId > 0 ? String(categoryId) : '';
  const search = searchValue;

  dispatch(
    fetchPizzas({
    category, search, sortBy, order, currentPage: String(currentPage)
  }))
    // try {
    //   dispatch(fetchPizzas({
    //     category, search, sortBy, order, currentPage
    //   }))
    // }
    // catch (err) {
    //   console.log(err);
    // }
    // finally {
    //    setIsLoading(false);
    // }
    window.scrollTo(0, 0);
  }

useEffect(() => {
      getPizzas();
}, [categoryId, sort.sortProperty, searchValue, currentPage]);


// const pizzas =  items.filter((obj: any) => {
//   if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
//     return true;
//   } 
//   return false
// }).map((obj: any) => (
//   // use spread instead of passing each value
//       <PizzaBlock key={obj.id} {...obj}
//         // title={obj.title}
//         // price={obj.price}
//         // imageUrl={obj.imageUrl}
//         // sizes={obj.sizes}
//         // types={obj.types}
//       />
//     ));

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