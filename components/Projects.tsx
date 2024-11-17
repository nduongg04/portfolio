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
		title: "Live Docs",
		description:
			"A collaborative document editor built with Next.js and Tailwind CSS.",
		longDescription:
			"This collaborative document editor showcases my ability to create a full-featured, responsive web application. Built with Next.js for optimal performance and Tailwind CSS for a modern, clean design, it demonstrates my ability to create a full-featured, responsive web application.",
		image: "/assets/images/live-docs.gif",
		github: "https://github.com/nduongg04/live-docs-fe",
		live: "https://live-docs.duong.website",
		tags: [
			"Next.js",
			"Tailwind CSS",
			"React",
			"MongoDB",
			"Github Actions",
			"Docker",
			"AWS ECR",
			"AWS EC2",
		],
	},
	{
		id: 2,
		title: "Blog GraphQL API",
		description:
			"A blog built with NestJS and GraphQL for sharing my learning journey.",
		longDescription:
			"This blog highlights my skills in developing a GraphQL API. Utilizing NestJS for high performance and GraphQL for a sleek, contemporary design, it exemplifies my capability to build a comprehensive API.",
		image: "/assets/images/nestjs-graphql-blog.png",
		github: "https://github.com/nduongg04/nestjs-graphql-blog",
		live: "https://nestjs-graphql-blog.duong.website",
		tags: [
			"NestJS",
			"GraphQL",
			"PostgreSQL",
			"Docker",
			"AWS ECR",
			"AWS EC2",
			"Github Actions",
		],
	},
	{
		id: 3,
		title: "E-commerce API",
		description: "An e-commerce API built with NestJS and MongoDB.",
		longDescription:
			"This e-commerce API highlights my skills in developing a robust, scalable API. Utilizing NestJS for high performance and MongoDB for a flexible, modern design, it exemplifies my capability to build a comprehensive API.",
		image: "/assets/images/nestjs-e-commerce.png",
		github: "https://github.com/nduongg04/nestjs-ecommerce-api",
		live: "https://nestjs-ecommerce-api.duong.website",
		tags: [
			"NestJS",
			"PostgreSQL",
			"Docker",
			"AWS ECR",
			"AWS EC2",
			"Github Actions",
		],
	},
	{
		id: 4,
		title: "Portfolio",
		description: "A portfolio website built with Next.js and Tailwind CSS.",
		longDescription:
			"This portfolio website highlights my skills in creating a responsive, modern web application. Built with Next.js for optimal performance and Tailwind CSS for a sleek, contemporary design, it exemplifies my capability to create a responsive web application.",
		image: "/assets/images/portfolio.png",
		github: "https://github.com/nduongg04/portfolio",
		live: "https://duong.website",
		tags: ["Next.js", "Tailwind CSS", "React"],
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
			className="py-20 relative bg-none backdrop-blur-none bg-transparent"
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
						variant="default"
						onClick={() => filterProjects(null)}
						className={`mb-2 bg-white hover:bg-white hover:scale-110 transition-all duration-300 ${
							filter === null
								? "bg-gradient-to-r focus:bg-white hover:bg-white from-purple-400 to-blue-400"
								: "text-gray-700"
						}`}
					>
						All
					</Button>
					{allTags.map((tag) => (
						<Button
							key={tag}
							variant="default"
							onClick={() => filterProjects(tag)}
							className={`bg-white hover:bg-gray-300 hover:scale-110 transition-all duration-300 mb-2 ${
								filter === tag
									? "bg-gradient-to-r from-purple-400 to-blue-400"
									: "text-gray-700"
							}`}
						>
							{tag}
						</Button>
					))}
				</div>
				<AnimatePresence>
					<motion.div
						className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
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
		<Card className="h-full bg-gray-700 border-gray-600 overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col">
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
			<CardContent className="p-6 flex-1 flex flex-col">
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
				<div className="flex-1 flex justify-between items-end">
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
