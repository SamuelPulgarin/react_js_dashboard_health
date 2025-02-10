import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { Patient } from "@/interfaces/patient.interfaces";

interface Props {
  patients: Patient[];
}

const BarChartByMonthAndSex = ({ patients }: Props) => {
  const processPatientData = (patients: Patient[]) => {
    // Inicializar contadores para cada sexo en los 12 meses
    const monthlyCounts = {
      male: Array(12).fill(0),
      female: Array(12).fill(0),
      other: Array(12).fill(0),
    };

    patients.forEach((patient) => {
      if (patient.linkage_date && patient.sex) {
        const month = new Date(patient.linkage_date).getMonth();
        if (patient.sex === "male") {
          monthlyCounts.male[month]++;
        } else if (patient.sex === "female") {
          monthlyCounts.female[month]++;
        } else {
          monthlyCounts.other[month]++;
        }
      }
    });

    return monthlyCounts;
  };

  const monthlyData = processPatientData(patients);

  // Configuración del gráfico
  const options: ApexOptions = {
    chart: {
      id: "stacked-bar-chart",
      stacked: true,
      toolbar: { show: true },
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      title: { text: "Months" },
    },
    yaxis: {
      title: { text: "Count" },
    },
    title: {
      text: "Monthly Linkages by Sex",
      align: "center",
    },
    colors: ["#1E88E5", "#E91E63", "#FFC107"], // Colores para cada sexo
    legend: {
      position: "bottom",
      horizontalAlign: "center",
    },
    plotOptions: {
      bar: {
        horizontal: false,
        dataLabels: {
          position: "center", // Posicionar etiquetas en la parte superior
        },
      },
    },
    dataLabels: {
      enabled: true, // Habilitar etiquetas de datos
      style: {
        fontSize: "12px",
        colors: ["#FFF"], // Color del texto
      },
      formatter: (val: number) => (val > 0 ? val : ""), // Mostrar solo si el valor es mayor a 0
    },
  };

  // Datos para el gráfico
  const series = [
    {
      name: "Male",
      data: monthlyData.male,
    },
    {
      name: "Female",
      data: monthlyData.female,
    },
    {
      name: "Other",
      data: monthlyData.other,
    },
  ];

  return <Chart options={options} series={series} type="bar" height={350} />;
};

export default BarChartByMonthAndSex;
