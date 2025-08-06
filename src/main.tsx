import {createRoot} from 'react-dom/client';
import App from '@/Components/App/App';
import "@/globalStyles/global.scss"
import { BrowserRouter } from 'react-router-dom';


const container: HTMLElement = document.getElementById('root')!;
const root = createRoot(container);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)