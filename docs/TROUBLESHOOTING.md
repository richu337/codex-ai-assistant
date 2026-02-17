# Troubleshooting Guide

## Common Issues and Solutions

### 1. 500 Internal Server Error on Chat

**Symptoms:**
- Error when sending messages
- "Failed to send message: AxiosError: Request failed with status code 500"

**Solutions:**

#### A. Check Backend Logs
```bash
cd backend
npm run dev
```
Look for error messages in the console.

#### B. Verify Environment Variables
Make sure your `backend/.env` has:
```env
OPENAI_API_KEY=sk-...  # Must be valid
SUPABASE_URL=https://...
SUPABASE_SERVICE_KEY=...  # Must be service_role key, not anon key
```

#### C. Test OpenAI Connection
```bash
# In backend directory
node -e "
const OpenAI = require('openai');
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
openai.chat.completions.create({
  model: 'gpt-4-turbo-preview',
  messages: [{ role: 'user', content: 'test' }]
}).then(() => console.log('✓ OpenAI works')).catch(e => console.error('✗ OpenAI error:', e.message));
"
```

#### D. Check Database Tables
In Supabase SQL Editor, verify tables exist:
```sql
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public';
```

Should show: users, user_preferences, conversations, messages, search_history

#### E. Verify User Profile Exists
```sql
SELECT * FROM users WHERE id = 'your-user-id';
SELECT * FROM user_preferences WHERE user_id = 'your-user-id';
```

If missing, the updated auth controller will create them on next login.

### 2. Authentication Issues

**Symptoms:**
- Can't login
- "Invalid credentials" error
- Redirected to login repeatedly

**Solutions:**

#### A. Check Supabase Auth Settings
1. Go to Supabase Dashboard > Authentication > Settings
2. Ensure "Enable Email Confirmations" matches your setup
3. If disabled, users can login immediately
4. If enabled, users must confirm email first

#### B. Reset Password
In Supabase Dashboard > Authentication > Users:
- Find user
- Click "..." menu
- Select "Send Password Recovery"

#### C. Check CORS Settings
In `backend/.env`:
```env
ALLOWED_ORIGINS=http://localhost:3001,http://localhost:19006
```

### 3. Database Connection Issues

**Symptoms:**
- "Failed to fetch conversations"
- Database errors in backend logs

**Solutions:**

#### A. Verify Supabase Credentials
```bash
# Test connection
curl -X GET 'YOUR_SUPABASE_URL/rest/v1/' \
  -H "apikey: YOUR_ANON_KEY" \
  -H "Authorization: Bearer YOUR_ANON_KEY"
```

#### B. Check Row Level Security (RLS)
RLS might be blocking queries. Temporarily disable for testing:
```sql
ALTER TABLE conversations DISABLE ROW LEVEL SECURITY;
ALTER TABLE messages DISABLE ROW LEVEL SECURITY;
```

**⚠️ Remember to re-enable RLS after testing!**

#### C. Verify Service Role Key
The backend needs the `service_role` key (not `anon` key) in `SUPABASE_SERVICE_KEY`.

Find it in: Supabase Dashboard > Settings > API > service_role key

### 4. OpenAI API Issues

**Symptoms:**
- "Failed to process message"
- OpenAI errors in logs

**Solutions:**

#### A. Check API Key
- Verify key is valid at https://platform.openai.com/api-keys
- Check you have credits: https://platform.openai.com/account/billing

#### B. Check Model Availability
Some models require higher tier access. Try changing in `backend/.env`:
```env
OPENAI_MODEL=gpt-3.5-turbo  # Instead of gpt-4-turbo-preview
```

#### C. Rate Limits
If you're hitting rate limits, add delays or upgrade your OpenAI plan.

### 5. Frontend Issues

**Symptoms:**
- Pages not loading
- 404 errors
- Blank screen

**Solutions:**

#### A. Clear Next.js Cache
```bash
cd web
rm -rf .next
npm run dev
```

#### B. Check API URL
In `web/.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:3000  # Must match backend port
```

#### C. Verify Backend is Running
```bash
curl http://localhost:3000/health
```

Should return: `{"status":"ok",...}`

### 6. Pull Latest Changes

If you're getting errors after I updated the code:

```bash
# Pull latest changes
git pull origin main

# Backend
cd backend
npm install  # Install any new dependencies
npm run dev

# Web (in new terminal)
cd web
npm install
rm -rf .next  # Clear cache
npm run dev
```

### 7. Start Fresh

If all else fails, reset everything:

```bash
# 1. Drop and recreate database tables in Supabase SQL Editor
DROP TABLE IF EXISTS search_history CASCADE;
DROP TABLE IF EXISTS messages CASCADE;
DROP TABLE IF EXISTS conversations CASCADE;
DROP TABLE IF EXISTS user_preferences CASCADE;
DROP TABLE IF EXISTS users CASCADE;

# Then run the schema.sql again

# 2. Clear all caches
cd backend
rm -rf node_modules package-lock.json
npm install

cd ../web
rm -rf node_modules .next package-lock.json
npm install

# 3. Restart servers
cd backend
npm run dev

# In another terminal
cd web
npm run dev
```

## Getting Help

If you're still stuck:

1. **Check Backend Logs**: Look for specific error messages
2. **Check Browser Console**: Look for network errors
3. **Check Supabase Logs**: Dashboard > Logs
4. **Create GitHub Issue**: https://github.com/richu337/codex-ai-assistant/issues

Include:
- Error message
- Backend logs
- Browser console logs
- Steps to reproduce

## Quick Health Check

Run this checklist:

- [ ] Backend running on port 3000
- [ ] Web running on port 3001
- [ ] Can access http://localhost:3000/health
- [ ] Can access http://localhost:3001
- [ ] Supabase tables exist
- [ ] OpenAI API key is valid
- [ ] Environment variables are set
- [ ] Can signup/login
- [ ] User profile exists in database

If all checked, the app should work! 🎉
