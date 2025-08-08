import ShoppingCartContextProvider from "@/context/ShoppingCartContext";
import "./globals.css";
import Layout from "@/components/Layout/Layout";
import AuthContextProvider from "@/context/AuthContext";
import ChatBot from "@/components/ChatBot/ChatBot";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <AuthContextProvider>
        <ShoppingCartContextProvider>
          <Layout>{children} <ChatBot/></Layout>
        </ShoppingCartContextProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
