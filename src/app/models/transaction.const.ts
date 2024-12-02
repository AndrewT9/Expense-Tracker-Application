import { ITransaction } from './transaction.interface'

export const TransactionData: ITransaction[] = [
  // {
  //   id: 1,
  //   name: 'Andriy',
  //   amount: 1000.00,
  //   transactionType: 'Income',
  //   category: 'Job',
  //   date: '2024-12-18T00:00:00.000+02:00',
  // },
  // {
  //   id: 2,
  //   name: 'Olivia',
  //   amount: 100.00,
  //   transactionType: 'Expense',
  //   category: 'Dishes',
  //   date: '2024-12-18T00:00:00.000+02:00',
  // },
  // {
  //   id: 3,
  //   name: 'Olivia',
  //   amount: 1000.00,
  //   transactionType: 'Expense',
  //   category: 'Dishes',
  //   date: '2024-12-18T00:00:00.000+02:00',
  // },
]

export enum TransactionEnum {
  Expense = 'Expense',
  Income = 'Income',
}

export const COLUMNS = ['id', 'name', 'amount', 'transactionType', 'category', 'date', 'actions'];

export const TRANSACTION_TYPE = [
  { id: 1, viewValue: TransactionEnum.Expense },
  { id: 2, viewValue: TransactionEnum.Income },
]

export const CATEGORIES = [
  { id: 1, viewValue: 'Food' },
  { id: 2, viewValue: 'Medicine' },
  { id: 3, viewValue: 'House' },
  { id: 4, viewValue: 'Job' },
  { id: 5, viewValue: 'Dishes' },
]
