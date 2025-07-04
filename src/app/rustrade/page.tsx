import Image from "next/image";
import Link from "next/link";
const categories = [
  {
    title: "Category 1",
    image: "/rustrade/tachka.svg",
  },
  {
    title: "Category 2",
    image: "/rustrade/tachka.svg",
  },
  {
    title: "Category 3",
    image: "/rustrade/tachka.svg",
  },
  {
    title: "Category 4",
    image: "/rustrade/tachka.svg",
  },
];

const products = [
  {
    text: "Садово-огородный инструмент (штыковые и совковые лопаты, вилы, грабли, тапки, мотыги, буры и т.д)",
  },
  {
    text: "Товары для пикника (мангалы, шампуры, коптильни)",
  },
  {
    text: "Строительные ведра (12л, 16л и 20л)",
  },
  {
    text: "Снегоуборочный инвентарь (пластиковые лопаты для снега, скреперы)",
  },
  {
    text: "Спорттовары (тюбинги, ватрушки, ледники)",
  },
  {
    text: "Хозтовары (почтовые ящики, металлические урны)",
  },
];

const advantages = [
  {
    title: "Большой ассортимент, лучшее качество",
    description:
      "Производим и поставляем только качественно продукцию. Использование качественного сырья, соблюдение ГОСТ, которые, кажется на производстве и испытанию готовой продукции позволяют нам поставлять с клиеную продукцию.",
    image: "/rustrade/advantages/1.svg",
  },
  {
    title: "Оперативный сервис",
    description:
      "Оперативно получите информацию, о данном товаре или группе товаров.",
    image: "/rustrade/advantages/2.svg",
    contact: "(8171) 343-05, 3479-31",
  },
  {
    title: "Свои складские помещения",
    description:
      "Мы не платим за разницу складов, потому что ЗЗОУ «Р» находится в нашей собственности.",
    image: "/rustrade/advantages/3.svg",
  },
  {
    title: "Продуманная логистика",
    description:
      "Наша компания берет логистику на себя. Продукция доставляется до объема заказчика и устанавливает время. Логисты выставляют наиболее оптимальные по цене варианты действия.",
    image: "/rustrade/advantages/4.svg",
  },
  {
    title: "Низкие цены",
    description:
      "Мы паразитовы лучшую стоимость на рынке своей производителей значительно затрагивают без потерь качества.",
    image: "/rustrade/advantages/5.svg",
  },
];

const Page = () => {
  return (
    <div className="container">
      <ul className="grid grid-cols-1 lg:grid-cols-3 gap-[10px] mb-20">
        {categories.map((category, index) => {
          return (
            <Link
              key={index}
              href={`/categories/${category.title}`}
              className="flex items-center justify-between h-[90px] w-full bg-ultra-light-blue rounded-xl lg:h-[110px] px-[20px]"
            >
              <div className=" h-full rounded-l-xl flex items-center">
                <h3 className=" text-lg font-semibold text-black">
                  {category.title}
                </h3>
              </div>
              {category.image ? (
                <Image
                  src={category.image}
                  alt={category.title}
                  width={120}
                  height={120}
                  className="object-cover h-full"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-[#EAEAEA]">
                  <span className="text-gray-400">No image</span>
                </div>
              )}
            </Link>
          );
        })}
      </ul>
      <div className="bg-ultra-light-blue rounded-xl lg:flex lg:rounded-[50px] mb-20">
        <div className="relative h-[311px] w-full mx-auto mb-[30px] lg:h-auto lg:w-[420px] lg:mb-0 lg:flex-shrink-0">
          <Image
            src="/rustrade/telega.png"
            alt="telega"
            fill
            className="object-cover rounded-xl lg:rounded-[50px]"
          />
        </div>
        <div className="px-[20px] pb-[40px] lg:p-[45px] lg:flex lg:flex-col lg:justify-center lg:items-center">
          <h2 className="mb-[10px]">
            <span className="font-medium text-xl lg:text-[34px]">
              Собственное производство —
            </span>
            <span className="text-xl font-medium">
              главное направление нашей компании
            </span>
          </h2>
          <ul className="flex flex-col gap-[14px]">
            {products.map((product) => {
              return (
                <li
                  key={product.text}
                  className="flex gap-[10px] items-baseline"
                >
                  <div className="h-3 w-3 bg-light-blue rounded-full flex-shrink-0"></div>
                  <div>
                    <div>
                      {product.text.split("(").map((part, i) =>
                        i === 0 ? (
                          <span key={i} className="font-medium text-mb">
                            {part}
                          </span>
                        ) : (
                          <span key={i} className="text-mb">
                            ({part}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="flex flex-col gap-[20px]">
        {advantages.map((item, index) => {
          const isLast = index === advantages.length - 1;

          return (
            <div
              key={item.title}
              className={`bg-ultra-light-blue p-[20px] rounded-xl`}
            >
              <div
                className={`relative ${
                  isLast ? "w-[170px] h-[170px]" : "w-full h-[170px]"
                }`}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className={`${isLast ? "object-contain" : "object-cover"}`}
                  sizes={isLast ? "170px" : "100vw"}
                />
              </div>
              <h3 className="text-2xl font-semibold mb-4">{item.title}</h3>
              <p>{item.description}</p>
              {item.contact && (
                <div className="text-blue font-medium">{item.contact}</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Page;
