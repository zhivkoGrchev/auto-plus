'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Check, ChevronDown, Loader } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { type ComponentProps, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { EditGalery } from '@/components/features/cars-list/edit-galery'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { addCar, editCar, getCarBrands, getCarModelsByBrand } from '@/lib/actions/car.actions'
import { uploadImage } from '@/lib/actions/pinata.actions'
import { COLORS } from '@/lib/constants/colors'
import type { CarExtended } from '@/lib/types/car'
import type { GaleryImage } from '@/lib/types/galery'
import { getChangedFields } from '@/lib/utils'
import { type AddCarData, type AddCarImageData, AddCarSchema, type EditCarData, EditCarSchema } from '@/lib/validators/car'
import { type CarBrand, type CarModel, FuelType, Transmission } from '@/prisma/generated'

const INITIAL_FORM_DATA: AddCarData = {
  profileId: '',
  locationId: '',
  brandId: '',
  modelId: '',
  powerKW: 0,
  powerPS: 0,
  cubicCapacity: 0,
  year: 0,
  color: '',
  transmission: Transmission.manual,
  fuelType: FuelType.diesel,
  mileage: 0,
  vin: '',
  price: 0,
  seats: null,
  doors: null,
  description: '',
} as const
const POWER_CONVERSION_FACTOR = 1.35962

interface CarDialogProps extends ComponentProps<typeof Dialog> {
  car?: CarExtended
  profileId?: string
  locationId?: string
  onUpdate: () => void | Promise<void>
}

