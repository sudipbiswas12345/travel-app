
// import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";

// import AOSProvider from "./providers/AOSProvider";
// import ReactQueryProvider from "./providers/ReactQueryProvider";
// import Header from "./components/Header";
// import Footer from "./components/Footer";

// const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
// const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Travelly",
//   description: "Professional travel app",
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
//         <ReactQueryProvider>
//           <AOSProvider>
//             <Header />

//             <main>{children}</main>

//             <Footer />
//           </AOSProvider>
//         </ReactQueryProvider>
//       </body>
//     </html>
//   );
// }


// =======================================================


// ... existing imports
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";


import ReactQueryProvider from "./providers/ReactQueryProvider";
import Header from "./components/Header";
import Footer from "./components/Footer";;
import { Toaster } from "sonner";
import { AuthProvider } from "./contexts/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Travelly",
  description: "Professional travel app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <ReactQueryProvider>
          
          <AuthProvider>
            <Header/>
            {children}
            <Toaster richColors position="top-center" />
            <Footer/>
          </AuthProvider>
          
        </ReactQueryProvider>
      </body>

    </html>
  );
}


