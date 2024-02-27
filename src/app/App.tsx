import { useCallback, useEffect, useState } from 'react';
import { valantisApi } from '../api/valantis.api';

import Item from '../components/item/Item';
import Pagination from '../components/pagination/Pagination';

import { IItemProps } from '../components/item/item.types';

import './app.css'

const App: React.FC = () => {
  const limit = 50

  const [items, setItems] = useState<IItemProps[]>([])
  const [itemsIds, setItemsIds] = useState<string[]>([])
  const [filterBy, setFilterBy] = useState<string | undefined>(undefined)
  const [filterValue, setFilterValue] = useState<string | number>('')
  const [pagesCount, setPagesCount] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState<number>(1)

  const pageChangeHandler = (page: number) => setCurrentPage(page)

  // Get items count
  useEffect(() => {
    valantisApi.getIds({})
      .then(response => {
        const { data: { result } } = response
        const count = Math.ceil(result.length / limit)
        setPagesCount(count)        
      })
        .catch(null)
  }, [pagesCount])

  // Get items ids
  useEffect(() => {
    const offset = currentPage > 1 ? limit * (currentPage - 1) : 0
    valantisApi.getIds({ limit, offset })
      .then(response => {
        const { data: { result } } = response
        setItemsIds(result);
      })
        .catch(() => {})
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
      })
        .catch(() => {})
  }, [itemsIds])

  useEffect(() => {
    switch(filterBy) {
      case 'name':
        valantisApi.filter({
          product: filterValue?.toString()
        })
          .then(response => {
            const result = response.data.result
            setItemsIds(result)
          })
            .catch(() => {})
        break
      case 'brand':
        valantisApi.filter({
          brand: filterValue?.toString()
        })
          .then(response => {
            const result = response.data.result
            setItemsIds(result)
          })
            .catch(() => {})
        break
      case 'price':
        valantisApi.filter({
          price: Number(Number(filterValue).toFixed(1))
        })
          .then(response => {
            const result = response.data.result
            setItemsIds(result)
          })
            .catch(() => {})
        break
      default:
        valantisApi.getIds({})
          .then(response => {
            const { data: { result } } = response
            const totalItems = result.length
            const pages = Math.ceil(totalItems / limit)
            setPagesCount(pages)
          })
            .catch(() => {})
        break
    }
  }, [filterBy])

  // Rendering items
  const renderItems = useCallback(() => {   
    const renderItems = items.map(item => <Item key={item.id} {...item} />)
    return renderItems
  }, [items])

  return (
    <div className='app'>
      <p>Фильтр</p>
      <select className='filter-select' onChange={e => setFilterBy(e.currentTarget.value)} name="filter-by" id="filter-by" defaultValue={undefined}>
        <option value={undefined}>Без фильтра</option>
        <option value="name">name</option>
        <option value="brand">brand</option>
        <option value="price">price</option>
      </select>
      <input type="text" onChange={e => setFilterValue(e.currentTarget.value)} />
      <div className='products'>
        {renderItems()}
      </div>
      {
        filterBy !== undefined
        ? null
        : <Pagination 
            startPage={1}
            buttonsPerPage={9}
            currentPage={currentPage}
            onPageChange={pageChangeHandler}
            pagesCount={pagesCount}
          />
      }
    </div>
  )
}

export default App;
