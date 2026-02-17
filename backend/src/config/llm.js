const OpenAI = require('openai');

// Support multiple LLM providers
const LLM_PROVIDER = process.env.LLM_PROVIDER || 'openai'; // 'openai' or 'openrouter'

let client;
let defaultModel;

if (LLM_PROVIDER === 'openrouter') {
  // OpenRouter configuration (supports free models)
  client = new OpenAI({
    apiKey: process.env.OPENROUTER_API_KEY,
    baseURL: 'https://openrouter.ai/api/v1',
    defaultHeaders: {
      'HTTP-Referer': process.env.APP_URL || 'http://localhost:3001',
      'X-Title': 'Codex AI Assistant',
    }
  });
  // Free model on OpenRouter
  defaultModel = process.env.OPENAI_MODEL || 'meta-llama/llama-3.2-3b-instruct:free';
} else {
  // OpenAI configuration
  client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  defaultModel = process.env.OPENAI_MODEL || 'gpt-4o-mini';
}

module.exports = {
  llm: client,
  DEFAULT_MODEL: defaultModel,
  LLM_PROVIDER
};
