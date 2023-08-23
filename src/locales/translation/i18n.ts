import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import HOME_EN from '@/locales/en/homePage.json'
import PRODUCTS_EN from '@/locales/en/products.json'
import HOME_VI from '@/locales/vi/homePage.json'
import PRODUCTS_VI from '@/locales/vi/products.json'

export const locales = {
  en: 'English',
  vi: 'Tiếng Việt',
} as const

export const resources = {
  en: {
    home: HOME_EN,
    product: PRODUCTS_EN,
  },
  vi: {
    home: HOME_VI,
    product: PRODUCTS_VI,
  },
}

export const defaultNS = 'home'

i18n.use(initReactI18next).init({
  resources,
  lng: 'vi',
  ns: ['home', 'products'],
  fallbackLng: 'vi',
  defaultNS,
  interpolation: {
    escapeValue: false,
  },
})
