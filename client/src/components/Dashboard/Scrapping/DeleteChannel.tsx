import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { toast } from 'react-toastify';
import { mutate } from 'swr';
import React from 'react';
import { IoClose } from 'react-icons/io5';
interface DeleteChannelProps {
  id: string;
}

export default function DeleteChannel({ id }: DeleteChannelProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const Delete = async () => {
    try {
      const response = await fetch(`/youtube/deleteChannel`, {
        method: 'DELETE',
        body: JSON.stringify({ channelHandle: id }),
        headers: {
          'Content-Type': 'application/json',
          credentials: 'include',
        },
      });
      if (response.ok) {
        toast.success('Deleted Successfully');
        mutate('/youtube/myChannels');
        closeModal();
      } else {
        toast.error('Unable to Delete');
        closeModal();
      }
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setIsLoading(false);
      closeModal();
    }
  };

  const [isOpen, setIsOpen] = useState<boolean>(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <div>
        <button onClick={openModal}>
          <IoClose size={20} className='hover:text-red-500 mb-[2px]' />
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as='div' className='relative z-30' onClose={closeModal}>
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
                  <Dialog.Title as='h3' className='text-2xl font-medium leading-6 text-gray-900'>
                    Delete
                  </Dialog.Title>
                  <div className='mt-2'>
                    <p className='text-sm text-gray-600'>You Are Trying to Delete {id} </p>
                  </div>

                  <div className='flex flex-row-reverse mt-8 gap-5'>
                    <button
                      type='button'
                      className={`inline-flex justify-center rounded-md px-4 py-2 text-sm font-medium ${
                        isLoading
                          ? 'bg-gray-300 cursor-wait'
                          : 'bg-red-100 hover:bg-red-200 text-red-500'
                      }`}
                      onClick={Delete}
                      disabled={isLoading}
                    >
                      {isLoading ? 'Deleting...' : 'Proceed'}
                    </button>
                    <button
                      type='button'
                      className='inline-flex justify-center rounded-md border border-transparent bg-gray-200 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2'
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
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
