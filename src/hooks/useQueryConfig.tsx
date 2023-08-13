import omitBy from 'lodash/omitBy'
import isUndefined from 'lodash/isUndefined'

import { QueryConfig } from '@/types/query.type'
import PARAMETER_KEY from '@/constants/parameter'
import useQueryParams from './useQueryParams'

export default function useQueryConfig() {
  const queryParams: QueryConfig = useQueryParams()
  const queryConfig: QueryConfig = omitBy(
    {
      [PARAMETER_KEY.page]: queryParams.page || '1',
      [PARAMETER_KEY.limit]: queryParams.limit || '12',
      [PARAMETER_KEY.sort_by]: queryParams.sort_by,
      [PARAMETER_KEY.exclude]: queryParams.exclude,
      [PARAMETER_KEY.name]: queryParams.name,
      [PARAMETER_KEY.order]: queryParams.order,
      [PARAMETER_KEY.price_max]: queryParams.price_max,
      [PARAMETER_KEY.price_min]: queryParams.price_min,
      [PARAMETER_KEY.rating_filter]: queryParams.rating_filter,
      [PARAMETER_KEY.category]: queryParams.category,
    },
    isUndefined
  )

  return queryConfig
}
