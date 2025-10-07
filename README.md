# Math Problem Generator

An interactive web application that generates math problems with AI-powered feedback and hints. Built with Next.js, TypeScript, and Supabase.

## Live Demo

[View Live Demo](https://ottodot-coding-task-ai-math-generator.vercel.app/)

## Supabase Configuration

To interact with the live demo, use these credentials:

- **Supabase Project URL**: `https://gahzmaohkqnwyoyvczel.supabase.co`
- **Supabase Anon Key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdhaHptYW9oa3Fud3lveXZjemVsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3MTYzMzksImV4cCI6MjA3NTI5MjMzOX0.e6El-NZKfumYJYkcQqjqibV_P0HdTtEd1TUKdVv_buw`

## Features

- **Multiple Difficulty Levels**: Choose from Easy, Medium, or Hard problems
- **Problem Types**: Random, Addition, Subtraction, Multiplication, Division
- **AI-Powered Hints**: Get helpful hints when you're stuck
- **Real-time Feedback**: Instant feedback on your answers
- **Problem History**: Track all your previous attempts
- **Statistics Tracking**: Monitor your performance across difficulty levels
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Backend**: Supabase (PostgreSQL)
- **Deployment**: Vercel

## Project Structure

├── app/
│   ├── api/                  # API routes (generateProblem, submitAnswer, etc.)
│   ├── components/           # React UI components
│   │   ├── views/            # Page and section components
│   │   ├── IconButton.tsx
│   │   └── ScoreTracker.tsx
│   ├── hooks/                # Custom React hooks
│   ├── lib/                  # Supabase and Gemini client setup
│   ├── types.ts              # Shared TypeScript interfaces
│   └── page.tsx              # Main page component
├── public/
│   └── images/               # Static images and illustrations
├── styles/                   # Global styles (if any)
├── tailwind.config.ts        # Tailwind configuration
└── README.md

## Author

Saw Soe Htut Win
GitHub: @iamjusSawSoe
