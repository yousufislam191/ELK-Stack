# Create directory structure
mkdir -p nodejs-elk-example/{docker/{logstash/{config,pipeline}},src/{config,middleware,routes,models,utils},logs,tests/{unit,integration},scripts}

# Initialize project
cd nodejs-elk-example
npm init -y

# Install dependencies
npm install express winston winston-logstash dotenv
npm install --save-dev jest nodemon

# Create initial files
touch docker/docker-compose.yml
touch docker/logstash/config/logstash.yml
touch docker/logstash/pipeline/logstash.conf
touch src/config/logger.js
touch src/middleware/requestLogger.js
touch src/routes/userRoutes.js
touch index.js
touch .env.example
touch .gitignore