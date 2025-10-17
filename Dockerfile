# Steg 1: Byggaren - installerar allt och bygger projektet
FROM node:20-alpine AS builder
WORKDIR /app

# Kopiera package-filer först för bättre Docker cache
COPY package*.json ./
RUN npm ci --only=production

# Kopiera resten av koden
COPY . .

# Bygg applikationen
RUN npm run build

# Steg 2: Köraren - tar bara det färdigbyggda resultatet
FROM node:20-alpine AS runner
WORKDIR /app

# Skapa en non-root användare för säkerhet
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Kopiera de färdigbyggda filerna från builder-staget
COPY --from=builder /app/public ./public

# Kopiera .next-mappen med rätt ägare
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Kopiera package.json för start-kommandot
COPY --from=builder /app/package.json ./package.json

# Växla till non-root användare
USER nextjs

# Exponera port 3000 (standard för Next.js)
EXPOSE 3000

# Sätt miljövariabel för port
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# Kommandot för att starta servern
CMD ["node", "server.js"]

