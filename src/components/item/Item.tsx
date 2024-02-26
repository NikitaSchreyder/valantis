import { IItemProps } from "./item.types"

import './styles.css'

const Item: React.FC<IItemProps> = ({ id, product, brand, price }) => {
  return (
    <div className="product">
      <p className="product_id">{id}</p>
      <p className="product_name">{product}</p>
      {brand && <p className="product_brand">{brand}</p>}
      <p className="product_price">{price}</p>
    </div>
  )
}

export default Item