import { Link } from 'react-router-dom'

import { ArrowDownIcon, CartIcon, GlobalIcon, SearchIcon, ShopeeIconLogo } from '../Icons'
import { Popover } from '../Popover'
import usePopover from 'src/hooks/usePopover'
import { useContext } from 'react'
import { AppContext } from 'src/context/app.context'

function Header() {
  const { renderCardPopover, renderLanguagePopover, renderUserPopover } = usePopover()
  const { isAuthenticated } = useContext(AppContext)

  return (
    <div className='pb-5 pt-2 bg-[linear-gradient(-180deg,#f53d2d,#f63)] text-white'>
      <div className='container'>
        <div className='flex justify-end'>
          <Popover
            className='flex items-center  py-1 hover:text-gray-300 cursor-pointer'
            renderPopover={renderLanguagePopover()}
          >
            <GlobalIcon />
            <span className='mx-1'>Tiếng Việt</span>
            <ArrowDownIcon />
          </Popover>

          {isAuthenticated && (
            <Popover
              className='flex items-center py-1 hover:text-gray-300 cursor-pointer ml-6'
              renderPopover={renderUserPopover()}
            >
              <div className='w-5 h-5 mr-2 flex-shrink-0'>
                <img
                  src='https://down-vn.img.susercontent.com/file/vn-11134004-7r98o-lm70dawd3g7zd8_tn'
                  alt='avatar'
                  className='w-full h-full object-cover rounded-full'
                />
              </div>
              <div>vovykhang</div>
            </Popover>
          )}

          {!isAuthenticated && (
            <div className='flex items-center'>
              <Link to='/register' className='mx-3 capitalize hover:text-white/70'>
                Đăng ký
              </Link>
              <div className='border-r-[1px] border-r-white h-4' />
              <Link to='/login' className='mx-3 capitalize hover:text-white/70'>
                Đăng nhập
              </Link>
            </div>
          )}
        </div>

        <div className='grid grid-cols-12 gap-4 mt-4 items-end'>
          <Link to='/' className='col-span-2'>
            <ShopeeIconLogo />
          </Link>
          <form className='col-span-9'>
            <div className='bg-white rounded-sm p-1 flex'>
              <input
                type='text'
                name='search'
                className='text-black px-3 py-2 flex-grow border-none outline-none bg-transparent'
                placeholder='FREESHIP ĐƠN TỪ 0Đ'
              />
              <button className='rounded-sm py-2 px-6 flex-shrink-0 bg-orange hover:opacity-90'>
                <SearchIcon />
              </button>
            </div>
          </form>
          <div className='col-span-1 justify-self-end'>
            <Popover placement='bottom-end' renderPopover={renderCardPopover()}>
              <Link to='' className='rounded-sm text-white hover:bg-opacity-90'>
                <CartIcon />
              </Link>
            </Popover>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
