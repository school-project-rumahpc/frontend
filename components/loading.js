import Styles from '../styles/loading.module.css'

const Loading= () => {
  return (
  <div className={Styles.container}>
  <div className={Styles.loader}></div>
  <p>Loading...</p>
  </div>)
}

export default Loading