import "../globals.css";

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
