import { Patient } from '../interfaces/patient.interfaces';
import { ChartData, AgeRangeData } from '../interfaces/dashboard.interfaces';

type Sex = 'male' | 'female' | 'other';
export const getBarChartData = (patients: Patient[]): ChartData[] => {
  const counts: Record<Sex, number> = { male: 0, female: 0, other: 0 };

  patients.forEach((patient) => {
    if (counts[patient.sex as Sex] !== undefined) {
      counts[patient.sex as Sex] += 1;
    }
  });

  return Object.keys(counts).map((key) => ({
    name: key,
    value: counts[key as Sex],
  }));
};


type TestResult = 'positive' | 'negative';
export const getPieChartData = (patients: Patient[]): ChartData[] => {
  const testResults: Record<TestResult, number> = { positive: 0, negative: 0 };

  patients.forEach((patient) => {
    if (testResults[patient.test_result as TestResult] !== undefined) {
      testResults[patient.test_result as TestResult] += 1;
    }
  });

  return Object.keys(testResults).map((key) => ({
    name: key,
    value: testResults[key as TestResult],
  }));
};

type AgeRange = "18-30" | "31-40" | "41-50" | "51-60" | "61-70" | "71-80";
export const getLineChartData = (patients: Patient[]): AgeRangeData[] => {
  const ageRanges = {
    "18-30": 0,
    "31-40": 0,
    "41-50": 0,
    "51-60": 0,
    "61-70": 0,
    "71-80": 0,
  };

  patients.forEach((patient) => {
    const age = patient.age;
    if (typeof age === "number") {
      if (age >= 18 && age <= 30) ageRanges["18-30"] += 1;
      else if (age >= 31 && age <= 40) ageRanges["31-40"] += 1;
      else if (age >= 41 && age <= 50) ageRanges["41-50"] += 1;
      else if (age >= 51 && age <= 60) ageRanges["51-60"] += 1;
      else if (age >= 61 && age <= 70) ageRanges["61-70"] += 1;
      else if (age >= 71 && age <= 80) ageRanges["71-80"] += 1;
    }
  });

  return Object.keys(ageRanges).map((range) => ({
    ageRange: range,
    count: ageRanges[range as AgeRange],
  }));
};

export const getAreaChartData = (patients: Patient[]): AgeRangeData[] => {
  // Declara el objeto con los rangos de edad con claves estrictamente tipadas
  const ageRanges: Record<AgeRange, number> = {
    "18-30": 0,
    "31-40": 0,
    "41-50": 0,
    "51-60": 0,
    "61-70": 0,
    "71-80": 0,
  };

  patients.forEach((patient) => {
    // Filtrar solo pacientes que tengan hijos
    if (Array.isArray(patient.children) && patient.children.length > 0) {
      const age = patient.age;
      if (typeof age === "number") {
          if (age >= 18 && age <= 30) ageRanges["18-30"] += 1;
          else if (age >= 31 && age <= 40) ageRanges["31-40"] += 1;
          else if (age >= 41 && age <= 50) ageRanges["41-50"] += 1;
          else if (age >= 51 && age <= 60) ageRanges["51-60"] += 1;
          else if (age >= 61 && age <= 70) ageRanges["61-70"] += 1;
          else if (age >= 71 && age <= 80) ageRanges["71-80"] += 1;
      }
  }
  });

  return Object.keys(ageRanges).map((range) => ({
    ageRange: range as AgeRange,
    count: ageRanges[range as AgeRange],
  }));
};

export const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

