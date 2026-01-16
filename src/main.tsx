import {createRoot} from 'react-dom/client';
import App from '@/Components/App/App';
import "@/globalStyles/global.scss";

import  RouterProvider  from './Components/RouterProvider/RouterProvider';
import { store } from './store/store';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { metaDataQueryConfig } from './queries/useMetaData';
import { useRefreshUserConfig } from './queries/useUserSessionQueries';
import { ToastsContainer } from './Components/ToastsContainer/ToastsContainer';
import { ApiError } from './exceptions/ApiError';

const queryClient = new QueryClient({
   defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 10,
      refetchOnWindowFocus: false,
    },
  },
})

queryClient.prefetchQuery(useRefreshUserConfig)

queryClient.prefetchQuery(metaDataQueryConfig);

const container: HTMLElement = document.getElementById('root')!;
const root = createRoot(container);
root.render(
  <RouterProvider>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ToastsContainer />
        <App />
      </QueryClientProvider>
    </Provider>
  </RouterProvider>
)