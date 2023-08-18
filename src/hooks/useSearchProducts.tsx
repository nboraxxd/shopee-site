import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { createSearchParams, useNavigate } from 'react-router-dom'
import omit from 'lodash/omit'

import useQueryConfig from '@/hooks/useQueryConfig'
import { Schema, schema } from '@/utils/rules'
import PARAMETER_KEY from '@/constants/parameter'
import { PATH } from '@/constants/path'

type SearchProductSchema = Pick<Schema, 'searchProduct'>
const searchProductSchema = schema.pick(['searchProduct'])

export default function useSearchProducts() {
  const navigate = useNavigate()

  const queryConfig = useQueryConfig()
  const { register, handleSubmit } = useForm<SearchProductSchema>({
    defaultValues: {
      searchProduct: '',
    },
    resolver: yupResolver(searchProductSchema),
  })

  const onSubmitSearch = handleSubmit((data) => {
    const omitDependency = queryConfig.order ? [PARAMETER_KEY.order, PARAMETER_KEY.sort_by] : []

    const searchParamsToString = createSearchParams(
      omit(
        {
          ...queryConfig,
          [PARAMETER_KEY.page]: '1',
          [PARAMETER_KEY.name]: data.searchProduct,
        },
        [
          ...omitDependency,
          PARAMETER_KEY.category,
          PARAMETER_KEY.price_min,
          PARAMETER_KEY.price_max,
          PARAMETER_KEY.rating_filter,
        ]
      )
    ).toString()

    navigate({
      pathname: PATH.products,
      search: searchParamsToString,
    })
  })

  return { register, onSubmitSearch }
}
