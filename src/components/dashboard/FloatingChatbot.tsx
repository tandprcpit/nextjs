'use client'

import { useState, useRef, useEffect } from 'react'
import { useChat } from 'ai/react'
import { MessageSquare, X, Send, Copy, Check } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useSession } from "next-auth/react"

export default function FloatingChatbot() {
  const { data: session } = useSession()
  const [isOpen, setIsOpen] = useState(false)
  const [isThinking, setIsThinking] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const { messages, input, handleInputChange, handleSubmit: originalHandleSubmit } = useChat()
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsThinking(true)
    await originalHandleSubmit(e)
    setIsThinking(false)
  }

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages, isThinking])

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  if (!session) {
    return null 
  }

  return (
    <>
      {!isOpen && (
        <div className="fixed bottom-4 right-4 z-50">
          <Button
            onClick={() => setIsOpen(true)}
            className="rounded-full w-12 h-12 bg-blue-500 hover:bg-blue-600 text-white shadow-lg transition-all duration-300 transform hover:scale-110"
          >
            <MessageSquare size={24} />
          </Button>
        </div>
      )}

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center sm:items-end sm:justify-end">
          <div className="bg-white w-full h-full sm:w-96 sm:h-[600px] sm:mr-4 sm:mb-4 sm:rounded-lg flex flex-col shadow-xl">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-semibold">AI Assistant</h2>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                <X size={24} />
              </Button>
            </div>
            <ScrollArea className="flex-grow p-4 space-y-4" ref={scrollAreaRef}>
              {messages.map(m => (
                <div
                  key={m.id}
                  className={`flex ${
                    m.role === 'user' ? 'justify-end' : 'justify-start'
                  } mb-4`}
                >
                  <div
                    className={`${
                      m.role === 'user' ? 'bg-gray-200 ' : 'bg-gray-100 '
                    } rounded-lg p-3 max-w-[80%] relative group`}
                  >
                    {m.content}
                    {m.role === 'assistant' && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={() => copyToClipboard(m.content, m.id)}
                            >
                              {copiedId === m.id ? <Check size={16} /> : <Copy size={16} />}
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{copiedId === m.id ? 'Copied!' : 'Copy to clipboard'}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </div>
                </div>
              ))}
              {isThinking && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-800 rounded-lg p-3 max-w-[80%]">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </ScrollArea>
            <form onSubmit={handleSubmit} className="border-t p-4 flex items-center space-x-2">
              <Input
                value={input}
                onChange={handleInputChange}
                placeholder="Type a message..."
                className="flex-grow"
              />
              <Button type="submit" size="icon" disabled={isThinking}>
                <Send size={18} />
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

