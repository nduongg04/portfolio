"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import { forwardRef, useEffect, useRef, useState } from "react";

interface Project {
	id: number;
	title: string;
	description: string;
	image: string;
	github: string;
	live: string;
	tags: string[];
	longDescription: string;
}

const projects: Project[] = [
	{
		id: 1,
		title: "Personal Blog",
		description:
			"A blog built with Next.js and MDX for sharing my learning journey.",
		longDescription:
			"This personal blog showcases my journey as a developer, featuring articles on web development, coding tips, and my experiences with various technologies. Built with Next.js for optimal performance and MDX for flexible content creation, it demonstrates my ability to create a full-featured, responsive web application.",
		image: "/placeholder.svg?height=300&width=400",
		github: "https://github.com/yourusername/personal-blog",
		live: "https://your-blog-url.com",
		tags: ["Next.js", "MDX", "React"],
	},
	{
		id: 2,
		title: "Weather App",
		description: "A weather application using React and a weather API.",
		longDescription:
			"This weather application provides real-time weather information for locations worldwide. Built with React and integrated with a robust weather API, it showcases my skills in working with external APIs, state management, and creating intuitive user interfaces.",
		image: "/placeholder.svg?height=200&width=300",
		github: "https://github.com/yourusername/weather-app",
		live: "https://your-weather-app-url.com",
		tags: ["React", "API", "CSS"],
	},
	{
		id: 3,
		title: "Task Manager",
		description: "A task management app built with React and Node.js.",
		longDescription:
			"This full-stack task management application allows users to create, organize, and track their tasks efficiently. Built with React for the frontend and Node.js for the backend, it demonstrates my ability to create full-stack applications with user authentication, database integration, and real-time updates.",
		image: "/placeholder.svg?height=250&width=350",
		github: "https://github.com/yourusername/task-manager",
		live: "https://your-task-manager-url.com",
		tags: ["React", "Node.js", "MongoDB"],
	},
	{
		id: 4,
		title: "E-commerce Platform",
		description:
			"A full-stack e-commerce solution with user authentication and payment integration.",
		longDescription:
			"This comprehensive e-commerce platform provides a seamless shopping experience for users. Built with Next.js for the frontend and Node.js for the backend, it features user authentication, product management, shopping cart functionality, and secure payment integration with Stripe. This project showcases my ability to create complex, scalable web applications.",
		image: "/placeholder.svg?height=280&width=420",
		github: "https://github.com/yourusername/ecommerce-platform",
		live: "https://your-ecommerce-url.com",
		tags: ["Next.js", "Node.js", "Stripe"],
	},
];

const Projects = forwardRef<HTMLDivElement>((props, ref) => {
	const [selectedProject, setSelectedProject] = useState<Project | null>(
		null
	);
	const [filter, setFilter] = useState<string | null>(null);
	const [visibleProjects, setVisibleProjects] = useState(projects);

	const filterProjects = (tag: string | null) => {
		setFilter(tag);
		if (tag) {
			setVisibleProjects(
				projects.filter((project) => project.tags.includes(tag))
			);
		} else {
			setVisibleProjects(projects);
		}
	};

	const allTags = Array.from(
		new Set(projects.flatMap((project) => project.tags))
	);

	return (
		<section
			id="projects"
			ref={ref}
			className="py-20 bg-gray-800 relative bg-transparent"
		>
			<div className="container mx-auto px-4">
				<motion.h2
					className="text-3xl font-bold mb-8 text-center text-gray-100"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
				>
					Projects
				</motion.h2>
				<div className="mb-8 flex flex-wrap justify-center gap-2">
					<Button
						variant={filter === null ? "default" : "outline"}
						onClick={() => filterProjects(null)}
						className={`mb-2 ${
							filter === null ? "" : "text-gray-700"
						}`}
					>
						All
					</Button>
					{allTags.map((tag) => (
						<Button
							key={tag}
							variant={filter === tag ? "default" : "outline"}
							onClick={() => filterProjects(tag)}
							className={`mb-2 ${
								filter === tag ? "" : "text-gray-700"
							}`}
						>
							{tag}
						</Button>
					))}
				</div>
				<AnimatePresence>
					<motion.div
						className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
						layout
					>
						{visibleProjects.map((project) => (
							<motion.div
								key={project.id}
								layout
								initial={{ opacity: 0, scale: 0.8 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 0.8 }}
								transition={{ duration: 0.5 }}
							>
								<ProjectCard
									project={project}
									onSelect={() => setSelectedProject(project)}
								/>
							</motion.div>
						))}
					</motion.div>
				</AnimatePresence>
			</div>
			<ProjectModal
				project={selectedProject}
				onClose={() => setSelectedProject(null)}
			/>
		</section>
	);
});

