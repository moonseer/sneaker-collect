# Base stage for dependencies
FROM node:18-alpine AS base
WORKDIR /app
# Install dependencies only when needed
COPY package.json package-lock.json* ./
RUN npm ci

# Development stage
FROM base AS development
WORKDIR /app
COPY . .
# Install additional dependencies needed for development
RUN npm install @radix-ui/react-checkbox @radix-ui/react-dialog @radix-ui/react-select axios
# Expose port for development server
EXPOSE 3000
# Start development server with hot reloading
CMD ["npm", "run", "dev"]

# Build stage
FROM base AS builder
WORKDIR /app
COPY . .
# Install additional dependencies needed for build
RUN npm install @radix-ui/react-checkbox @radix-ui/react-dialog @radix-ui/react-select axios
# Set environment variables for production build
ARG NEXT_PUBLIC_SUPABASE_URL
ARG NEXT_PUBLIC_SUPABASE_ANON_KEY
ARG NEXT_PUBLIC_OPENAI_API_KEY
ARG STOCKX_EMAIL_ENCODED
ARG STOCKX_PASSWORD_ENCODED
ENV NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=$NEXT_PUBLIC_SUPABASE_ANON_KEY
ENV NEXT_PUBLIC_OPENAI_API_KEY=$NEXT_PUBLIC_OPENAI_API_KEY
ENV STOCKX_EMAIL_ENCODED=$STOCKX_EMAIL_ENCODED
ENV STOCKX_PASSWORD_ENCODED=$STOCKX_PASSWORD_ENCODED
# Build the application
RUN npm run build

# Production stage
FROM node:18-alpine AS production
WORKDIR /app

ENV NODE_ENV=production

# Copy necessary files from builder stage
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Expose port for production server
EXPOSE 3000

# Start production server
CMD ["npm", "start"] 