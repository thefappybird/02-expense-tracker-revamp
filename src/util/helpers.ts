import { ChartConfiguration, ChartData } from 'chart.js';
import { CategoryCount, Expense, ExpenseInfo } from './models';
function generateDummyExpenseInfo(itemCount: number = 10): ExpenseInfo {
  const categories = [
    'Food',
    'Transport',
    'Entertainment',
    'Utilities',
    'Shopping',
    'Healthcare',
  ];
  const foodItems = ['Groceries', 'Restaurant', 'Coffee', 'Takeout'];
  const transportItems = ['Bus fare', 'Taxi', 'Gas', 'Parking'];
  const entertainmentItems = [
    'Movie',
    'Concert',
    'Gacha Purchases',
    'Streaming Service',
  ];
  const utilityItems = [
    'Electricity',
    'Internet',
    'Water Bills',
    'Phone Bills',
  ];
  const shoppingItems = ['Clothes', 'Electronics', 'Books', 'Accessories'];
  const healthcareItems = [
    'Medicine',
    'Doctor Visit',
    'Therapy',
    'Supplements',
  ];

  const expenses: Expense[] = [];
  const today = new Date();
  let total = 0;

  for (let i = 0; i < itemCount; i++) {
    const randomDaysAgo = Math.floor(Math.random() * 30);
    const date = new Date(today);
    date.setDate(date.getDate() - randomDaysAgo);

    const category = categories[Math.floor(Math.random() * categories.length)];
    let name: string;
    let price: number;

    // Category-specific data generation
    switch (category) {
      case 'Food':
        name = foodItems[Math.floor(Math.random() * foodItems.length)];
        price = parseFloat((Math.random() * 50 + 5).toFixed(2));
        break;
      case 'Transport':
        name =
          transportItems[Math.floor(Math.random() * transportItems.length)];
        price = parseFloat((Math.random() * 100 + 10).toFixed(2));
        break;
      case 'Entertainment':
        name =
          entertainmentItems[
            Math.floor(Math.random() * entertainmentItems.length)
          ];
        price = parseFloat((Math.random() * 120 + 15).toFixed(2));
        break;
      case 'Utilities':
        name = utilityItems[Math.floor(Math.random() * utilityItems.length)];
        price = parseFloat((Math.random() * 200 + 30).toFixed(2));
        break;
      case 'Shopping':
        name = shoppingItems[Math.floor(Math.random() * shoppingItems.length)];
        price = parseFloat((Math.random() * 150 + 20).toFixed(2));
        break;
      case 'Healthcare':
        name =
          healthcareItems[Math.floor(Math.random() * healthcareItems.length)];
        price = parseFloat((Math.random() * 300 + 50).toFixed(2));
        break;
      default:
        name = 'Unknown';
        price = 0;
    }

    total += price;
    const currencyRandomizer = Math.random();
    expenses.push({
      price,
      name,
      category,
      date,
      description:
        `${category} expense` + (Math.random() > 0.7 ? ' (important)' : ''),
      currency:
        currencyRandomizer > 0.6
          ? 'EUR'
          : currencyRandomizer > 0.3
          ? 'USD'
          : 'JPY',
    });
  }

  return {
    allExpenses: expenses.sort((a, b) => b.date.getTime() - a.date.getTime()), // Sort by recent first
    total: parseFloat(total.toFixed(2)), // Ensure proper currency formatting
  };
}
export function generateDummyExpenses(): {
  data: ExpenseInfo;
  dailyData: ExpenseInfo;
  weeklyData: ExpenseInfo;
  monthlyData: ExpenseInfo;
} {
  const dummyData: ExpenseInfo = generateDummyExpenseInfo(30);
  const { allExpenses } = dummyData;

  return {
    data: dummyData,
    dailyData: calculateExpensesByCustomPeriod(
      allExpenses,
      new Date(),
      new Date()
    ),
    weeklyData: calculateExpensesByCustomPeriod(
      allExpenses,
      new Date(),
      getDate(7)
    ),
    monthlyData: calculateExpensesByCustomPeriod(
      allExpenses,
      new Date(),
      getDate(30)
    ),
  };
}

export function calculateExpensesByCustomPeriod(
  expenses: Expense[],
  startDate: Date,
  endDate: Date
) {
  const start = new Date(startDate).getTime();
  const end = new Date(endDate).getTime();

  const filteredExpenses = expenses.filter((expense) => {
    const expenseTime = expense.date.getTime();
    return expenseTime >= start && expenseTime <= end; // Filter by date range
  });

  const total = filteredExpenses.reduce(
    (sum, expense) => sum + expense.price,
    0
  );

  return {
    total: parseFloat(total.toFixed(2)),
    allExpenses: filteredExpenses,
  };
}

function getDate(days: number) {
  var today = new Date();
  var date = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + days
  );
  return date;
}

export function getCategoryCounts(expenses: Expense[]): CategoryCount[] {
  if (!expenses || expenses.length === 0) {
    return [];
  }

  const categoryMap = new Map<string, number>();

  // Count expenses by category
  expenses.forEach((expense) => {
    const count = categoryMap.get(expense.category) || 0;
    categoryMap.set(expense.category, count + 1);
  });

  // Convert map to array of objects
  return Array.from(categoryMap.entries())
    .map(([category, count]) => ({
      category,
      count,
    }))
    .sort((a, b) => b.count - a.count); // Sort by count in descending order
}

