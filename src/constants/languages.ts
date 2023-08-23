export const LANGUAGES = {
  vi: 'vi',
  en: 'en',
} as const

export type Language = keyof typeof LANGUAGES
