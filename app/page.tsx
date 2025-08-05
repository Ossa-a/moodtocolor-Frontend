"use client"

import { useState, useEffect } from "react"
import { Palette, Copy, Download, Moon, Sun, Sparkles, RefreshCw, Heart, Zap, Coffee, Waves } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"

interface ColorPalette {
  id: string
  mood: string
  colors: string[]
  createdAt: string
}

const moodSuggestions = [
  { icon: Heart, text: "romantic sunset", color: "text-pink-500" },
  { icon: Zap, text: "energetic morning", color: "text-yellow-500" },
  { icon: Coffee, text: "cozy winter evening", color: "text-amber-600" },
  { icon: Waves, text: "peaceful ocean breeze", color: "text-blue-500" },
]

export default function MoodPaletteGenerator() {
  const [mood, setMood] = useState("")
  const [currentPalette, setCurrentPalette] = useState<ColorPalette | null>(null)
  const [recentPalettes, setRecentPalettes] = useState<ColorPalette[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const { toast } = useToast()

  // Load recent palettes from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("mood-palettes")
    if (saved) {
      setRecentPalettes(JSON.parse(saved))
    }

    // Check for dark mode preference
    const darkMode = localStorage.getItem("dark-mode") === "true"
    setIsDarkMode(darkMode)
    if (darkMode) {
      document.documentElement.classList.add("dark")
    }
  }, [])

  // Save palettes to localStorage
  const savePalettes = (palettes: ColorPalette[]) => {
    localStorage.setItem("mood-palettes", JSON.stringify(palettes))
    setRecentPalettes(palettes)
  }

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode
    setIsDarkMode(newDarkMode)
    localStorage.setItem("dark-mode", newDarkMode.toString())
    if (newDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }

  // Generate palette from API
  const generatePalette = async () => {
    if (!mood.trim()) {
      toast({
        title: "Please enter a mood",
        description: "Describe your mood to generate a beautiful palette",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch("http://localhost:3000/api/generate-palette", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mood: mood.trim() }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate palette")
      }

      const data = await response.json()
      const newPalette: ColorPalette = {
        id: Date.now().toString(),
        mood: mood.trim(),
        colors: data.colors,
        createdAt: new Date().toISOString(),
      }

      setCurrentPalette(newPalette)

      // Add to recent palettes (keep last 12)
      const updatedPalettes = [newPalette, ...recentPalettes.slice(0, 11)]
      savePalettes(updatedPalettes)

      toast({
        title: "Palette generated!",
        description: "Your mood has been transformed into beautiful colors",
      })
    } catch (error) {
      toast({
        title: "Generation failed",
        description: "Unable to connect to the palette service. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Copy color to clipboard
  const copyColor = async (color: string) => {
    try {
      await navigator.clipboard.writeText(color)
      toast({
        title: "Color copied!",
        description: `${color} has been copied to your clipboard`,
      })
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Unable to copy color to clipboard",
        variant: "destructive",
      })
    }
  }

  // Export palette as image
  const exportPalette = () => {
    if (!currentPalette) return

    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = 800
    canvas.height = 200

    // Draw colors
    const colorWidth = canvas.width / 4
    currentPalette.colors.forEach((color, index) => {
      ctx.fillStyle = color
      ctx.fillRect(index * colorWidth, 0, colorWidth, canvas.height)
    })

    // Download
    const link = document.createElement("a")
    link.download = `mood-palette-${currentPalette.mood.replace(/\s+/g, "-")}.png`
    link.href = canvas.toDataURL()
    link.click()

    toast({
      title: "Palette exported!",
      description: "Your palette has been downloaded as an image",
    })
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? "dark" : ""}`}>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
                <Palette className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Mood Palette
                </h1>
                <p className="text-gray-600 dark:text-gray-300">Transform your emotions into beautiful colors</p>
              </div>
            </div>
            <Button variant="outline" size="icon" onClick={toggleDarkMode} className="rounded-full bg-transparent">
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
          </div>

          {/* Main Interface */}
          <Card className="mb-8 border-0 shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Describe your mood
                  </label>
                  <div className="flex gap-3">
                    <Input
                      value={mood}
                      onChange={(e) => setMood(e.target.value)}
                      placeholder="peaceful sunset, energetic morning, cozy winter evening..."
                      className="flex-1 h-12 text-lg border-2 focus:border-purple-500 dark:focus:border-purple-400"
                      onKeyPress={(e) => e.key === "Enter" && generatePalette()}
                    />
                    <Button
                      onClick={generatePalette}
                      disabled={isLoading}
                      className="h-12 px-8 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                    >
                      {isLoading ? (
                        <RefreshCw className="w-4 h-4 animate-spin" />
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 mr-2" />
                          Generate
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                {/* Mood Suggestions */}
                <div className="flex flex-wrap gap-2">
                  <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">Try:</span>
                  {moodSuggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => setMood(suggestion.text)}
                      className="flex items-center gap-1 px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-colors"
                    >
                      <suggestion.icon className={`w-3 h-3 ${suggestion.color}`} />
                      {suggestion.text}
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Current Palette Display */}
          {currentPalette && (
            <Card className="mb-8 border-0 shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm overflow-hidden">
              <CardContent className="p-0">
                <div className="p-6 pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                        "{currentPalette.mood}"
                      </h2>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Generated {new Date(currentPalette.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={exportPalette}
                        className="rounded-full bg-transparent"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Export
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 h-32 md:h-40">
                  {currentPalette.colors.map((color, index) => (
                    <div
                      key={index}
                      className="relative group cursor-pointer transition-all duration-300 hover:scale-105"
                      style={{ backgroundColor: color }}
                      onClick={() => copyColor(color)}
                    >
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200" />
                      <div className="absolute bottom-2 left-2 right-2">
                        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-gray-800 dark:text-gray-200 tracking-wide">
                              {color}
                            </span>
                            <Copy className="w-3 h-3 text-gray-600 dark:text-gray-400" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Recent Palettes */}
          {recentPalettes.length > 0 && (
            <Card className="border-0 shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Recent Palettes</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {recentPalettes.map((palette) => (
                    <div key={palette.id} className="group cursor-pointer" onClick={() => setCurrentPalette(palette)}>
                      <div className="bg-white dark:bg-gray-700 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200">
                        <div className="grid grid-cols-4 h-16">
                          {palette.colors.map((color, index) => (
                            <div
                              key={index}
                              className="transition-all duration-200 group-hover:scale-105"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                        <div className="p-3">
                          <p className="font-medium text-sm text-gray-800 dark:text-gray-200 truncate">
                            "{palette.mood}"
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {new Date(palette.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      <Toaster />
    </div>
  )
}
