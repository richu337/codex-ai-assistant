# Codex AI Assistant - Project Summary

## 🎯 Project Overview

**Codex** is a full-stack personal AI assistant application with web and mobile support. It provides intelligent conversational AI capabilities, remembers user preferences, and offers personalized assistance across multiple platforms.

## 📁 Project Structure

```
codex-ai-assistant/
├── backend/                 # Node.js/Express API Server
│   ├── src/
│   │   ├── config/         # Configuration files (Supabase, OpenAI)
│   │   ├── controllers/    # Request handlers
│   │   ├── middleware/     # Auth, error handling, rate limiting
│   │   ├── routes/         # API routes
│   │   ├── utils/          # Utility functions (logger)
│   │   └── server.js       # Main server file
│   ├── supabase/
│   │   └── schema.sql      # Database schema
│   ├── package.json
│   └── .env.example
│
├── web/                    # React/Next.js Web Application
│   ├── app/
│   │   ├── layout.tsx      # Root layout
│   │   ├── page.tsx        # Home page
│   │   └── globals.css     # Global styles
│   ├── lib/
│   │   ├── supabase.ts     # Supabase client
│   │   └── api.ts          # API client
│   ├── package.json
│   └── .env.example
│
├── mobile/                 # React Native/Expo Mobile App
│   ├── lib/
│   │   ├── supabase.ts     # Supabase client
│   │   └── api.ts          # API client
│   ├── app.json            # Expo configuration
│   ├── package.json
│   └── .env.example
│
├── docs/                   # Documentation
│   ├── SETUP.md           # Setup instructions
│   ├── API.md             # API documentation
│   └── PROJECT_SUMMARY.md # This file
│
├── README.md              # Main project README
├── LICENSE                # MIT License
└── .gitignore            # Git ignore rules
```

## 🛠️ Technology Stack

### Backend
- **Runtime**: Node.js v18+
- **Framework**: Express.js
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **AI/LLM**: OpenAI GPT-4
- **Logging**: Winston
- **Security**: Helmet, CORS, Rate Limiting

### Web Frontend
- **Framework**: Next.js 14 (React 18)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Markdown**: React Markdown

### Mobile App
- **Framework**: React Native with Expo
- **Language**: TypeScript
- **Styling**: NativeWind (Tailwind for React Native)
- **Navigation**: Expo Router
- **HTTP Client**: Axios

## 🗄️ Database Schema

### Tables

1. **users**
   - Extends Supabase auth.users
   - Stores user profile information

2. **user_preferences**
   - User interests and settings
   - Personalization data

3. **conversations**
   - Chat conversation metadata
   - Links to users

4. **messages**
   - Individual chat messages
   - Stores role (user/assistant/system) and content

5. **search_history**
   - User search queries and results
   - Timestamped for history tracking

### Security
- Row Level Security (RLS) enabled on all tables
- Users can only access their own data
- Automatic triggers for timestamp updates

## 🔌 API Endpoints

### Authentication (`/api/auth`)
- `POST /signup` - Create new account
- `POST /login` - User login
- `POST /logout` - User logout
- `POST /refresh` - Refresh access token
- `GET /me` - Get current user

### Chat (`/api/chat`)
- `POST /message` - Send message, get AI response
- `GET /conversations` - List all conversations
- `GET /conversations/:id` - Get specific conversation
- `DELETE /conversations/:id` - Delete conversation
- `GET /conversations/:id/messages` - Get conversation messages

### User (`/api/user`)
- `GET /profile` - Get user profile
- `PUT /profile` - Update profile
- `GET /preferences` - Get preferences
- `PUT /preferences` - Update preferences
- `GET /stats` - Get user statistics

### Search (`/api/search`)
- `GET /` - Search for information
- `GET /history` - Get search history
- `DELETE /history/:id` - Delete search item

## ✨ Key Features

### 1. Conversational AI
- Natural language processing with GPT-4
- Context-aware responses
- Conversation memory and history

### 2. User Personalization
- Learns user interests and preferences
- Tailored responses based on user data
- Customizable settings

### 3. Multi-Platform Support
- Responsive web application
- Native mobile apps (iOS & Android)
- Consistent experience across platforms

### 4. Secure Authentication
- Email/password authentication via Supabase
- JWT-based session management
- Secure token refresh mechanism

### 5. Search Capabilities
- AI-powered information search
- Search history tracking
- Quick access to previous searches

### 6. Data Privacy
- Row-level security
- User data isolation
- Secure API endpoints

## 🚀 Getting Started

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/richu337/codex-ai-assistant.git
   cd codex-ai-assistant
   ```

2. **Set up Supabase**
   - Create a Supabase project
   - Run the schema.sql file
   - Get your API keys

3. **Configure Backend**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env with your credentials
   npm run dev
   ```

4. **Configure Web App**
   ```bash
   cd web
   npm install
   cp .env.example .env.local
   # Edit .env.local with your credentials
   npm run dev
   ```

5. **Access the app**
   - Web: http://localhost:3001
   - API: http://localhost:3000

For detailed setup instructions, see [SETUP.md](./SETUP.md)

## 📊 Current Status

### ✅ Completed
- [x] Backend API with Express.js
- [x] Supabase database schema
- [x] Authentication system
- [x] Chat functionality with OpenAI
- [x] User preferences system
- [x] Search capabilities
- [x] Web app foundation (Next.js)
- [x] Mobile app structure (Expo)
- [x] API documentation
- [x] Setup documentation

### 🚧 In Progress
- [ ] Complete web UI components
- [ ] Mobile app UI implementation
- [ ] Advanced search features
- [ ] Voice input/output
- [ ] Push notifications

### 📋 Planned Features
- [ ] Multi-language support
- [ ] Offline mode
- [ ] File attachments in chat
- [ ] Voice conversations
- [ ] Advanced analytics dashboard
- [ ] Team/shared conversations
- [ ] Plugin system for extensions

## 🔐 Environment Variables

### Backend
```env
PORT=3000
SUPABASE_URL=your_url
SUPABASE_ANON_KEY=your_key
SUPABASE_SERVICE_KEY=your_service_key
OPENAI_API_KEY=your_openai_key
JWT_SECRET=your_secret
```

### Web
```env
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
```

### Mobile
```env
API_URL=http://localhost:3000
SUPABASE_URL=your_url
SUPABASE_ANON_KEY=your_key
```

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.

## 👨‍💻 Author

**Rayhan**
- Email: rayhanjaleel904@gmail.com
- GitHub: [@richu337](https://github.com/richu337)

## 🙏 Acknowledgments

- OpenAI for GPT-4 API
- Supabase for backend infrastructure
- Next.js and Expo teams
- React and React Native communities

## 📞 Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Email: rayhanjaleel904@gmail.com

---

**Repository**: https://github.com/richu337/codex-ai-assistant

Made with ❤️ by Rayhan
