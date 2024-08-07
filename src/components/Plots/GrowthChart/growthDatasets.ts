import { CalculatorT } from "../../../types/calculator";

export default function growthDatasets(calculator: CalculatorT) {
  const { investments, months, annualInvestmentRate, fixedExpenses, inflatingExpenses, annualInflationRate, income, annualIncomeIncrease } = calculator;
  
  const totalIncome = income.reduce((acc, entry) => acc + entry.value, 0);
  const newMonthlyInvestment = investments.reduce((acc, entry) => acc + entry.value, 0);
  const newMonthlyFixed = fixedExpenses.reduce((acc, entry) => acc + entry.value, 0);
  const newMonthlyInflating = inflatingExpenses.reduce((acc, entry) => acc + entry.value, 0);
  
  const totalInvestedArr: number[] = [newMonthlyInvestment];
  const monthlyIncome: number[] = [totalIncome];
  
  const monthlyGrowth: number[] = [0]; 
  const monthlyExpenses: number[] = [newMonthlyFixed + newMonthlyInflating];

  const monthlyInflatingValues: number[] = [newMonthlyInflating];

  for (let i = 1; i < months; i++) {
    const growth = totalInvestedArr[i - 1] * (annualInvestmentRate / 12);

    monthlyGrowth.push(growth);
    
    totalInvestedArr.push(totalInvestedArr[i - 1] + growth + newMonthlyInvestment);

    monthlyInflatingValues.push(monthlyInflatingValues[i - 1] * (1 + annualInflationRate / 12));
    monthlyExpenses.push(newMonthlyFixed + monthlyInflatingValues[i]);

    monthlyIncome.push(monthlyIncome[i - 1] * (1 + annualIncomeIncrease / 12));
  }
  
  return [
    {
      label: 'Ежемесячный рост инвестиций',
      data: monthlyGrowth,      
      borderWidth: 1,
    },
    {
      label: 'Расходы',
      data: monthlyExpenses,      
      borderWidth: 1,
    },
    {
      label: 'Зарплата',
      data: monthlyIncome,
      borderWidth: 1,
    },
  ];
}