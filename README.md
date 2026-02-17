# Codex – Your Personal AI Assistant

![Codex Banner](https://img.shields.io/badge/Codex-AI%20Assistant-blue)
![Node.js](https://img.shields.io/badge/Node.js-v18+-green)
![React](https://img.shields.io/badge/React-18+-blue)
![React Native](https://img.shields.io/badge/React%20Native-Latest-purple)
![Supabase](https://img.shields.io/badge/Supabase-Database-green)

Codex is your intelligent personal assistant designed to make your life easier, more informed, and more connected. Whether you want to search for information, learn about a topic, or just have someone to chat with, Codex is always ready to help.

## 🌟 Features

- **Ask Anything**: Get instant answers to questions about people, places, events, or any topic you're curious about
- **Personal Chat Companion**: Feeling lonely or want to talk? Codex remembers your previous conversations, making chats more natural and meaningful
- **Information at Your Fingertips**: Quickly search, explore, and discover accurate information without switching between multiple apps
- **Smart and Intuitive**: Codex learns your preferences and provides answers and conversations tailored to your interests

## 🏗️ Architecture

```
codex-ai-assistant/
├── backend/           # Node.js/Express API server
├── web/              # React web application
├── mobile/           # React Native mobile app
├── shared/           # Shared utilities and types
└── docs/             # Documentation
```

## 🚀 Tech Stack

### Backend
- **Node.js** with Express.js
- **Supabase** for database and authentication
- **OpenAI/Anthropic** for AI capabilities
- **Redis** for caching (optional)

### Web App
- **React** with TypeScript
- **Next.js** for SSR and routing
- **Tailwind CSS** for styling
- **Zustand** for state management

### Mobile App
- **React Native** with TypeScript
- **Expo** for development
- **React Navigation** for routing
- **NativeWind** for styling

## 📦 Installation

### Prerequisites
- Node.js v18 or higher
- npm or yarn
- Supabase account
- OpenAI/Anthropic API key

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your credentials
npm run dev
```

### Web App Setup

```bash
cd web
npm install
cp .env.example .env.local
# Edit .env.local with your API URL
npm run dev
```

### Mobile App Setup

```bash
cd mobile
npm install
cp .env.example .env
# Edit .env with your API URL
npx expo start
```

## 🗄️ Database Schema

The project uses Supabase with the following main tables:

- **users**: User profiles and preferences
- **conversations**: Chat conversation metadata
- **messages**: Individual chat messages
- **user_preferences**: User-specific settings and learned preferences
- **search_history**: Search queries and results

See `backend/supabase/schema.sql` for complete schema.

## 🔑 Environment Variables

### Backend (.env)
```
PORT=3000
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_KEY=your_supabase_service_key
OPENAI_API_KEY=your_openai_api_key
JWT_SECRET=your_jwt_secret
```

### Web (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Mobile (.env)
```
API_URL=http://localhost:3000
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 📱 Features Roadmap

- [x] Basic chat interface
- [x] Conversation memory
- [x] User authentication
- [ ] Voice input/output
- [ ] Multi-language support
- [ ] Advanced search capabilities
- [ ] Personalized recommendations
- [ ] Offline mode
- [ ] Push notifications

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**Rayhan**
- Email: rayhanjaleel904@gmail.com
- GitHub: [@richu337](https://github.com/richu337)

## 🙏 Acknowledgments

- OpenAI for AI capabilities
- Supabase for backend infrastructure
- React and React Native communities

---

Made with ❤️ by Rayhan
