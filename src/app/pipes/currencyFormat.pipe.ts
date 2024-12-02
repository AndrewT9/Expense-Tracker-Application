import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currency',
  standalone: true,
})
export class CurrencyPipe implements PipeTransform {
  transform(value: any, currencyCode: string = 'USD', data?: any): string {
    if (value == null) {
      return '';
    }

    const options: Intl.NumberFormatOptions = {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    };

    const formattedValue = new Intl.NumberFormat('en-US', options).format(value);
    const incomeOrExpenseSign = data.transactionType === 'Income' ? '+' : '-';
    const isIncomeOrExpenseSign = data ? incomeOrExpenseSign : '';
    
    return `${isIncomeOrExpenseSign} ${formattedValue}`;
  }
}
