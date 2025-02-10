import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { Patient } from "@/interfaces/patient.interfaces";

interface Props {
  patients: Patient[];
}

const PieChartByTestResult = ({ patients }: Props) => {
  // Procesar datos de los pacientes para contar resultados de pruebas
  const processPatientData = (patients: Patient[]) => {
    const counts = {
      positive: 0,
      negative: 0,
    };

    patients.forEach((patient) => {
      if (patient.test_result === "positive") {
        counts.positive += 1;
      } else if (patient.test_result === "negative") {
        counts.negative += 1;
      } 
    });

    return counts;
  };

  // Procesar datos de los pacientes
  const { positive, negative } = processPatientData(patients);

  // Configuración del gráfico
  const options: ApexOptions = {
    chart: {
      type: "pie",
      toolbar: { show: true },
    },
    labels: ["Positive", "Negative"], // Etiquetas de cada segmento
    title: {
      text: "Test Results Distribution",
      align: "center",
    },
    colors: ["#00E396", "#FF4560"], // Colores personalizados
    legend: {
      position: "bottom",
    },
  };

  // Datos para el gráfico
  const series = [positive, negative]; // Cantidades calculadas

  return <Chart options={options} series={series} type="pie" height={350} />;
};

export default PieChartByTestResult;
