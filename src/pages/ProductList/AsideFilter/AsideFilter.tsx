import { Link, createSearchParams } from 'react-router-dom'
import { Button } from 'src/components/Button'
import { ArrowRightIcon, FilterIcon, ListIcon } from 'src/components/Icons'
import StarFull from 'src/components/Icons/StarFull'
import { Input } from 'src/components/Input'
import path from 'src/constants/path'
import { QueryConfig } from '../ProductList'
import { Category } from 'src/types/category.type'
import classNames from 'classnames'

interface Props {
  queryConfig: QueryConfig
  categories: Category[]
}

function AsideFilter({ queryConfig, categories }: Props) {
  const { category } = queryConfig

  return (
    <div className='py-4'>
      <Link
        to={path.home}
        className={classNames('flex items-center font-bold ', {
          'text-orange': !category
        })}
      >
        <ListIcon />
        Tất cả danh mục
      </Link>
      <div className='bg-gray-300 h-[1px] my-4' />

      <ul>
        {categories.map((categoryItem) => {
          const isActive = categoryItem._id === category

          return (
            <li key={categoryItem._id} className='py-2 pl-2'>
              <Link
                to={{
                  pathname: path.home,
                  search: createSearchParams({
                    ...queryConfig,
                    category: categoryItem._id
                  }).toString()
                }}
                className={classNames('relative px-2 ', {
                  'text-orange font-semibold': isActive
                })}
              >
                {isActive && <ArrowRightIcon />}
                {categoryItem.name}
              </Link>
            </li>
          )
        })}
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
