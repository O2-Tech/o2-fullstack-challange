import { cnpj, cpf } from 'cpf-cnpj-validator';

export const validatorCpf = async (
  data: string | undefined,
): Promise<boolean> => {
  if (!data) return true;

  return cpf.isValid(data);
};

export const validatorCnpj = async (
  data: string | undefined,
): Promise<boolean> => {
  if (!data) return true;
  return cnpj.isValid(data);
};

export const formatCpf = async (data: string | undefined): Promise<string> => {
  if (!data) return '';
  data = data.replace(/\D/g, '');
  data = data.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  return data;
};

export const formatCnpj = async (data: string | undefined): Promise<string> => {
  if (!data) return '';
  data = data.replace(/\D/g, '');
  data = data.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
  return data;
};
