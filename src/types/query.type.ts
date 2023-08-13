import { ProductListConfig } from './product.type'

export type QueryConfig = {
  [key in keyof ProductListConfig]: string
}
