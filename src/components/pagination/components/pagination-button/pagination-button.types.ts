export interface IPaginationButtonProps {
  page: number
  onPageChange: (page: number) => void
  isCurrent: boolean
}