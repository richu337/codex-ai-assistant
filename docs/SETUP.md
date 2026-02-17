# Codex AI Assistant - Setup Guide

This guide will help you set up the Codex AI Assistant project on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** package manager
- **Git** - [Download](https://git-scm.com/)
- **Supabase Account** - [Sign up](https://supabase.com/)
- **OpenAI API Key** - [Get API Key](https://platform.openai.com/)

## Step 1: Clone the Repository

```bash
git clone https://github.com/richu337/codex-ai-assistant.git
cd codex-ai-assistant
```

## Step 2: Set Up Supabase

1. **Create a new Supabase project**
   - Go to [Supabase Dashboard](https://app.supabase.com/)
   - Click "New Project"
   - Fill in project details and create

2. **Run the database schema**
   - Go to SQL Editor in your Supabase dashboard
   - Copy the contents of `backend/supabase/schema.sql`
   - Paste and run the SQL

3. **Get your Supabase credentials**
   - Go to Project Settings > API
   - Copy your `Project URL` and `anon public` key
   - Copy your `service_role` key (keep this secret!)

## Step 3: Set Up Backend

```bash
cd backend
npm install
```

Create a `.env` file:

```bash
cp .env.example .env
```

Edit `.env` and add your credentials:

```env
PORT=3000
NODE_ENV=development

# Supabase
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_KEY=your_supabase_service_role_key

# OpenAI
OPENAI_API_KEY=your_openai_api_key
OPENAI_MODEL=gpt-4-turbo-preview

# JWT
JWT_SECRET=your_super_secret_jwt_key_change_this
JWT_EXPIRES_IN=7d

# CORS
ALLOWED_ORIGINS=http://localhost:3001,http://localhost:19006
```

Start the backend server:

```bash
npm run dev
```

The API should now be running on `http://localhost:3000`

## Step 4: Set Up Web App

Open a new terminal:

```bash
cd web
npm install
```

Create a `.env.local` file:

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Start the web app:

```bash
npm run dev
```

The web app should now be running on `http://localhost:3001`

## Step 5: Set Up Mobile App (Optional)

Open a new terminal:

```bash
cd mobile
npm install
```

Create a `.env` file:

```bash
cp .env.example .env
```

Edit `.env`:

```env
API_URL=http://localhost:3000
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

Start the mobile app:

```bash
npm start
```

This will open Expo DevTools. You can:
- Press `i` for iOS simulator
- Press `a` for Android emulator
- Scan QR code with Expo Go app on your phone

## Step 6: Test the Application

1. **Open the web app** at `http://localhost:3001`
2. **Sign up** for a new account
3. **Start chatting** with Codex!

## Troubleshooting

### Backend won't start
- Check that all environment variables are set correctly
- Ensure Supabase credentials are valid
- Check that port 3000 is not already in use

### Web app won't connect to backend
- Verify `NEXT_PUBLIC_API_URL` is set to `http://localhost:3000`
- Check that the backend is running
- Check browser console for CORS errors

### Database errors
- Ensure you've run the schema.sql file in Supabase
- Check that RLS policies are enabled
- Verify Supabase service key has proper permissions

### OpenAI errors
- Verify your OpenAI API key is valid
- Check you have credits in your OpenAI account
- Ensure the model name is correct

## Next Steps

- Read the [API Documentation](./API.md)
- Check out [Development Guide](./DEVELOPMENT.md)
- Learn about [Deployment](./DEPLOYMENT.md)

## Support

If you encounter any issues:
1. Check the [GitHub Issues](https://github.com/richu337/codex-ai-assistant/issues)
2. Create a new issue with details about your problem
3. Contact: rayhanjaleel904@gmail.com
