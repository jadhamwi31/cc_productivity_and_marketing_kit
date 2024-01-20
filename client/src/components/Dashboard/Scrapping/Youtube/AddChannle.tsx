import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa6';
export default function AddChannle() {
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  let [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div>
        <button type='button' onClick={openModal}>
          <FaPlus size={100} className='text-New_Gray hover:text-zinc-900' />
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  <Dialog.Title as='h3' className='text-xlg font-medium leading-6 text-gray-900'>
                    Add Account
                  </Dialog.Title>
                  <div className='mt-2'>
                    <p className='text-sm text-gray-500 mb-2'>You Are Trying to Edit Artwork</p>

                    <div className='mb-6'>
                      <label className='text-sm text-gray-500' htmlFor='value'>
                        Platform
                      </label>
                      <select className='bg-gray-300 appearance-none border-2 border-gray-300 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-gray-300 focus:border-gray-300'>
                        <option value=''>Please Select</option>
                        <option value=''>Youtube</option>
                      </select>
                      <label className='text-sm text-gray-500' htmlFor='value'>
                        Url
                      </label>
                      <input
                        type='text'
                        className='bg-gray-300 appearance-none border-2 border-gray-300 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-gray-300 focus:border-gray-300'
                      />
                    </div>
                    <div className=' flex justify-end space-x-2'>
                      <button
                        type='button'
                        className='inline-flex justify-center rounded-md border border-transparent bg-gray-300 w-16 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2'
                        onClick={closeModal}
                      >
                        Cancel
                      </button>
                      <button
                        type='button'
                        className='inline-flex justify-center rounded-md border border-transparent bg-purple-900 w-16  text-white hover:bg-purple-800 px-4 py-2 text-sm font-medium  focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2'
                        onClick={closeModal}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}