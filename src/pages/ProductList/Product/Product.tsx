import { Link } from 'react-router-dom'
import { StarFullGrayIcon, StarFullIcon } from 'src/components/Icons'

function Product() {
  return (
    <Link to='/'>
      <div className='bg-white shadow rounded-sm hover:translate-y-[-0.04rem] hover:shadow-md duration-100 transition-transform overflow-hidden'>
        <div className='w-full pt-[100%] relative'>
          <img
            src='https://down-vn.img.susercontent.com/file/d8eceb8faa676bb4bfc67a4d8edd6074_tn'
            alt='product'
            className='absolute top-0 left-0 bg-white w-full h-full object-cover'
          />
        </div>
        <div className='p-2 overflow-hidden'>
          <div className='min-h-[2rem] line-clamp-2 text-xs'>
            Áo Polo Teelab Special chất cá sấu thoáng mát co dãn 4c , áo thun có cổ local brand nam nữ unisex form rộng
          </div>
          <div className='flex items-center mt-3'>
            <div className='line-through max-w-[50%] text-gray-500 truncate'>
              <span className='text-xs'>đ</span>
              <span>5.000</span>
            </div>
            <div className='text-orange truncate ml-1'>
              <span className='text-xs'>đ</span>
              <span>2.000</span>
            </div>
          </div>
          <div className='mt-3 flex items-center justify-start'>
            <div className='flex items-center'>
              <div className='relative'>
                <div className='absolute top-0 left-0 h-full w-[50%] overflow-hidden '>
                  <StarFullIcon className='w-3 h-3 fill-yellow-300 text-yellow-300' />
                </div>
                <StarFullGrayIcon className='w-3 h-3 fill-current text-gray-300' />
              </div>
            </div>
            <div className='ml-2 text-sm'>
              <span>5.66k</span>
              <span className='ml-1'>Đã bán</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Product
