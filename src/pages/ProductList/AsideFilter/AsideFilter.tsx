import { Link } from 'react-router-dom'
import { Button } from 'src/components/Button'
import { ArrowRightIcon, FilterIcon, ListIcon } from 'src/components/Icons'
import StarFull from 'src/components/Icons/StarFull'
import { Input } from 'src/components/Input'
import path from 'src/constants/path'

function AsideFilter() {
  return (
    <div className='py-4'>
      <Link to={path.home} className='flex items-center font-bold '>
        <ListIcon />
        Tất cả danh mục
      </Link>
      <div className='bg-gray-300 h-[1px] my-4' />

      <ul>
        <li className='py-2 pl-2'>
          <Link to={path.home} className='relative px-2 text-orange font-semibold'>
            <ArrowRightIcon />
            Thời trang nam
          </Link>
        </li>
        <li className='py-2 pl-2'>
          <Link to={path.home} className='relative px-2'>
            Điện thoại
          </Link>
        </li>
      </ul>

      <Link to={path.home} className='flex items-center font-bold mt-4 uppercase'>
        <FilterIcon />
        Bộ Lọc Tìm Kiếm
      </Link>
      <div className='bg-gray-300 h-[1px] my-4' />

      <div className='my-5'>
        <div>Khoản giá </div>
        <form className='mt-2'>
          <div className='flex items-start'>
            <Input
              type='text'
              className='grow'
              name='from'
              placeholder='đ TỪ'
              classNameInput='p-1 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
            />

            <div className='mx-2 mt-2 shrink-0'>-</div>

            <Input
              type='text'
              className='grow'
              name='from'
              placeholder='đ ĐẾN'
              classNameInput='p-1 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
            />
          </div>
          <Button className='w-full p-2 uppercase bg-orange text-white text-sm hover:bg-orange/80 flex justify-center items-center'>
            Áp dụng
          </Button>
        </form>
      </div>

      <div className='bg-gray-300 h-[1px] my-4' />
      <div className='text-sm'>Đánh giá</div>
      <ul className='my-3'>
        <li className='py-1 pl-2'>
          <Link to='' className='flex items-center text-sm'>
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <StarFull key={index} className='w-4 h-4 mr-1' />
              ))}
            <span>Trở lên</span>
          </Link>
        </li>
        <li className='py-1 pl-2'>
          <Link to='' className='flex items-center text-sm'>
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <StarFull key={index} className='w-4 h-4 mr-1' />
              ))}
            <span>Trở lên</span>
          </Link>
        </li>
      </ul>
      <div className='bg-gray-300 h-[1px] my-4' />
      <Button className='w-full p-2 uppercase bg-orange text-white text-sm hover:bg-orange/80 flex justify-center items-center'>
        Xóa tất cả
      </Button>
    </div>
  )
}

export default AsideFilter
