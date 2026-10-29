import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { pageRoutes } from './Routes/index.tsx'
import { AuthContextprovider } from './utils/ContextApi.tsx'
import QueryClientProviders from './Providers/QueryClientProviders.tsx'

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { ToastContainer } from 'react-toastify'
import ProviderRedux from './Providers/ReduxProvider.tsx'

createRoot(document.getElementById('root')!).render(
    <>
        <ToastContainer />
        <ProviderRedux>
            <AuthContextprovider>
                <QueryClientProviders>
                    <RouterProvider router={pageRoutes} />
                </QueryClientProviders>
            </AuthContextprovider>
        </ProviderRedux>
    </>,
)
