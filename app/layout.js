import "./globals.css";

export const metadata = {
  title: "Forge eVisa — Business in India begins here",
  description: "A clear, guided way to apply for an Indian business eVisa.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
