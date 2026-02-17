const { supabaseAdmin } = require('../config/supabase');
const logger = require('../utils/logger');

class UserController {
  async getProfile(req, res) {
    try {
      const userId = req.user.id;

      const { data, error } = await supabaseAdmin
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;

      res.json(data);
    } catch (error) {
      logger.error('Get profile error:', error);
      res.status(500).json({ error: 'Failed to fetch profile' });
    }
  }

  async updateProfile(req, res) {
    try {
      const userId = req.user.id;
      const updates = req.body;

      const { data, error } = await supabaseAdmin
        .from('users')
        .update(updates)
        .eq('id', userId)
        .select()
        .single();

      if (error) throw error;

      res.json(data);
    } catch (error) {
      logger.error('Update profile error:', error);
      res.status(500).json({ error: 'Failed to update profile' });
    }
  }

  async getPreferences(req, res) {
    try {
      const userId = req.user.id;

      const { data, error } = await supabaseAdmin
        .from('user_preferences')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) throw error;

      res.json(data);
    } catch (error) {
      logger.error('Get preferences error:', error);
      res.status(500).json({ error: 'Failed to fetch preferences' });
    }
  }

  async updatePreferences(req, res) {
    try {
      const userId = req.user.id;
      const { interests, settings } = req.body;

      const { data, error } = await supabaseAdmin
        .from('user_preferences')
        .update({ interests, settings })
        .eq('user_id', userId)
        .select()
        .single();

      if (error) throw error;

      res.json(data);
    } catch (error) {
      logger.error('Update preferences error:', error);
      res.status(500).json({ error: 'Failed to update preferences' });
    }
  }

  async getStats(req, res) {
    try {
      const userId = req.user.id;

      // Get conversation count
      const { count: conversationCount } = await supabaseAdmin
        .from('conversations')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId);

      // Get message count
      const { count: messageCount } = await supabaseAdmin
        .from('messages')
        .select('*', { count: 'exact', head: true })
        .eq('conversation_id', supabaseAdmin
          .from('conversations')
          .select('id')
          .eq('user_id', userId)
        );

      // Get search count
      const { count: searchCount } = await supabaseAdmin
        .from('search_history')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId);

      res.json({
        conversations: conversationCount || 0,
        messages: messageCount || 0,
        searches: searchCount || 0
      });
    } catch (error) {
      logger.error('Get stats error:', error);
      res.status(500).json({ error: 'Failed to fetch stats' });
    }
  }
}

module.exports = new UserController();
