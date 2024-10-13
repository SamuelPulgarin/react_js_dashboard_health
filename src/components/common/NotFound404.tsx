import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"
import { Link } from "react-router-dom"

export const NotFound404 = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-red-100">
            <AlertCircle className="h-12 w-12 text-red-600" />
          </div>
          <CardTitle className="mt-6 text-3xl font-extrabold text-gray-900">404</CardTitle>
          <CardTitle className="mt-6 text-xl font-semibold text-gray-900">Page Not Found</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-600">
            Sorry, the page you are looking for does not exist or has been moved.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link to={"/dashboard"}>
            <Button className="mt-4">
              Back to Dashboard
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
