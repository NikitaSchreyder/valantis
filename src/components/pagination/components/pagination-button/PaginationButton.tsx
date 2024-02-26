import { IPaginationButtonProps } from "./pagination-button.types";

import './styles.css'

const PaginationButton: React.FC<IPaginationButtonProps> = ({ page, onPageChange, isCurrent }) => {
  const classname = isCurrent ? 'pagination_button--selected' : '' 
  return <button className={`pagination_button ${classname}`} key={page} onClick={() => onPageChange(page)}>{page}</button>
}
export default PaginationButton