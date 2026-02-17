const { RateLimiterMemory } = require('rate-limiter-flexible');

const rateLimiter = new RateLimiterMemory({
  points: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  duration: parseInt(process.env.RATE_LIMIT_WINDOW_MS) / 1000 || 900, // 15 minutes
});

async function rateLimiterMiddleware(req, res, next) {
  try {
    const key = req.ip || req.connection.remoteAddress;
    await rateLimiter.consume(key);
    next();
  } catch (error) {
    res.status(429).json({
      error: 'Too many requests, please try again later'
    });
  }
}

module.exports = rateLimiterMiddleware;
