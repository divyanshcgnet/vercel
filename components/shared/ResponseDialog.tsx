'use client'

import { Dialog, Transition } from '@headlessui/react'
import { Dispatch, Fragment } from 'react'
import Button from '../shared/Button'
import { IoClose, IoCloseCircle } from 'react-icons/io5'
import { IoCheckmarkDoneCircle } from 'react-icons/io5'

export enum DialogType {
  SUCCESS,
  FAILED,
}

export default function ResponseDialog({
  isOpen,
  setIsOpen,
  type,
  call,
  message,
  popupTitle,
}: {
  isOpen: boolean
  setIsOpen: Dispatch<boolean>
  type: DialogType
  call: () => void
  message?: string
  popupTitle?: string
}) {
  function closeModal() {
    setIsOpen(false)
  }

  const title = popupTitle || 'Transaction';

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-lg" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="relative w-full max-w-lg transform overflow-hidden rounded-2xl bg-themeDialogBlack p-6 text-left align-middle shadow-xl transition-all">
                <button
                  onClick={closeModal}
                  className="absolute right-4 top-4 rounded-full border-none p-2 outline-none hover:bg-themeBgBlack"
                >
                  <IoClose className="text-2xl transition-all hover:text-themeVioletText " />
                </button>
                <div className="flex flex-col items-center justify-center gap-6">
                  {type === DialogType.SUCCESS ? (
                    <IoCheckmarkDoneCircle className="text-7xl text-green-500" />
                  ) : (
                    <IoCloseCircle className="text-7xl text-red-500" />
                  )}
                  <div className="flex flex-col items-center justify-center text-center">
                    <div className="text-2xl font-semibold">
                      {type === DialogType.SUCCESS
                        ? `${title} Successful`
                        : `${title} Failed`}
                    </div>
                    {message && (
                      <div className="text-sm font-extralight">{message}</div>
                    )}
                  </div>
                  <Button
                    onClick={() => {
                      call()
                      closeModal()
                    }}
                  >
                    Done
                  </Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
