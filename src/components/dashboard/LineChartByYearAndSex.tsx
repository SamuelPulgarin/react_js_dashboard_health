import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { Patient } from "@/interfaces/patient.interfaces";

interface Props {
  patients: Patient[];
}

interface YearlyCounts {
  [key: number]: number;
}

const LineChartByYearAndSex = ({ patients }: Props) => {
  // Función para procesar los datos de pacientes y contar vinculaciones por año y sexo
  const processPatientData = (patients: Patient[]) => {
    const yearlyCounts: {
      male: YearlyCounts;
      female: YearlyCounts;
      other: YearlyCounts;
    } = {
      male: {},
      female: {},
      other: {},
    };

    patients.forEach((patient) => {
      if (patient.linkage_date && patient.sex) {
        const year = new Date(patient.linkage_date).getFullYear(); // Obtener el año
        if (patient.sex === "male") {
          yearlyCounts.male[year] = (yearlyCounts.male[year] || 0) + 1;
        } else if (patient.sex === "female") {
          yearlyCounts.female[year] = (yearlyCounts.female[year] || 0) + 1;
        } else {
          yearlyCounts.other[year] = (yearlyCounts.other[year] || 0) + 1;
        }
      }
    });

    // Convertir los datos en arrays para los años y las frecuencias (asegurando consistencia en años)
    const years = [...new Set(patients.map((p) => new Date(p.linkage_date).getFullYear()))].sort();
    const maleData = years.map((year) => yearlyCounts.male[year] || 0);
    const femaleData = years.map((year) => yearlyCounts.female[year] || 0);
    const otherData = years.map((year) => yearlyCounts.other[year] || 0);

    return { years, maleData, femaleData, otherData };
  };

  // Procesar los datos de pacientes
  const { years, maleData, femaleData, otherData } = processPatientData(patients);

  // Configuración del gráfico
  const options: ApexOptions = {
    chart: {
      id: "line-chart",
      toolbar: {
        show: true,
        tools: {
          zoom: false,
          zoomin: false,
          zoomout: false,
          pan: false,
          reset: false,
          download: true,
        },
      },
    },
    xaxis: {
      categories: years, // Años procesados dinámicamente
      title: { text: "Years" },
    },
    yaxis: {
      title: { text: "Count" },
    },
    title: {
      text: "Yearly Trends by Sex",
      align: "center",
    },
    stroke: {
      curve: "smooth",
    },
    colors: ["#1E88E5", "#E91E63", "#FFC107"], // Colores para male, female y other
    legend: {
      position: "top",
      horizontalAlign: "center",
    },
  };

  // Datos para el gráfico
  const series = [
    {
      name: "Male",
      data: maleData, // Datos de hombres
    },
    {
      name: "Female",
      data: femaleData, // Datos de mujeres
    },
    {
      name: "Other",
      data: otherData, // Datos de otros
    },
  ];

  return <Chart options={options} series={series} type="line" height={350} />;
};

export default LineChartByYearAndSex;
