import { Link, createSearchParams, useNavigate } from 'react-router-dom'
import { Button } from 'src/components/Button'
import { ArrowRightIcon, FilterIcon, ListIcon } from 'src/components/Icons'
import { Category } from 'src/types/category.type'
import { QueryConfig } from '../../ProductList'
import { InputNumber } from 'src/components/InputNumber'
import { Controller, useForm } from 'react-hook-form'
import { Schema, schema } from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { NoUndefinedField } from 'src/types/utils.type'
import { RatingStars } from '../RatingStars'
import omit from 'lodash/omit'
import path from 'src/constants/path'
import classNames from 'classnames'

interface Props {
  queryConfig: QueryConfig
  categories: Category[]
}

type FormData = NoUndefinedField<Pick<Schema, 'price_min' | 'price_max'>>

const priceScheme = schema.pick(['price_min', 'price_max'])

function AsideFilter({ queryConfig, categories }: Props) {
  const { category } = queryConfig
  const navigate = useNavigate()

  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      price_min: '',
      price_max: ''
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: yupResolver<any>(priceScheme),
    shouldFocusError: false
  })

  const onSubmit = handleSubmit((data) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        price_min: data.price_min,
        price_max: data.price_max
      }).toString()
    })
  })

  const handleRemoveAll = () => {
    navigate({
      pathname: path.home,
      search: createSearchParams(omit(queryConfig, ['price_min', 'price_max', 'rating_filter', 'category'])).toString()
    })
  }

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
        <form className='mt-2' onSubmit={onSubmit}>
          <div className='flex items-start'>
            <Controller
              control={control}
              name='price_min'
              render={({ field }) => {
                return (
                  <InputNumber
                    {...field}
                    type='text'
                    className='grow'
                    placeholder='đ TỪ'
                    classNameInput='p-1 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                    classNameError='hidden'
                    onChange={(event) => {
                      field.onChange(event)
                      trigger('price_max')
                    }}
                    value={field.value}
                    ref={field.ref}
                  />
                )
              }}
            />

            <div className='mx-2 mt-2 shrink-0'>-</div>

            <Controller
              control={control}
              name='price_max'
              render={({ field }) => {
                return (
                  <InputNumber
                    {...field}
                    type='text'
                    className='grow'
                    placeholder='đ ĐẾN'
                    classNameInput='p-1 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                    classNameError='hidden'
                    onChange={(event) => {
                      field.onChange(event)
                      trigger('price_min')
                    }}
                  />
                )
              }}
            />
          </div>
          <div className='mt-1 text-red-600 min-h-[1rem] text-sm text-center'>{errors.price_min?.message}</div>
          <Button className='w-full p-2 uppercase bg-orange text-white text-sm hover:bg-orange/80 flex justify-center items-center'>
            Áp dụng
          </Button>
        </form>
      </div>

      <div className='bg-gray-300 h-[1px] my-4' />
      <div className='text-sm'>Đánh giá</div>
      <RatingStars queryConfig={queryConfig} />
      <div className='bg-gray-300 h-[1px] my-4' />
      <Button
        onClick={handleRemoveAll}
        className='w-full p-2 uppercase bg-orange text-white text-sm hover:bg-orange/80 flex justify-center items-center'
      >
        Xóa tất cả
      </Button>
    </div>
  )
}

export default AsideFilter
