import { createSearchParams, useNavigate } from 'react-router-dom'
import { StarEmptyIcon } from 'src/components/Icons'
import StarFull from 'src/components/Icons/StarFull'
import path from 'src/constants/path'
import { QueryConfig } from '../../ProductList'

interface Props {
  queryConfig: QueryConfig
}

function RatingStars({ queryConfig }: Props) {
  const navigate = useNavigate()

  const handleFilterStar = (ratingFilter: number) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        rating_filter: String(ratingFilter)
      }).toString()
    })
  }

  return (
    <ul className='my-3'>
      {Array(5)
        .fill(0)
        .map((_, index) => (
          <li className='py-1 pl-2' key={index}>
            <div
              aria-hidden='true'
              className='flex items-center text-sm cursor-pointer'
              tabIndex={0}
              role='button'
              onClick={() => handleFilterStar(5 - index)}
            >
              {Array(5)
                .fill(0)
                .map((_, indexStar) => {
                  if (indexStar < 5 - index) {
                    return <StarFull key={indexStar} className='w-4 h-4 mr-1' />
                  }
                  return <StarEmptyIcon key={indexStar} className='w-4 h-4 mr-1' />
                })}
              {index !== 0 && <span>Trở lên</span>}
            </div>
          </li>
        ))}
    </ul>
  )
}

export default RatingStars
