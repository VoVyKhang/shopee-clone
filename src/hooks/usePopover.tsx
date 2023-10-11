import { useState, useContext } from 'react'
import { useMutation } from 'react-query'
import { Link } from 'react-router-dom'
import { logout } from 'src/apis/auth.api'
import path from 'src/constants/path'
import { AppContext } from 'src/context/app.context'

function usePopover() {
  const [open, setOpen] = useState(false)
  const { setIsAuthenticated, setProfile } = useContext(AppContext)

  const showPopover = () => {
    setOpen(true)
  }

  const hidePopover = () => {
    setOpen(false)
  }

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      setIsAuthenticated(false)
      setProfile(null)
    }
  })

  const handleLogout = () => {
    logoutMutation.mutate()
  }

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
      <div className='p-2'>
        <div className='text-gray-400 capitalize'>Sản phẩm mới thêm</div>
        <div className='mt-5'>
          <div className='mt-4 flex'>
            <div className='flex shrink-0 w-11 h-11'>
              <img src='https://th.bing.com/th/id/OIP.y0nvMAgaZ6xHL6DcpeQZHQHaEa?pid=ImgDet&rs=1' alt='product' />
            </div>
            <div className='flex-grow ml-2 overflow-hidden'>
              <div className='truncate'>[LIFEMCMBP2 - 12% DON 250K] Sach hay</div>
            </div>
            <div className='ml-2 flex-shrink-0'>
              <span className='text-orange'>đ185.000</span>
            </div>
          </div>

          <div className='mt-4 flex'>
            <div className='flex shrink-0 w-11 h-11'>
              <img src='https://th.bing.com/th/id/OIP.y0nvMAgaZ6xHL6DcpeQZHQHaEa?pid=ImgDet&rs=1' alt='product' />
            </div>
            <div className='flex-grow ml-2 overflow-hidden'>
              <div className='truncate'>[LIFEMCMBP2 - 12% DON 250K] Sach hay</div>
            </div>
            <div className='ml-2 flex-shrink-0'>
              <span className='text-orange'>đ185.000</span>
            </div>
          </div>

          <div className='mt-4 flex'>
            <div className='flex shrink-0 w-11 h-11'>
              <img src='https://th.bing.com/th/id/OIP.y0nvMAgaZ6xHL6DcpeQZHQHaEa?pid=ImgDet&rs=1' alt='product' />
            </div>
            <div className='flex-grow ml-2 overflow-hidden'>
              <div className='truncate'>[LIFEMCMBP2 - 12% DON 250K] Sach hay</div>
            </div>
            <div className='ml-2 flex-shrink-0'>
              <span className='text-orange'>đ185.000</span>
            </div>
          </div>

          <div className='mt-4 flex'>
            <div className='flex shrink-0 w-11 h-11'>
              <img src='https://th.bing.com/th/id/OIP.y0nvMAgaZ6xHL6DcpeQZHQHaEa?pid=ImgDet&rs=1' alt='product' />
            </div>
            <div className='flex-grow ml-2 overflow-hidden'>
              <div className='truncate'>[LIFEMCMBP2 - 12% DON 250K] Sach hay</div>
            </div>
            <div className='ml-2 flex-shrink-0'>
              <span className='text-orange'>đ185.000</span>
            </div>
          </div>

          <div className='mt-4 flex'>
            <div className='flex shrink-0 w-11 h-11'>
              <img src='https://th.bing.com/th/id/OIP.y0nvMAgaZ6xHL6DcpeQZHQHaEa?pid=ImgDet&rs=1' alt='product' />
            </div>
            <div className='flex-grow ml-2 overflow-hidden'>
              <div className='truncate'>[LIFEMCMBP2 - 12% DON 250K] Sach hay</div>
            </div>
            <div className='ml-2 flex-shrink-0'>
              <span className='text-orange'>đ185.000</span>
            </div>
          </div>
        </div>
        <div className='flex justify-between items-center'>
          <div className='capitalize text-xs text-gray-500'>Them hang vao gio</div>
          <button className='capitalize bg-orange hover:bg-opacity-90 px-4 py-2 rounded-sm text-white'>
            Xem gio hang
          </button>
        </div>
      </div>
    </div>
  )

  return {
    open,
    showPopover,
    hidePopover,
    renderLanguagePopover,
    renderUserPopover,
    renderCardPopover
  }
}

export default usePopover
