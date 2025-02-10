import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Patient } from "../../interfaces/patient.interfaces";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFilteredPatients } from "../../hooks/dashboard/useFilteredPatients";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { DateRange as DayPickerDateRange } from 'react-day-picker';
import BarChartByMonth from "./BarChartByMonthAndSex";
import LineChartByYear from "./LineChartByYearAndSex";
import PieChartExample from "./PieChartByTestResult";
import BarChartByAgeRange from "./BarChartByAgeRange";

interface Props {
  patients: Patient[];
}

export const Dashboard = ({ patients }: Props) => {

  const { applyFilters, date, setDate, minAge, setMinAge, maxAge, setMaxAge, sex, setSex } = useFilteredPatients(patients);

  return (
    <div className="mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Dashboard</h1>

      <div className="grid grid-cols-1 gap-8 mb-8">
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>Dashboard Filters</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="date">Date Range</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="date"
                      variant="outline"
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
                      selected={date as DayPickerDateRange}
                      onSelect={(range) => {
                        if (range) {
                          if (range) {
                            setDate(range as { from: Date; to: Date });
                          }
                        }
                      }}
                      numberOfMonths={2}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>Age Range</Label>
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

              <div className="space-y-2">
                <Label>Sex</Label>
                <Select value={sex} onValueChange={setSex}>
                  <SelectTrigger>
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
          </CardContent>
          <CardFooter>
            <Button onClick={applyFilters} className="w-full">
              Apply Filters
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="grid grid-cols-1 place-items-center lg:grid-cols-2 gap-8 max-w-screen-lg mx-auto">
        <BarChartByMonth patients={patients} />
        <LineChartByYear patients={patients} />
        <PieChartExample patients={patients} />
        <BarChartByAgeRange patients={patients} />
      </div>
    </div>
  );
};

