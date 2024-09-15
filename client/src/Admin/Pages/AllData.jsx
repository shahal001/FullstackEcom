import React from 'react'
import  BarChart  from '../../Components/BarChart'


const AllData = ({products}) => {
    const title = products.map((product)=>product.title)
    const sold = products.map((product)=>product.sold)
  return (
    <div>
        <h3>Product Sold</h3>
        <BarChart sold={sold} title={title} />

        
    </div>
  )
}

export default AllData