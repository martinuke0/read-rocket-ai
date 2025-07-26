# Read Rocket AI

A modern speed reading application with AI integration that helps you read faster and comprehend better using RSVP (Rapid Serial Visual Presentation) techniques.

## Features

- Speed Reading with RSVP
- AI Content Generation
- Progress Tracking
- Reading Statistics
- Dark/Light Mode
- PDF Support (coming soon)

## Tech Stack

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Supabase
- OpenAI

## Getting Started

### Prerequisites

- Node.js & npm - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
- OpenAI API key
- Supabase account and project

### Installation

1. Clone the repository
```sh
git clone <repository-url>
cd read-rocket-ai
```

2. Install dependencies
```sh
npm install
```

3. Create a `.env` file in the root directory and add your API keys:
```
VITE_OPENAI_API_KEY=your_openai_api_key
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Start the development server
```sh
npm run dev
```

## Database Setup

1. Create a new Supabase project
2. Run the following SQL in your Supabase SQL editor:

```sql
-- Users table (if using auth)
create table users (
  id uuid references auth.users primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Reading sessions table
create table reading_sessions (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references users(id),
  started_at timestamp with time zone default timezone('utc'::text, now()) not null,
  ended_at timestamp with time zone,
  words_read integer default 0,
  total_words integer default 0,
  avg_wpm integer default 0,
  text_content text,
  completed boolean default false
);

-- Quiz results table
create table quiz_results (
  id uuid default uuid_generate_v4() primary key,
  session_id uuid references reading_sessions(id),
  user_id uuid references users(id),
  score integer default 0,
  max_score integer default 0,
  completed_at timestamp with time zone default timezone('utc'::text, now()) not null
);
```

## Building for Production

```sh
npm run build
```

## License

MIT
