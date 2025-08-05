# 🎨 MoodToColor - Transform Your Emotions Into Beautiful Colors

A modern web application that generates beautiful color palettes based on your mood descriptions. Built with Next.js 15, React 19, and Tailwind CSS.

![MoodToColor Preview](https://img.shields.io/badge/Next.js-15.2.4-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.1.1-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.9-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Features

- **Mood-Based Color Generation**: Describe your mood and get a beautiful 4-color palette
- **Dark/Light Mode**: Toggle between dark and light themes
- **Color Copy**: Click any color to copy its hex code to clipboard
- **Palette Export**: Download your generated palettes as images
- **Recent Palettes**: View and reuse your recently generated palettes
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Real-time Updates**: Instant palette generation with loading states

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/moodtocolor-frontend.git
   cd moodtocolor-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and set your API URL:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3000
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3001](http://localhost:3001)

## 🛠️ Tech Stack

- **Framework**: Next.js 15.2.4
- **Language**: TypeScript
- **UI Library**: React 19.1.1
- **Styling**: Tailwind CSS 4.1.9
- **Icons**: Lucide React
- **Components**: Radix UI
- **State Management**: React Hooks
- **Build Tool**: Webpack (Next.js)

## 📁 Project Structure

```
moodtocolor-Frontend/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main application page
├── components/            # Reusable UI components
│   ├── ui/               # Shadcn/ui components
│   └── theme-provider.tsx # Theme provider
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── public/               # Static assets
└── styles/               # Additional styles
```

## 🎯 Usage

1. **Describe Your Mood**: Enter a mood description like "peaceful sunset" or "energetic morning"
2. **Generate Palette**: Click the "Generate" button to create your color palette
3. **Copy Colors**: Hover over any color and click to copy its hex code
4. **Export Palette**: Use the "Export" button to download your palette as an image
5. **Toggle Theme**: Switch between dark and light modes using the theme button

## 🎨 Example Moods

Try these mood descriptions to get started:
- 🌅 **"romantic sunset"** - Warm, passionate colors
- ⚡ **"energetic morning"** - Bright, vibrant colors  
- ☕ **"cozy winter evening"** - Warm, comforting colors
- 🌊 **"peaceful ocean breeze"** - Calm, serene colors

## 🔧 Configuration

### Environment Variables

Create a `.env` file based on `.env.example`:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### Available Scripts

- `npm run dev` - Start development server on port 3001
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Radix UI](https://www.radix-ui.com/) for accessible UI components
- [Lucide](https://lucide.dev/) for beautiful icons
- [Shadcn/ui](https://ui.shadcn.com/) for the component library

## 📞 Support

If you have any questions or need help, please open an issue on GitHub.

---

Made with ❤️ and ☕ by [Your Name] 