import axios, { AxiosError } from 'axios'
import cloneDeep from 'lodash/cloneDeep'

import HttpStatusCode from '@/constants/httpStatusCode.enum'
import { Purchase } from '@/types/purchase.type'
import defaultAvatar from '@/assets/images/defaultAvatar.svg'
import { ErrorResponse } from '@/types/utils.type'

function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  return axios.isAxiosError(error)
}

export function isAxiosUnprocessableEntityError<FormError>(error: unknown): error is AxiosError<FormError> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
}

export function isAxiosUnauthorizedError<UnauthorizedError>(error: unknown): error is AxiosError<UnauthorizedError> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.Unauthorized
}

export function isAxiosExpiredTokenError<UnauthorizedError>(error: unknown): error is AxiosError<UnauthorizedError> {
  return (
    isAxiosUnauthorizedError<ErrorResponse<{ message: string; name: string }>>(error) &&
    error.response?.data.data?.name === 'EXPIRED_TOKEN'
  )
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

  return clonedProducts.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
}

export function getAvatarUrl(avatarName?: string) {
  return avatarName ? `${import.meta.env.VITE_IMAGE_URL}/${avatarName}` : defaultAvatar
}
