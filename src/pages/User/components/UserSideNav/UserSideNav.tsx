import { Link } from 'react-router-dom'
import { DocumentIcon, EditIcon, EyeIcon, UserIcon } from 'src/components/Icons'
import path from 'src/constants/path'

export default function UserSideNav() {
  return (
    <div>
      <div className='flex items-center border-b border-b-gray-200 py-4'>
        <Link to={path.profile} className='h-12 w-12 flex-shrink-0 overflow-hidden rounded-full border border-black/10'>
          <img
            src='https://down-vn.img.susercontent.com/file/vn-11134004-7r98o-lm70dawd3g7zd8_tn'
            alt='avatar'
            className='h-full w-full object-cover'
          />
        </Link>
        <div className='flex-grow pl-4'>
          <div className='mb-1 truncate font-semibold text-gray-600'>abcxyz</div>
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
