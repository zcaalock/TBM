import React from 'react'
import Categories from './categories/Categories'
import AddCategory from './categories/AddCategory'


class Body extends React.Component {
  render() {
    return (
      <>
        <Categories />
        <AddCategory />
      </>
    )
  }
}

export default Body