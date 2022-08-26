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

export const allowedUsers = ["5492215854337@c.us", "5491127797642@c.us"];
