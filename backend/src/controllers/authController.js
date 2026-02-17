const { supabase, supabaseAdmin } = require('../config/supabase');
const logger = require('../utils/logger');

class AuthController {
  async signup(req, res) {
    try {
      const { email, password, name } = req.body;

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name
          }
        }
      });

      if (error) throw error;

      // Create user profile if user was created
      if (data.user) {
        // Insert user profile
        const { error: profileError } = await supabaseAdmin
          .from('users')
          .insert({
            id: data.user.id,
            name: name,
            avatar_url: null
          });

        if (profileError && profileError.code !== '23505') { // Ignore duplicate key errors
          logger.error('Error creating user profile:', profileError);
        }

        // Create user preferences
        const { error: preferencesError } = await supabaseAdmin
          .from('user_preferences')
          .insert({
            user_id: data.user.id,
            interests: [],
            settings: {}
          });

        if (preferencesError && preferencesError.code !== '23505') { // Ignore duplicate key errors
          logger.error('Error creating user preferences:', preferencesError);
        }
      }

      res.status(201).json({
        user: data.user,
        session: data.session
      });
    } catch (error) {
      logger.error('Signup error:', error);
      res.status(400).json({ error: error.message });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;

      // Ensure user profile exists
      if (data.user) {
        const { data: existingProfile } = await supabaseAdmin
          .from('users')
          .select('id')
          .eq('id', data.user.id)
          .single();

        if (!existingProfile) {
          // Create profile if it doesn't exist
          await supabaseAdmin.from('users').insert({
            id: data.user.id,
            name: data.user.user_metadata?.name || data.user.email?.split('@')[0],
            avatar_url: null
          });
        }

        // Ensure preferences exist
        const { data: existingPreferences } = await supabaseAdmin
          .from('user_preferences')
          .select('id')
          .eq('user_id', data.user.id)
          .single();

        if (!existingPreferences) {
          await supabaseAdmin.from('user_preferences').insert({
            user_id: data.user.id,
            interests: [],
            settings: {}
          });
        }
      }

      res.json({
        user: data.user,
        session: data.session
      });
    } catch (error) {
      logger.error('Login error:', error);
      res.status(401).json({ error: 'Invalid credentials' });
    }
  }

  async logout(req, res) {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      res.json({ message: 'Logged out successfully' });
    } catch (error) {
      logger.error('Logout error:', error);
      res.status(500).json({ error: 'Logout failed' });
    }
  }

  async refreshToken(req, res) {
    try {
      const { refresh_token } = req.body;

      const { data, error } = await supabase.auth.refreshSession({
        refresh_token
      });

      if (error) throw error;

      res.json({
        session: data.session
      });
    } catch (error) {
      logger.error('Refresh token error:', error);
      res.status(401).json({ error: 'Invalid refresh token' });
    }
  }

  async getCurrentUser(req, res) {
    try {
      const { data: { user }, error } = await supabase.auth.getUser(
        req.headers.authorization?.replace('Bearer ', '')
      );

      if (error) throw error;

      res.json({ user });
    } catch (error) {
      logger.error('Get current user error:', error);
      res.status(401).json({ error: 'Unauthorized' });
    }
  }
}

module.exports = new AuthController();
