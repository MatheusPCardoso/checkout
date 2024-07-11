import "./globals.css";
import "react-credit-cards-2/dist/es/styles-compiled.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <title>JiBot</title>
      <body className="bg-teal-50">{children}</body>
    </html>
  );
}
