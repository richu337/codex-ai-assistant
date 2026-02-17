const { supabaseAdmin } = require('../config/supabase');
const { openai, DEFAULT_MODEL } = require('../config/openai');
const logger = require('../utils/logger');

class ChatController {
  async sendMessage(req, res) {
    try {
      const { message, conversationId } = req.body;
      const userId = req.user.id;

      let conversation;

      // Get or create conversation
      if (conversationId) {
        const { data } = await supabaseAdmin
          .from('conversations')
          .select('*')
          .eq('id', conversationId)
          .eq('user_id', userId)
          .single();
        conversation = data;
      } else {
        const { data } = await supabaseAdmin
          .from('conversations')
          .insert({
            user_id: userId,
            title: message.substring(0, 50) + (message.length > 50 ? '...' : '')
          })
          .select()
          .single();
        conversation = data;
      }

      // Save user message
      await supabaseAdmin.from('messages').insert({
        conversation_id: conversation.id,
        role: 'user',
        content: message
      });

      // Get conversation history
      const { data: history } = await supabaseAdmin
        .from('messages')
        .select('role, content')
        .eq('conversation_id', conversation.id)
        .order('created_at', { ascending: true })
        .limit(20);

      // Get user preferences for personalization
      const { data: preferences } = await supabaseAdmin
        .from('user_preferences')
        .select('*')
        .eq('user_id', userId)
        .single();

      // Build context with user preferences
      const systemMessage = {
        role: 'system',
        content: `You are Codex, a helpful and intelligent personal AI assistant. You remember previous conversations and learn user preferences. ${
          preferences?.interests ? `The user is interested in: ${preferences.interests.join(', ')}.` : ''
        } Be conversational, friendly, and helpful.`
      };

      // Call OpenAI
      const completion = await openai.chat.completions.create({
        model: DEFAULT_MODEL,
        messages: [systemMessage, ...history],
        temperature: 0.7,
        max_tokens: 1000
      });

      const aiResponse = completion.choices[0].message.content;

      // Save AI response
      await supabaseAdmin.from('messages').insert({
        conversation_id: conversation.id,
        role: 'assistant',
        content: aiResponse
      });

      // Update conversation timestamp
      await supabaseAdmin
        .from('conversations')
        .update({ updated_at: new Date().toISOString() })
        .eq('id', conversation.id);

      res.json({
        conversationId: conversation.id,
        message: aiResponse,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      logger.error('Chat error:', error);
      res.status(500).json({ error: 'Failed to process message' });
    }
  }

  async getConversations(req, res) {
    try {
      const userId = req.user.id;
      const { limit = 20, offset = 0 } = req.query;

      const { data, error } = await supabaseAdmin
        .from('conversations')
        .select('id, title, created_at, updated_at')
        .eq('user_id', userId)
        .order('updated_at', { ascending: false })
        .range(offset, offset + limit - 1);

      if (error) throw error;

      res.json({ conversations: data });
    } catch (error) {
      logger.error('Get conversations error:', error);
      res.status(500).json({ error: 'Failed to fetch conversations' });
    }
  }

  async getConversation(req, res) {
    try {
      const { id } = req.params;
      const userId = req.user.id;

      const { data, error } = await supabaseAdmin
        .from('conversations')
        .select('*')
        .eq('id', id)
        .eq('user_id', userId)
        .single();

      if (error) throw error;
      if (!data) return res.status(404).json({ error: 'Conversation not found' });

      res.json(data);
    } catch (error) {
      logger.error('Get conversation error:', error);
      res.status(500).json({ error: 'Failed to fetch conversation' });
    }
  }

  async deleteConversation(req, res) {
    try {
      const { id } = req.params;
      const userId = req.user.id;

      const { error } = await supabaseAdmin
        .from('conversations')
        .delete()
        .eq('id', id)
        .eq('user_id', userId);

      if (error) throw error;

      res.json({ message: 'Conversation deleted successfully' });
    } catch (error) {
      logger.error('Delete conversation error:', error);
      res.status(500).json({ error: 'Failed to delete conversation' });
    }
  }

  async getMessages(req, res) {
    try {
      const { id } = req.params;
      const userId = req.user.id;
      const { limit = 50, offset = 0 } = req.query;

      // Verify conversation belongs to user
      const { data: conversation } = await supabaseAdmin
        .from('conversations')
        .select('id')
        .eq('id', id)
        .eq('user_id', userId)
        .single();

      if (!conversation) {
        return res.status(404).json({ error: 'Conversation not found' });
      }

      const { data, error } = await supabaseAdmin
        .from('messages')
        .select('*')
        .eq('conversation_id', id)
        .order('created_at', { ascending: true })
        .range(offset, offset + limit - 1);

      if (error) throw error;

      res.json({ messages: data });
    } catch (error) {
      logger.error('Get messages error:', error);
      res.status(500).json({ error: 'Failed to fetch messages' });
    }
  }
}

module.exports = new ChatController();
