module.exports = {
  apps: [{
    name: 'WEB',
    script: 'npm run serve',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G'
  }],
  deploy: {
    prod: {
      user: 'centos',
      host: '18.197.58.63',
      key: 'esuki.pem',
      ref: 'origin/main',
      repo: 'git@github.com:lmo0731/sushi-esuki.git',
      path: '/home/centos/sushi-esuki',
      'pre-deploy': 'git pull',
      'post-deploy': 'npm install && ln -sf /home/centos/sushi-esuki/.env .env/prod.env && npm run build && pm2 reload ecosystem.config.js --env production'
    }
  }
}
