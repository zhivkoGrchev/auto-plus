'use client'

import { type ChangeEvent, type MouseEvent, useState, useTransition, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { FaCheck, FaImage, FaPlus, FaSpinner, FaTrash } from 'react-icons/fa'
import { FuelType, Transmission } from '@prisma/client'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { getCarBrands, getCarModelsByBrand, createCar, updateCar } from '@/lib/actions/car.actions'
import type AddCarData from '@/lib/interfaces/add-car-data'
import type { CarExtended } from '@/lib/interfaces/car-extended'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { COLORS } from '@/lib/constants/colors'
import { LuChevronDown } from 'react-icons/lu'

const resizeImage = (file: File, maxWidth = 800, maxHeight = 600, quality = 0.8): Promise<File> => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()

    if (!ctx) {
      reject(new Error('Could not get canvas context'))
      return
    }

    img.onload = () => {
      // Calculate new dimensions maintaining aspect ratio
      let { width, height } = img

      if (width > height) {
        if (width > maxWidth) {
          height = (height * maxWidth) / width
          width = maxWidth
        }
      } else {
        if (height > maxHeight) {
          width = (width * maxHeight) / height
          height = maxHeight
        }
      }

      canvas.width = width
      canvas.height = height

      // Draw and resize
      ctx.drawImage(img, 0, 0, width, height)

      canvas.toBlob(
        (blob) => {
          if (blob) {
            const resizedFile = new File([blob], file.name, {
              type: file.type,
              lastModified: Date.now(),
            })
            resolve(resizedFile)
          } else {
            reject(new Error('Failed to create resized image blob'))
          }
        },
        file.type,
        quality
      )
    }

    img.onerror = () => {
      reject(new Error('Failed to load image'))
    }

    img.src = URL.createObjectURL(file)
  })
}

async function uploadImageToServer(file: File) {
  const formData = new FormData()
  formData.append('file', file)

  const res = await fetch('/api/upload-car-image', {
    method: 'POST',
    body: formData,
  })

  return res.json() // { success: boolean, cid?: string, url?: string, error?: string }
}

interface AddCarDialogProps {
  mode?: 'add' | 'edit'
  car?: CarExtended | null
  profileId?: string
  onUpdate?: () => void
  // onSuccess?: () => Promise<void>
}

const initialData: AddCarData = {
  profileId: '',
  locationId: '',
  brandId: '',
  modelId: '',
  year: 0,
  color: '',
  transmission: null,
  powerKW: 0,
  powerPS: 0,
  cubicCapacity: 0,
  fuelType: null,
  mileage: 0,
  vin: '',
  price: 0,
  description: '',
  brands: [],
  models: [],
  imageHash: null,
  imageUrl: null,
  listedOnWebsite: false,
}

