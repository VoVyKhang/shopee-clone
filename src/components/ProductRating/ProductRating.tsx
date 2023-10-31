import { StarFullGrayIcon, StarFullIcon } from '../Icons'

function ProductRating({
  rating,
  activeClassname = 'w-3 h-3 fill-yellow-300 text-yellow-300',
  nonActiveClassname = 'w-3 h-3 fill-current text-gray-300'
}: {
  rating: number
  activeClassname?: string
  nonActiveClassname?: string
}) {
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
              <StarFullIcon className={activeClassname} />
            </div>
            <StarFullGrayIcon className={nonActiveClassname} />
          </div>
        ))}
    </div>
  )
}

export default ProductRating
