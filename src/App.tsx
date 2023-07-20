import { useEffect, useState } from 'react';
import './App.css'
import styles from './app.module.scss'
import classNames from 'classnames';

interface Products {
  type: string,
  name: string,
  price: number,
}

const TYPE_PRODUCT = {
  AUTOS: 'autos',
  BIKES: 'bikes',
  TOYS: 'toys',
}

const TYPES_COLORS = {
  [TYPE_PRODUCT.AUTOS]: styles.autos,
  [TYPE_PRODUCT.BIKES]: styles.bikes,
  [TYPE_PRODUCT.TOYS]: styles.toys,
  __DEFAULT: styles.default,
}

function App() {
  const [products, getProducts] = useState<Array<Products>>([]);

   async function getData(){
    try {
      const result = await fetch('api.json');
      const data = await result.json()
      getProducts(data.products)
    } catch (error) {
      console.log(error)
    }
  }

  function getColors(type: string){
    return TYPES_COLORS[type] ?? TYPES_COLORS.__DEFAULT
  }

  useEffect(()=> {
    getData()
  }, [])

  return (
      products.map((product) => {
        return (
          <div className={classNames(styles.container, getColors(product.type))}>
            <div>
              <span>Name:</span>
              <span>{product.name}</span>
            </div>
            <div>
              <span>Price:</span>
              <span>{product.price}</span>
            </div>
          </div>
        )
      })
        
    )
}

export default App
