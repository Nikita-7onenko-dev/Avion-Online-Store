import styles from './toastsContainer.module.scss'

import { useAppSelector } from "@/hooks/ReduxHooks";
import { createPortal } from "react-dom";
import { Toast } from "../Toast/Toast";
import { AnimatePresence } from 'framer-motion'

const container = document.getElementById('overlay')

export function ToastsContainer(): React.JSX.Element | null {

  if(!container) throw new Error('No overlay container found');
  
  const toasts = useAppSelector(state => state.toasts.visible);

  return createPortal(
      <ul className={styles.toastContainer}>
        <AnimatePresence >
          {toasts.map(toast => <Toast key={toast.id} toast={toast}/>)}
        </AnimatePresence>
      </ul>

  , container)
}