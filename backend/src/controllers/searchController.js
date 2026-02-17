const { supabaseAdmin } = require('../config/supabase');
const { openai, DEFAULT_MODEL } = require('../config/openai');
const axios = require('axios');
const logger = require('../utils/logger');

class SearchController {
  async search(req, res) {
    try {
      const { q: query } = req.query;
      const userId = req.user.id;

      // Use OpenAI to enhance and answer the search query
      const completion = await openai.chat.completions.create({
        model: DEFAULT_MODEL,
        messages: [
          {
            role: 'system',
            content: 'You are Codex, a helpful search assistant. Provide accurate, concise, and informative answers to user queries. If you need real-time information, indicate that.'
          },
          {
            role: 'user',
            content: query
          }
        ],
        temperature: 0.7,
        max_tokens: 500
      });

      const answer = completion.choices[0].message.content;

      // Save to search history
      await supabaseAdmin.from('search_history').insert({
        user_id: userId,
        query,
        result: answer
      });

      res.json({
        query,
        answer,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      logger.error('Search error:', error);
      res.status(500).json({ error: 'Search failed' });
    }
  }

  async getSearchHistory(req, res) {
    try {
      const userId = req.user.id;
      const { limit = 20, offset = 0 } = req.query;

      const { data, error } = await supabaseAdmin
        .from('search_history')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1);

      if (error) throw error;

      res.json({ history: data });
    } catch (error) {
      logger.error('Get search history error:', error);
      res.status(500).json({ error: 'Failed to fetch search history' });
    }
  }

  async deleteSearchHistory(req, res) {
    try {
      const { id } = req.params;
      const userId = req.user.id;

      const { error } = await supabaseAdmin
        .from('search_history')
        .delete()
        .eq('id', id)
        .eq('user_id', userId);

      if (error) throw error;

      res.json({ message: 'Search history deleted successfully' });
    } catch (error) {
      logger.error('Delete search history error:', error);
      res.status(500).json({ error: 'Failed to delete search history' });
    }
  }
}

module.exports = new SearchController();
