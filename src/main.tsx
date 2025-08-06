import {createRoot} from 'react-dom/client';
import App from '@/Components/App/App';
import "@/globalStyles/global.scss"

import  RouterProvider  from './Components/RouterProvider/RouterProvider';


const container: HTMLElement = document.getElementById('root')!;
const root = createRoot(container);
root.render(
  <RouterProvider>
    <App />
  </RouterProvider>
)