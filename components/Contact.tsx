import { useState, forwardRef } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import emailjs from 'emailjs-com'
import { toast } from '@/hooks/use-toast'

const Contact = forwardRef<HTMLElement>((props, ref) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
	const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    setLoading(true)

    const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID as string
    const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID as string
    const userID = process.env.NEXT_PUBLIC_EMAILJS_USER_ID as string

    const templateParams = {
      name,
      email,
      message,
    }

    await emailjs.send(serviceID, templateID, templateParams, userID)
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text)
        toast({
          variant: "success",
          title: "Email sent successfully",
          description: "Your message has been sent to the developer.",
        })
        setName('')
        setEmail('')
        setMessage('')
      })
      .catch((error) => {
        console.error('FAILED...', error)
        toast({
					variant: "destructive",
          title: "Email sending failed",
          description: "Please try again later.",
        })
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <section id="contact" ref={ref} className="py-20 bg-gray-900 relative z-10 bg-transparent">
      <div className="container mx-auto px-4 ">
        <motion.h2
          className="text-3xl font-bold mb-12 text-center text-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Get in Touch
        </motion.h2>
        <motion.div
          className="max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-gray-100">Contact Form</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="bg-gray-700 text-gray-100 border-gray-600"
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    placeholder="Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-gray-700 text-gray-100 border-gray-600"
                  />
                </div>
                <div>
                  <Textarea
                    placeholder="Your Message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    rows={4}
                    className="bg-gray-700 text-gray-100 border-gray-600"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white"
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
})

Contact.displayName = 'Contact'

export default Contact