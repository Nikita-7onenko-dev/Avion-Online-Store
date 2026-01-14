import styles from './toast.module.scss'
import { useAppDispatch } from "@/hooks/ReduxHooks";
import { deleteToastThunk } from "@/store/slices/toastSlice";
import { AppDispatch } from '@/store/store';
import { ToastType } from "@/types/ToastType";
import { motion } from 'framer-motion';

type Props = {
  toast: ToastType;
}

const icons = {
  success: (
    <svg
      width="70"
      height="70"
      viewBox="-20.48 -20.48 552.96 552.96"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth="36"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect
        x="-20.48"
        y="-20.48"
        width="552.96"
        height="552.96"
        rx="276.48"
        fill="#2a254b"
        strokeWidth={0}
      />

      <polyline points="115.54 268.77 200.67 353.9 396.46 158.1" />
    </svg>
  ),

  error: (
    <svg
      width="70"
      height="70"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect
        x="0"
        y="0"
        width="16"
        height="16"
        rx="8"
        fill="#b50e16"
        strokeWidth={0}
      />

      <path
        d="M7.786 10.53 C7.597 10.592 7.41 10.753 7.319 10.932 C7.249 11.072 7.237 11.325 7.294 11.495 C7.388 11.78 7.697 12 8 12 C8.303 12 8.612 11.78 8.706 11.495 C8.763 11.325 8.751 11.072 8.681 10.932 C8.616 10.804 8.46 10.646 8.333 10.58 C8.217 10.52 7.904 10.491 7.786 10.53
         M7.706 4.29 C7.482 4.363 7.355 4.491 7.293 4.705 C7.257 4.827 7.253 5.106 7.259 6.816 C7.267 8.786 7.267 8.787 7.325 8.896 C7.398 9.033 7.538 9.157 7.671 9.204 C7.803 9.25 8.197 9.25 8.329 9.204 C8.462 9.157 8.602 9.033 8.675 8.896 C8.733 8.787 8.733 8.786 8.741 6.816 C8.749 4.664 8.749 4.662 8.596 4.481 C8.472 4.333 8.339 4.284 8.04 4.276 C7.893 4.272 7.743 4.278 7.706 4.29"
        fill="#ffffff"
        stroke="none"
      />
    </svg>
  ),
};

function onDelete(dispatch: AppDispatch, timerId: NodeJS.Timeout, toastId: string) {
  if(timerId) clearTimeout(timerId)
  dispatch(deleteToastThunk(toastId))
}

export function Toast({toast}: Props): React.JSX.Element {

  const dispatch = useAppDispatch();

  const timerId = setTimeout(
    () => onDelete(dispatch, timerId, toast.id),
    5000
  )

  return (
    <motion.li 
      className={styles.toast}
      layout
      layoutId={toast.id}
      initial={{opacity: 0, y: 20}}
      animate={{opacity: 0.92, y: 0}}
      exit={{opacity: 0, y: -20}}
      transition={{
        layout: { duration: 0.3, ease: "easeInOut" },
        default: {duration: 0.3, ease: 'easeInOut'}
      }}
    > 

      <div>{icons[toast.type]}<p>{toast.message}</p></div>
      <button onClick={() => onDelete(dispatch, timerId, toast.id)}>✕</button>
    </motion.li>
  )
}