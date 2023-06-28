import "./globals.css";
import { Inter } from "next/font/google";
import SideBar from "./components/SideBar";
import { SessionProvider } from "./components/SessionProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import Login from "./components/Login";
import ClientProvider from "./components/ClientProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "PolyglotPal",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <head />
      <body className={inter.className}>
        <SessionProvider session={session}>
          {session ? (
            <div className="flex">
              <div className="bg-[#2a2727] max-w-xs h-screen overflow-y-auto md:min-w-[20rem]">
                <SideBar />
              </div>

              <ClientProvider />

              <div className="bg-[#30323f] flex-1">{children}</div>
            </div>
          ) : (
            <Login />
          )}
        </SessionProvider>
      </body>
    </html>
  );
}
