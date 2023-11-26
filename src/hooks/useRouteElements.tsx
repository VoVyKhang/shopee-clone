import path from 'src/constants/path'
import { useContext, lazy, Suspense } from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import { AppContext } from 'src/context/app.context'
import { MainLayout } from 'src/layouts/MainLayout'
import { RegisterLayout } from 'src/layouts/RegisterLayout'
// import { Cart } from 'src/pages/Cart'
// import { Login } from 'src/pages/Login'
// import { ProductDetail } from 'src/pages/ProductDetail'
// import { ProductList } from 'src/pages/ProductList'
// import { Register } from 'src/pages/Register'
import { CartLayout } from 'src/layouts/CartLayout'
import { UserLayout } from 'src/pages/User/layouts/UserLayout'
// import { ChangePassword } from 'src/pages/User/pages/ChangePassword'
// import { HistoryPurchase } from 'src/pages/User/pages/HistoryPurchase'
// import { Profile } from 'src/pages/User/pages/Profile'
// import { NotFound } from 'src/pages/NotFound'

const Login = lazy(() => import('src/pages/Login').then((module) => ({ default: module.Login })))
const ProductList = lazy(() => import('src/pages/ProductList').then((module) => ({ default: module.ProductList })))
const Profile = lazy(() => import('src/pages/User/pages/Profile').then((module) => ({ default: module.Profile })))
const Register = lazy(() => import('src/pages/Register').then((module) => ({ default: module.Register })))
const ProductDetail = lazy(() =>
  import('src/pages/ProductDetail').then((module) => ({ default: module.ProductDetail }))
)
const Cart = lazy(() => import('src/pages/Cart').then((module) => ({ default: module.Cart })))
const ChangePassword = lazy(() =>
  import('src/pages/User/pages/ChangePassword').then((module) => ({ default: module.ChangePassword }))
)
const HistoryPurchase = lazy(() =>
  import('src/pages/User/pages/HistoryPurchase').then((module) => ({ default: module.HistoryPurchase }))
)
const NotFound = lazy(() => import('src/pages/NotFound').then((module) => ({ default: module.NotFound })))

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
              <Suspense>
                <Login />
              </Suspense>
            </RegisterLayout>
          )
        },
        {
          path: path.register,
          element: (
            <RegisterLayout>
              <Suspense>
                <Register />
              </Suspense>
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
              <Suspense>
                <Cart />
              </Suspense>
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
              element: (
                <Suspense>
                  <Profile />
                </Suspense>
              )
            },
            {
              path: path.changePassword,
              element: (
                <Suspense>
                  <ChangePassword />
                </Suspense>
              )
            },
            {
              path: path.historyPurchase,
              element: (
                <Suspense>
                  <HistoryPurchase />
                </Suspense>
              )
            }
          ]
        }
      ]
    },
    {
      path: path.productDetail,
      element: (
        <MainLayout>
          <Suspense>
            <ProductDetail />
          </Suspense>
        </MainLayout>
      )
    },
    {
      path: '',
      index: true,
      element: (
        <MainLayout>
          <Suspense>
            <ProductList />
          </Suspense>
        </MainLayout>
      )
    },
    {
      path: '*',
      index: true,
      element: (
        <MainLayout>
          <Suspense>
            <NotFound />
          </Suspense>
        </MainLayout>
      )
    }
  ])

  return routeElements
}

export default useRouteElements
