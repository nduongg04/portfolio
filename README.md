# Personal Portfolio Website

A modern, responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS. Features interactive animations, particle effects, and a clean, professional design.
<p align="center" style="font-size: 20px">
	<a href="https://duong.website">Demo</a>
</p>

## 🌟 Features

- Responsive design that works on all devices
- Interactive particle background with mouse tracking
- Smooth scrolling navigation
- Project showcase with filtering capabilities
- Contact form with email integration
- Dynamic typing animation
- Modern UI components using shadcn/ui
- Docker containerization for easy deployment

## 🚀 Tech Stack

- **Framework**: Next.js 15.0
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Animations**: Framer Motion
- **3D Effects**: Three.js
- **Email Service**: EmailJS
- **Deployment**: Docker, AWS EC2
- **CI/CD**: GitHub Actions

## 🛠️ Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your EmailJS credentials:
```bash
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_USER_ID=your_user_id
```

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🐳 Docker Deployment

1. Build the Docker image:
```bash
docker build -t portfolio .
```

2. Run the container:
```bash
docker compose up -d
```

## 🏗️ Project Structure

```
portfolio/
├── app/                # Next.js app directory
├── components/         # React components
├── lib/               # Utility functions
├── hooks/             # Custom React hooks
├── public/            # Static assets
└── styles/            # Global styles
```

## 🎨 Features in Detail

- **Interactive Navigation**: Smooth scrolling with active section highlighting
- **Project Showcase**: Filterable project cards with detailed modal views
- **Tech Stack Display**: Animated technology stack showcase
- **Contact Form**: Email integration with form validation
- **Particle Background**: Interactive background effect that responds to mouse movement
- **Responsive Design**: Mobile-first approach with adaptive layouts

## 📱 Performance Optimizations

- Image optimization with Next.js Image component
- Lazy loading of components
- Optimized particle system rendering
- Efficient animation handling with Framer Motion
- Docker multi-stage builds for smaller image size

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/yourusername/portfolio/issues).

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
