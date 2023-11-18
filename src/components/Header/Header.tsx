import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from 'react-query'
import { CartIcon, SearchIcon, ShopeeIconLogo } from '../Icons'
import { Popover } from '../Popover'
import { AppContext } from 'src/context/app.context'
import { purchasesStatus } from 'src/constants/purchase'
import { formatCurrency } from 'src/utils/utils'
import { NavHeader } from '../NavHeader'
import purchaseApi from 'src/apis/purchase.api'
import noProduct from 'src/assets/images/no-product.png'
import path from 'src/constants/path'
import useSearchProducts from 'src/hooks/useSearchProducts'

const MAX_PURCHASES = 5

function Header() {
  const { isAuthenticated } = useContext(AppContext)
  const { register, onSubmitSearch } = useSearchProducts()

  const { data: purchasesInCart } = useQuery({
    queryKey: ['purchases', { status: purchasesStatus.inCart }],
    queryFn: () => purchaseApi.getPurchases({ status: purchasesStatus.inCart }),
    enabled: isAuthenticated
  })

  const purchaseInCart = purchasesInCart?.data.data

  const renderCardPopover = () => (
    <div className='relative bg-white shadow-md rounded-sm border border-gray-200 text-sm'>
      {purchaseInCart && purchaseInCart.length > 0 ? (
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

  return (
    <div className='pb-5 pt-2 bg-[linear-gradient(-180deg,#f53d2d,#f63)] text-white'>
      <div className='container'>
        <NavHeader />

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
                {purchaseInCart && purchaseInCart.length > 0 && (
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
