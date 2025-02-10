import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { Patient } from "@/interfaces/patient.interfaces";

interface Props {
  patients: Patient[];
}

const BarChartByAgeRange = ({ patients }: Props) => {
  // Procesar datos para obtener la distribución por rangos de edad y sexo
  const processPatientData = (patients: Patient[]) => {
    const ageRanges = [
      { range: "0-10", male: 0, female: 0, other: 0 },
      { range: "11-20", male: 0, female: 0, other: 0 },
      { range: "21-30", male: 0, female: 0, other: 0 },
      { range: "31-40", male: 0, female: 0, other: 0 },
      { range: "41-50", male: 0, female: 0, other: 0 },
      { range: "51-60", male: 0, female: 0, other: 0 },
      { range: "61+", male: 0, female: 0, other: 0 },
    ];

    patients.forEach((patient) => {
      const { age, sex } = patient;

      if (age >= 0 && age <= 10) ageRanges[0][sex] += 1;
      else if (age >= 11 && age <= 20) ageRanges[1][sex] += 1;
      else if (age >= 21 && age <= 30) ageRanges[2][sex] += 1;
      else if (age >= 31 && age <= 40) ageRanges[3][sex] += 1;
      else if (age >= 41 && age <= 50) ageRanges[4][sex] += 1;
      else if (age >= 51 && age <= 60) ageRanges[5][sex] += 1;
      else if (age >= 61) ageRanges[6][sex] += 1;
    });

    return ageRanges;
  };

  // Procesar los datos de pacientes
  const ageRanges = processPatientData(patients);

  // Extraer datos para el gráfico
  const categories = ageRanges.map((range) => range.range); // Ejemplo: ["0-10", "11-20", ...]
  const maleData = ageRanges.map((range) => range.male);
  const femaleData = ageRanges.map((range) => range.female);
  const otherData = ageRanges.map((range) => range.other);

  // Configuración del gráfico
  const options: ApexOptions = {
    chart: {
      type: "bar",
      stacked: true, // Hacer las barras apiladas
      toolbar: { show: true },
    },
    xaxis: {
      categories: categories, // Rangos de edad como etiquetas
      title: { text: "Age Ranges" },
    },
    yaxis: {
      title: { text: "Count" },
    },
    title: {
      text: "Patient Age Distribution by Gender",
      align: "center",
    },
    colors: ["#1E90FF", "#FF69B4", "#32CD32"], // Colores para male, female, other
    legend: {
      position: "bottom",
    },
  };

  const series = [
    { name: "Male", data: maleData },
    { name: "Female", data: femaleData },
    { name: "Other", data: otherData },
  ];

  return <Chart options={options} series={series} type="bar" height={350} />;
};

export default BarChartByAgeRange;
