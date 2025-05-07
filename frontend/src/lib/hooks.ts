import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createProduct,
  createStockMovement,
  deleteProduct,
  getMovementsByPeriod,
  getProduct,
  getProducts,
  getStockMovements,
  getStockReport,
  updateProduct,
} from "./queries";

// Products
export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
}

export function useProduct(id: number) {
  return useQuery({
    queryKey: ["products", id],
    queryFn: () => getProduct(id),
  });
}

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation<
    unknown,
    unknown,
    { id: number; product: Parameters<typeof updateProduct>[1] }
  >({
    mutationFn: ({ id, product }) => updateProduct(id, product),
    onSuccess: (_: unknown, { id }: { id: number }) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["products", id] });
    },
  });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

// Stock Movements
export function useStockMovements() {
  return useQuery({
    queryKey: ["stock-movements"],
    queryFn: getStockMovements,
  });
}

export function useCreateStockMovement() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createStockMovement,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stock-movements"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["reports"] });
    },
  });
}

// Reports
export function useStockReport() {
  return useQuery({
    queryKey: ["reports", "stock"],
    queryFn: getStockReport,
  });
}

export function useMovementsByPeriod(startDate: string, endDate: string) {
  return useQuery({
    queryKey: ["reports", "movements", startDate, endDate],
    queryFn: () => getMovementsByPeriod(startDate, endDate),
  });
}
