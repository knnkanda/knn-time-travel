interface EraInfo {
  name: string;
  startYear: number;
  endYear: number;
  startYearOfEra: number;
}

const eras: EraInfo[] = [
  { name: "昭和", startYear: 1926, endYear: 1989, startYearOfEra: 1 },
  { name: "平成", startYear: 1989, endYear: 2019, startYearOfEra: 1 },
  { name: "令和", startYear: 2019, endYear: 2999, startYearOfEra: 1 },
];

export function yearToEra(year: number): string {
  const era = eras.find((e) => year >= e.startYear && year <= e.endYear);
  if (!era) return `${year}年`;

  const eraYear = year - era.startYear + era.startYearOfEra;
  return `${year}年(${era.name}${eraYear}年)`;
}

export function eraToYear(eraName: string, eraYear: number): number {
  const era = eras.find((e) => e.name === eraName);
  if (!era) return 0;

  return era.startYear + eraYear - era.startYearOfEra;
}
