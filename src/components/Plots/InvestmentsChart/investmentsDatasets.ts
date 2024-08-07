import { CalculatorT } from "../../../types/calculator";

export default function investmentsDatasets(calculator: CalculatorT) {
  const { investments, months, annualInvestmentRate } = calculator;
  const newMonthlyInvestment = investments.reduce((acc, entry) => acc + entry.value, 0);
  
  const totalInvestedArr: number[] = [newMonthlyInvestment];
  const noInvestmentGain: number[] = [newMonthlyInvestment];

  for (let i = 1; i < months; i++) {
    const growth = totalInvestedArr[i - 1] * (annualInvestmentRate / 12);
    
    totalInvestedArr.push(totalInvestedArr[i - 1] + growth + newMonthlyInvestment);

    noInvestmentGain.push(noInvestmentGain[i - 1] + newMonthlyInvestment);
  }
  
  return [
    {
      label: 'Суммарные инвестиции',
      data: totalInvestedArr,      
      borderWidth: 1
    },
    {
      label: 'Без роста процентов',
      data: noInvestmentGain,      
      borderWidth: 1
    }
  ];
}