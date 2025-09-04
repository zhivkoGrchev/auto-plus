'use client'

import { type ChangeEvent, type MouseEvent, useState, useTransition } from 'react'
import { useTranslations } from 'next-intl'
import { FaCheck, FaImage, FaPlus, FaSpinner } from 'react-icons/fa'
import { FuelType, Transmission } from '@prisma/client'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { getCarBrands, getCarModelsByBrand, createCar } from '@/lib/actions/car.actions'
import type AddCarData from '@/lib/interfaces/add-car-data'

type AddCarDialogProps = {
  onCarAdded?: () => Promise<void>
}

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

export const AddCarDialog = ({ onCarAdded }: AddCarDialogProps) => {
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
    setCarData((prev) => ({
      ...prev,
      [name]: name === 'year' || name === 'mileage' || name === 'price' ? Number(value) : value,
    }))
  }

  const handleSubmit = async (e: MouseEvent) => {
    e.preventDefault()
    setErrors({})

    startTransitionSubmit(async () => {
      const result = await createCar(carData)

      if (!result.success && result.errors) {
        setErrors(result.errors)
      } else {
        setCarData(initialData)
        setIsOpen(false)
        if (onCarAdded) await onCarAdded()
      }
    })
  }

  // Helper to display field errors
  const getFieldError = (fieldName: string) => {
    return errors[fieldName] ? errors[fieldName][0] : null
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <div className="container mx-auto flex justify-start">
        <DialogTrigger asChild>
          <Button type="button" variant="default" size="sm">
            <FaPlus /> {t('addCar')}
          </Button>
        </DialogTrigger>
      </div>
      <DialogContent className="sm:max-w-[640px]">
        <DialogHeader>
          <DialogTitle>{t('title')}</DialogTitle>
          <DialogDescription>{t('description')}</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center mb-6">
          <Label className="flex flex-col justify-center items-center size-32 gap-2 border-2 border-dashed border-neutral-700 dark:border-neutral-300 rounded-md cursor-pointer bg-cyan-100 hover:bg-cyan-200 dark:bg-cyan-900 dark:hover:bg-cyan-800">
            <FaImage className="size-8 text-neutral-700 dark:text-neutral-300" />
            <span className="text-xs text-neutral-700 dark:text-neutral-300">{t('uploadImage')}</span>
            <input type="file" className="hidden" accept="image/*" />
          </Label>
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
          <fieldset className="flex flex-col gap-2">
            <Label className="mx-2" htmlFor="brandId">
              {t('brand')}
            </Label>
            <Select
              value={carData.brandId}
              onValueChange={(brandId) =>
                setCarData((prev) => ({
                  ...prev,
                  brandId,
                  modelId: '',
                  models: [],
                }))
              }
              onOpenChange={handleOpenBrands}
            >
              <SelectTrigger className="w-full" aria-label="Brand">
                <SelectValue id="brandId" placeholder={t('selectBrand')} />
              </SelectTrigger>
              <SelectContent>
                {isPendingBrands ? (
                  <span className="p-2 flex justify-center items-center">
                    <FaSpinner className="animate-spin" />
                  </span>
                ) : (
                  carData.brands.map((item) => (
                    <SelectItem key={item.id} value={item.id}>
                      {item.name}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
            {getFieldError('brandId') && <sub className="mx-2 text-red-600">{getFieldError('brandId')}</sub>}
          </fieldset>
          <fieldset className="flex flex-col gap-2">
            <Label className="mx-2" htmlFor="modelId">
              {t('model')}
            </Label>
            <Select value={carData.modelId} onValueChange={(modelId) => setCarData((prev) => ({ ...prev, modelId }))} onOpenChange={handleOpenModels}>
              <SelectTrigger className="w-full" aria-label="Model">
                <SelectValue id="modelId" placeholder={t('selectModel')} />
              </SelectTrigger>
              <SelectContent>
                {isPendingModels ? (
                  <span className="p-2 flex justify-center items-center">
                    <FaSpinner className="animate-spin" />
                  </span>
                ) : (
                  carData.models.map((item) => (
                    <SelectItem key={item.id} value={item.id}>
                      {item.name}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
            {getFieldError('modelId') && <sub className="mx-2 text-red-600">{getFieldError('modelId')}</sub>}
          </fieldset>
          <fieldset className="flex flex-col gap-2">
            <Label className="mx-2" htmlFor="year">
              {t('year')}
            </Label>
            <Input
              className="w-full"
              id="year"
              name="year"
              value={carData.year === null || carData.year === 0 ? '' : carData.year}
              onChange={handleInputChange}
            />
            {getFieldError('year') && <sub className="mx-2 text-red-600">{getFieldError('year')}</sub>}
          </fieldset>
          <fieldset className="flex flex-col gap-2">
            <Label className="mx-2" htmlFor="color">
              {t('color')}
            </Label>
            <Input className="w-full" id="color" name="color" value={carData.color} onChange={handleInputChange} />
            {getFieldError('color') && <sub className="mx-2 text-red-600">{getFieldError('color')}</sub>}
          </fieldset>
          <fieldset className="flex flex-col gap-2">
            <Label className="mx-2" htmlFor="transmission">
              {t('transmission')}
            </Label>
            <Select
              value={carData.transmission || ''}
              onValueChange={(transmission) =>
                setCarData((prev) => ({
                  ...prev,
                  transmission: transmission as Transmission,
                }))
              }
            >
              <SelectTrigger className="w-full" aria-label="Transmission">
                <SelectValue id="transmission" placeholder={t('selectTransmission')}>
                  {carData.transmission ? t(carData.transmission) : t('selectTransmission')}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {Object.keys(Transmission).map((item) => (
                  <SelectItem key={item} value={item}>
                    {t(item)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {getFieldError('transmission') && <sub className="mx-2 text-red-600">{getFieldError('transmission')}</sub>}
          </fieldset>
          <fieldset className="flex flex-col gap-2">
            <Label className="mx-2" htmlFor="fuelType">
              {t('fuelType')}
            </Label>
            <Select
              value={carData.fuelType || ''}
              onValueChange={(fuelType) =>
                setCarData((prev) => ({
                  ...prev,
                  fuelType: fuelType as FuelType,
                }))
              }
            >
              <SelectTrigger className="w-full" aria-label="Fuel Type">
                <SelectValue id="fuelType" placeholder={t('selectFuelType')} />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(FuelType).map((item) => (
                  <SelectItem key={item} value={item}>
                    {t(item)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {getFieldError('fuelType') && <sub className="mx-2 text-red-600">{getFieldError('fuelType')}</sub>}
          </fieldset>
          <fieldset className="flex flex-col gap-2">
            <Label className="mx-2" htmlFor="mileage">
              {t('mileage')}
            </Label>
            <Input
              className="w-full"
              id="mileage"
              name="mileage"
              value={carData.mileage === null || carData.mileage === 0 ? '' : carData.mileage}
              onChange={handleInputChange}
            />
            {getFieldError('mileage') && <sub className="mx-2 text-red-600">{getFieldError('mileage')}</sub>}
          </fieldset>
          <fieldset className="flex flex-col gap-2">
            <Label className="mx-2" htmlFor="vin">
              {t('vin')}
            </Label>
            <Input className="w-full" id="vin" name="vin" value={carData.vin === null ? '' : carData.vin} onChange={handleInputChange} />
          </fieldset>
          <fieldset className="flex flex-col gap-2">
            <Label className="mx-2" htmlFor="price">
              {t('price')}
              <span className="ml-1">€</span>
            </Label>
            <Input
              className="w-full"
              id="price"
              name="price"
              value={carData.price === null || carData.price === 0 ? '' : carData.price}
              onChange={handleInputChange}
            />
            {getFieldError('price') && <sub className="mx-2 text-red-600">{getFieldError('price')}</sub>}
          </fieldset>{' '}
          <fieldset className="flex flex-col gap-2">
            <Label className="mx-2" htmlFor="description">
              {t('desc')}
            </Label>
            <Textarea className=" w-full resize-none" id="description" name="description" rows={3} value={carData.description} onChange={handleInputChange} />
          </fieldset>
        </div>
        <DialogFooter>
          <Button type="button" onClick={handleSubmit} disabled={isPendingSubmit}>
            {isPendingSubmit ? <FaSpinner className="animate-spin" /> : <FaCheck />} {t('save')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
