import React from 'react'
import styles from './HomePage.module.scss'
import SearchBar from '../shared/components/search-bar/SearchBar'

const HomePage = () => {
  return (
    <div className={styles.container}>
      <SearchBar></SearchBar>
      <div className={styles.content}>
      </div>
    </div>
  )
}

export default HomePage