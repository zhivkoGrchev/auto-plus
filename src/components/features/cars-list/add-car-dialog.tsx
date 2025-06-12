import { Dialog } from 'radix-ui'
import { FaCheck, FaImage, FaPlus } from 'react-icons/fa'
import { MdClose } from 'react-icons/md'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export const AddCarDialog = () => (
  <Dialog.Root>
    <Dialog.Trigger asChild>
      <button className="inline-flex justify-center items-center gap-2 px-4 py-2 rounded-md bg-cyan-600 dark:bg-cyan-900 hover:bg-cyan-400 dark:hover:bg-cyan-700 transition-colors outline-none outline-offset-2 focus-visible:outline-2 focus-visible:outline-neutral-900 dark:focus-visible:outline-neutral-600 font-medium select-none">
        <FaPlus /> Add car
      </button>
    </Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 flex justify-center items-center bg-neutral-800/70 dark:bg-neutral-500/70 data-[state=open]:animate-overlayShow">
        <Dialog.Content className="relative max-w-7xl p-4 gap-4 rounded-md bg-cyan-50 dark:bg-cyan-950 data-[state=open]:animate-contentShow">
          <Dialog.Title className="m-0 text-xl font-bold">Add a new car</Dialog.Title>
          <Dialog.Description className="mb-6">Fill in the details of the car here. Click save when you&apos;re done.</Dialog.Description>
          <div className="flex flex-col items-center mb-6">
            <label className="flex flex-col justify-center items-center size-32 gap-2 border-2 border-dashed border-neutral-700 dark:border-neutral-300 rounded-md cursor-pointer bg-cyan-100 hover:bg-cyan-200 dark:bg-cyan-900 dark:hover:bg-cyan-800">
              <FaImage className="size-8 text-neutral-700 dark:text-neutral-300" />
              <span className="text-xs text-neutral-700 dark:text-neutral-300">Upload Image</span>
              <input type="file" className="hidden" accept="image/*" />
            </label>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
            <fieldset className="flex items-center gap-2">
              <label className="w-24 text-right text-neutral-700 dark:text-neutral-300" htmlFor="make">
                Make
              </label>
              <Select>
                <SelectTrigger
                  className="border-cyan-900 dark:border-cyan-600 bg-cyan-100 focus:bg-cyan-200 dark:bg-cyan-900 dark:focus:bg-cyan-800 text-foreground outline-offset-2 focus:outline-1 focus:outline-neutral-400 dark:outline-neutral-600"
                  aria-label="Make"
                >
                  <SelectValue id="make" placeholder="Select a make" />
                </SelectTrigger>
                <SelectContent className="border-cyan-900 dark:border-cyan-600 bg-cyan-100 dark:bg-cyan-900">
                  {[
                    { text: 'Audi', value: 'audi' },
                    { text: 'Bmw', value: 'bmw' },
                    { text: 'Volkswagen', value: 'vw' },
                    { text: 'Mersedes-Benz', value: 'mersedes' },
                    { text: 'Porsche', value: 'porsche' },
                    { text: 'Opel', value: 'opel' },
                    { text: 'Ford', value: 'ford' },
                    { text: 'Skoda', value: 'skoda' },
                  ].map((item) => (
                    <SelectItem key={item.value} value={item.value} className="data-[highlighted]:bg-cyan-200 dark:data-[highlighted]:bg-cyan-800">
                      {item.text}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </fieldset>
            <fieldset className="flex items-center gap-2">
              <label className="w-24 text-right text-neutral-700 dark:text-neutral-300" htmlFor="model">
                Model
              </label>
              <Select>
                <SelectTrigger
                  className="border-cyan-900 dark:border-cyan-600 bg-cyan-100 focus:bg-cyan-200 dark:bg-cyan-900 dark:focus:bg-cyan-800 text-foreground outline-offset-2 focus:outline-1 focus:outline-neutral-400 dark:outline-neutral-600"
                  aria-label="Model"
                >
                  <SelectValue id="model" placeholder="Select a model" />
                </SelectTrigger>
                <SelectContent className="border-cyan-900 dark:border-cyan-600 bg-cyan-100 dark:bg-cyan-900">
                  {[
                    { text: 'Model 1', value: 'model_1' },
                    { text: 'Model 2', value: 'model_2' },
                    { text: 'Model 3', value: 'model_3' },
                    { text: 'Model 4', value: 'model_4' },
                    { text: 'Model 5', value: 'model_5' },
                    { text: 'Model 6', value: 'model_6' },
                    { text: 'Model 7', value: 'model_7' },
                    { text: 'Model 8', value: 'model_8' },
                    { text: 'Model 9', value: 'model_9' },
                    { text: 'Model 10', value: 'model_10' },
                    { text: 'Model 11', value: 'model_11' },
                    { text: 'Model 12', value: 'model_12' },
                    { text: 'Model 13', value: 'model_13' },
                    { text: 'Model 14', value: 'model_14' },
                    { text: 'Model 15', value: 'model_15' },
                    { text: 'Model 16', value: 'model_16' },
                    { text: 'Model 17', value: 'model_17' },
                    { text: 'Model 18', value: 'model_18' },
                    { text: 'Model 19', value: 'model_19' },
                    { text: 'Model 20', value: 'model_20' },
                  ].map((item) => (
                    <SelectItem key={item.value} value={item.value} className="data-[highlighted]:bg-cyan-200 dark:data-[highlighted]:bg-cyan-800">
                      {item.text}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </fieldset>
            <fieldset className="flex items-center gap-2">
              <label className="w-24 text-right text-neutral-700 dark:text-neutral-300" htmlFor="year">
                Year
              </label>
              <input
                className="inline-flex grow rounded border border-cyan-900 dark:border-cyan-600 bg-cyan-100 focus:bg-cyan-200 dark:bg-cyan-900 dark:focus:bg-cyan-800 px-4 py-2 outline-offset-2 focus:outline-1 focus:outline-neutral-400 dark:outline-neutral-600"
                id="year"
              />
            </fieldset>
            <fieldset className="flex items-center gap-2">
              <label className="w-24 text-right text-neutral-700 dark:text-neutral-300" htmlFor="color">
                Color
              </label>
              <input
                className="inline-flex grow rounded border border-cyan-900 dark:border-cyan-600 bg-cyan-100 focus:bg-cyan-200 dark:bg-cyan-900 dark:focus:bg-cyan-800 px-4 py-2 outline-offset-2 focus:outline-1 focus:outline-neutral-400 dark:outline-neutral-600"
                id="color"
              />
            </fieldset>
            <fieldset className="flex items-center gap-2">
              <label className="w-24 text-right text-neutral-700 dark:text-neutral-300" htmlFor="transmission">
                Transmission
              </label>
              <Select>
                <SelectTrigger
                  className="border-cyan-900 dark:border-cyan-600 bg-cyan-100 focus:bg-cyan-200 dark:bg-cyan-900 dark:focus:bg-cyan-800 text-foreground outline-offset-2 focus:outline-1 focus:outline-neutral-400 dark:outline-neutral-600"
                  aria-label="Transmission"
                >
                  <SelectValue id="transmission" placeholder="Select a transmission" />
                </SelectTrigger>
                <SelectContent className="border-cyan-900 dark:border-cyan-600 bg-cyan-100 dark:bg-cyan-900">
                  {[
                    { text: 'Automatik', value: 'automatik' },
                    { text: 'Halbautomatik', value: 'halbautomatik' },
                    { text: 'Schaltgetriebe', value: 'schaltgetriebe' },
                  ].map((item) => (
                    <SelectItem key={item.value} value={item.value} className="data-[highlighted]:bg-cyan-200 dark:data-[highlighted]:bg-cyan-800">
                      {item.text}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </fieldset>
            <fieldset className="flex items-center gap-2">
              <label className="w-24 text-right text-neutral-700 dark:text-neutral-300" htmlFor="fuel_type">
                Fuel Type
              </label>
              <Select>
                <SelectTrigger
                  className="border-cyan-900 dark:border-cyan-600 bg-cyan-100 focus:bg-cyan-200 dark:bg-cyan-900 dark:focus:bg-cyan-800 text-foreground outline-offset-2 focus:outline-1 focus:outline-neutral-400 dark:outline-neutral-600"
                  aria-label="Fuel Type"
                >
                  <SelectValue id="fuel_type" placeholder="Select a Fuel Type" />
                </SelectTrigger>
                <SelectContent className="border-cyan-900 dark:border-cyan-600 bg-cyan-100 dark:bg-cyan-900">
                  {[
                    { text: 'Diesel', value: 'diesel' },
                    { text: 'Benzin', value: 'Benzin' },
                  ].map((item) => (
                    <SelectItem key={item.value} value={item.value} className="data-[highlighted]:bg-cyan-200 dark:data-[highlighted]:bg-cyan-800">
                      {item.text}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </fieldset>
            <fieldset className="flex items-center gap-2">
              <label className="w-24 text-right text-neutral-700 dark:text-neutral-300" htmlFor="mileage">
                Mileage
              </label>
              <input
                className="inline-flex grow rounded border border-cyan-900 dark:border-cyan-600 bg-cyan-100 focus:bg-cyan-200 dark:bg-cyan-900 dark:focus:bg-cyan-800 px-4 py-2 outline-offset-2 focus:outline-1 focus:outline-neutral-400 dark:outline-neutral-600"
                id="mileage"
              />
            </fieldset>
            <fieldset className="flex items-center gap-2">
              <label className="w-24 text-right text-neutral-700 dark:text-neutral-300" htmlFor="vin">
                VIN
              </label>
              <input
                className="inline-flex grow rounded border border-cyan-900 dark:border-cyan-600 bg-cyan-100 focus:bg-cyan-200 dark:bg-cyan-900 dark:focus:bg-cyan-800 px-4 py-2 outline-offset-2 focus:outline-1 focus:outline-neutral-400 dark:outline-neutral-600"
                id="vin"
              />
            </fieldset>
            <fieldset className="flex items-center gap-2">
              <label className="w-24 text-right text-neutral-700 dark:text-neutral-300" htmlFor="price">
                Price
              </label>
              <input
                className="inline-flex grow rounded border border-cyan-900 dark:border-cyan-600 bg-cyan-100 focus:bg-cyan-200 dark:bg-cyan-900 dark:focus:bg-cyan-800 px-4 py-2 outline-offset-2 focus:outline-1 focus:outline-neutral-400 dark:outline-neutral-600"
                id="price"
              />
              <span className="text-neutral-700 dark:text-neutral-300">€</span>
            </fieldset>
            <fieldset className="flex gap-2">
              <label className="w-24 py-2 text-right text-neutral-700 dark:text-neutral-300" htmlFor="description">
                Description
              </label>
              <textarea
                className="inline-flex grow resize-none rounded border border-cyan-900 dark:border-cyan-600 bg-cyan-100 focus:bg-cyan-200 dark:bg-cyan-900 dark:focus:bg-cyan-800 px-4 py-2 outline-offset-2 focus:outline-1 focus:outline-neutral-400 dark:outline-neutral-600"
                id="description"
                rows={3}
              />
            </fieldset>
          </div>
          <div className="mt-6 flex justify-end">
            <Dialog.Close asChild>
              <button className="inline-flex justify-center items-center gap-2 px-4 py-2 rounded-md bg-cyan-600 dark:bg-cyan-900 hover:bg-cyan-400 dark:hover:bg-cyan-700 transition-colors outline-none outline-offset-2 focus-visible:outline-2 focus-visible:outline-neutral-900 dark:focus-visible:outline-neutral-600 font-medium select-none">
                <FaCheck /> Save
              </button>
            </Dialog.Close>
          </div>
          <Dialog.Close asChild>
            <button
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
