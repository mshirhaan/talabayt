// src/app/layout.tsx

import { ChakraProvider } from "@/components/ChakraProvider";
import { Navigation } from "@/components/Navigation";
import { AuthProvider } from "@/contexts/AuthContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ChakraProvider>
          <AuthProvider>
            <Navigation />
            {children}
          </AuthProvider>
        </ChakraProvider>
      </body>
    </html>
  );
}
