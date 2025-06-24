'use client'

import { type ChangeEvent, useState, useTransition } from 'react'
import { useTranslations } from 'next-intl'
import { Dialog } from 'radix-ui'
import { FaCheck, FaImage, FaPlus, FaSpinner } from 'react-icons/fa'
import { MdClose } from 'react-icons/md'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { getCarBrands, getCarModelsByBrand } from '@/lib/actions/car.actions'
import { FuelType, Transmission } from '@/lib/generated/prisma'
import { createCar } from '@/lib/actions/car.actions'
import type AddCarData from '@/lib/interfaces/add-car-data'

const initialData: AddCarData = {
  brandId: '',
  modelId: '',
  year: 0,
  color: '',
  transmission: null,
  fuelType: null,
  mileage: 0,
  vin: '',
  price: 0,
  description: '',
  brands: [],
  models: [],
}

export const AddCarDialog = () => {
  const [carData, setCarData] = useState<AddCarData>(initialData)
  const [errors, setErrors] = useState<Record<string, string[]>>({})
  const [isPendingSubmit, startTransitionSubmit] = useTransition()
  const [isPendingBrands, startTransitionBrands] = useTransition()
  const [isPendingModels, startTransitionModels] = useTransition()
  const [isOpen, setIsOpen] = useState(false)
  const t = useTranslations('AddCarDialog')

  const handleOpenBrands = (isOpen: boolean) =>
    isOpen &&
    startTransitionBrands(async () => {
      try {
        const brands = await getCarBrands()
        setCarData((prev) => ({ ...prev, brands }))
      } catch {
        console.error('Error receiving data')
      }
    })

  const handleOpenModels = (isOpen: boolean) =>
    isOpen &&
    carData.brandId &&
    startTransitionModels(async () => {
      try {
        const models = await getCarModelsByBrand(carData.brandId)
        setCarData((prev) => ({ ...prev, models }))
      } catch {
        console.error('Error receiving data')
      }
    })

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setCarData((prev) => ({ ...prev, [name]: name === 'year' || name === 'mileage' || name === 'price' ? Number(value) : value }))
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    console.log('Submitting car data:', carData)

    // Clear previous errors
    setErrors({})

    startTransitionSubmit(async () => {
      const result = await createCar(carData)

      if (!result.success && result.errors) {
        setErrors(result.errors)
      } else {
        setCarData(initialData)
        setIsOpen(false)
      }
    })
  }

  // Helper to display field errors
  const getFieldError = (fieldName: string) => {
    return errors[fieldName] ? errors[fieldName][0] : null
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          className="inline-flex justify-center items-center gap-2 px-4 py-2 rounded-md bg-cyan-600 dark:bg-cyan-900 hover:bg-cyan-400 dark:hover:bg-cyan-700 transition-colors outline-none outline-offset-2 focus-visible:outline-2 focus-visible:outline-neutral-900 dark:focus-visible:outline-neutral-600 font-medium select-none"
        >
          <FaPlus /> {t('addCar')}
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 flex justify-center items-center bg-neutral-800/70 dark:bg-neutral-500/70 data-[state=open]:animate-overlayShow">
          <Dialog.Content className="relative max-w-7xl p-4 gap-4 rounded-md bg-cyan-50 dark:bg-cyan-950 data-[state=open]:animate-contentShow">
            <Dialog.Title className="m-0 text-xl font-bold">{t('title')}</Dialog.Title>
            <Dialog.Description className="mb-6">{t('description')}</Dialog.Description>
            <div className="flex flex-col items-center mb-6">
              <label className="flex flex-col justify-center items-center size-32 gap-2 border-2 border-dashed border-neutral-700 dark:border-neutral-300 rounded-md cursor-pointer bg-cyan-100 hover:bg-cyan-200 dark:bg-cyan-900 dark:hover:bg-cyan-800">
                <FaImage className="size-8 text-neutral-700 dark:text-neutral-300" />
                <span className="text-xs text-neutral-700 dark:text-neutral-300">Upload Image</span>
                <input type="file" className="hidden" accept="image/*" />
              </label>
            </div>
            {/* Form-level errors */}
            {errors.form && (
              <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
                {errors.form.map((error, index) => (
                  <p key={index}>{error}</p>
                ))}
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
              <fieldset className="flex flex-col">
                <div className="flex items-center gap-2">
                  <label className="w-24 text-right text-neutral-700 dark:text-neutral-300" htmlFor="brandId">
                    Brand
                  </label>
                  <Select
                    value={carData.brandId}
                    onValueChange={(brandId) => setCarData((prev) => ({ ...prev, brandId, modelId: '', models: [] }))}
                    onOpenChange={handleOpenBrands}
                  >
                    <SelectTrigger
                      className="border-cyan-900 dark:border-cyan-600 bg-cyan-100 focus:bg-cyan-200 dark:bg-cyan-900 dark:focus:bg-cyan-800 text-foreground outline-offset-2 focus:outline-1 focus:outline-neutral-400 dark:outline-neutral-600"
                      aria-label="Brand"
                    >
                      <SelectValue id="brandId" placeholder="Select a brand" />
                    </SelectTrigger>
                    <SelectContent className="border-cyan-900 dark:border-cyan-600 bg-cyan-100 dark:bg-cyan-900">
                      {isPendingBrands ? (
                        <span className="p-2 flex justify-center items-center">
                          <FaSpinner className="animate-spin" />
                        </span>
                      ) : (
                        carData.brands.map((item) => (
                          <SelectItem key={item.id} value={item.id} className="data-[highlighted]:bg-cyan-200 dark:data-[highlighted]:bg-cyan-800">
                            {item.name}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                </div>
                {getFieldError('brandId') && <p className="ml-26 mt-1 text-sm text-red-600">{getFieldError('brandId')}</p>}
              </fieldset>
              <fieldset className="flex flex-col">
                <div className="flex items-center gap-2">
                  <label className="w-24 text-right text-neutral-700 dark:text-neutral-300" htmlFor="modelId">
                    Model
                  </label>
                  <Select value={carData.modelId} onValueChange={(modelId) => setCarData((prev) => ({ ...prev, modelId }))} onOpenChange={handleOpenModels}>
                    <SelectTrigger
                      className="border-cyan-900 dark:border-cyan-600 bg-cyan-100 focus:bg-cyan-200 dark:bg-cyan-900 dark:focus:bg-cyan-800 text-foreground outline-offset-2 focus:outline-1 focus:outline-neutral-400 dark:outline-neutral-600"
                      aria-label="Model"
                    >
                      <SelectValue id="modelId" placeholder="Select a model" />
                    </SelectTrigger>
                    <SelectContent className="border-cyan-900 dark:border-cyan-600 bg-cyan-100 dark:bg-cyan-900">
                      {isPendingModels ? (
                        <span className="p-2 flex justify-center items-center">
                          <FaSpinner className="animate-spin" />
                        </span>
                      ) : (
                        carData.models.map((item) => (
                          <SelectItem key={item.id} value={item.id} className="data-[highlighted]:bg-cyan-200 dark:data-[highlighted]:bg-cyan-800">
                            {item.name}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                </div>
                {getFieldError('modelId') && <p className="ml-26 mt-1 text-sm text-red-600">{getFieldError('modelId')}</p>}
              </fieldset>
              <fieldset className="flex flex-col">
                <div className="flex items-center gap-2">
                  <label className="w-24 text-right text-neutral-700 dark:text-neutral-300" htmlFor="year">
                    Year
                  </label>
                  <input
                    className="inline-flex grow rounded border border-cyan-900 dark:border-cyan-600 bg-cyan-100 focus:bg-cyan-200 dark:bg-cyan-900 dark:focus:bg-cyan-800 px-4 py-2 outline-offset-2 focus:outline-1 focus:outline-neutral-400 dark:outline-neutral-600"
                    id="year"
                    name="year"
                    value={carData.year === null || carData.year === 0 ? '' : carData.year}
                    onChange={handleInputChange}
                  />
                </div>
                {getFieldError('year') && <p className="ml-26 mt-1 text-sm text-red-600">{getFieldError('year')}</p>}
              </fieldset>
              <fieldset className="flex flex-col">
                <div className="flex items-center gap-2">
                  <label className="w-24 text-right text-neutral-700 dark:text-neutral-300" htmlFor="color">
                    Color
                  </label>
                  <input
                    className="inline-flex grow rounded border border-cyan-900 dark:border-cyan-600 bg-cyan-100 focus:bg-cyan-200 dark:bg-cyan-900 dark:focus:bg-cyan-800 px-4 py-2 outline-offset-2 focus:outline-1 focus:outline-neutral-400 dark:outline-neutral-600"
                    id="color"
                    name="color"
                    value={carData.color}
                    onChange={handleInputChange}
                  />
                </div>
                {getFieldError('color') && <p className="ml-26 mt-1 text-sm text-red-600">{getFieldError('color')}</p>}
              </fieldset>
              <fieldset className="flex flex-col">
                <div className="flex items-center gap-2">
                  <label className="w-24 text-right text-neutral-700 dark:text-neutral-300" htmlFor="transmission">
                    Transmission
                  </label>
                  <Select
                    value={carData.transmission || ''}
                    onValueChange={(transmission) => setCarData((prev) => ({ ...prev, transmission: transmission as Transmission }))}
                  >
                    <SelectTrigger
                      className="border-cyan-900 dark:border-cyan-600 bg-cyan-100 focus:bg-cyan-200 dark:bg-cyan-900 dark:focus:bg-cyan-800 text-foreground outline-offset-2 focus:outline-1 focus:outline-neutral-400 dark:outline-neutral-600"
                      aria-label="Transmission"
                    >
                      <SelectValue id="transmission" placeholder="Select a transmission" />
                    </SelectTrigger>
                    <SelectContent className="border-cyan-900 dark:border-cyan-600 bg-cyan-100 dark:bg-cyan-900">
                      {Object.keys(Transmission).map((item) => (
                        <SelectItem key={item} value={item} className="data-[highlighted]:bg-cyan-200 dark:data-[highlighted]:bg-cyan-800">
                          {item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {getFieldError('transmission') && <p className="ml-26 mt-1 text-sm text-red-600">{getFieldError('transmission')}</p>}
              </fieldset>
              <fieldset className="flex flex-col">
                <div className="flex items-center gap-2">
                  <label className="w-24 text-right text-neutral-700 dark:text-neutral-300" htmlFor="fuelType">
                    Fuel Type
                  </label>
                  <Select value={carData.fuelType || ''} onValueChange={(fuelType) => setCarData((prev) => ({ ...prev, fuelType: fuelType as FuelType }))}>
                    <SelectTrigger
                      className="border-cyan-900 dark:border-cyan-600 bg-cyan-100 focus:bg-cyan-200 dark:bg-cyan-900 dark:focus:bg-cyan-800 text-foreground outline-offset-2 focus:outline-1 focus:outline-neutral-400 dark:outline-neutral-600"
                      aria-label="Fuel Type"
                    >
                      <SelectValue id="fuelType" placeholder="Select a Fuel Type" />
                    </SelectTrigger>
                    <SelectContent className="border-cyan-900 dark:border-cyan-600 bg-cyan-100 dark:bg-cyan-900">
                      {Object.keys(FuelType).map((item) => (
                        <SelectItem key={item} value={item} className="data-[highlighted]:bg-cyan-200 dark:data-[highlighted]:bg-cyan-800">
                          {item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {getFieldError('fuelType') && <p className="ml-26 mt-1 text-sm text-red-600">{getFieldError('fuelType')}</p>}
              </fieldset>
              <fieldset className="flex flex-col">
                <div className="flex items-center gap-2">
                  <label className="w-24 text-right text-neutral-700 dark:text-neutral-300" htmlFor="mileage">
                    Mileage
                  </label>
                  <input
                    className="inline-flex grow rounded border border-cyan-900 dark:border-cyan-600 bg-cyan-100 focus:bg-cyan-200 dark:bg-cyan-900 dark:focus:bg-cyan-800 px-4 py-2 outline-offset-2 focus:outline-1 focus:outline-neutral-400 dark:outline-neutral-600"
                    id="mileage"
                    name="mileage"
                    value={carData.mileage === null || carData.mileage === 0 ? '' : carData.mileage}
                    onChange={handleInputChange}
                  />
                </div>
                {getFieldError('mileage') && <p className="ml-26 mt-1 text-sm text-red-600">{getFieldError('mileage')}</p>}
              </fieldset>{' '}
              <fieldset className="flex items-center gap-2">
                <label className="w-24 text-right text-neutral-700 dark:text-neutral-300" htmlFor="vin">
                  VIN
                </label>
                <input
                  className="inline-flex grow rounded border border-cyan-900 dark:border-cyan-600 bg-cyan-100 focus:bg-cyan-200 dark:bg-cyan-900 dark:focus:bg-cyan-800 px-4 py-2 outline-offset-2 focus:outline-1 focus:outline-neutral-400 dark:outline-neutral-600"
                  id="vin"
                  name="vin"
                  value={carData.vin === null ? '' : carData.vin}
                  onChange={handleInputChange}
                />
              </fieldset>
              <fieldset className="flex flex-col">
                <div className="flex items-center gap-2">
                  <label className="w-24 text-right text-neutral-700 dark:text-neutral-300" htmlFor="price">
                    Price
                  </label>
                  <input
                    className="inline-flex grow rounded border border-cyan-900 dark:border-cyan-600 bg-cyan-100 focus:bg-cyan-200 dark:bg-cyan-900 dark:focus:bg-cyan-800 px-4 py-2 outline-offset-2 focus:outline-1 focus:outline-neutral-400 dark:outline-neutral-600"
                    id="price"
                    name="price"
                    value={carData.price === null || carData.price === 0 ? '' : carData.price}
                    onChange={handleInputChange}
                  />
                  <span className="text-neutral-700 dark:text-neutral-300">€</span>
                </div>
                {getFieldError('price') && <p className="ml-26 mt-1 text-sm text-red-600">{getFieldError('price')}</p>}
              </fieldset>{' '}
              <fieldset className="flex gap-2">
                <label className="w-24 py-2 text-right text-neutral-700 dark:text-neutral-300" htmlFor="description">
                  Description
                </label>
                <textarea
                  className="inline-flex grow resize-none rounded border border-cyan-900 dark:border-cyan-600 bg-cyan-100 focus:bg-cyan-200 dark:bg-cyan-900 dark:focus:bg-cyan-800 px-4 py-2 outline-offset-2 focus:outline-1 focus:outline-neutral-400 dark:outline-neutral-600"
                  id="description"
                  name="description"
                  rows={3}
                  value={carData.description}
                  onChange={handleInputChange}
                />
              </fieldset>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isPendingSubmit}
                className="inline-flex justify-center items-center gap-2 px-4 py-2 rounded-md bg-cyan-600 dark:bg-cyan-900 hover:bg-cyan-400 dark:hover:bg-cyan-700 transition-colors outline-none outline-offset-2 focus-visible:outline-2 focus-visible:outline-neutral-900 dark:focus-visible:outline-neutral-600 font-medium select-none disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPendingSubmit ? <FaSpinner className="animate-spin" /> : <FaCheck />} Save
              </button>
            </div>
            <Dialog.Close asChild>
              <button
                type="button"
                className="absolute right-2 top-2 inline-flex justify-center items-center rounded-full focus:outline-none appearance-none text-red-700 dark:text-red-500"
                aria-label="Close"
              >
                <MdClose size="1.5rem" />
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
