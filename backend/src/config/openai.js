const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const DEFAULT_MODEL = process.env.OPENAI_MODEL || 'gpt-4-turbo-preview';

module.exports = {
  openai,
  DEFAULT_MODEL
};
