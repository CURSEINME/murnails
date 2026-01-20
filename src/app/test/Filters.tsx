'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function Filters() {
  const sp = useSearchParams();
  const router = useRouter();

  const [limit, setId] = useState<string>(sp.get('limit') || '20');
  const [sort, setSort] = useState<string>(sp.get('sort') || 'updatedAt');

  const handleClick = (limit: string) => {
    setId(limit);
    const params = new URLSearchParams(sp);
    params.set('limit', limit);
    router.replace(`?${params.toString()}`);
  };
  const handlePrice = (price: string) => {
    setSort(price);
    const params = new URLSearchParams(sp);
    params.set('sort', price);
    router.replace(`?${params.toString()}`);
  };
  return (
    <div className="flex gap-5">
      {Array.from([2, 3, 5, 10]).map((number, i) => {
        return (
          <button
            key={i}
            className={`rounded-full px-4 py-2 ${number.toString() === limit ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
            onClick={() => handleClick(number.toString())}
          >
            {number}
          </button>
        );
      })}
      <button
        className={`rounded-full px-4 py-2 ${sort === 'price' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
        onClick={() => handlePrice('price')}
      >
        price
      </button>
      <button
        className={`rounded-full px-4 py-2 ${sort === '-price' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
        onClick={() => handlePrice('-price')}
      >
        -price
      </button>
      <button
        className={`rounded-full px-4 py-2 ${sort === 'updatedAt' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
        onClick={() => handlePrice('updatedAt')}
      >
        updatedAt
      </button>
    </div>
  );
}