Projects.displayName = "Projects";

export default Projects;

function ProjectCard({
	project,
	onSelect,
}: {
	project: Project;
	onSelect: () => void;
}) {
	const [isLoaded, setIsLoaded] = useState(false);
	const imageRef = useRef<HTMLImageElement>(null);

	useEffect(() => {
		if (imageRef.current && imageRef.current.complete) {
			setIsLoaded(true);
		}
	}, []);

	return (
		<Card className="h-full bg-gray-700 border-gray-600 overflow-hidden hover:shadow-lg transition-shadow duration-300">
			<CardHeader className="p-0 aspect-video relative overflow-hidden">
				{!isLoaded && (
					<div className="absolute inset-0 bg-gray-600 animate-pulse" />
				)}
				<Image
					ref={imageRef}
					src={project.image}
					alt={project.title}
					className={`w-full h-full object-cover transition-opacity duration-300 ${
						isLoaded ? "opacity-100" : "opacity-0"
					}`}
					onLoad={() => setIsLoaded(true)}
					width={400}
					height={300}
				/>
			</CardHeader>
			<CardContent className="p-6">
				<CardTitle className="text-xl font-semibold mb-2 text-gray-100">
					{project.title}
				</CardTitle>
				<CardDescription className="text-gray-300 mb-4">
					{project.description}
				</CardDescription>
				<div className="flex flex-wrap gap-2 mb-4">
					{project.tags.map((tag) => (
						<Badge key={tag} variant="secondary">
							{tag}
						</Badge>
					))}
				</div>
				<div className="flex justify-between items-center">
					<Button variant="outline" size="sm" asChild>
						<a
							href={project.github}
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center"
						>
							<Github className="mr-2 h-4 w-4" /> GitHub
						</a>
					</Button>
					<Button size="sm" onClick={onSelect}>
						Learn More
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}

function ProjectModal({
	project,
	onClose,
}: {
	project: Project | null;
	onClose: () => void;
}) {
	if (!project) return null;

	return (
		<Dialog open={!!project} onOpenChange={onClose}>
			<DialogContent className="bg-gray-800 text-gray-100 max-w-3xl">
				<DialogHeader>
					<DialogTitle className="text-2xl font-bold">
						{project.title}
					</DialogTitle>
					
				</DialogHeader>
				<Image
					src={project.image}
					alt={project.title}
					className="w-full h-64 object-cover rounded-md mb-4"
					width={400}
					height={300}
				/>
				<DialogDescription className="text-gray-300 mb-4">
					{project.longDescription}
				</DialogDescription>
				<div className="flex flex-wrap gap-2 mb-4">
					{project.tags.map((tag) => (
						<Badge key={tag} variant="secondary">
							{tag}
						</Badge>
					))}
				</div>
				<div className="flex justify-between">
					<Button asChild>
						<a
							href={project.github}
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center"
						>
							<Github className="mr-2 h-4 w-4" /> View on GitHub
						</a>
					</Button>
					<Button asChild>
						<a
							href={project.live}
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center"
						>
							<ExternalLink className="mr-2 h-4 w-4" /> Live Demo
						</a>
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}
