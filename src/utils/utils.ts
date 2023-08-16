import axios, { AxiosError } from 'axios'
import cloneDeep from 'lodash/cloneDeep'
import moment from 'moment/moment'

import HttpStatusCode from '@/constants/httpStatusCode.enum'
import { Purchase } from '@/types/purchase.type'

export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  return axios.isAxiosError(error)
}

export function isAxiosUnprocessableEntityError<FormError>(error: unknown): error is AxiosError<FormError> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
}

export function formatCurrency(currency: number) {
  return Intl.NumberFormat('de-DE').format(currency)
}

export function formatNumberToSocialStyle(value: number) {
  return new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 })
    .format(value)
    .replace('.', ',')
    .toLowerCase()
}

export function calcDiscountPercentage(priceBeforeDiscount: number, priceAfterDiscount: number) {
  return Math.round(100 - (priceAfterDiscount / priceBeforeDiscount) * 100)
}

function removeSpecialCharacter(str: string) {
  // eslint-disable-next-line no-useless-escape
  return str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, '')
}

export function generateSlug({ name, id }: { name: string; id: string }) {
  return `${removeSpecialCharacter(name).replace(/\s/g, '-')}-id${id}`
}

export function getIdFromSlug(slug: string) {
  const arr = slug.split('-id')

  return arr[arr.length - 1]
}

export function trimLeadingZeros(str: string) {
  return str.replace(/^0+/, '')
}

export function sortProductsByLatestUpdate<T extends Purchase>(products: T[]): T[] {
  const clonedProducts = cloneDeep(products)

  return clonedProducts.sort((prev, curr) => {
    if (moment(prev.updatedAt).isBefore(curr.updatedAt) === true) {
      return 1
    } else if (moment(prev.updatedAt).isBefore(curr.updatedAt) === false) {
      return -1
    }
    return 0
  })
}
