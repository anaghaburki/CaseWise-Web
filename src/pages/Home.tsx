import React from 'react';
import { ArrowRight, Search, Brain, FileText, MessageSquare, BookOpen, Database } from 'lucide-react';
import Tilt from 'react-parallax-tilt';

interface HomeProps {
  onGetStarted: () => void;
}

const Home: React.FC<HomeProps> = ({ onGetStarted }) => {
  const features = [
    {
      icon: <Search className="w-7 h-7" />,
      title: "Enhanced Legal Research",
      description: "Advanced algorithms simplify searches across vast legal databases"
    },
    {
      icon: <Brain className="w-7 h-7" />,
      title: "Predictive Analysis",
      description: "Analyze historical case data to forecast potential outcomes"
    },
    {
      icon: <FileText className="w-7 h-7" />,
      title: "Document Review",
      description: "Automated risk identification and quality assurance"
    },
    {
      icon: <MessageSquare className="w-7 h-7" />,
      title: "Legal Assistance", 
      description: "AI-powered instant answers to legal queries"
    },
    {
      icon: <BookOpen className="w-7 h-7" />,
      title: "Legal Glossary",
      description: "Simplified legal terminology for better understanding"
    },
    {
      icon: <Database className="w-7 h-7" />,
      title: "Seamless Integration",
      description: "Adapts perfectly to existing systems and workflows"
    }
  ];

  return (
    <div className="min-h-screen bg-[#F4EEE4]">
      <section className="bg-[#241C1A] text-white py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="max-w-2xl space-y-7">
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#452B01]/20 text-[#EBD9CD] text-base font-semibold">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#507680] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#507680]"></span>
                </span>
                Transform Your Legal Practice with AI
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Revolutionize Your Legal
                <span className="text-[#507680]"> Workflow</span>
              </h1>
              <p className="text-lg text-[#EBD9CD]/80">
                <span className="text-[#507680] font-semibold">CaseWise</span> is a cutting-edge platform designed to address the evolving challenges of the legal sector by leveraging artificial intelligence (AI) and machine learning.
              </p>
              <div>
                <button 
                  onClick={onGetStarted}
                  className="bg-[#507680] text-white px-7 py-3.5 rounded-lg text-base font-semibold hover:bg-[#507680]/90 transition-colors flex items-center gap-2"
                >
                  Get Started
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="hidden lg:block">
              <img src="/casewise-logo-maybe.png" alt="CaseWise Logo" className="w-90 h-auto" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#241C1A] mb-5">Key Features</h2>
            <p className="text-lg text-[#452B01]/80">
              Empower your legal practice with our comprehensive suite of AI-powered tools
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <Tilt key={index} tiltMaxAngleX={5} tiltMaxAngleY={5} perspective={1000}>
                <div className="bg-white p-7 rounded-xl shadow-lg hover:shadow-xl transition-shadow h-full">
                  <div className="w-14 h-14 bg-[#507680]/10 rounded-2xl flex items-center justify-center text-[#507680] mb-5">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-[#241C1A] mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-[#452B01]/70 text-base">
                    {feature.description}
                  </p>
                </div>
              </Tilt>
            ))}
          </div>
        </div>
      </section>
      <section className="py-28 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold text-[#241C1A] mb-5">
                Empower Your Legal Practice with Advanced AI Solutions
              </h2>
              <p className="text-lg text-[#452B01]/80 max-w-3xl mx-auto">
                This solution optimizes workflows, enhances decision-making, and empowers legal professionals with advanced tools for efficiency and precision.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              <div className="space-y-7">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-full bg-[#507680]/10 flex items-center justify-center flex-shrink-0">
                    <Search className="w-5 h-5 text-[#507680]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#241C1A] mb-2">Smart Filtering</h3>
                    <p className="text-base text-[#452B01]/70">Advanced algorithms simplify searches across vast legal databases</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-full bg-[#507680]/10 flex items-center justify-center flex-shrink-0">
                    <Brain className="w-5 h-5 text-[#507680]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#241C1A] mb-2">Data-Driven Insights</h3>
                    <p className="text-base text-[#452B01]/70">Empowers informed decision-making with transparent assessments</p>
                  </div>
                </div>
              </div>
              <div className="space-y-7">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-full bg-[#507680]/10 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-5 h-5 text-[#507680]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#241C1A] mb-2">Quality Assurance</h3>
                    <p className="text-base text-[#452B01]/70">Ensures consistent, error-free document reviews</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-full bg-[#507680]/10 flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-5 h-5 text-[#507680]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#241C1A] mb-2">Real-Time Assistance</h3>
                    <p className="text-base text-[#452B01]/70">AI-powered instant answers to legal queries</p>
                  </div>
                </div>
              </div>
              <div className="space-y-7">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-full bg-[#507680]/10 flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-5 h-5 text-[#507680]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#241C1A] mb-2">Legal Glossary</h3>
                    <p className="text-base text-[#452B01]/70">Simplified legal terminology for better understanding</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-full bg-[#507680]/10 flex items-center justify-center flex-shrink-0">
                    <Database className="w-5 h-5 text-[#507680]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#241C1A] mb-2">Seamless Integration</h3>
                    <p className="text-base text-[#452B01]/70">Adapts perfectly to existing systems and workflows</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-[#241C1A] text-white py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-7">
            <h2 className="text-3xl md:text-4xl font-bold">Ready to transform your legal practice?</h2>
            <p className="text-lg text-[#EBD9CD]/80">
              Join the future of legal technology with our AI-powered platform
            </p>
            <button 
              onClick={onGetStarted}
              className="bg-[#507680] text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#507680]/90 transition-colors inline-flex items-center gap-2">
                Get Started Now
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home;

