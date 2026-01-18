import styles from './pageLoader.module.scss'
import { ClipLoader } from "react-spinners";




export function PageLoader(): React.JSX.Element {

  return (
    <div className={styles.pageLoader} >
      <ClipLoader size={100}/>
    </div>
  )
}