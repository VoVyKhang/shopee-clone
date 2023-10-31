import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { ChevronLeftIcon, ChevronRightIcon, MinusIcon, PlusIcon, ShoppingCartIcon } from 'src/components/Icons'
import { InputNumber } from 'src/components/InputNumber'
import { ProductRating } from 'src/components/ProductRating'
import { formatCurrency, formatNumberToSocialStyle, getIdFromNameId, rateSale } from 'src/utils/utils'
import { useMemo, useState, useEffect, useRef } from 'react'
import { Product as ProductType, ProductListConfig } from 'src/types/product.type'
import { Product } from '../ProductList/components/Product'
import productApi from 'src/apis/product.api'
import DOMPurify from 'dompurify'

function ProductDetail() {
  const { nameId } = useParams()
  const id = getIdFromNameId(nameId as string)
  const [currentIndexImages, setCurrentIndexImages] = useState([0, 5])
  const [activeImage, setActiveImage] = useState('')
  const imageRef = useRef<HTMLImageElement>(null)

  const { data: productDetailData } = useQuery({
    queryKey: ['product', id],
    queryFn: () => {
      return productApi.getProductDetail(id as string)
    }
  })

  const product = productDetailData?.data.data
  const currentImages = useMemo(
    () => (product ? product.images.slice(...currentIndexImages) : []),
    [product, currentIndexImages]
  )

  const queryConfig: ProductListConfig = { limit: '20', page: '1', category: product?.category._id }

  const { data: productsData } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => {
      return productApi.getProducts(queryConfig)
    },
    enabled: Boolean(product),
    staleTime: 3 * 60 * 1000
  })

  const chooseActive = (img: string) => {
    setActiveImage(img)
  }

  const next = () => {
    if (currentIndexImages[1] < (product as ProductType)?.images.length) {
      setCurrentIndexImages((prev) => [prev[0] + 1, prev[1] + 1])
    }
  }

  const prev = () => {
    if (currentIndexImages[0] > 0) {
      setCurrentIndexImages((prev) => [prev[0] - 1, prev[1] - 1])
    }
  }

  const handleZoom = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const image = imageRef.current as HTMLImageElement
    const { naturalHeight, naturalWidth } = image
    // Option 1: Collect OffsetX, offsetY when handled bubble event
    // const { offsetX, offsetY } = event.nativeEvent

    // Option 2: Collect OffsetX, offsetY when we not handled bubble event
    const offsetX = event.pageX - (rect.x + window.scrollX)
    const offsetY = event.pageY - (rect.y + window.scrollY)

    const left = offsetX * (1 - naturalWidth / rect.width)
    const top = offsetY * (1 - naturalWidth / rect.height)
    image.style.width = naturalWidth + 'px'
    image.style.height = naturalHeight + 'px'
    image.style.maxWidth = 'unset'
    image.style.top = top + 'px'
    image.style.left = left + 'px'
  }

  const handleRemoveZoom = () => {
    imageRef.current?.removeAttribute('style')
  }

  useEffect(() => {
    if (product && product.images.length > 0) {
      setActiveImage(product.images[0])
    }
  }, [product])

  if (!product) return null

  return (
    <div className='bg-gray-200 py-6'>
      <div className='container'>
        <div className='bg-white p-4 shadow'>
          <div className='grid grid-cols-12 gap-9'>
            <div className='col-span-5'>
              <div
                className='relative w-full pt-[100%] shadow overflow-hidden cursor-zoom-in'
                onMouseMove={handleZoom}
                onMouseLeave={handleRemoveZoom}
              >
                <img
                  alt={product?.name}
                  src={activeImage}
                  ref={imageRef}
                  className='absolute  top-0 left-0 h-full w-full bg-white object-cover'
                />
              </div>
              <div className='relative mt-4 grid grid-cols-5 gap-1'>
                <button
                  className='absolute left-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white'
                  onClick={prev}
                >
                  <ChevronLeftIcon className='w-5 h-5' />
                </button>
                {currentImages.map((img) => {
                  const isActive = img === activeImage
                  return (
                    <div className='relative w-full pt-[100%]' key={img} onMouseEnter={() => chooseActive(img)}>
                      <img
                        src={img}
                        alt={product?.name}
                        className='absolute top-0 left-0 w-full h-full cursor-pointer bg-white object-cover'
                      />
                      {isActive && <div className='absolute border-2 border-orange inset-0' />}
                    </div>
                  )
                })}
                <button
                  className='absolute right-0 top-1/2 -translate-y-1/2 z-10 h-9 w-5  bg-black/20 text-white'
                  onClick={next}
                >
                  <ChevronRightIcon className='w-5 h-5' />
                </button>
              </div>
            </div>
            <div className='col-span-7'>
              <h1 className='text-xl font-medium uppercase'>{product?.name}</h1>
              <div className='mt-8 flex items-center'>
                <div className='flex items-center'>
                  <span className='mr-1 border-b border-b-orange text-orange'>{product?.rating}</span>
                  <ProductRating
                    rating={product?.rating as number}
                    activeClassname='fill-orange text-orange h-4 2-4'
                    nonActiveClassname='fill-gray-300 text-gray-300 h-4 w-4'
                  />
                </div>
                <div className='mx-4 h-4 w-[1px] bg-gray-300' />
                <div>
                  <span>{formatNumberToSocialStyle(product?.sold as number)}</span>
                  <span className='ml-1 text-gray-500'>Đã bán</span>
                </div>
              </div>
              <div className='mt-8 flex items-center bg-gray-50 px-5 py-4'>
                <div className='text-gray-500 line-through'>
                  đ{formatCurrency(product?.price_before_discount as number)}
                </div>
                <div className='ml-3 text-3xl font-medium text-orange'>đ{formatCurrency(product?.price as number)}</div>
                <div className='ml-4 rounded-sm bg-orange px-1 py-[2px] text-xs font-semibold uppercase text-white'>
                  {rateSale(product?.price_before_discount as number, product?.price as number)}
                </div>
              </div>

              <div className='mt-8 flex items-center'>
                <div className='capitalize text-gray-500'>Số lượng</div>
                <div className='ml-10 flex items-center'>
                  <button className='flex items-center h-8 w-8 justify-center rounded-l-sm border border-gray-300'>
                    <MinusIcon className='w-4 h-4' />
                  </button>
                  <InputNumber
                    value={1}
                    className=''
                    classNameInput='h-8 w-14 border-t border-b border-gray-300 p-1 text-center outline-none'
                    classNameError='hidden'
                  />
                  <button className='flex items-center h-8 w-8 justify-center rounded-r-sm border border-gray-300'>
                    <PlusIcon className='w-4 h-4' />
                  </button>
                </div>
                <div className='ml-6 text-sm text-gray-500'>{product?.quantity} sản phẩm có sẵn</div>
              </div>

              <div className='mt-8 flex items-center'>
                <button className='flex h-12 items-center justify-center rounded-sm border border-orange bg-orange/10 px-5 capitalize text-orange shadow-sm hover:bg-orange/5'>
                  <ShoppingCartIcon className='mr-[10px] w-5 h-5 fill-current stroke-orange text-orange' />
                  Thêm Vào Giỏ Hàng
                </button>
                <button className='ml-4 flex h-12 min-w-[5rem] justify-center items-center rounded-sm bg-orange px-5 capitalize text-white shadow-sm outline-none hover:bg-orange/90'>
                  Mua ngay
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='mt-8'>
        <div className='container'>
          <div className=' bg-white p-4 shadow'>
            <div className='rounded bg-gray-50 p-4 text-lg capitalize text-slate-700'>Mô tả sản phẩm</div>
            <div className='mx-4 mt-12 mb-4 text-sm leading-loose'>
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(product?.description as string)
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className='mt-8'>
        <div className='container'>
          <div className='uppercase text-gray-400 '>CÓ THỂ BẠN CŨNG THÍCH</div>
          {productsData && (
            <div className='mt-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3'>
              {productsData.data.data.products.map((product) => (
                <div className='col-span-1' key={product._id}>
                  <Product product={product} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
