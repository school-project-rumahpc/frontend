import { NextPage } from 'next'
import Styles from '../styles/loading.module.css'

const Loading: NextPage= () => {
  return (
  <div className={Styles.container}>
  <div className={Styles.loader}></div>
  <p>Loading...</p>
  </div>)
}

export default Loading