import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { PedidosProvider } from "@/context/PedidosContext";
import { AlmacenesProvider } from "@/context/AlmacenesContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "AlmacenesHub - Sistema de Gestión de Pedidos",
  description:
    "Plataforma integral para gestión de almacenes, depósitos y envíos",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <AlmacenesProvider>
            <PedidosProvider>{children}</PedidosProvider>
          </AlmacenesProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
