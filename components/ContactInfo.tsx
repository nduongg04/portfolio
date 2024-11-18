import { Button } from "@/components/ui/button"
import { Linkedin, Mail, FileDown } from 'lucide-react'

export default function ContactInfo() {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
      <Button
        variant="outline"
        className="w-full sm:w-auto bg-transparent border-2 border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg hover:shadow-purple-500/50"
        onClick={() => window.open('mailto:nduongg04@gmail.com')}
      >
        <Mail className="mr-2 h-4 w-4" /> Email
      </Button>
      <Button
        variant="outline"
        className="w-full sm:w-auto bg-transparent border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg hover:shadow-blue-500/50"
        onClick={() => window.open('https://www.linkedin.com/in/nguyen-duong-628516248/', '_blank')}
      >
        <Linkedin className="mr-2 h-4 w-4" /> LinkedIn
      </Button>
      <Button
        variant="outline"
        className="w-full sm:w-auto bg-transparent border-2 border-green-400 text-green-400 hover:bg-green-400 hover:text-white transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg hover:shadow-green-500/50"
        onClick={() => window.open('https://drive.google.com/file/d/1MdajfC6PeG7y76noxyX2zkAvrX5BXOCs/view?usp=sharing', '_blank')}
      >
        <FileDown className="mr-2 h-4 w-4" /> Download CV
      </Button>
    </div>
  )
}