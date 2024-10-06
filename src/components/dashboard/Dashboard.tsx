import { useState, useMemo } from "react"
import { addDays, format, isWithinInterval } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, LineChart, Line, AreaChart, Area } from "recharts"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Patient } from '../../interfaces/patient.interfaces';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Props {
  patients: Patient[];
}


export const Dashboard = ({ patients }: Props) => {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 7),
  });
  const [minAge, setMinAge] = useState<string>("18");
  const [maxAge, setMaxAge] = useState<string>("65");
  const [sex, setSex] = useState<string>("all");

  // Función para filtrar pacientes
  const filteredPatients = useMemo(() => {
    return patients.filter((patient) => {
      // Verificar si las fechas son válidas
      if (!date?.from || !date?.to) return false;

      // Validar que la fecha de vínculo esté dentro del rango de fechas
      const linkageDate = new Date(patient.linkage_date);
      const isWithinDateRange =
        linkageDate >= date.from && linkageDate <= date.to;

      // Validar que la edad esté dentro del rango
      const isWithinAgeRange =
        patient.age >= parseInt(minAge, 10) && patient.age <= parseInt(maxAge, 10);

      // Validar sexo
      const isSexMatch = sex === "all" || patient.sex === sex;

      return isWithinDateRange && isWithinAgeRange && isSexMatch;
    });
  }, [patients, date, minAge, maxAge, sex]);

  // Formatear los datos para las gráficas
  const chartData = filteredPatients.map((patient) => ({
    name: patient.name,
    value: patient.age, // Puedes ajustar este valor según lo que desees graficar
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date Range
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "LLL dd, y")} -{" "}
                      {format(date.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(date.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Age Range
          </label>
          <div className="flex space-x-2">
            <Input
              type="number"
              placeholder="Min Age"
              value={minAge}
              onChange={(e) => setMinAge(e.target.value)}
              className="w-1/2"
            />
            <Input
              type="number"
              placeholder="Max Age"
              value={maxAge}
              onChange={(e) => setMaxAge(e.target.value)}
              className="w-1/2"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Sex
          </label>
          <Select value={sex} onValueChange={setSex}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select sex" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Gráficas con datos filtrados */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Bar Chart</h2>
          <BarChart width={400} height={300} data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Pie Chart</h2>
          <PieChart width={400} height={300}>
            <Pie
              data={chartData}
              cx={200}
              cy={150}
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Line Chart</h2>
          <LineChart width={400} height={300} data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#8884d8" />
          </LineChart>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Area Chart</h2>
          <AreaChart width={400} height={300} data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" />
          </AreaChart>
        </div>
      </div>
    </div>
  );
};