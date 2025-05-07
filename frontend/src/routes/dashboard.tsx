import { useStockReport } from "../lib/hooks";

export default function DashboardPage() {
  const { data: stockReport } = useStockReport();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Total de Produtos</h2>
          <p className="text-3xl font-bold">
            {stockReport?.totalProducts ?? 0}
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Valor Total em Estoque</h2>
          <p className="text-3xl font-bold">
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(stockReport?.totalValue ?? 0)}
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">
            Produtos com Estoque Baixo
          </h2>
          <p className="text-3xl font-bold">
            {stockReport?.lowStockProducts ?? 0}
          </p>
        </div>
      </div>
    </div>
  );
}
