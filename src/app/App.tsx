import { useCallback, useEffect, useState } from 'react';
import { ValantisApi } from '../api/valantis.api';

import Item from '../components/item/Item';
import Pagination from '../components/pagination/Pagination';

import { IItemProps } from '../components/item/item.types';

import './app.css'

const App: React.FC = () => {
  const limit = 50
  const valantisApi = new ValantisApi()

  const [items, setItems] = useState<IItemProps[]>([])
  const [itemsIds, setItemsIds] = useState<string[]>([])
  const [filterBy, setFilterBy] = useState<string>('name')
  const [pagesCount, setPagesCount] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isError, setIsError] = useState<boolean>(false)

  const pageChangeHandler = (page: number) => setCurrentPage(page)

  // Get items count
  useEffect(() => {
    valantisApi.getIds({})
      .then(response => {
        const { data: { result } } = response
        const totalItems = result.length
        const pages = Math.ceil(totalItems / limit)
        setPagesCount(pages)
      })
        .catch(err => setIsError(true))
  }, [])

  // Get items ids
  useEffect(() => {
    setIsLoading(true)
    const offset = currentPage > 1 ? limit * (currentPage - 1) : 0

    valantisApi.getIds({ limit, offset })
      .then(response => {
        const { data: { result } } = response
        setItemsIds(result);
      })
        .catch(err => setIsError(true))
  }, [currentPage])

  // Get items
  useEffect(() => {
    valantisApi.getItems({ ids: itemsIds })
      .then(response => {
        const result: IItemProps[] = response.data.result 
        const uniqueItems = result.reduce((acc, el) => {
          if(!acc.find(item => item.id === el.id)) {
            acc.push(el)
          }
          return acc
        }, [] as IItemProps[])
        setItems(uniqueItems)
        setIsLoading(false)
      })
        .catch(err => setIsError(true))
  }, [itemsIds])

  // Rendering items
  const renderItems = useCallback(() => {
    switch(filterBy) {
      default:
      case 'name': {
        const sortedItems = items.sort((a, b) => a.product > b.product ? 1 : -1)
        const renderItems = sortedItems.map(item => <Item key={item.id} {...item} />)
        return renderItems
      }
      case 'brand': {
        const sortedItems = items.sort((a, b) => {
          if(a.brand == b.brand) return 0
          if(a.brand == null) return 1
          if(b.brand == null) return -1
          return a.brand > b.brand ? 1 : -1;
        })
        const renderItems = sortedItems.map(item => <Item key={item.id} {...item} />)
        return renderItems
      }
      case 'price': {
        const sortedItems = items.sort((a, b) => a.price > b.price ? 1 : -1)
        const renderItems = sortedItems.map(item => <Item key={item.id} {...item} />)
        return renderItems
      }
    }
  }, [filterBy, items])

  if(isError) {
    return (
      <p>Ошибка загрузки. Повторите позднее</p>
    )
  }

  if(isLoading) {
    return (
      <p>Загрузка товаров</p>
    )
  }

  return (
    <div className='app'>
      <p>Фильтр</p>
      <select className='filter-select' onChange={e => setFilterBy(e.currentTarget.value)} name="filter-by" id="filter-by" defaultValue={filterBy}>
        <option value="name">name</option>
        <option value="brand">brand</option>
        <option value="price">price</option>
      </select>
      <div className='products'>
        {renderItems()}
      </div>
      <Pagination 
        startPage={1}
        buttonsPerPage={9}
        currentPage={currentPage}
        onPageChange={pageChangeHandler}
        pagesCount={pagesCount}
      />
    </div>
  )
}

export default App;
