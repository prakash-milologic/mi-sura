import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { NextUIAppProvider } from "@/components/next-ui-app-provider";
import QueryClientAppProvider from "@/components/query-client-app-provider";
import SimulationProvider from "@/components/simulation-provider";
import { LocalizationAppProvider } from "@/components/localization-app-provider";
import AutomaticDeviceCreationProvider from "@/components/automatic-device-creation-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MI-Suria",
  description: "Photovoltaic Monitoring System ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system">
          <NextUIAppProvider>
            <QueryClientAppProvider>
              <LocalizationAppProvider>
                {children}
                {/* <AutomaticDeviceCreationProvider> */}
                {/* </AutomaticDeviceCreationProvider> */}
                {/* <SimulationProvider>{children}</SimulationProvider> */}
              </LocalizationAppProvider>
            </QueryClientAppProvider>

            <Toaster />
          </NextUIAppProvider>
        </ThemeProvider>
      </body>
    </html>

    // old layout
    // <html lang="en">
    //   <body className={inter.className}>
    //     <ThemeProvider
    //       attribute="class"
    //       defaultTheme="dark"
    //       enableSystem
    //       disableTransitionOnChange
    //     >
    //       {children}
    //       <Toaster />
    //     </ThemeProvider>
    //   </body>
    // </html>
  );
}
