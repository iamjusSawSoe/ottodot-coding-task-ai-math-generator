# Math Problem Generator

An interactive web application that generates math problems with AI-powered feedback and hints. Built with Next.js, TypeScript, and Supabase.

## Live Demo

[View Live Demo](https://your-app.vercel.app)

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
│ ├── api/ # API routes
│ ├── components/ # React components
│ │ ├── views/ # View components
│ │ ├── IconButton.tsx
│ │ └── ScoreTracker.tsx
│ ├── hooks/ # Custom React hooks
│ ├── lib/ # Supabase client
│ ├── types.ts # TypeScript types
│ └── page.tsx # Main page component
├── public/
│ └── images/ # Static images
└── tailwind.config.ts # Tailwind configuration

## Author

Saw Soe Htut Win
GitHub: @iamjusSawSoe
