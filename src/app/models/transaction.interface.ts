export interface ITransaction {
  id?: number;
  name: string;
  amount: number;
  transactionType: string;
  category: string;
  date: string;
}

export interface ITransactionType {
  id: number;
  viewValue: string;
}

export interface ICategories extends ITransactionType {}