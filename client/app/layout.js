import { Geist, Geist_Mono, DM_Sans } from "next/font/google";
import "./globals.css";
import QueryProvider from "./providers/QueryProvider";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

const dmSans = DM_Sans({
	subsets: ["latin"],
	variable: "--font-dm-sans",
});

export const metadata = {
	title: "ReservEase",
	description: "Easily book/create you service",
};

export default function RootLayout({ children }) {
	return (
		<html
			lang="en"
			className={`${dmSans.variable} h-full antialiased`}
		>
			<body className="min-h-full flex flex-col">
				<QueryProvider>
					{children}
				</QueryProvider>

				<ToastContainer
                    position="top-right"
                    autoClose={4000}
                    hideProgressBar={false}
                    pauseOnHover
                    closeOnClick
					theme="dark"
                />
			</body>
		</html>
	);
}
