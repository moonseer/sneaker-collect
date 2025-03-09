# Docker Setup for Sneaker Collect Plus

This document provides instructions for setting up and using the containerized environment for Sneaker Collect Plus.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Container Architecture](#container-architecture)
- [Development Environment](#development-environment)
- [Production Environment](#production-environment)
- [Common Operations](#common-operations)
- [Troubleshooting](#troubleshooting)

## Prerequisites

Before you begin, ensure you have the following installed:

- Docker (20.10.x or later)
- Docker Compose (2.x or later)
- Git

## Container Architecture

The Sneaker Collect Plus application uses a multi-container architecture:

1. **Frontend Container (Next.js)**: Runs the Next.js application
2. **Database Container (PostgreSQL)**: Stores application data
3. **Cache Container (Redis)**: Provides caching for performance optimization
4. **API Proxy Container (Nginx)**: Handles routing, SSL termination, and static file serving

## Development Environment

### Initial Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/sneaker-collect.git
   cd sneaker-collect
   ```

2. Create a `.env` file from the example:
   ```bash
   cp .env.example .env
   ```

3. Edit the `.env` file with your configuration values:
   ```
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   
   # OpenAI API Configuration
   NEXT_PUBLIC_OPENAI_API_KEY=your_openai_api_key
   
   # PostgreSQL Configuration
   POSTGRES_USER=postgres
   POSTGRES_PASSWORD=your_secure_password
   POSTGRES_DB=sneaker_collect
   ```

### Starting the Development Environment

Use the provided helper script to manage the development environment:

```bash
# Make the script executable (first time only)
chmod +x docker-dev.sh

# Start the development environment
./docker-dev.sh start
```

The application will be available at http://localhost:80

### Development Commands

The `docker-dev.sh` script provides several commands to help with development:

```bash
# View logs from all containers
./docker-dev.sh logs

# View logs from a specific container
./docker-dev.sh logs:app
./docker-dev.sh logs:db
./docker-dev.sh logs:redis
./docker-dev.sh logs:nginx

# Open a shell in a container
./docker-dev.sh shell:app
./docker-dev.sh shell:db
./docker-dev.sh shell:redis
./docker-dev.sh shell:nginx

# Run tests
./docker-dev.sh test

# Rebuild containers
./docker-dev.sh build

# Stop the development environment
./docker-dev.sh stop

# Restart the development environment
./docker-dev.sh restart

# Remove all containers, networks, and volumes
./docker-dev.sh clean
```

## Production Environment

### Deployment

For production deployment, use the production Docker Compose file and helper script:

```bash
# Make the script executable (first time only)
chmod +x docker-prod.sh

# Deploy the production environment
./docker-prod.sh deploy
```

### Production Commands

The `docker-prod.sh` script provides several commands for managing the production environment:

```bash
# View logs from all containers
./docker-prod.sh logs

# View logs from a specific container
./docker-prod.sh logs:app
./docker-prod.sh logs:db
./docker-prod.sh logs:redis
./docker-prod.sh logs:nginx

# Backup the database
./docker-prod.sh backup

# Restore the database from a backup
./docker-prod.sh restore ./backups/backup_file.sql.gz

# Check the status of all containers
./docker-prod.sh status

# Stop the production environment
./docker-prod.sh stop

# Restart the production environment
./docker-prod.sh restart

# Remove all containers, networks, and volumes
./docker-prod.sh clean
```

## Common Operations

### Adding a New Dependency

To add a new npm package to the Next.js application:

```bash
./docker-dev.sh shell:app
npm install package-name
exit
```

### Running Database Migrations

To run database migrations:

```bash
./docker-dev.sh shell:app
npm run migrate
exit
```

### Accessing the Database

To access the PostgreSQL database directly:

```bash
./docker-dev.sh shell:db
psql -U postgres -d sneaker_collect
```

## Troubleshooting

### Container Won't Start

If a container fails to start, check the logs:

```bash
./docker-dev.sh logs:app
```

### Database Connection Issues

If the application can't connect to the database:

1. Check if the database container is running:
   ```bash
   ./docker-dev.sh status
   ```

2. Verify the database credentials in the `.env` file.

3. Check the database logs:
   ```bash
   ./docker-dev.sh logs:db
   ```

### Nginx Configuration Issues

If you're experiencing routing or proxy issues:

1. Check the Nginx logs:
   ```bash
   ./docker-dev.sh logs:nginx
   ```

2. Verify the Nginx configuration files in the `nginx` directory.

### Rebuilding Containers

If you need to rebuild the containers after significant changes:

```bash
./docker-dev.sh build
./docker-dev.sh restart
``` 