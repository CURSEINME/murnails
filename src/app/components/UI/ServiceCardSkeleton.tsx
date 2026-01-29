'use client';

export function ServiceCardSkeleton() {
  return (
    <div className="relative h-[400px] rounded-2xl border border-white/20 bg-card/60 shadow-md backdrop-blur-md overflow-hidden animate-pulse">
      {/* Фото */}
      <div className="h-48 w-full bg-white/10" />

      {/* Контент */}
      <div className="flex h-1/2 flex-col p-5">
        {/* Заголовок */}
        <div className="h-7 w-4/5 rounded bg-white/15" />

        {/* Описание */}
        <div className="mt-3 space-y-2">
          <div className="h-4 w-full rounded bg-white/10" />
          <div className="h-4 w-full rounded bg-white/10" />
          <div className="h-4 w-3/4 rounded bg-white/10" />
        </div>

        {/* Нижняя часть: время + цена */}
        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-full bg-white/15" />
            <div className="h-4 w-16 rounded bg-white/15" />
          </div>
          <div className="h-6 w-20 rounded-full bg-white/15" />
        </div>
      </div>
    </div>
  );
}