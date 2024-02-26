import { useCallback } from "react"

import PaginationButton from "./components/pagination-button/PaginationButton"

import { IPaginationProps } from "./pagination.types"
import './styles.css'

const Pagination: React.FC<IPaginationProps> = ({buttonsPerPage, currentPage, pagesCount, startPage, onPageChange}) => {
  const offset = Math.floor(buttonsPerPage / 2)
  
  const decrementPage = () => {
    if(currentPage - 1 > 0) {
      return onPageChange(currentPage - 1)
    }
    return onPageChange(1)
  }

  const incrementPage = () => { 
    if(currentPage + 1 < pagesCount) {
      return onPageChange(currentPage + 1)
    }
    return onPageChange(pagesCount)
  }

  const renderBtns = useCallback(() => {
    const buttons = []

    if(currentPage < 5) {
      for(let i = startPage; i <= buttonsPerPage; i++) {
        buttons.push(<PaginationButton isCurrent={i === currentPage} page={i} onPageChange={() => onPageChange(i)} />)
      }
    } else if(currentPage + offset >= pagesCount) {
      for(let i = pagesCount - buttonsPerPage + 1; i <= pagesCount; i++) {
        buttons.push(<PaginationButton isCurrent={i === currentPage} page={i} onPageChange={() => onPageChange(i)} />)
      }
    } else {
      for(let i = currentPage - offset; i <= currentPage + offset; i++) {
        buttons.push(<PaginationButton isCurrent={i === currentPage} page={i} onPageChange={() => onPageChange(i)} />)
      }
    }

    return buttons
  }, [currentPage])

  return (
    <div className="pagination">
      <button className="pagination_button" disabled={currentPage === startPage ? true : false} onClick={decrementPage}>-</button>
      {renderBtns()}
      <button className="pagination_button" disabled={currentPage === pagesCount ? true : false} onClick={incrementPage}>+</button>
    </div>
  )
}

export default Pagination