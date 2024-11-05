import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { getLegalAdvice } from '../services/GeminiService'
import ReactMarkdown from 'react-markdown'

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');

  :root {
    --background: #F4EEE4;
    --darkbg: #241C1A;
    --primary: #452B01;
    --secondary: #EBD9CD;
    --tertiary: #507680;
  }

  .bg-brown {
  background-color: #4B2E2B; /* Bitter coffee brown shade */
}


  body {
    font-family: 'Inter', sans-serif;
    background-color: var(--background);
    color: var(--primary);
  }

  .markdown-content {
    @apply space-y-6;
  }

  .markdown-content h1 {
    @apply text-3xl font-bold mb-6 text-primary;
  }

  .markdown-content h3 {
    @apply text-xl font-semibold mb-3 mt-6 text-primary;
  }

  .markdown-content p {
    @apply text-primary leading-relaxed;
  }

  .markdown-content ul, .markdown-content ol {
    @apply pl-6 my-3;
  }

  .markdown-content li {
    @apply mb-2;
  }

  .markdown-content strong {
    @apply font-semibold text-primary;
  }

  .markdown-content em {
    @apply italic text-tertiary;
  }
`

interface Benefits {
  title: string;
  description: string;
}

export default function LandingPage() {
  const [input, setInput] = useState('')
  const [response, setResponse] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const benefits: Benefits[] = [
    {
      title: "Empowerment through Knowledge",
      description: "Gain a clear understanding of your rights and the actions you can take to protect yourself."
    },
    {
      title: "Clarity and Structure",
      description: "Get comprehensive yet simple guides for addressing your legal issues with our structured response format."
    },
    {
      title: "Accessible Legal Citations",
      description: "Explore relevant laws that are cited and linked, fostering confidence in the advice provided."
    }
  ]

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!input.trim()) return

    setIsLoading(true)
    try {
      const advice = await getLegalAdvice(input)
      setResponse(advice)
    } catch (error) {
      console.error('Error getting legal advice:', error)
      setResponse('Sorry, there was an error processing your request. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <style>{globalStyles}</style>
      
{/* Header */}
<header className="bg-darkbg text-secondary py-8">
  <div className="container mx-auto px-4 text-center">
    <h1 className="text-4xl font-bold mb-2">CaseWise Chatbot</h1>
    <p className="text-xl max-w-2xl mx-auto">
      Your AI-powered legal assistant, providing clear guidance on your rights and next steps.
    </p>
  </div>
</header>


      <main className="flex-grow container mx-auto px-4 py-12">
        {/* Chat Input */}
<section className="max-w-3xl mx-auto mb-16 shadow-lg">
  <div className="bg-secondary overflow-hidden rounded-lg">
    <form onSubmit={handleSubmit} className="flex items-center">
      <Input 
        value={input}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
        placeholder="Describe your legal situation..." 
        className="flex-grow border-none focus:ring-0 text-base px-6 py-4 h-16 bg-secondary text-primary placeholder-primary/50"
      />
      <Button 
        type="submit" 
        disabled={isLoading} 
        className="bg-[#4B2E2B] text-white hover:bg-[#3E2624] h-16 px-8 text-base font-medium rounded-none"
      >
        {isLoading ? 'Processing...' : 'Consult'}
      </Button>
    </form>
  </div>
</section>



        {/* AI Response Section */}
        {response && (
          <section className="max-w-3xl mx-auto">
            <Card className="bg-secondary">
              <CardContent className="p-6">
                <div className="markdown-content">
                  <ReactMarkdown
                    components={{
                      h1: ({ children }) => <h2 className="text-2xl font-bold my-4 text-primary">{children}</h2>,
                      h2: ({ children }) => <h3 className="text-xl font-semibold my-3 text-primary">{children}</h3>,
                      strong: ({ children }) => <strong className="font-bold text-primary">{children}</strong>,
                      cite: ({ children }) => <cite className="text-sm italic text-tertiary">{children}</cite>,
                      ul: ({ children }) => <ul className="list-disc list-inside ml-4">{children}</ul>,
                      li: ({ children }) => <li className="mb-2">{children}</li>,
                    }}
                  >
                    {response}
                  </ReactMarkdown>
                </div>
              </CardContent>
            </Card>
          </section>
        )}
<br></br>
{/* Benefits Section */}
<section className="mb-16">
  <h1 className="text-3xl font-semibold text-center mb-8 text-primary">Benefits for Everyday Users</h1>
  <div className="grid md:grid-cols-3 gap-8">
    {benefits.map((benefit, index) => (
      <Card key={index} className="bg-brown text-white">
        <CardHeader>
          <CardTitle className="text-white">{benefit.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-white">{benefit.description}</p>
        </CardContent>
      </Card>
    ))}
  </div>
</section>
      </main>
    </div>
  )
}
