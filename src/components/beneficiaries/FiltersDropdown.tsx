import * as React from "react"
import { CalendarIcon, Filter, X } from "lucide-react"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface Props {
    testResultFilter: string;
    setTestResultFilter: (value: string) => void;
    genderFilter: string;
    setGenderFilter: (value: string) => void;
    ageRange: { min: string; max: string };
    setAgeRange: (range: { min: string; max: string }) => void;
    hasChildrenFilter: string;
    setHasChildrenFilter: (value: string) => void;
    startDate: Date | undefined;
    setStartDate: (date: Date | undefined) => void;
    endDate: Date | undefined;
    setEndDate: (date: Date | undefined) => void;
    clearFilters: () => void;
}

export const FiltersDropdown: React.FC<Props> = ({
    testResultFilter,
    setTestResultFilter,
    genderFilter,
    setGenderFilter,
    ageRange,
    setAgeRange,
    hasChildrenFilter,
    setHasChildrenFilter,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    clearFilters,
}) => {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" className="w-[100px] justify-start">
                    <Filter className="mr-2 h-4 w-4" />
                    Filters
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-4">
                <div className="space-y-4">
                    <h4 className="font-medium leading-none">Filters</h4>

                    {/* Test Result Filter */}
                    <div className="space-y-2">
                        <Label htmlFor="test-result">Test Result</Label>
                        <Select
                            value={testResultFilter}
                            onValueChange={setTestResultFilter}
                        >
                            <SelectTrigger id="test-result">
                                <SelectValue placeholder="Select test result" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="All">All results</SelectItem>
                                <SelectItem value="Positive">Positive</SelectItem>
                                <SelectItem value="Negative">Negative</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Gender Filter */}
                    <div className="space-y-2">
                        <Label htmlFor="gender">Gender</Label>
                        <Select
                            value={genderFilter}
                            onValueChange={setGenderFilter}
                        >
                            <SelectTrigger id="gender">
                                <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="All">All genders</SelectItem>
                                <SelectItem value="Male">Male</SelectItem>
                                <SelectItem value="Female">Female</SelectItem>
                                <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Age Range Filter */}
                    <div className="space-y-2">
                        <Label>Age Range</Label>
                        <div className="flex space-x-2">
                            <Input
                                type="number"
                                placeholder="Min Age"
                                value={ageRange?.min || ''}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAgeRange({ ...ageRange, min: e.target.value })}
                            />
                            <Input
                                type="number"
                                placeholder="Max Age"
                                value={ageRange?.max || ''}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAgeRange({ ...ageRange, max: e.target.value })}
                            />
                        </div>
                    </div>

                    {/* Has Children Filter */}
                    <div className="space-y-2">
                        <Label htmlFor="has-children">Has Children</Label>
                        <Select
                            value={hasChildrenFilter}
                            onValueChange={setHasChildrenFilter}
                        >
                            <SelectTrigger id="has-children">
                                <SelectValue placeholder="Has Children?" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Yes">Yes</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Date Range Filter */}
                    <div className="space-y-2">
                        <Label>Linkage Date</Label>
                        <div className="flex space-x-2">
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {startDate ? (
                                            format(startDate, "PPP")
                                        ) : (
                                            <span>Pick a date</span>
                                        )}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={startDate}
                                        onSelect={setStartDate}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {endDate ? (
                                            format(endDate, "PPP")
                                        ) : (
                                            <span>Pick a date</span>
                                        )}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={endDate}
                                        onSelect={setEndDate}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>

                    <Button onClick={clearFilters} className="w-full">
                        <X className="mr-2 h-4 w-4" />
                        Clear Filters
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    )
}
