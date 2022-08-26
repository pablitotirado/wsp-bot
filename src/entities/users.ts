export type Data = {
  amount: number;
  date: string;
  concept: string;
  paymentMethod: string;
  category: string;
};

export enum Keys {
  Fecha = "Fecha",
  Monto = "Monto",
  Concepto = "Concepto",
  Pago = "Pago",
  Categoria = "Categoria",
}

export const allowedUsers = [process.env.USER_ONE, process.env.USER_TWO];
