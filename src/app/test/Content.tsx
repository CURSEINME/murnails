import { Suspense } from 'react';

async function AnotherContent({categoryId}: {categoryId: string}) {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  const res = await fetch(`https://rt52.ru/api/categories?id=${categoryId}`, {
    cache: 'no-store',
  }).then((res) => res.json());
  return <div>{res.docs.map((user: any) => user.title)}</div>;
}

export default async function Content({
  sort,
  limit,
  categoryId = '68b15b4ebd0a2f9e33bac2b7',
  page = 1,
}: {
  sort: string;
  limit: number;
  categoryId?: string;
  page?: number;
}) {
  const res = await fetch(
    `https://rt52.ru/api/products?where[categories][equals]=${categoryId}&limit=${limit}&page=${page}&sort=${sort}`,
    {
      cache: 'force-cache',
      next: { revalidate: 30 },
    },
  ).then((res) => res.json());

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <AnotherContent categoryId={categoryId} />
      </Suspense>
      <ul className="grid grid-cols-4 gap-5">
        {res.docs.map((user: any) => (
          <li className="flex flex-col rounded-lg border-2 border-gray-300 p-5" key={user.id}>
            <div>{user.title}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
