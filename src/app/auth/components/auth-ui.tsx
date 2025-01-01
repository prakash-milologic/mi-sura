"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoginForm } from "./login-form";
import { RegisterForm } from "./register-form";
import { Input, Button } from "@nextui-org/react";
import { Label } from "@radix-ui/react-label";
import { Link } from "lucide-react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect } from "react";

export function AuthForm() {
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme("light");
  }, []);

  return (
    // <div className="w-full space-y-5">
    //   <Tabs defaultValue="signin" className="w-full">
    //     <TabsList className="grid w-full grid-cols-1">
    //       {/* <TabsTrigger value="signin">MI-Suria</TabsTrigger> */}
    //       {/* <TabsTrigger value="register">Register</TabsTrigger> */}
    //     </TabsList>
    //     <TabsContent value="signin">
    //       <LoginForm />

    //     </TabsContent>
    //     {/* <TabsContent value="register">
    //       <RegisterForm />
    //     </TabsContent> */}
    //   </Tabs>
    // </div>
    <>
      <Tabs defaultValue="signin" className="w-auto rounded-full">
        {/* <TabsList className="grid w-full grid-cols-1">
          <TabsTrigger value="signin">MI-Suria</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList> */}
        <TabsContent value="signin">
          <LoginForm />
        </TabsContent>
        {/* <TabsContent value="register">
          <RegisterForm />
        </TabsContent> */}
      </Tabs>
    </>
  );
}
