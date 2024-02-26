export interface IPaginationProps {
  startPage: number
  pagesCount: number
  buttonsPerPage: number
  currentPage: number
  onPageChange: (page: number) => void
}