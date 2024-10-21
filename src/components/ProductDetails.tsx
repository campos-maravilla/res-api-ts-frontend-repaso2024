import {
  ActionFunctionArgs,
  Form,
  redirect,
  useFetcher,
  useNavigate,
} from "react-router-dom";
import { formatCurrency } from "..";
import { Product } from "../types";
import { deleteProduct } from "../services/ProductService";

type ProductDetailProps = {
  product: Product;
};

export async function action({ params }: ActionFunctionArgs) {
  // console.log(params.id);
  if (params.id !== undefined) {
    await deleteProduct(+params.id);
    return redirect("/");
  }
}

export default function ProductDetails({ product }: ProductDetailProps) {
  const navigate = useNavigate();
  const fetcher = useFetcher();

  const isAvailable = product.availability;

  return (
    <tr className="border-b">
      <td className="p-3 text-lg text-gray-800">{product.name}</td>

      <td className="p-3 text-lg text-gray-800">
        {formatCurrency(product.price)}
      </td>

      <td className="p-3 text-lg text-gray-800">
        <fetcher.Form method="POST">
          <button
            type="submit"
            //  name="availability"
            //  value={product.availability.toString()}
            name="id"
            value={product.id}
            className={`${isAvailable ? "text-black" : "text-red-600"}
        rounded-lg p-2 text-sm uppercase font-bold w-full border border-black-100 hover:cursor-pointer
        `}
          >
            {isAvailable ? "Disponible" : "No Disponible"}
          </button>
        </fetcher.Form>
      </td>

      <td className="p-3 text-lg text-gray-800">
        <div className="flex gap-2 items-center">
          <button
            onClick={() =>
              navigate(`/productos/${product.id}/editar`, {
                state: {
                  product,
                },
              })
            }
            className="w-full bg-cyan-500 p-3 rounded-full text-white font-bold text-center uppercase text-xs"
          >
            Editar
          </button>
          <Form
            className="w-full"
            method="POST"
            action={`productos/${product.id}/eliminar`}
            onSubmit={(e) => {
              if (!confirm("¿Eliminar?")) {
                e.preventDefault();
              }
            }}
          >
            <input
              type="submit"
              value="Eliminar"
              className="w-full bg-red-500 p-3 rounded-full text-white font-bold text-center uppercase text-xs"
            />
          </Form>
        </div>
      </td>
    </tr>
  );
}
