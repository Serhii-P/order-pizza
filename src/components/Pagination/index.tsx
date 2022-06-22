import React from 'react'
import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.scss';

type PaginateProps = {
  currentPage: number;
  onChangePage: (page: number) => void;
}

const Pagination: React.FC <PaginateProps>  = ({currentPage, onChangePage}) => {
  return (
    <div>
      <ReactPaginate
        className={styles.root}
        breakLabel="..."
        nextLabel=">"
        previousLabel="<"
        onPageChange={(event) => onChangePage(event.selected + 1)}
        pageRangeDisplayed={8}
        pageCount={3}
        forcePage={currentPage - 1}
      />
    </div>
  )
}

export default Pagination