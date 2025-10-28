# ================================================================
# Dockerfile untuk Next.js 16 - Production Ready
# ================================================================
# Multi-stage build untuk optimasi ukuran image dan keamanan
# ================================================================

# -------- Base versions (ubah sesuai kebutuhan)
ARG NODE_VERSION=22-alpine

# ================================================================
# Stage 1: Dependencies - Install semua dependencies
# ================================================================
FROM node:${NODE_VERSION} AS deps
WORKDIR /app

# Install library sistem yang dibutuhkan (sharp untuk image optimization, dll)
RUN apk add --no-cache libc6-compat

# Copy package files untuk caching yang lebih baik
# Layer ini akan di-cache selama package.json tidak berubah
COPY package.json ./
COPY package-lock.json* yarn.lock* pnpm-lock.yaml* ./

# Install dependencies sesuai lockfile yang ada
# Menggunakan --legacy-peer-deps untuk kompatibilitas yang lebih baik
RUN \
    if [ -f package-lock.json ]; then npm ci --legacy-peer-deps --omit=dev; \
    elif [ -f yarn.lock ]; then yarn --frozen-lockfile --production; \
    elif [ -f pnpm-lock.yaml ]; then corepack enable && pnpm i --frozen-lockfile --prod; \
    else npm i --production; \
    fi

# ================================================================
# Stage 2: Builder - Build aplikasi Next.js
# ================================================================
FROM node:${NODE_VERSION} AS builder
WORKDIR /app

# Disable Next.js telemetry untuk privacy dan performance
ENV NEXT_TELEMETRY_DISABLED=1

# Copy node_modules dari stage deps
COPY --from=deps /app/node_modules ./node_modules

# Copy semua source code
COPY . .

# Install dev dependencies untuk build process
RUN npm ci --legacy-peer-deps

# Build Next.js application
# Output: standalone mode (sudah dikonfigurasi di next.config.ts)
RUN npm run build

# ================================================================
# Stage 3: Runner - Production runtime yang minimal
# ================================================================
FROM node:${NODE_VERSION} AS runner
WORKDIR /app

# Set environment ke production
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Buat non-root user untuk keamanan
# Menjalankan container sebagai non-root adalah best practice
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy artefak build dari builder stage
# Next.js standalone output sudah menyertakan minimal node_modules & server.js
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# Set ownership untuk folder yang mungkin perlu write access
RUN chown -R nextjs:nodejs /app

# Expose port (default Next.js = 3000)
# Bisa diubah dengan environment variable PORT
EXPOSE 3000

# Set environment variables default (bisa di-override saat runtime)
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Switch ke non-root user
USER nextjs

# Health check untuk memastikan aplikasi berjalan dengan baik
# Docker akan otomatis restart container jika health check gagal
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3000/api/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})" || exit 1

# Jalankan server Next.js standalone
CMD ["node", "server.js"]
