import { Suspense } from 'react';
import Filters from './Filters';
import Content from './Content';

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ sort: string; limit: string }>;
}) {
  const res = await fetch(`https://rt52.ru/api/categories?where[parent][equals]=null`, {
    cache: 'no-store',
  }).then((res) => res.json());

  const { sort, limit } = await searchParams;
  return (
    <div className="custom-container">
      <h1 className="mb-10 text-center text-5xl font-bold">List of users</h1>
      <Filters />
      <Suspense key={JSON.stringify({ sort, limit })} fallback={<div>Loading...</div>}>
        <Content sort={sort} limit={Number(limit)} />
      </Suspense>
    </div>
  );
}
