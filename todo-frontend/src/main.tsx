import { StrictMode } from 'react'
import { SnackbarProvider } from 'notistack'
import { createRoot } from 'react-dom/client'
import { PersistGate } from "redux-persist/integration/react"
import { Provider } from 'react-redux'
import store, { persistor } from './redux/store.ts'
import AppRouter from './routes/AppRouter.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SnackbarProvider>
          <AppRouter />
        </SnackbarProvider>
      </PersistGate>
    </Provider>
  </StrictMode>,
)
