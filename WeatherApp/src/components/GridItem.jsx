import React from 'react'

const GridItem = ({ value, label }) => {
  return (
    <div className='grid-container'>
    <div className='grid-inner-container'>
      <div>{value}</div>
      <div>{label}</div>
    </div>
  </div>
  )
}

export default GridItem