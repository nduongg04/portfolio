"use client";

import { useEffect, useRef, useState } from "react";
import About from "../components/About";
import Contact from "../components/Contact";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Projects from "../components/Projects";
import TechStack from "../components/TechStack";

export default function App() {
	const [activeSection, setActiveSection] = useState("home");
	const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({
		home: null,
		about: null,
		techstack: null,
		projects: null,
		contact: null,
	});

	useEffect(() => {
		const observerOptions = {
			root: null,
			rootMargin: "0px",
			threshold: 0.5,
		};

		const observerCallback: IntersectionObserverCallback = (entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					setActiveSection(entry.target.id);
				}
			});
		};

		const observer = new IntersectionObserver(
			observerCallback,
			observerOptions
		);

		Object.values(sectionRefs.current).forEach((ref) => {
			if (ref) observer.observe(ref);
		});

		return () => observer.disconnect();
	}, []);

	const handleSetActiveSection = (section: string) => {
		setActiveSection(section);
		sectionRefs.current[section]?.scrollIntoView({ behavior: "smooth" });
	};

	useEffect(() => {
		console.log(activeSection);
	}, [activeSection]);

	return (
		<div className="min-h-screen bg-gray-900 text-white ">
			<Header
				activeSection={activeSection}
				setActiveSection={handleSetActiveSection}
			/>

			<main>
				<section
					id="home"
					ref={(el) => {
						if (el) sectionRefs.current.home = el;
					}}
				>
					<Hero setActiveSection={handleSetActiveSection} />
				</section>
				<section
					id="about"
					ref={(el) => {
						if (el) sectionRefs.current.about = el;
					}}
				>
					<About />
				</section>
				<section
					id="techstack"
					ref={(el) => {
						if (el) sectionRefs.current.techstack = el;
					}}
				>
					<TechStack />
				</section>
				<section
					id="projects"
					ref={(el) => {
						if (el) sectionRefs.current.projects = el;
					}}
					className=" backdrop-blur-none bg-transparent	"
				>
					<Projects />
				</section>
				<section
					id="contact"
					ref={(el) => {
						if (el) sectionRefs.current.contact = el;
					}}
				>
					<Contact />
				</section>
			</main>
		</div>
	);
}
