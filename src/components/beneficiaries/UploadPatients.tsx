import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Alert, AlertTitle, AlertDescription } from "../ui/alert";
import { useUploadPatients } from "@/hooks/beneficiaries/useUploadPatients";
import { downloadPatientsTemplate } from "@/utils/patient.utils";
import { Spinner } from '../common/Spinner';

export const UploadPatients = () => {
    const [file, setFile] = useState<File | null>(null);
    const { uploadPatients, loading, error } = useUploadPatients();
    const [uploadStatus, setUploadStatus] = useState("idle");

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile && selectedFile.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
            setFile(selectedFile);
            setUploadStatus("idle");
        } else {
            setFile(null);
            setUploadStatus("error");
        }
    };

    const handleUpload = async () => {
        if (!file) return;

        const result = await uploadPatients(file);
        setUploadStatus(result.success ? "success" : "error");
    };

    const handleDownloadTemplate = () => {
        downloadPatientsTemplate();
    };

    return (
        <>
            {
                loading ?
                    <Spinner />
                    : (
                        <div className="flex min-h-screen flex-col items-center justify-center p-24 bg-background text-foreground">
                            <div className="container mx-auto p-4 max-w-2xl">
                                <Button onClick={handleDownloadTemplate} className="mb-4">
                                    Download Template
                                </Button>

                                <Card>
                                    <CardHeader>
                                        <CardTitle>Upload Patients</CardTitle>
                                        <CardDescription>
                                            Please upload an Excel file (.xlsx) that follows the structure of the downloaded template.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex items-center space-x-4">
                                            <Input type="file" accept=".xlsx" onChange={handleFileChange} className="flex-grow" />
                                            <Button onClick={handleUpload} disabled={!file || loading}>
                                                {loading ? "Up..." : "Upload"}
                                            </Button>
                                        </div>
                                        {uploadStatus === "success" && (
                                            <Alert className="mt-4" variant="default">
                                                <AlertTitle>Sucess</AlertTitle>
                                                <AlertDescription>The file has been successfully uploaded.</AlertDescription>
                                            </Alert>
                                        )}
                                        {uploadStatus === "error" && (
                                            <Alert className="mt-4" variant="destructive">
                                                <AlertTitle>Error</AlertTitle>
                                                <AlertDescription>
                                                    {error || "Please select a valid Excel file (.xlsx)."}
                                                </AlertDescription>
                                            </Alert>
                                        )}
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    )
            }
        </>
    );
};
