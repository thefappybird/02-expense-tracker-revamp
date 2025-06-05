export interface Expense {
  id?: string;
  category: string;
  currency: string;
  description: string;
  name: string;
  price: number;
  date: Date;
}

export interface HighlightedExpenses {
  popular: Expense;
  unPopular: Expense;
}

export interface ExpenseInfo {
  allExpenses: Expense[];
  total: number;
}

export interface AllExpenses {
  data: ExpenseInfo;
  dailyData: ExpenseInfo;
  weeklyData: ExpenseInfo;
  monthlyData: ExpenseInfo;
  customData?: ExpenseInfo;
}

export interface CategoryCount {
  category: string;
  count: number;
}
export interface OppEx {
  item: string;
  count: number;
}
export interface OppExpenses {
  mostPopular: OppEx | null;
  leastPopular: OppEx | null;
}

export interface CurrencyConversion {
  amount: number;
  base: string;
  date: string;
  rates: { [key: string]: number };
}
