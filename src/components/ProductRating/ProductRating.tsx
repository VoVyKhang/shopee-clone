import { StarFullGrayIcon, StarFullIcon } from '../Icons'

function ProductRating({ rating }: { rating: number }) {
  const handleWidth = (order: number) => {
    if (order <= rating) {
      return '100%'
    }

    if (order > rating && order - rating < 1) {
      return (rating - Math.floor(rating)) * 100 + '%'
    }

    return '0%'
  }

  return (
    <div className='flex items-center'>
      {Array(5)
        .fill(0)
        .map((_, index) => (
          <div className='relative' key={index}>
            <div className='absolute top-0 left-0 h-full overflow-hidden' style={{ width: handleWidth(index + 1) }}>
              <StarFullIcon className='w-3 h-3 fill-yellow-300 text-yellow-300' />
            </div>
            <StarFullGrayIcon className='w-3 h-3 fill-current text-gray-300' />
          </div>
        ))}
    </div>
  )
}

export default ProductRating
