import React from 'react'
import styles from './Card.module.scss'

interface Props {
    children?: JSX.Element | JSX.Element[] | string;
}

const Card: React.FunctionComponent<Props> = ({ children }) => {
  return (
    <div className={styles.card}>
        {children}
    </div>
  )
}

export default Card