export const CarDialog = ({ open, car, profileId, locationId, onOpenChange, onUpdate }: CarDialogProps) => {
  const t = useTranslations('CarDialog')
  const m = useTranslations('Validations')
  const {
    register,
    reset,
    watch,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(car ? EditCarSchema : AddCarSchema),
    defaultValues: INITIAL_FORM_DATA,
  })
  const [carImages, setCarImages] = useState<GaleryImage[]>([])
  const [carBrands, setCarBrands] = useState<CarBrand[]>([])
  const [carModels, setCarModels] = useState<CarModel[]>([])
  const [openPopoverColor, setOpenPopoverColor] = useState<boolean>(false)

  useEffect(() => {
    const fetchCarBrands = async () => {
      try {
        const { data: brands, error } = await getCarBrands()
        if (brands) {
          setCarBrands(brands)
          return
        }
        toast.error(error.message)
      } catch {
        console.error('Error receiving data')
      }
    }
    fetchCarBrands()
  }, [])

  const currentBrandId = watch('brandId')
  useEffect(() => {
    const fetchCarModels = async () => {
      if (currentBrandId) {
        try {
          const { data: models, error } = await getCarModelsByBrand(currentBrandId)
          if (models) {
            setCarModels(models)
            return
          }
          toast.error(error.message)
        } catch {
          console.error('Error receiving data')
        }
      }
      setCarModels([])
    }
    fetchCarModels()
  }, [currentBrandId])

  useEffect(() => {
    if (car) {
      reset({ ...car, profileId, locationId })
      setCarImages(car.images.map((item) => ({ imageUrl: item.imageUrl, imageHash: item.imageHash })))
    } else {
      reset({ ...INITIAL_FORM_DATA, profileId, locationId })
      setCarImages([])
    }
  }, [car, profileId, locationId, reset])

  const handleAddImages = (files: File[]) => {
    const images = files.map((item) => ({ imageUrl: URL.createObjectURL(item), imageHash: null, imageFile: item }))
    setCarImages((prev) => [...prev, ...images])
  }

  const handleDeleteImage = (key: number) => {
    setCarImages((prev) => prev.filter((_, index) => index !== key))
  }

  const handleFormSubmit = async (formData: AddCarData | EditCarData) => {
    if (car) {
      const changedData = getChangedFields<EditCarData>(car, formData)
      const { data, error } = await editCar(car.id, changedData)
      if (error) {
        toast.error(error.message)
        return
      }
      toast.success(data.message)
    } else {
      const images: GaleryImage[] = []
      const addedImages: AddCarImageData[] = []
      for (const [index, item] of carImages.entries()) {
        if (item.imageFile) {
          const { data, error } = await uploadImage(item.imageFile)
          if (error) {
            toast.error(error.message)
            continue
          }
          images.push({ imageUrl: data.imageUrl, imageHash: data.imageHash })
          addedImages.push({ imageUrl: data.imageUrl, imageHash: data.imageHash, order: index })
        } else images.push(item)
      }
      setCarImages(images)
      const { data, error } = await addCar(formData as AddCarData, addedImages)
      if (error) {
        toast.error(error.message)
        return
      }
      toast.success(data.message)
    }
    onUpdate()
    reset()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-160">
        <DialogHeader>
          <DialogTitle>{car ? 'Edit Car' : t('title')}</DialogTitle>
          <DialogDescription>{car ? 'Update car information' : t('description')}</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="flex flex-col gap-4 max-h-[80vh] overflow-y-auto">
            <EditGalery images={carImages} onAddImages={handleAddImages} onDeleteImage={handleDeleteImage} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
              <fieldset className="flex flex-col gap-2">
                <Label className="mx-2" htmlFor="brandId">
                  {t('brand')}
                </Label>
                <Select
                  value={watch('brandId')}
                  onValueChange={(value) => {
                    setValue('brandId', value)
                    setValue('modelId', '')
                  }}
                >
                  <SelectTrigger className="w-full" aria-label="Brand">
                    <SelectValue id="brandId" placeholder={t('selectBrand')} />
                  </SelectTrigger>
                  <SelectContent>
                    {carBrands.map((item) => (
                      <SelectItem key={item.id} value={item.id}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.brandId?.message && <span className="mx-2 text-red-600">{m(errors.brandId.message)}</span>}
              </fieldset>
              <fieldset className="flex flex-col gap-2">
                <Label className="mx-2" htmlFor="modelId">
                  {t('model')}
                </Label>
                <Select value={watch('modelId')} onValueChange={(value) => setValue('modelId', value)}>
                  <SelectTrigger className="w-full" aria-label="Model">
                    <SelectValue id="modelId" placeholder={t('selectModel')} />
                  </SelectTrigger>
                  <SelectContent>
                    {carModels.length ? (
                      carModels.map((item) => (
                        <SelectItem key={item.id} value={item.id}>
                          {item.name}
                        </SelectItem>
                      ))
                    ) : (
                      <div className="text-center">{t('selectBrand')}</div>
                    )}
                  </SelectContent>
                </Select>
                {errors.modelId?.message && <span className="mx-2 text-red-600">{m(errors.modelId.message)}</span>}
              </fieldset>
              <fieldset className="flex flex-col gap-2">
                <Label className="mx-2" htmlFor="power">
                  {t('power')}
                </Label>
                <div className="flex gap-2">
                  <Input
                    className="w-1/2"
                    id="powerKW"
                    placeholder="kW"
                    {...register('powerKW', {
                      onChange: (e) => {
                        const value = parseFloat(e.target.value)
                        setValue('powerPS', !Number.isNaN(value) ? Math.round(value * POWER_CONVERSION_FACTOR).toString() : '')
                      },
                    })}
                  />
                  <Input
                    className="w-1/2"
                    id="powerPS"
                    placeholder="PS"
                    {...register('powerPS', {
                      onChange: (e) => {
                        const value = parseFloat(e.target.value)
                        setValue('powerKW', !Number.isNaN(value) ? Math.round(value / POWER_CONVERSION_FACTOR).toString() : '')
                      },
                    })}
                  />
                </div>
                {errors.powerKW?.message && <span className="mx-2 text-red-600">{m(errors.powerKW.message)}</span>}
              </fieldset>
              <fieldset className="flex flex-col gap-2">
                <Label className="mx-2" htmlFor="cubicCapacity">
                  Cubic Capacity (cm³)
                </Label>
                <Input id="cubicCapacity" placeholder="e.g. 2000" {...register('cubicCapacity')} />
                {errors.cubicCapacity?.message && <span className="mx-2 text-red-600">{m(errors.cubicCapacity.message)}</span>}
              </fieldset>
              <fieldset className="flex flex-col gap-2">
                <Label className="mx-2" htmlFor="year">
                  {t('year')}
                </Label>
                <Input className="w-full" id="year" {...register('year')} />
                {errors.year?.message && <span className="mx-2 text-red-600">{m(errors.year.message)}</span>}
              </fieldset>
              <fieldset className="flex flex-col gap-2">
                <Label className="mx-2" htmlFor="color">
                  {t('color')}
                </Label>
                <div className="flex gap-2">
                  <Input className="grow" id="color" placeholder="Color" {...register('color')} />
                  <Popover modal={true} open={openPopoverColor} onOpenChange={setOpenPopoverColor}>
                    <PopoverTrigger asChild>
                      <Button variant="outline">
                        <ChevronDown />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="flex justify-center flex-wrap gap-2" align="end">
                      {COLORS.map((value) => (
                        <Button
                          className="size-10"
                          key={value.hex}
                          style={{ background: value.hex }}
                          title={value.name}
                          onClick={() => {
                            setValue('color', value.name)
                            setOpenPopoverColor(false)
                          }}
                        />
                      ))}
                    </PopoverContent>
                  </Popover>
                </div>
                {errors.color?.message && <span className="mx-2 text-red-600">{m(errors.color.message)}</span>}
              </fieldset>
              <fieldset className="flex flex-col gap-2">
                <Label className="mx-2" htmlFor="transmission">
                  {t('transmission')}
                </Label>
                <Select value={watch('transmission')} onValueChange={(value) => setValue('transmission', value as Transmission)}>
                  <SelectTrigger className="w-full" aria-label="Transmission">
                    <SelectValue id="transmission" placeholder={t('selectTransmission')}>
                      {t(getValues('transmission') || 'selectTransmission')}
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
                {errors.transmission?.message && <span className="mx-2 text-red-600">{m(errors.transmission.message)}</span>}
              </fieldset>
              <fieldset className="flex flex-col gap-2">
                <Label className="mx-2" htmlFor="fuelType">
                  {t('fuelType')}
                </Label>
                <Select value={watch('fuelType') || ''} onValueChange={(value) => setValue('fuelType', value as FuelType)}>
                  <SelectTrigger className="w-full" aria-label="Fuel Type">
                    <SelectValue id="fuelType" placeholder={t('selectFuelType')}>
                      {t(getValues('fuelType') || 'selectFuelType')}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(FuelType).map((item) => (
                      <SelectItem key={item} value={item}>
                        {t(item)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.fuelType?.message && <span className="mx-2 text-red-600">{m(errors.fuelType.message)}</span>}
              </fieldset>
              <fieldset className="flex flex-col gap-2">
                <Label className="mx-2" htmlFor="mileage">
                  {t('mileage')}
                </Label>
                <Input className="w-full" id="mileage" {...register('mileage')} />
                {errors.mileage?.message && <span className="mx-2 text-red-600">{m(errors.mileage.message)}</span>}
              </fieldset>
              <fieldset className="flex flex-col gap-2">
                <Label className="mx-2" htmlFor="vin">
                  {t('vin')}
                </Label>
                <Input className="w-full" id="vin" {...register('vin')} />
              </fieldset>
              <fieldset className="flex flex-col gap-2">
                <Label className="mx-2" htmlFor="price">
                  {t('price')}
                  <span className="ml-1">€</span>
                </Label>
                <Input className="w-full" id="price" {...register('price')} />
                {errors.price?.message && <span className="mx-2 text-red-600">{m(errors.price.message)}</span>}
              </fieldset>
              <fieldset className="flex flex-col gap-2">
                <Label className="mx-2" htmlFor="seats">
                  {t('seats')}
                </Label>
                <Input className="w-full" id="seats" type="number" placeholder="e.g. 5" {...register('seats')} />
                {errors.seats?.message && <span className="mx-2 text-red-600">{m(errors.seats.message)}</span>}
              </fieldset>
              <fieldset className="flex flex-col gap-2">
                <Label className="mx-2" htmlFor="doors">
                  {t('doors')}
                </Label>
                <Input className="w-full" id="doors" type="number" placeholder="e.g. 4" {...register('doors')} />
                {errors.doors?.message && <span className="mx-2 text-red-600">{m(errors.doors.message)}</span>}
              </fieldset>
              <fieldset className="flex flex-col gap-2 md:col-span-2">
                <Label className="mx-2" htmlFor="description">
                  {t('desc')}
                </Label>
                <Textarea className=" w-full resize-none" id="description" rows={3} {...register('description')} />
              </fieldset>
            </div>
            <div className="flex justify-end gap-2">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? <Loader className="animate-spin" /> : <Check />}
                {t('save')}
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
