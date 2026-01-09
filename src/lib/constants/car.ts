export const Transmission = {
  manual: 'manual',
  automatic: 'automatic',
} as const

export const FuelType = {
  diesel: 'diesel',
  petrol: 'petrol',
  hybrid: 'hybrid',
  electric: 'electric',
} as const

export type Transmission = (typeof Transmission)[keyof typeof Transmission]
export type FuelType = (typeof FuelType)[keyof typeof FuelType]
