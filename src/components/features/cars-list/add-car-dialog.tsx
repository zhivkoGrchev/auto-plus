import { Dialog } from 'radix-ui'
import { FaCheck, FaImage, FaPlus } from 'react-icons/fa'
import { MdClose } from 'react-icons/md'

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
              <label className="w-24 text-right text-neutral-700 dark:text-neutral-300" htmlFor="marke">
                Marke
              </label>
              <input
                className="inline-flex grow rounded border border-cyan-900 dark:border-cyan-600 px-4 py-2 outline-offset-2 focus:outline-1 focus:outline-neutral-400 dark:outline-neutral-600"
                id="marke"
              />
            </fieldset>
            <fieldset className="flex items-center gap-2">
              <label className="w-24 text-right text-neutral-700 dark:text-neutral-300" htmlFor="model">
                Model
              </label>
              <input
                className="inline-flex grow rounded border border-cyan-900 dark:border-cyan-600 px-4 py-2 outline-offset-2 focus:outline-1 focus:outline-neutral-400 dark:outline-neutral-600"
                id="model"
              />
            </fieldset>
            <fieldset className="flex items-center gap-2">
              <label className="w-24 text-right text-neutral-700 dark:text-neutral-300" htmlFor="year">
                Year
              </label>
              <input
                className="inline-flex grow rounded border border-cyan-900 dark:border-cyan-600 px-4 py-2 outline-offset-2 focus:outline-1 focus:outline-neutral-400 dark:outline-neutral-600"
                id="year"
              />
            </fieldset>
            <fieldset className="flex items-center gap-2">
              <label className="w-24 text-right text-neutral-700 dark:text-neutral-300" htmlFor="color">
                Color
              </label>
              <input
                className="inline-flex grow rounded border border-cyan-900 dark:border-cyan-600 px-4 py-2 outline-offset-2 focus:outline-1 focus:outline-neutral-400 dark:outline-neutral-600"
                id="color"
              />
            </fieldset>
            <fieldset className="flex items-center gap-2">
              <label className="w-24 text-right text-neutral-700 dark:text-neutral-300" htmlFor="transmission">
                Transmission
              </label>
              <input
                className="inline-flex grow rounded border border-cyan-900 dark:border-cyan-600 px-4 py-2 outline-offset-2 focus:outline-1 focus:outline-neutral-400 dark:outline-neutral-600"
                id="transmission"
              />
            </fieldset>
            <fieldset className="flex items-center gap-2">
              <label className="w-24 text-right text-neutral-700 dark:text-neutral-300" htmlFor="fuel_type">
                Fuel Type
              </label>
              <input
                className="inline-flex grow rounded border border-cyan-900 dark:border-cyan-600 px-4 py-2 outline-offset-2 focus:outline-1 focus:outline-neutral-400 dark:outline-neutral-600"
                id="fuel_type"
              />
            </fieldset>
            <fieldset className="flex items-center gap-2">
              <label className="w-24 text-right text-neutral-700 dark:text-neutral-300" htmlFor="mileage">
                Mileage
              </label>
              <input
                className="inline-flex grow rounded border border-cyan-900 dark:border-cyan-600 px-4 py-2 outline-offset-2 focus:outline-1 focus:outline-neutral-400 dark:outline-neutral-600"
                id="mileage"
              />
            </fieldset>
            <fieldset className="flex items-center gap-2">
              <label className="w-24 text-right text-neutral-700 dark:text-neutral-300" htmlFor="vin">
                VIN
              </label>
              <input
                className="inline-flex grow rounded border border-cyan-900 dark:border-cyan-600 px-4 py-2 outline-offset-2 focus:outline-1 focus:outline-neutral-400 dark:outline-neutral-600"
                id="vin"
              />
            </fieldset>
            <fieldset className="flex items-center gap-2">
              <label className="w-24 text-right text-neutral-700 dark:text-neutral-300" htmlFor="price">
                Price
              </label>
              <input
                className="inline-flex grow rounded border border-cyan-900 dark:border-cyan-600 px-4 py-2 outline-offset-2 focus:outline-1 focus:outline-neutral-400 dark:outline-neutral-600"
                id="price"
              />
              <span className="text-neutral-700 dark:text-neutral-300">€</span>
            </fieldset>
            <fieldset className="flex gap-2">
              <label className="w-24 py-2 text-right text-neutral-700 dark:text-neutral-300" htmlFor="description">
                Description
              </label>
              <textarea
                className="inline-flex grow resize-none rounded border border-cyan-900 dark:border-cyan-600 px-4 py-2 outline-offset-2 focus:outline-1 focus:outline-neutral-400 dark:outline-neutral-600"
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
