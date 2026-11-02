export type Locale = (typeof locales)[number]

export const locales = ['en', 'de', 'mk'] as const
export const defaultLocale: Locale = 'de'
