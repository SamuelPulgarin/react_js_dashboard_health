import { CalendarIcon, Filter, X } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useFiltersDropdown } from "../../hooks/beneficiaries/useFiltersDropdown";

interface Props {
    testResult: string;
    setTestResult: (value: string) => void;
    gender: string;
    setGender: (value: string) => void;
    ageRange: { min: number; max: number };
    setAgeRange: (range: { min: number; max: number }) => void;
    hasChildren: boolean;
    setHasChildren: (value: boolean) => void;
    startDate: Date | undefined;
    setStartDate: (date: Date | undefined) => void;
    endDate: Date | undefined;
    setEndDate: (date: Date | undefined) => void;
    clearFilters: () => void;
    applyFilters: (filters: {
        testResult: string;
        gender: string;
        ageRange: { min: number; max: number };
        hasChildren: boolean;
        startDate: Date | undefined;
        endDate: Date | undefined;
    }) => void;
}

export const FiltersDropdown: React.FC<Props> = ({
    testResult,
    setTestResult,
    gender,
    setGender,
    ageRange,
    setAgeRange,
    hasChildren,
    setHasChildren,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    clearFilters,
    applyFilters
}) => {

    const { 
        localTestResult,
        setLocalTestResult,
        localGender,
        setLocalGender,
        localAgeRange,
        setLocalAgeRange,
        localHasChildren,
        setLocalHasChildren,
        localStartDate,
        setLocalStartDate,
        localEndDate,
        setLocalEndDate,
     } = useFiltersDropdown({ testResult, gender, ageRange, hasChildren, startDate, endDate })

    const handleApplyFilters = () => {
        applyFilters({
            testResult: localTestResult,
            gender: localGender,
            ageRange: localAgeRange,
            hasChildren: localHasChildren,
            startDate: localStartDate,
            endDate: localEndDate,
        });
    };

    const handleClearFilters = () => {
        clearFilters();
    };

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
                            value={localTestResult}
                            onValueChange={setLocalTestResult}
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
                            value={localGender}
                            onValueChange={setLocalGender}
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
                                value={localAgeRange?.min || ""}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    setLocalAgeRange({ ...localAgeRange, min: Number(e.target.value) })
                                }
                            />
                            <Input
                                type="number"
                                placeholder="Max Age"
                                value={localAgeRange?.max || ""}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    setLocalAgeRange({ ...localAgeRange, max: Number(e.target.value) })
                                }
                            />
                        </div>
                    </div>

                    {/* Has Children Filter */}
                    <div className="space-y-2">
                        <Label htmlFor="has-children">Has Children</Label>
                        <Select
                            value={localHasChildren ? "Yes" : "No"}
                            onValueChange={(value: "Yes" | "No") => setLocalHasChildren(value === "Yes")}
                        >
                            <SelectTrigger id="has-children">
                                <SelectValue placeholder="Has Children?" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Yes">Yes</SelectItem>
                                <SelectItem value="No">No</SelectItem>
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
                                        {localStartDate ? format(localStartDate, "PPP") : <span>Pick a date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={localStartDate}
                                        onSelect={setLocalStartDate}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {localEndDate ? format(localEndDate, "PPP") : <span>Pick a date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={localEndDate}
                                        onSelect={setLocalEndDate}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>

                    <div className="flex items-center justify-center gap-x-2">

                    {/* Apply and Clear Buttons */}
                    <Button onClick={handleApplyFilters} className="">
                        Apply Filters
                    </Button>
                    <Button onClick={handleClearFilters} className="">
                        <X className="mr-2 h-4 w-4" />
                        Clear Filters
                    </Button>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
};
