import { Link } from 'react-router-dom'
import { ArrowDownIcon, GlobalIcon } from '../Icons'
import { Popover } from '../Popover'
import { useContext } from 'react'
import { AppContext } from 'src/context/app.context'
import { useMutation, useQueryClient } from 'react-query'
import { purchasesStatus } from 'src/constants/purchase'
import authApi from 'src/apis/auth.api'
import path from 'src/constants/path'
import { getAvatarURL } from 'src/utils/utils'

export default function NavHeader() {
  const { isAuthenticated, profile } = useContext(AppContext)
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const queryClient = useQueryClient()

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

  return (
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
            <img src={getAvatarURL(profile?.avatar)} alt='avatar' className='w-full h-full object-cover rounded-full' />
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
  )
}
