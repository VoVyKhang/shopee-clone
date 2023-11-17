import { useContext } from 'react'
import { Link, createSearchParams, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQuery, useQueryClient } from 'react-query'

import { ArrowDownIcon, CartIcon, GlobalIcon, SearchIcon, ShopeeIconLogo } from '../Icons'
import { Popover } from '../Popover'
import { AppContext } from 'src/context/app.context'
import path from 'src/constants/path'
import useQueryConfig from 'src/hooks/useQueryConfig'
import { Schema, schema } from 'src/utils/rules'
import { omit } from 'lodash'
import authApi from 'src/apis/auth.api'
import { purchasesStatus } from 'src/constants/purchase'
import purchaseApi from 'src/apis/purchase.api'
import noProduct from 'src/assets/images/no-product.png'
import { formatCurrency } from 'src/utils/utils'

type FomData = Pick<Schema, 'name'>
const nameSchema = schema.pick(['name'])
const MAX_PURCHASES = 5

function Header() {
  const { isAuthenticated, profile } = useContext(AppContext)
  const queryConfig = useQueryConfig()
  const navigate = useNavigate()
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const queryClient = useQueryClient()

  const renderLanguagePopover = () => (
    <div className='relative bg-white shadow-md rounded-sm border border-gray-200'>
      <div className='flex flex-col py-2 px-3 pr-28 pl-3'>
        <button className='py-2 px-3 hover:text-orange text-left'>Tiếng Việt</button>
        <button className='py-2 px-3 hover:text-orange text-left'>English</button>
      </div>
    </div>
  )

  const renderUserPopover = () => (
    <div className='relative bg-white shadow-md rounded-sm border border-gray-200'>
      <div>
        <Link to={path.profile} className='block w-full text-left py-3 px-4 hover:bg-slate-100 hover:text-cyan-500'>
          Tài khoản của tôi
        </Link>
        <Link to='/' className='block w-full text-left py-3 px-4 hover:bg-slate-100 hover:text-cyan-500'>
          Đơn mua
        </Link>
        <button
          className='block py-3 w-full text-left px-4 hover:bg-slate-100 hover:text-cyan-500'
          onClick={handleLogout}
        >
          Đăng xuất
        </button>
      </div>
    </div>
  )

  const renderCardPopover = () => (
    <div className='relative bg-white shadow-md rounded-sm border border-gray-200 max-w-[400px] text-sm'>
      {purchaseInCart ? (
        <div className='p-2'>
          <div className='text-gray-400 capitalize'>Sản phẩm mới thêm</div>
          <div className='mt-5'>
            {purchaseInCart.slice(0, MAX_PURCHASES).map((purchase) => (
              <div className='mt-2 py-2 flex hover:bg-gray-100' key={purchase._id}>
                <div className='flex shrink-0 w-11 h-11'>
                  <img src={purchase.product.image} alt='product' />
                </div>
                <div className='flex-grow ml-2 overflow-hidden'>
                  <div className='truncate'>{purchase.product.name}</div>
                </div>
                <div className='ml-2 flex-shrink-0'>
                  <span className='text-orange'>đ{formatCurrency(purchase.price)}</span>
                </div>
              </div>
            ))}
          </div>
          <div className='flex justify-between items-center'>
            <div className='capitalize text-xs text-gray-500'>
              {purchaseInCart.length > MAX_PURCHASES ? purchaseInCart.length - MAX_PURCHASES : ''} Thêm hàng vào giỏ
            </div>
            <Link to={path.cart} className='capitalize bg-orange hover:bg-opacity-90 px-4 py-2 rounded-sm text-white'>
              Xem gio hang
            </Link>
          </div>
        </div>
      ) : (
        <div className='p-2 w-[300px] h-[300px] flex flex-col items-center justify-center'>
          <img src={noProduct} alt='no purchase' className='w-24 h-24' />
          <div className='mt-3 capitalize'>Chưa có sản phẩm</div>
        </div>
      )}
    </div>
  )

  const logoutMutation = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      setIsAuthenticated(false)
      setProfile(null)
      queryClient.removeQueries({ queryKey: ['purchases', { status: purchasesStatus.inCart }] })
    }
  })

  const handleLogout = () => {
    logoutMutation.mutate()
  }

  const { register, handleSubmit } = useForm<FomData>({
    defaultValues: {
      name: ''
    },
    resolver: yupResolver(nameSchema)
  })

  const onSubmitSearch = handleSubmit((data) => {
    const config = queryConfig.order
      ? omit(
          {
            ...queryConfig,
            name: data.name as string
          },
          ['order', 'sort_by']
        )
      : {
          ...queryConfig,
          name: data.name as string
        }

    navigate({
      pathname: path.home,
      search: createSearchParams(config).toString()
    })
  })

  const { data: purchasesInCart } = useQuery({
    queryKey: ['purchases', { status: purchasesStatus.inCart }],
    queryFn: () => purchaseApi.getPurchases({ status: purchasesStatus.inCart }),
    enabled: isAuthenticated
  })

  const purchaseInCart = purchasesInCart?.data.data

  return (
    <div className='pb-5 pt-2 bg-[linear-gradient(-180deg,#f53d2d,#f63)] text-white'>
      <div className='container'>
        <div className='flex justify-end'>
          <Popover
            className='flex items-center  py-1 hover:text-white/70 cursor-pointer'
            renderPopover={renderLanguagePopover()}
          >
            <GlobalIcon />
            <span className='mx-1'>Tiếng Việt</span>
            <ArrowDownIcon />
          </Popover>

          {isAuthenticated && (
            <Popover
              className='flex items-center py-1 hover:text-white/70 cursor-pointer ml-6'
              renderPopover={renderUserPopover()}
            >
              <div className='w-5 h-5 mr-2 flex-shrink-0'>
                <img
                  src='https://down-vn.img.susercontent.com/file/vn-11134004-7r98o-lm70dawd3g7zd8_tn'
                  alt='avatar'
                  className='w-full h-full object-cover rounded-full'
                />
              </div>
              <div>{profile?.email} </div>
            </Popover>
          )}

          {!isAuthenticated && (
            <div className='flex items-center'>
              <Link to={path.register} className='mx-3 capitalize hover:text-white/70'>
                Đăng ký
              </Link>
              <div className='border-r-[1px] border-r-white h-4' />
              <Link to={path.login} className='mx-3 capitalize hover:text-white/70'>
                Đăng nhập
              </Link>
            </div>
          )}
        </div>

        <div className='grid grid-cols-12 gap-4 mt-4 items-end'>
          <Link to='/' className='col-span-2'>
            <ShopeeIconLogo />
          </Link>
          <form className='col-span-9' onSubmit={onSubmitSearch}>
            <div className='bg-white rounded-sm p-1 flex'>
              <input
                type='text'
                className='text-black px-3 py-2 flex-grow border-none outline-none bg-transparent'
                placeholder='FREESHIP ĐƠN TỪ 0Đ'
                {...register('name')}
              />
              <button className='rounded-sm py-2 px-6 flex-shrink-0 bg-orange hover:opacity-90'>
                <SearchIcon />
              </button>
            </div>
          </form>
          <div className='col-span-1 justify-self-end'>
            <Popover placement='bottom-end' renderPopover={renderCardPopover()}>
              <Link to='/' className='relative rounded-sm text-white hover:bg-opacity-90'>
                <CartIcon />
                {purchaseInCart && (
                  <span className='absolute top-[-5px] left-[17px] bg-white rounded-full px-[9px] py-[1px] text-orange text-xs'>
                    {purchaseInCart?.length}
                  </span>
                )}
              </Link>
            </Popover>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
