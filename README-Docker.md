# Docker Deployment Guide för Gabriel's Portfolio

Denna guide visar hur du deployar din Next.js-portfolio på Docker Swarm-klustret.

## Skapade filer

- `Dockerfile` - Multi-stage build för optimerad container
- `docker-compose.yml` - Swarm-konfiguration med volym-mappning för systemresurser
- `.dockerignore` - Exkluderar onödiga filer från build-processen
- `next.config.js` - Uppdaterad med `output: 'standalone'` för Docker-optimering

## Viktiga funktioner

### Systemresurser i Container
- **CPU-temperatur**: Volym-mappning `/sys/class/thermal/thermal_zone0` → `/sys/class/thermal/thermal_zone0:ro`
- **Hostname**: `hostname: '{{.Node.Hostname}}'` sätter rätt värdnamn per Pi

### Lastbalansering
- 2 repliker som automatiskt fördelas på klustret
- Port 80 → 3000 mappning
- Overlay-nätverk för kommunikation mellan noder

## Deployment-steg

1. **Pusha till Git**:
   ```bash
   git add .
   git commit -m "Add Docker configuration for Swarm deployment"
   git push origin main
   ```

2. **I Portainer**:
   - Gå till Stacks → + Add stack
   - Namn: `portfolio`
   - Välj "Git Repository"
   - Repository URL: din GitHub-repo
   - Compose path: `docker-compose.yml`
   - Aktivera "Force update" och "Pull latest image"
   - Deploy the stack

3. **Verifiera**:
   - Besök `http://<PI-IP>`
   - Gå till stats-sidan
   - Uppdatera flera gånger för att se lastbalansering
   - Hostname ska växla mellan `raspberrypi5` och `pi4`

## Tekniska detaljer

### Dockerfile
- Multi-stage build för minimal slutgiltig image
- Non-root användare för säkerhet
- Standalone Next.js-utdata för optimal prestanda

### Docker Compose
- Swarm-specifik konfiguration
- Volym-mappning för systemresurser
- Placement constraints för worker-noder
- Overlay-nätverk för kluster-kommunikation

### Systemresurser
Din befintliga kod i `system.ts` kommer att fungera utan ändringar:
- `fs.readFile('/sys/class/thermal/thermal_zone0/temp')` - fungerar via volym-mappning
- `os.hostname()` - fungerar via Swarm hostname-injection

