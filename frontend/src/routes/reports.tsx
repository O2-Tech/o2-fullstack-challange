import { useState } from "react";
import { useMovementsByPeriod, useStockReport } from "../lib/hooks";

export default function ReportsPage() {
  const [startDate, setStartDate] = useState(
    new Date(new Date().setDate(new Date().getDate() - 30))
      .toISOString()
      .split("T")[0]
  );
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const { data: stockReport } = useStockReport();
  const { data: movements } = useMovementsByPeriod(startDate, endDate);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Relatórios</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Relatório de Estoque */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Relatório de Estoque</h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600">Total em Estoque</p>
              <p className="text-2xl font-bold">
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(stockReport?.totalValue ?? 0)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">
                Produtos com Estoque Baixo
              </p>
              <p className="text-2xl font-bold">
                {stockReport?.lowStockProducts ?? 0}
              </p>
            </div>
          </div>
        </div>

        {/* Relatório de Movimentações */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">
            Movimentações por Período
          </h2>

          <div className="flex gap-4 mb-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Data Inicial
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Data Final
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="border rounded px-3 py-2"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600">Total de Movimentações</p>
              <p className="text-2xl font-bold">{movements?.length ?? 0}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Entradas</p>
              <p className="text-2xl font-bold">
                {movements?.filter((m) => m.type === "IN").length ?? 0}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Saídas</p>
              <p className="text-2xl font-bold">
                {movements?.filter((m) => m.type === "OUT").length ?? 0}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