export const AddCarDialog = ({ mode = 'add', car = null, profileId, onUpdate }: AddCarDialogProps) => {
  const [carData, setCarData] = useState<AddCarData>(initialData)
  const [errors, setErrors] = useState<Record<string, string[]>>({})
  const [isPendingSubmit, startTransitionSubmit] = useTransition()
  const [isPendingBrands, startTransitionBrands] = useTransition()
  const [isPendingModels, startTransitionModels] = useTransition()
  const [isPendingImage, startTransitionImage] = useTransition()
  const [isOpen, setIsOpen] = useState(false)
  const [selectedImages, setSelectedImages] = useState<File[]>([])
  const [imagePreviews, setImagePreviews] = useState<string[]>([])
  const t = useTranslations('AddCarDialog')

  // Initialize form data when editing
  useEffect(() => {
    if (mode === 'edit' && car) {
      setIsOpen(true)

      if (isOpen) {
        setCarData({
          profileId: car.profileId,
          locationId: car.locationId,
          brandId: car.brandId,
          modelId: car.modelId,
          year: car.year,
          color: car.color,
          transmission: car.transmission,
          powerKW: car.powerKW,
          powerPS: car.powerPS,
          cubicCapacity: car.cubicCapacity,
          fuelType: car.fuelType,
          mileage: car.mileage,
          vin: car.vin || '',
          price: car.price,
          description: car.description || '',
          brands: [],
          models: [],
          imageHash: car.imageHash || null,
          imageUrl: car.imageUrl || null,
          listedOnWebsite: car.listedOnWebsite,
        })

        if (car.imageUrl) {
          setImagePreviews([car.imageUrl])
        }
      }
    }
  }, [mode, car, isOpen])

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
    const numericValue = Number(value)

    setCarData((prev) => {
      if (name === 'powerKW') {
        return { ...prev, powerKW: numericValue, powerPS: Math.round(numericValue * 1.35962) }
      }

      if (name === 'powerPS') {
        return { ...prev, powerPS: numericValue, powerKW: Math.round(numericValue * 0.735499) }
      }

      if (name === 'year' || name === 'mileage' || name === 'price' || name === 'cubicCapacity') {
        return { ...prev, [name]: numericValue }
      }

      return { ...prev, [name]: value }
    })
  }

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length === 0) return

    try {
      const processedImages: File[] = []
      const newPreviews: string[] = []

      for (const file of files) {
        if (!file.type.startsWith('image/')) {
          console.warn(`File ${file.name} is not an image, skipping`)
          continue
        }

        console.log(`Processing: ${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)`)

        // Resize the image
        const resizedFile = await resizeImage(file, 800, 600, 0.8)
        console.log(`Resized: ${(resizedFile.size / 1024 / 1024).toFixed(2)} MB`)

        if (resizedFile.size > 2 * 1024 * 1024) {
          console.warn(`${file.name} is still too large after compression, skipping`)
          continue
        }

        processedImages.push(resizedFile)

        // Create preview
        const preview = await new Promise<string>((resolve) => {
          const reader = new FileReader()
          reader.onload = (e) => resolve(e.target?.result as string)
          reader.readAsDataURL(resizedFile)
        })
        newPreviews.push(preview)
      }

      setSelectedImages((prev) => [...prev, ...processedImages])
      setImagePreviews((prev) => [...prev, ...newPreviews])

      // Clear errors
      setErrors((prev) => {
        const { image, ...rest } = prev
        return rest
      })

      // Clear the file input
      e.target.value = ''
    } catch (error) {
      console.error('Image processing error:', error)
      setErrors((prev) => ({ ...prev, image: ['Failed to process images. Please try again.'] }))
    }
  }

  const handleRemoveImage = (index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index))
    setImagePreviews((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: MouseEvent) => {
    e.preventDefault()
    setErrors({})

    startTransitionSubmit(async () => {
      const finalCarData = profileId ? { ...carData, profileId } : { ...carData }

      if (selectedImages.length > 0) {
        startTransitionImage(async () => {
          try {
            // Upload first image as main image
            const mainUpload = await uploadImageToServer(selectedImages[0])

            if (!mainUpload.success) {
              setErrors((prev) => ({
                ...prev,
                image: [mainUpload.error || 'Upload failed'],
              }))
              return
            }

            finalCarData.imageHash = mainUpload.cid
            finalCarData.imageUrl = mainUpload.url

            // Create or update the car
            const result = mode === 'edit' && car ? await updateCar(car.id, finalCarData) : await createCar(finalCarData)

            if (!result.success) {
              setErrors(result.errors || {})
              return
            }

            const carId = mode === 'edit' && car ? car.id : result.data?.id

            // Upload additional images to gallery
            if (selectedImages.length > 1 && carId) {
              for (let i = 1; i < selectedImages.length; i++) {
                const upload = await uploadImageToServer(selectedImages[i])

                if (upload.success) {
                  await fetch('/api/car-images', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      carId: carId,
                      imageUrl: upload.url,
                      imageHash: upload.cid,
                      order: i,
                    }),
                  })
                }
              }
            }

            // Reset form
            setCarData(initialData)
            setSelectedImages([])
            setImagePreviews([])
            onUpdate?.()
            setIsOpen(false)
          } catch (error) {
            const e = error as Error
            setErrors((prev) => ({ ...prev, image: [e.message] }))
          }
        })
      } else {
        // No images selected
        const result = mode === 'edit' && car ? await updateCar(car.id, finalCarData) : await createCar(finalCarData)
        if (result.success) {
          setCarData(initialData)
          onUpdate?.()
          setIsOpen(false)
        } else {
          setErrors(result.errors || {})
        }
      }
    })
  }

  // Helper to display field errors
  const getFieldError = (fieldName: string) => {
    return errors[fieldName] ? errors[fieldName][0] : null
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button type="button" variant="default" disabled={!profileId}>
          <FaPlus /> {t('addCar')}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[640px]">
        <DialogHeader>
          <DialogTitle>{mode === 'edit' ? 'Edit Car' : t('title')}</DialogTitle>
          <DialogDescription>{mode === 'edit' ? 'Update car information' : t('description')}</DialogDescription>
        </DialogHeader>
        {/* Image Upload Section */}
        <div className="mb-6">
          <Label className="block mb-2">{t('uploadImage')}</Label>

          {/* Image Previews Grid */}
          {imagePreviews.length > 0 && (
            <div className="grid grid-cols-4 gap-2 mb-4">
              {imagePreviews.map((preview, index) => (
                <div key={index} className="relative">
                  <img src={preview} alt={`Preview ${index + 1}`} className="w-full h-24 object-cover rounded-md border-2 border-neutral-300" />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute -top-2 -right-2 size-6 p-0"
                    onClick={() => handleRemoveImage(index)}
                  >
                    <FaTrash className="size-3" />
                  </Button>
                  {index === 0 && <span className="absolute bottom-1 left-1 bg-blue-500 text-white text-xs px-2 py-0.5 rounded">Main</span>}
                </div>
              ))}
            </div>
          )}

          {/* Upload Button */}
          <Label className="flex flex-col justify-center items-center h-24 gap-2 border-2 border-dashed border-neutral-700 dark:border-neutral-300 rounded-md cursor-pointer bg-cyan-100 hover:bg-cyan-200 dark:bg-cyan-900 dark:hover:bg-cyan-800">
            {isPendingImage ? (
              <FaSpinner className="size-8 animate-spin text-neutral-700 dark:text-neutral-300" />
            ) : (
              <>
                <FaImage className="size-8 text-neutral-700 dark:text-neutral-300" />
                <span className="text-xs text-neutral-700 dark:text-neutral-300">{imagePreviews.length > 0 ? 'Add More Images' : t('uploadImage')}</span>
              </>
            )}
            <input type="file" id="car-image" className="hidden" accept="image/*" multiple onChange={handleImageChange} disabled={isPendingImage} />
          </Label>
          {getFieldError('image') && <sub className="mt-1 text-red-600">{getFieldError('image')}</sub>}
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
          {/* Power: kW and PS */}
          <fieldset className="flex flex-col gap-2">
            <Label className="mx-2" htmlFor="power">
              {t('power')}
            </Label>
            <div className="flex gap-2">
              <Input
                className="w-1/2"
                id="powerKW"
                name="powerKW"
                placeholder="kW"
                value={carData.powerKW === 0 ? '' : carData.powerKW}
                onChange={handleInputChange}
              />
              <Input
                className="w-1/2"
                id="powerPS"
                name="powerPS"
                placeholder="PS"
                value={carData.powerPS === 0 ? '' : carData.powerPS}
                onChange={handleInputChange}
              />
            </div>
            {getFieldError('powerKW') && <sub className="mx-2 text-red-600">{getFieldError('powerKW')}</sub>}
          </fieldset>
          <fieldset className="flex flex-col gap-2">
            <Label className="mx-2" htmlFor="cubicCapacity">
              Cubic Capacity (cm³)
            </Label>
            <Input
              id="cubicCapacity"
              name="cubicCapacity"
              value={carData.cubicCapacity === 0 ? '' : carData.cubicCapacity}
              onChange={handleInputChange}
              placeholder="e.g. 2000"
            />
            {getFieldError('cubicCapacity') && <sub className="mx-2 text-red-600">{getFieldError('cubicCapacity')}</sub>}
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
            <div className="flex gap-2">
              <Input className="grow" id="color" name="color" value={carData.color} onChange={handleInputChange} />
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">
                    <LuChevronDown />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="flex justify-center flex-wrap gap-2" align="end">
                  {COLORS.map((value) => (
                    <Button key={value.hex} style={{ background: value.hex }} onClick={() => setCarData((prev) => ({ ...prev, color: value.name }))}>
                      &nbsp;
                    </Button>
                  ))}
                </PopoverContent>
              </Popover>
            </div>
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
          <Button type="button" onClick={handleSubmit} disabled={isPendingSubmit || isPendingImage}>
            {isPendingSubmit ? <FaSpinner className="animate-spin" /> : <FaCheck />}
            {isPendingImage ? 'Uploading...' : mode === 'edit' ? 'Update' : t('save')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
