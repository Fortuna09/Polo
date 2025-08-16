export interface Indicator {
  code: string; 
  label: string; 
  unit: string; 
}

export const INDICATORS: Indicator[] = [
  {
    code: 'NY.GDP.MKTP.CD',
    label: 'PIB (US$ Corrente)',
    unit: 'US$',
  },
  {
    code: 'SP.POP.TOTL',
    label: 'População Total',
    unit: 'Pessoas',
  },
  {
    code: 'SP.DYN.LE00.IN',
    label: 'Expectativa de Vida',
    unit: 'Anos',
  },
];