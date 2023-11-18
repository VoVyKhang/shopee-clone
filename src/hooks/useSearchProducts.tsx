import { yupResolver } from '@hookform/resolvers/yup'
import useQueryConfig from './useQueryConfig'
import { useForm } from 'react-hook-form'
import { Schema, schema } from 'src/utils/rules'
import { omit } from 'lodash'
import { createSearchParams, useNavigate } from 'react-router-dom'
import path from 'src/constants/path'

type FomData = Pick<Schema, 'name'>

export default function useSearchProducts() {
  const queryConfig = useQueryConfig()
  const navigate = useNavigate()

  const nameSchema = schema.pick(['name'])

  const { register, handleSubmit } = useForm<FomData>({
    defaultValues: {
      name: ''
    },
    resolver: yupResolver(nameSchema)
  })

  const onSubmitSearch = handleSubmit((data) => {
    const config = queryConfig.order
      ? omit(
          {
            ...queryConfig,
            name: data.name as string
          },
          ['order', 'sort_by']
        )
      : {
          ...queryConfig,
          name: data.name as string
        }

    navigate({
      pathname: path.home,
      search: createSearchParams(config).toString()
    })
  })
  return {
    register,
    onSubmitSearch
  }
}
