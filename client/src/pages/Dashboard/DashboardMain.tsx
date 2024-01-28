import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Listbox, Transition } from '@headlessui/react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

interface Article {
  imageURL: string;
  titleArray: string[];
  summary: string;
  articleLink: string;
  svg: string;
}

export default function DashboardMain() {
  const [data, setData] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);

  const countries = [
    { value: 'US', name: 'United States' },
    { value: 'CA', name: 'Canada' },
    { value: 'GB', name: 'United Kingdom' },
    { value: 'DE', name: 'Germany' },
    { value: 'FR', name: 'France' },
    { value: 'JP', name: 'Japan' },
    { value: 'AU', name: 'Australia' },
    { value: 'SG', name: 'Singapore' },
    { value: 'HK', name: 'Hong Kong' },
    { value: 'NL', name: 'Netherlands' },
    { value: 'SE', name: 'Sweden' },
    { value: 'CH', name: 'Switzerland' },
  ];

  const categories = [
    { value: 'all', name: 'All categories' },
    { value: 'b', name: 'Business' },
    { value: 'e', name: 'Entertainment' },
    { value: 'm', name: 'Health' },
    { value: 't', name: 'Sci/Tech' },
    { value: 's', name: 'Sports' },
    { value: 'h', name: 'Top stories' },
  ];
  const [geo, setGeo] = useState(countries[0]);
  const [cat, setCat] = useState(categories[0]);
  const getTrends = async () => {
    try {
      setLoading(true);
      const response = await fetch('/youtube/trends', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          credentials: 'include',
        },
        body: JSON.stringify({
          geo: geo.value,
          cat: cat.value,
        }),
      });

      setLoading(false);
      if (response.ok) {
        const fetchedData: Article[] = await response.json();
        setData(fetchedData);
      } else {
        setData([]);
        console.error('Failed to fetch trends');
      }
    } catch (error) {
      console.error('Error during fetch:', error);
    }
  };
  useEffect(() => {
    getTrends();
  }, []);

  return (
    <div className='p-2'>
      <div className='flex justify-stretch border-b border-zinc-900  pb-2'>
        <div className='flex'>
          <label className='mt-2 mr-2'>Region</label>
          <Listbox
            as='div'
            className='space-y-1'
            value={geo}
            onChange={(selectedCountry) => setGeo(selectedCountry)}
          >
            {({ open }) => (
              <>
                <div className='relative'>
                  <span className='inline-block w-56 rounded-md shadow-sm'>
                    <Listbox.Button className='cursor-default relative w-full rounded-md border border-New_Gray bg-black pl-3 pr-10 py-2 text-left focus:outline-none focus:border-New_Gray transition ease-in-out duration-150 sm:text-sm sm:leading-5'>
                      <span className='block truncate'>{geo.name}</span>
                      <span className='absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'>
                        <svg
                          className='h-5 w-5 text-zinc-800'
                          viewBox='0 0 20 20'
                          fill='none'
                          stroke='currentColor'
                        >
                          <path
                            d='M7 7l3-3 3 3m0 6l-3 3-3-3'
                            strokeWidth='1.5'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                          />
                        </svg>
                      </span>
                    </Listbox.Button>
                  </span>

                  <Transition
                    show={open}
                    leave='transition ease-in duration-100'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                    className='absolute mt-1 w-full rounded-md bg-white shadow-lg'
                  >
                    <Listbox.Options
                      static
                      className='max-h-60 rounded-md py-1 text-base leading-6 shadow-xs overflow-auto focus:outline-none sm:text-sm sm:leading-5'
                    >
                      {countries.map((country, index) => (
                        <Listbox.Option key={index} value={country}>
                          {({ selected, active }) => (
                            <div
                              className={`${
                                active ? 'text-white bg-[#581C87]' : 'text-gray-900'
                              } cursor-default select-none relative py-2 pl-8 pr-4`}
                            >
                              <span
                                className={`${
                                  selected ? 'font-semibold' : 'font-normal'
                                } block truncate`}
                              >
                                {country.name}
                              </span>
                              {selected && (
                                <span
                                  className={`${
                                    active ? 'text-white' : 'text-[#581C87]'
                                  } absolute inset-y-0 left-0 flex items-center pl-1.5`}
                                >
                                  <svg
                                    className='h-5 w-5'
                                    xmlns='http://www.w3.org/2000/svg'
                                    viewBox='0 0 20 20'
                                    fill='currentColor'
                                  >
                                    <path
                                      fillRule='evenodd'
                                      d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                                      clipRule='evenodd'
                                    />
                                  </svg>
                                </span>
                              )}
                            </div>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </>
            )}
          </Listbox>
        </div>

        <div className='flex ml-2'>
          <label className='mt-2 mr-2'>Category</label>
          <Listbox
            as='div'
            className='space-y-1'
            value={geo}
            onChange={(selectedCategory) => setCat(selectedCategory)}
          >
            {({ open }) => (
              <>
                <div className='relative'>
                  <span className='inline-block w-56 rounded-md shadow-sm'>
                    <Listbox.Button className='cursor-default relative w-full rounded-md border border-New_Gray bg-black pl-3 pr-10 py-2 text-left focus:outline-none focus:border-New_Gray transition ease-in-out duration-150 sm:text-sm sm:leading-5'>
                      <span className='block truncate'>{cat.name}</span>
                      <span className='absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'>
                        <svg
                          className='h-5 w-5 text-zinc-800'
                          viewBox='0 0 20 20'
                          fill='none'
                          stroke='currentColor'
                        >
                          <path
                            d='M7 7l3-3 3 3m0 6l-3 3-3-3'
                            strokeWidth='1.5'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                          />
                        </svg>
                      </span>
                    </Listbox.Button>
                  </span>

                  <Transition
                    show={open}
                    leave='transition ease-in duration-100'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                    className='absolute mt-1 w-full rounded-md bg-white shadow-lg'
                  >
                    <Listbox.Options
                      static
                      className='max-h-60 rounded-md py-1 text-base leading-6 shadow-xs overflow-auto focus:outline-none sm:text-sm sm:leading-5'
                    >
                      {categories.map((category, index) => (
                        <Listbox.Option key={index} value={category}>
                          {({ selected, active }) => (
                            <div
                              className={`${
                                active ? 'text-white bg-[#581C87]' : 'text-gray-900'
                              } cursor-default select-none relative py-2 pl-8 pr-4`}
                            >
                              <span
                                className={`${
                                  selected ? 'font-semibold' : 'font-normal'
                                } block truncate`}
                              >
                                {category.name}
                              </span>
                              {selected && (
                                <span
                                  className={`${
                                    active ? 'text-white' : 'text-[#581C87]'
                                  } absolute inset-y-0 left-0 flex items-center pl-1.5`}
                                >
                                  <svg
                                    className='h-5 w-5'
                                    xmlns='http://www.w3.org/2000/svg'
                                    viewBox='0 0 20 20'
                                    fill='currentColor'
                                  >
                                    <path
                                      fillRule='evenodd'
                                      d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                                      clipRule='evenodd'
                                    />
                                  </svg>
                                </span>
                              )}
                            </div>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </>
            )}
          </Listbox>
        </div>

        <button
          className='w-56 text-white bg-[#581C87] ml-auto hover:bg-[#A149FA] rounded disabled:cursor-not-allowed disabled:text-gray-500'
          onClick={getTrends}
          disabled={loading}
        >
          Hit
        </button>
      </div>
      {loading ? (
        Array.from({ length: 10 }).map((_, index) => (
          <div key={index}>
            <SkeletonTheme baseColor='#0e0e0e' highlightColor='#202020'>
              <div className='flex justify-between'>
                <Skeleton containerClassName='w-full mr-2 mt-5' count={3} height={20} />
                <Skeleton width={200} count={1} height={100} />
              </div>
            </SkeletonTheme>
          </div>
        ))
      ) : (
        <div className='p-2'>
          {Array.isArray(data) && data.length > 0 ? (
            data.map((article, index) => (
              <div
                key={index}
                className='flex flex-col lg:flex-row mb-2 w-full justify-between border-b border-zinc-900 '
              >
                <div className='flex items-center'>
                  <h1 className='text-4xl text-zinc-600 text-center w-14'>{index}</h1>
                  <div className='flex-col lg:w-[50vw] '>
                    <h3 className='text-base text-wrap'>{article.titleArray.join(' | ')}</h3>
                    <p className='text-zinc-600'>
                      {article.summary}{' '}
                      <Link
                        to={article.articleLink}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='underline'
                      >
                        Read More
                      </Link>
                    </p>
                  </div>
                </div>
                <div className='flex   relative'>
                  <p className='absolute text-xs bottom-0 text-gray-400'>Past 24 Hours</p>
                  <div dangerouslySetInnerHTML={{ __html: article.svg }} className='mr-2' />
                  <img
                    src={article.imageURL}
                    className='w-[120px] h-[60px] rounded-md mb-2'
                    alt={`News ${index}`}
                  />
                </div>
              </div>
            ))
          ) : (
            <p>No data available.</p>
          )}
        </div>
      )}
    </div>
  );
}
