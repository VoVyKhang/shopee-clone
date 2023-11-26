import path from 'src/constants/path'
import { useContext } from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import { AppContext } from 'src/context/app.context'
import { MainLayout } from 'src/layouts/MainLayout'
import { RegisterLayout } from 'src/layouts/RegisterLayout'
import { Cart } from 'src/pages/Cart'
import { Login } from 'src/pages/Login'
import { ProductDetail } from 'src/pages/ProductDetail'
import { ProductList } from 'src/pages/ProductList'
import { Register } from 'src/pages/Register'
import { CartLayout } from 'src/layouts/CartLayout'
import { UserLayout } from 'src/pages/User/layouts/UserLayout'
import { ChangePassword } from 'src/pages/User/pages/ChangePassword'
import { HistoryPurchase } from 'src/pages/User/pages/HistoryPurchase'
import { Profile } from 'src/pages/User/pages/Profile'
import { NotFound } from 'src/pages/NotFound'

function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
}

function RejectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return !isAuthenticated ? <Outlet /> : <Navigate to='/' />
}

function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: path.login,
          element: (
            <RegisterLayout>
              <Login />
            </RegisterLayout>
          )
        },
        {
          path: path.register,
          element: (
            <RegisterLayout>
              <Register />
            </RegisterLayout>
          )
        }
      ]
    },
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: path.cart,
          element: (
            <CartLayout>
              <Cart />
            </CartLayout>
          )
        },
        {
          path: path.user,
          element: (
            <MainLayout>
              <UserLayout />
            </MainLayout>
          ),
          children: [
            {
              path: path.profile,
              element: <Profile />
            },
            {
              path: path.changePassword,
              element: <ChangePassword />
            },
            {
              path: path.historyPurchase,
              element: <HistoryPurchase />
            }
          ]
        }
      ]
    },
    {
      path: path.productDetail,
      element: (
        <MainLayout>
          <ProductDetail />
        </MainLayout>
      )
    },
    {
      path: '',
      index: true,
      element: (
        <MainLayout>
          <ProductList />
        </MainLayout>
      )
    },
    {
      path: '*',
      index: true,
      element: (
        <MainLayout>
          <NotFound />
        </MainLayout>
      )
    }
  ])

  return routeElements
}

export default useRouteElements
