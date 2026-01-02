import ProductCard from "@/components/ProductCard/ProductCard";
import { IProduct } from "@/Types/Types";

interface IProps {
  params: { id: string };
}

const ProductBrands = async ({ params }: IProps) => {
  const { id } = params;
  console.log(id);

  // ✅ دیکد کردن id
  const decodedId = decodeURIComponent(id);

  const res = await fetch("https://apika.ir/apitak/get_products.php");
  const data = (await res.json()) as IProduct[];

  // ✅ فیلتر با نام دیکد شده
  const filteredByBrand = data.filter((product) =>
    product.brand.includes(decodedId)
  );

  return (
    <div className="w-[95%] mx-auto">
      <h1 className="text-center text-3xl font-bold my-10">
        محصولات برند {decodedId}
      </h1>

      <div className="grid lg:grid-cols-4 gap-4 my-10">
        {filteredByBrand.length > 0 ? (
          filteredByBrand.map((item) => <ProductCard key={item.id} {...item} />)
        ) : (
          <p className="col-span-4 text-center text-gray-600 py-6">
            محصولی از برند "{decodedId}" یافت نشد.
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductBrands;
