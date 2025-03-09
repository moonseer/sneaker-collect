#!/bin/bash

# Docker development helper script for Sneaker Collect Plus

# Function to display help message
show_help() {
  echo "Sneaker Collect Plus Docker Development Helper"
  echo ""
  echo "Usage: ./docker-dev.sh [command]"
  echo ""
  echo "Commands:"
  echo "  start       Start the development environment"
  echo "  stop        Stop the development environment"
  echo "  restart     Restart the development environment"
  echo "  logs        Show logs from all containers"
  echo "  logs:app    Show logs from the Next.js app container"
  echo "  logs:db     Show logs from the database container"
  echo "  logs:redis  Show logs from the Redis container"
  echo "  logs:nginx  Show logs from the Nginx container"
  echo "  shell:app   Open a shell in the Next.js app container"
  echo "  shell:db    Open a shell in the database container"
  echo "  shell:redis Open a shell in the Redis container"
  echo "  shell:nginx Open a shell in the Nginx container"
  echo "  test        Run tests in the Next.js app container"
  echo "  build       Rebuild containers"
  echo "  clean       Remove all containers, networks, and volumes"
  echo "  help        Show this help message"
  echo ""
}

# Check if .env file exists, if not copy from example
if [ ! -f .env ]; then
  if [ -f .env.example ]; then
    echo "Creating .env file from .env.example..."
    cp .env.example .env
    echo "Please update the .env file with your actual configuration values."
  else
    echo "Error: .env.example file not found. Please create a .env file manually."
    exit 1
  fi
fi

# Process commands
case "$1" in
  start)
    echo "Starting development environment..."
    docker-compose up -d
    echo "Development environment started. Access the app at http://localhost:80"
    ;;
  stop)
    echo "Stopping development environment..."
    docker-compose down
    echo "Development environment stopped."
    ;;
  restart)
    echo "Restarting development environment..."
    docker-compose down
    docker-compose up -d
    echo "Development environment restarted. Access the app at http://localhost:80"
    ;;
  logs)
    echo "Showing logs from all containers..."
    docker-compose logs -f
    ;;
  logs:app)
    echo "Showing logs from the Next.js app container..."
    docker-compose logs -f app
    ;;
  logs:db)
    echo "Showing logs from the database container..."
    docker-compose logs -f db
    ;;
  logs:redis)
    echo "Showing logs from the Redis container..."
    docker-compose logs -f redis
    ;;
  logs:nginx)
    echo "Showing logs from the Nginx container..."
    docker-compose logs -f nginx
    ;;
  shell:app)
    echo "Opening shell in the Next.js app container..."
    docker-compose exec app /bin/sh
    ;;
  shell:db)
    echo "Opening shell in the database container..."
    docker-compose exec db /bin/bash
    ;;
  shell:redis)
    echo "Opening shell in the Redis container..."
    docker-compose exec redis /bin/sh
    ;;
  shell:nginx)
    echo "Opening shell in the Nginx container..."
    docker-compose exec nginx /bin/sh
    ;;
  test)
    echo "Running tests in the Next.js app container..."
    docker-compose exec app npm test
    ;;
  build)
    echo "Rebuilding containers..."
    docker-compose build
    echo "Containers rebuilt. Use './docker-dev.sh start' to start the environment."
    ;;
  clean)
    echo "Removing all containers, networks, and volumes..."
    docker-compose down -v
    echo "Clean up complete."
    ;;
  help|*)
    show_help
    ;;
esac 