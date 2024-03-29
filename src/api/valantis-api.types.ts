export type TValantisApiGetIdsProps = {
  offset?: number
  limit?: number
}

export type TValantisApiGetItemsProps = {
  ids: string[]
}

export type TValantisApiGetFieldsProps = {
  field: string
  offset: number
  limit: number
}

export type TValantisApiFilterProps = {
  product?: string
  brand?: string
  price?: number
}