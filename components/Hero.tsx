import { forwardRef, useState, useEffect, useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

interface HeroProps {
	setActiveSection: (section: string) => void;
}

const Hero = forwardRef<HTMLElement, HeroProps>(({ setActiveSection }, ref) => {
	const { scrollY } = useScroll();
	// const y1 = useTransform(scrollY, [0, 500], [0, 200]);
	const y2 = useTransform(scrollY, [0, 500], [0, -100]);
	const y3 = useTransform(scrollY, [0, 500], [0, 50]);

	const [text, setText] = useState("");
	const [isDeleting, setIsDeleting] = useState(false);
	const [loopNum, setLoopNum] = useState(0);
	const [typingSpeed, setTypingSpeed] = useState(150);

	const words = useMemo(
		() => ["React Developer", "Node.js Enthusiast", "Full Stack Developer"],
		[]
	);
	useEffect(() => {
		const handleTyping = () => {
			const i = loopNum % words.length;
			const fullText = words[i];

			setText(
				isDeleting
					? fullText.substring(0, text.length - 1)
					: fullText.substring(0, text.length + 1)
			);

			setTypingSpeed(isDeleting ? 30 : 150);

			if (!isDeleting && text === fullText) {
				setTimeout(() => setIsDeleting(true), 500);
			} else if (isDeleting && text === "") {
				setIsDeleting(false);
				setLoopNum(loopNum + 1);
			}
		};

		const timer = setTimeout(handleTyping, typingSpeed);
		return () => clearTimeout(timer);
	}, [text, isDeleting, loopNum, words, typingSpeed]);

	return (
		<section
			id="home"
			ref={ref}
			className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden z-20"
		>
			<motion.div className="relative z-10 text-center" style={{ y: y2 }}>
				<motion.h1
					className="text-5xl md:text-7xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400 p-3"
					initial={{ opacity: 0, y: -50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
				>
					Nguyen Dai Duong
				</motion.h1>
				<motion.p
					className="text-xl md:text-2xl text-gray-300 mb-8 h-8"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.8, delay: 0.2 }}
				>
					I&apos;m a{" "}
					<span className="font-semibold text-blue-400">{text}</span>
					<span className="animate-blink">|</span>
				</motion.p>
				<motion.div style={{ y: y3 }}>
					<Button
						onClick={() => {
							setActiveSection("about");
							const element = document.getElementById("about");
							element?.scrollIntoView({ behavior: "smooth" });
						}}
						className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white"
					>
						See More <ArrowDown className="ml-2 h-4 w-4" />
					</Button>
				</motion.div>
			</motion.div>
		</section>
	);
});

Hero.displayName = "Hero";

export default Hero;
