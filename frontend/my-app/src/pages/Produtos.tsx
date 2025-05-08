import { rootRoute } from "@/main";
import { createRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ProductModal } from "../components/ProductModal";
import {
  productService,
  type Product,
  type ProductInput,
} from "../services/productService";

export const produtosRoute = createRoute({
  pendingComponent: () => <div>Carregando...</div>,
  getParentRoute: () => rootRoute,
  path: "/produtos",
  component: Produtos,
  loader: async () => {
    const products = await productService.listProducts();
    return { products };
  },
});

function Produtos() {
  const { products } = produtosRoute.useLoaderData();
  console.log(products);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>();

  const setProducts = (products: Product[]) => {};

  async function handleSave(productData: ProductInput) {
    try {
      if (selectedProduct) {
        // UI Otimista: Atualiza o produto imediatamente
        const updatedProduct = { ...selectedProduct, ...productData };
        setProducts(
          products.map((p) =>
            p.id === selectedProduct.id ? updatedProduct : p
          )
        );

        // Faz a requisição
        await productService.updateProduct(selectedProduct.id, productData);
      } else {
        // UI Otimista: Adiciona um produto temporário com ID provisório
        const tempProduct = { id: Date.now(), ...productData };
        setProducts([...products, tempProduct]);

        // Faz a requisição
        const newProduct = await productService.createProduct(productData);

        // Atualiza o produto com o ID correto
      }

      setModalOpen(false);
      setSelectedProduct(undefined);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao salvar produto");
    }
  }

  async function handleDelete(id: number) {
    const previousProducts = [...products];
    setProducts(products.filter((p) => p.id !== id));

    try {
      await productService.deleteProduct(id);
    } catch (err) {
      setProducts(previousProducts);
      setError("Falha ao deletar produto");
    }
  }

  function handleEdit(product: Product) {
    setSelectedProduct(product);
    setModalOpen(true);
  }

  function handleCloseModal() {
    setModalOpen(false);
    setSelectedProduct(undefined);
  }

  if (error) {
    return (
      <div className="p-4 text-red-600">
        {error}
        <button className="ml-2 text-blue-500 hover:text-blue-700">
          Tentar novamente
        </button>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Lista de Produtos</h1>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          onClick={() => setModalOpen(true)}
        >
          Novo Produto
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-gray-600">{product.description}</p>
            <div className="mt-2 flex justify-between items-center">
              <span className="text-green-600 font-medium">
                R$ {product.price.toFixed(2)}
              </span>
              <span className="text-gray-500">Estoque: {product.quantity}</span>
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                className="text-blue-500 hover:text-blue-700"
                onClick={() => handleEdit(product)}
              >
                Editar
              </button>
              <button
                className="text-red-500 hover:text-red-700"
                onClick={() => handleDelete(product.id)}
              >
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>

      <ProductModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        onSave={handleSave}
        product={selectedProduct}
      />
    </div>
  );
}
