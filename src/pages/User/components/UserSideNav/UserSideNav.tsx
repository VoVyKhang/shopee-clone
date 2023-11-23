import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { DocumentIcon, EditIcon, EyeIcon, UserIcon } from 'src/components/Icons'
import path from 'src/constants/path'
import { AppContext } from 'src/context/app.context'
import userImage from 'src/assets/images/user.svg'

export default function UserSideNav() {
  const { profile } = useContext(AppContext)

  return (
    <div>
      <div className='flex items-center border-b border-b-gray-200 py-4'>
        <Link to={path.profile} className='h-12 w-12 flex-shrink-0 overflow-hidden rounded-full border border-black/10'>
          <img src={profile?.avatar || userImage} alt='avatar' className='h-full w-full object-cover' />
        </Link>
        <div className='flex-grow pl-4'>
          <div className='mb-1 truncate font-semibold text-gray-600 md:w-24'>{profile?.email}</div>
          <Link to={path.profile} className='flex items-center capitalize text-gray-500'>
            <EditIcon />
            Sửa hồ sơ
          </Link>
        </div>
      </div>
      <div className='mt-7'>
        <Link to={path.profile} className='flex items-center capitalize text-orange transition-colors'>
          <div className='mr-2 h-[20px] w-[20px]'>
            <UserIcon className='w-full h-full' />
          </div>
          Tài khoản của tôi
        </Link>

        <Link to={path.changePassword} className='mt-4 flex items-center capitalize text-gray-600 transition-colors'>
          <div className='mr-2 h-[20px] w-[20px]'>
            <EyeIcon className='w-full h-full' />
          </div>
          Đổi mật khẩu
        </Link>

        <Link to={path.historyPurchase} className='mt-4 flex items-center capitalize text-gray-600 transition-colors'>
          <div className='mr-2 h-[20px] w-[20px]'>
            <DocumentIcon className='w-full h-full' />
          </div>
          Đơn mua
        </Link>
      </div>
    </div>
  )
}