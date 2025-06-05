import { inject, Injectable, signal } from '@angular/core';
import { generateDummyExpenses } from '../../../util/helpers';
import {
  AllExpenses,
  CurrencyConversion,
  ExpenseInfo,
} from '../../../util/models';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
// import { collectionData, Firestore } from '@angular/fire/firestore';
// import { collection } from 'firebase/firestore';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private allExpenses = signal<AllExpenses | null>(null);
  private displayedExpenses = signal<ExpenseInfo | null>(null);
  private httpClient = inject(HttpClient);
  exposedExpenses = this.displayedExpenses.asReadonly();

  getExpenses() {
    const dummyExpenses = generateDummyExpenses();
    this.allExpenses.set(dummyExpenses);
    this.displayedExpenses.set(dummyExpenses.data);
  }

  convertCurrency(from: string, to: string, amount: number) {
    return this.httpClient
      .get<CurrencyConversion>(
        `https://api.frankfurter.dev/v1/latest?base=${from}&symbols=${to}`
      )
      .pipe(
        map((response) => {
          const convertedAmount = (amount * response.rates[to]).toFixed(2);
          return convertedAmount;
        })
      );
  }
}
