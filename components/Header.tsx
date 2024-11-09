"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Icons } from "./Icons";

interface HeaderProps {
	activeSection: string;
	setActiveSection: (section: string) => void;
}

export default function Header({
	activeSection,
	setActiveSection,
}: HeaderProps) {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const navItems = ["home", "about", "techstack", "projects", "contact"];

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 20);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const handleNavClick = (item: string) => {
		setActiveSection(item);
		setIsMobileMenuOpen(false);
		const element = document.getElementById(item);
		element?.scrollIntoView({ behavior: "smooth" });
	};

	return (
		<motion.header
			className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
				isScrolled
					? "bg-gray-900/95 backdrop-blur-md shadow-lg"
					: "bg-transparent"
			}`}
			initial={{ y: -100 }}
			animate={{ y: 0 }}
			transition={{ duration: 0.5 }}
		>
			<nav className="container mx-auto px-6 py-4">
				<div className="flex justify-between items-center">
					<motion.div
						className="text-2xl font-bold text-white"
						whileHover={{ scale: 1.1 }}
					>
						<Link href="/">
							<Icons.LogoIcon width={32} height={32} className="rounded-full" />
						</Link>
					</motion.div>
					<div className="hidden md:flex space-x-1">
						{navItems.map((item) => (
							<motion.div
								key={item}
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
							>
								<Button
									variant={
										activeSection === item
											? "default"
											: "ghost"
									}
									onClick={() => handleNavClick(item)}
									className={`text-sm font-medium ${
										activeSection === item
											? "bg-primary text-primary-foreground"
											: "text-gray-300"
									} ${
										activeSection === item
											? "bg-gradient-to-r from-purple-400 to-blue-400"
											: ""
									}`}
								>
									{item.charAt(0).toUpperCase() +
										item.slice(1)}
								</Button>
							</motion.div>
						))}
					</div>
					<div className="md:hidden">
						<Button
							variant="ghost"
							size="icon"
							onClick={() =>
								setIsMobileMenuOpen(!isMobileMenuOpen)
							}
							aria-label="Toggle menu"
						>
							{isMobileMenuOpen ? (
								<X className="h-6 w-6" />
							) : (
								<Menu className="h-6 w-6" />
							)}
						</Button>
					</div>
				</div>
			</nav>
			{isMobileMenuOpen && (
				<motion.div
					className="md:hidden bg-gray-900/95 backdrop-blur-md"
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -20 }}
					transition={{ duration: 0.3 }}
				>
					{navItems.map((item) => (
						<Button
							key={item}
							variant="ghost"
							onClick={() => handleNavClick(item)}
							className={`w-full justify-start text-left text-sm font-medium ${
								activeSection === item
									? "bg-primary text-primary-foreground"
									: "text-gray-300"
							}`}
						>
							{item.charAt(0).toUpperCase() + item.slice(1)}
						</Button>
					))}
				</motion.div>
			)}
		</motion.header>
	);
}