export function getThemeColor(cssVar: string, fallback = '#000000'): string {
  if (typeof document === 'undefined') return fallback;
  try {
    return (
      getComputedStyle(document.documentElement)
        .getPropertyValue(cssVar)
        .trim() || fallback
    );
  } catch {
    return fallback;
  }
}

export function updateBarChartOptions(): ChartConfiguration['options'] {
  const primary900 = getThemeColor('--color-contrast');
  const primary200 = getThemeColor('--color-secondary-contrast');

  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Disable the legend
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Categories',
          color: primary900,
          font: {
            weight: 'bold',
          },
        },
        ticks: {
          color: primary900,
          font: {
            weight: 'bold',
          },
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Purchases',
          color: primary900,
          font: {
            weight: 'bold',
          },
        },
        ticks: {
          color: primary900, // Y-axis labels
          stepSize: 1, // Ensure ticks increment by 1
          callback: (value) => (Number(value) % 1 === 0 ? value : null), // Skip fractional ticks
        },
        grid: {
          color: primary200, // Grid lines
        },
      },
    },
  };
}

export function updateBarChartData(
  categoryCounts: CategoryCount[]
): ChartData<'bar'> {
  return {
    labels: categoryCounts.map((item) => item.category),
    datasets: [
      {
        data: categoryCounts.map((item) => item.count),
        label: '',
        backgroundColor: getThemeColor('--color-contrast'),
        hoverBackgroundColor: getThemeColor('--color-secondary-contrast'),
        borderWidth: 1,
        borderRadius: 5,
      },
    ],
  };
}

export function findOppositeExpenses(expenses: Expense[] | undefined) {
  const frequencyMap: { [item: string]: number } = {};
  if (!expenses) {
    return null;
  }
  // Count the frequency of each expense item
  expenses.forEach((expense) => {
    frequencyMap[expense.name] = (frequencyMap[expense.name] || 0) + 1;
  });

  // Find the most and least popular items
  const sortedItems = Object.entries(frequencyMap).sort((a, b) => b[1] - a[1]);

  const mostPopular = sortedItems[0]
    ? { item: sortedItems[0][0], count: sortedItems[0][1] }
    : null;
  const leastPopular = sortedItems[sortedItems.length - 1]
    ? {
        item: sortedItems[sortedItems.length - 1][0],
        count: sortedItems[sortedItems.length - 1][1],
      }
    : null;

  return {
    mostPopular,
    leastPopular,
  };
}

export function getSummaryDesc(
  cond: boolean,
  succMsg: string,
  fallMsg: string
) {
  if (cond) {
    return succMsg;
  } else {
    return fallMsg;
  }
}
export function getRecentPurchasesWithDates(
  allExpenses: Expense[],
  count: number = 5
) {
  return getAllRecentPurchases(allExpenses).slice(0, count); // Take the top `count` items
}

export function getAllRecentPurchases(allExpenses: Expense[]) {
  return allExpenses
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) // Sort by most recent
    .map((expense) => ({
      id: expense.id,
      name: expense.name,
      price: expense.price,
      currency: expense.currency,
      date: new Date(expense.date).toLocaleDateString(), // Format the date
    }));
}

export function generateChartColors(count: number): string[] {
  // Use your theme colors or a color scale
  const colors = [];
  const hueStep = 360 / count;

  for (let i = 0; i < count; i++) {
    colors.push(`hsl(${i * hueStep}, 70%, 60%)`);
  }

  return colors;
}
export function calculateCategoryTotals(expenses: Expense[]): CategoryCount[] {
  const categoryMap = new Map<string, number>();

  expenses.forEach((expense) => {
    const currentTotal = categoryMap.get(expense.category) || 0;
    categoryMap.set(expense.category, currentTotal + 100);
  });

  return Array.from(categoryMap.entries()).map(([category, count]) => ({
    category,
    count,
  }));
}

export function updatePieChartData(
  currentTheme: string,
  categoryTotals: CategoryCount[]
) {
  // Determine border color based on the theme
  const isDarkMode = currentTheme.includes('dark');
  const borderColor = isDarkMode ? 'white' : 'black';

  return {
    labels: categoryTotals.map((item) => item.category),
    datasets: [
      {
        data: categoryTotals.map((item) => item.count),
        backgroundColor: generateChartColors(categoryTotals.length),
        borderColor: Array(categoryTotals.length).fill(borderColor), // Set border color
        borderWidth: 2, // Optional: Adjust border width
        hoverOffset: 8,
      },
    ],
  };
}
export function updateChartOptions(): ChartConfiguration['options'] {
  return {
    responsive: true,
    maintainAspectRatio: true, // Ensure aspect ratio is maintained
    aspectRatio: 1.5, // Adjust this value to make the chart more compact
    plugins: {
      legend: {
        position: 'left',
        labels: {
          usePointStyle: true,
          padding: 8, // Reduce padding for compactness
          color: getThemeColor('--color-contrast'),
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.raw as number;
            const total = context.dataset.data
              .filter((value): value is number => typeof value === 'number')
              .reduce((a: number, b: number) => a + b, 0);
            const percentage = Math.round((value / total) * 100);
            return `${label}: $${value.toFixed(2)} (${percentage}%)`;
          },
        },
      },
    },
  };
}
