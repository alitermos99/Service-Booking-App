import { DM_Sans, DM_Mono } from "next/font/google";
import "./globals.css";
import QueryProvider from "./providers/QueryProvider";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';;

const dmSans = DM_Sans({
	subsets: ["latin"],
	variable: "--font-dm-sans",
});

const dmMono = DM_Mono({
	subsets: ["latin"],
	variable: "--font-dm-mono",
	weight: ["400", "500"]
})

export const metadata = {
	title: "ReservEase",
	description: "Easily book/create you service",
};

export default function RootLayout({ children }) {
	return (
		<html
			lang="en"
			className={`${dmSans.variable} ${dmMono.variable} h-full antialiased scroll-smooth`}
		>
			<body className="min-h-full">
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
