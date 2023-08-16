import "./globals.css";
import Themeprovider from "./Components/Themeprovider";
import { AuthProvider } from "./Providers";
export const metadata = {
  title: "Netmoves.net",
  description: "Stream out your stress. ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Themeprovider>{children}</Themeprovider>
        </AuthProvider>
      </body>
    </html>
  );
}
