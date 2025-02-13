import { Button } from "@/components/ui/button";
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
import BarChartByMonth from "./BarChartByMonthAndSex";
import LineChartByYear from "./LineChartByYearAndSex";
import PieChartExample from "./PieChartByTestResult";
import BarChartByAgeRange from "./BarChartByAgeRange";
import { useMemo } from "react";

interface Props {
  patients: Patient[];
}

export const Dashboard = ({ patients }: Props) => {

  const { applyFilters, filteredPatients, resetFilters, minAge, setMinAge, maxAge, setMaxAge, sex, setSex, selectedYear, setSelectedYear, status, setStatus } = useFilteredPatients(patients);

  const availableYears = useMemo(() => {
    const years = new Set<number>();

    patients.forEach((patient) => {
      if (patient.linkage_date) {
        const year = new Date(patient.linkage_date).getFullYear();
        years.add(year);
      }
    });

    return Array.from(years).sort((a, b) => b - a);
  }, [patients]);

  return (
    <div className="mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Dashboard</h1>

      <div className="grid grid-cols-1 gap-8 mb-8">
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>Dashboard Filters</CardTitle>
          </CardHeader>
          <CardContent className="grid">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

              {/* <div className="space-y-2">
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
              </div> */}

              <div className="space-y-2">
                <div>
                  <Label htmlFor="year">Year</Label>
                  <Select value={selectedYear} onValueChange={setSelectedYear}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      {
                        availableYears.length > 0 ? (
                          availableYears.map(year => (
                            <SelectItem key={year} value={year.toString()}>
                              {year}
                            </SelectItem>
                          ))
                        ) : (
                          <SelectItem value="none" disabled>No years available</SelectItem>
                        )
                      }
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="refund">Refund</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <div>
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
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-5 md:flex-row md:gap-10">
            <div className="flex-1">
              <Button onClick={resetFilters} variant="outline" className="w-40 md:w-full">
                Reset Filters
              </Button>
            </div>
            <div className="flex-1">
              <Button onClick={applyFilters} className="w-40 md:w-full">
                Apply Filters
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>

      <div className="grid grid-cols-1 place-items-center lg:grid-cols-2 gap-8 max-w-screen-lg mx-auto">
        <BarChartByMonth patients={filteredPatients} />
        <LineChartByYear patients={filteredPatients} />
        <PieChartExample patients={filteredPatients} />
        <BarChartByAgeRange patients={filteredPatients} />
      </div>
    </div>
  );
};

