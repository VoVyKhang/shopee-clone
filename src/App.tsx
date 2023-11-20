import { useEffect, useContext } from 'react'
import { ToastContainer } from 'react-toastify'
import { LocalStorageEventTarget } from './utils/auth'
import { AppContext } from './context/app.context'
import useRouteElements from './hooks/useRouteElements'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const routeElements = useRouteElements()
  const { reset } = useContext(AppContext)

  useEffect(() => {
    LocalStorageEventTarget.addEventListener('clearLS', reset)

    return () => {
      LocalStorageEventTarget.removeEventListener('clearLS', reset)
    }
  }, [reset])

  return (
    <div>
      {routeElements}
      <ToastContainer />
    </div>
  )
}

export default App
