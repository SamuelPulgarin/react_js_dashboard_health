import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useAuth } from '../../hooks/auth/useAuth';
import { Spinner } from "../common/Spinner";
import React from "react";

export const LoginForm = () => {
  const {
    email,
    password,
    setEmail,
    setPassword,
    handleSubmit,
    error,
    loading,
  } = useAuth();

  return (
    <div className="flex items-center justify-center h-screen w-screen">
      {loading ? (
        <Spinner />
      ) : (
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Sign in</CardTitle>
            <CardDescription>Enter your credentials to access</CardDescription>
          </CardHeader>
          <form onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}>
            <CardContent>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setEmail(e.target.value)
                    }
                    required
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setPassword(e.target.value)
                    }
                    required
                  />
                </div>
                {error && <p className="text-red-500">{error}</p>}
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full">
                Iniciar Sesión
              </Button>
            </CardFooter>
          </form>
        </Card>
      )}
    </div>
  );
};
