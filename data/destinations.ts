export type Country = {
  code: string;
  name: string;
  note: string;
};

export const countries: Country[] = [
  { code: "gb", name: "United Kingdom", note: "Sep & Jan intake" },
  { code: "de", name: "Germany", note: "Public universities" },
  { code: "ca", name: "Canada", note: "SDS & non-SDS" },
  { code: "au", name: "Australia", note: "Feb & Jul intake" },
  { code: "ie", name: "Ireland", note: "Stay-back visa" },
  { code: "fr", name: "France", note: "Campus France" },
  { code: "us", name: "United States", note: "F-1 visa" },
  { code: "nz", name: "New Zealand", note: "Work rights" },
  { code: "nl", name: "Netherlands", note: "English taught" },
  { code: "pl", name: "Poland", note: "Low tuition" },
  { code: "it", name: "Italy", note: "Scholarships" },
  { code: "ae", name: "United Arab Emirates", note: "Branch campuses" },
  { code: "ge", name: "Georgia", note: "Medical" },
  { code: "uz", name: "Uzbekistan", note: "Medical" },
  { code: "mt", name: "Malta", note: "Schengen" },
  { code: "sg", name: "Singapore", note: "Business & IT" },
  { code: "se", name: "Sweden", note: "Research" },
  { code: "fi", name: "Finland", note: "Bachelor's intake" },
];

export type FlagItem = {
  key: string;
  code: string;
  name: string;
  note: string;
  flag: string;
};

function loop(list: Country[]): FlagItem[] {
  return list.concat(list).map((c, i) => ({
    key: `${c.code}-${i}`,
    code: c.code,
    name: c.name,
    note: c.note,
    flag: `https://flagcdn.com/w80/${c.code}.png`,
  }));
}

export const flagLoopA = loop(countries.slice(0, 9));
export const flagLoopB = loop(countries.slice(9));
export const flagTicker = loop(countries);

export type DestinationEntry = { name: string; code: string };

export const popularDestinations: DestinationEntry[] = [
  { name: "UK", code: "gb" },
  { name: "USA", code: "us" },
  { name: "Canada", code: "ca" },
  { name: "Australia", code: "au" },
  { name: "New Zealand", code: "nz" },
  { name: "Dubai", code: "ae" },
];

export const europeDestinations: DestinationEntry[] = [
  { name: "Ireland", code: "ie" },
  { name: "Germany", code: "de" },
  { name: "France", code: "fr" },
  { name: "Italy", code: "it" },
  { name: "Spain", code: "es" },
  { name: "Poland", code: "pl" },
  { name: "Malta", code: "mt" },
  { name: "Lithuania", code: "lt" },
  { name: "Latvia", code: "lv" },
  { name: "Bulgaria", code: "bg" },
  { name: "Moldova", code: "md" },
  { name: "Hungary", code: "hu" },
  { name: "Albania", code: "al" },
  { name: "Cyprus", code: "cy" },
  { name: "Finland", code: "fi" },
  { name: "Sweden", code: "se" },
  { name: "Switzerland", code: "ch" },
  { name: "Romania", code: "ro" },
  { name: "Bosnia", code: "ba" },
];

export const alsoExploreDestinations: DestinationEntry[] = [
  { name: "Singapore", code: "sg" },
  { name: "Mauritius", code: "mu" },
];
