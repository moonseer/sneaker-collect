#!/bin/bash

# Docker production helper script for Sneaker Collect Plus

# Function to display help message
show_help() {
  echo "Sneaker Collect Plus Docker Production Helper"
  echo ""
  echo "Usage: ./docker-prod.sh [command]"
  echo ""
  echo "Commands:"
  echo "  deploy      Deploy the production environment"
  echo "  stop        Stop the production environment"
  echo "  restart     Restart the production environment"
  echo "  logs        Show logs from all containers"
  echo "  logs:app    Show logs from the Next.js app container"
  echo "  logs:db     Show logs from the database container"
  echo "  logs:redis  Show logs from the Redis container"
  echo "  logs:nginx  Show logs from the Nginx container"
  echo "  backup      Backup the database"
  echo "  restore     Restore the database from backup"
  echo "  status      Check the status of all containers"
  echo "  clean       Remove all containers, networks, and volumes"
  echo "  help        Show this help message"
  echo ""
}

# Check if .env file exists
if [ ! -f .env ]; then
  echo "Error: .env file not found. Please create a .env file with your production configuration."
  exit 1
fi

# Process commands
case "$1" in
  deploy)
    echo "Deploying production environment..."
    docker-compose -f docker-compose.prod.yml up -d
    echo "Production environment deployed."
    ;;
  stop)
    echo "Stopping production environment..."
    docker-compose -f docker-compose.prod.yml down
    echo "Production environment stopped."
    ;;
  restart)
    echo "Restarting production environment..."
    docker-compose -f docker-compose.prod.yml down
    docker-compose -f docker-compose.prod.yml up -d
    echo "Production environment restarted."
    ;;
  logs)
    echo "Showing logs from all containers..."
    docker-compose -f docker-compose.prod.yml logs -f
    ;;
  logs:app)
    echo "Showing logs from the Next.js app container..."
    docker-compose -f docker-compose.prod.yml logs -f app
    ;;
  logs:db)
    echo "Showing logs from the database container..."
    docker-compose -f docker-compose.prod.yml logs -f db
    ;;
  logs:redis)
    echo "Showing logs from the Redis container..."
    docker-compose -f docker-compose.prod.yml logs -f redis
    ;;
  logs:nginx)
    echo "Showing logs from the Nginx container..."
    docker-compose -f docker-compose.prod.yml logs -f nginx
    ;;
  backup)
    echo "Backing up the database..."
    TIMESTAMP=$(date +%Y%m%d_%H%M%S)
    BACKUP_DIR="./backups"
    mkdir -p $BACKUP_DIR
    docker-compose -f docker-compose.prod.yml exec -T db pg_dump -U ${POSTGRES_USER:-postgres} ${POSTGRES_DB:-sneaker_collect} | gzip > "$BACKUP_DIR/backup_$TIMESTAMP.sql.gz"
    echo "Database backup created at $BACKUP_DIR/backup_$TIMESTAMP.sql.gz"
    ;;
  restore)
    if [ -z "$2" ]; then
      echo "Error: Please specify the backup file to restore."
      echo "Usage: ./docker-prod.sh restore ./backups/backup_file.sql.gz"
      exit 1
    fi
    
    if [ ! -f "$2" ]; then
      echo "Error: Backup file $2 not found."
      exit 1
    fi
    
    echo "Restoring database from $2..."
    gunzip -c "$2" | docker-compose -f docker-compose.prod.yml exec -T db psql -U ${POSTGRES_USER:-postgres} ${POSTGRES_DB:-sneaker_collect}
    echo "Database restored from $2."
    ;;
  status)
    echo "Checking status of all containers..."
    docker-compose -f docker-compose.prod.yml ps
    ;;
  clean)
    echo "This will remove all production containers, networks, and volumes."
    read -p "Are you sure you want to continue? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
      echo "Removing all production containers, networks, and volumes..."
      docker-compose -f docker-compose.prod.yml down -v
      echo "Clean up complete."
    else
      echo "Operation cancelled."
    fi
    ;;
  help|*)
    show_help
    ;;
esac 