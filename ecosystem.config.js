module.exports = {
  apps: [{
    name: 'my-bot',
    script: 'src/bot.js',
    instances: 1,
    autorestart: true,
    max_restarts: 10,
    restart_delay: 5000,
    env: {
      NODE_ENV: 'production',
    },
  }],
};
