# Docker Swarm Cluster Stats - Troubleshooting Guide

## Problem: Cloudflare 502 Bad Gateway Error

### Symptoms
- `raspi.gabrielskoghd.org` returns 502 Bad Gateway
- Direct IP access (`192.168.50.84/stats`) works fine
- Docker Swarm services appear to be running correctly

### Root Cause
Docker Swarm network configuration or cached state issues preventing Cloudflare from reaching the origin server.

### Solution Steps

1. **Verify Docker Swarm Status**
   ```bash
   docker service ls
   docker service ps portfolio_portfolio
   ```

2. **Check Direct Access**
   ```bash
   curl -s http://192.168.50.84/stats
   ```
   - If this works, the issue is with Cloudflare → Docker Swarm connection

3. **Update Docker Image**
   ```bash
   cd /home/flamn/my-app
   docker build -t gabriel-portfolio:latest .
   docker service update --image gabriel-portfolio:latest portfolio_portfolio
   ```

4. **If Still Not Working: Reboot System**
   ```bash
   sudo reboot
   ```

### Why Reboot Works
- Clears Docker Swarm network cache
- Resets network routing tables
- Clears any corrupted Docker state
- Forces fresh connection establishment

### Prevention
- Regularly restart Docker Swarm services
- Monitor network connectivity between Cloudflare and origin
- Keep Docker images updated and properly distributed

## Development vs Production Issues

### Local Development
- Use `npm run dev` for development
- Test on `localhost:3000` or `localhost:3001`
- No Docker required for local testing

### Production Testing
- Use `npm run build && npm start` for production testing
- Test on `localhost:3005` (or available port)
- Verify API endpoints work correctly

### Docker Deployment
- Build image: `docker build -t gabriel-portfolio:latest .`
- Update service: `docker service update --image gabriel-portfolio:latest portfolio_portfolio`
- Monitor service status: `docker service ps portfolio_portfolio`

## Common Issues

### Port Conflicts
```bash
# Find processes using ports
ps aux | grep -E "(npm|next|node)" | grep -v grep
netstat -tulpn | grep -E ":300[0-9]"

# Kill specific processes
kill <PID>
```

### Docker Swarm Image Distribution
- Ensure all worker nodes have the latest image
- Use `docker service update` to distribute new images
- Check for "No such image" errors in service status

### Cloudflare Cache Issues
- Clear Cloudflare cache manually
- Check if direct IP access works
- Verify DNS propagation

## 3-Node Cluster Stats Implementation

### Features
- **raspberrypi5**: Real data (8GB RAM) - "(Real Data - 8GB RAM)"
- **pi4**: Simulated data (4GB RAM) - "(Simulated - 4GB RAM)"
- **cluter2**: Simulated data (4GB RAM) - "(Simulated - 4GB RAM)"

### Code Structure
- Based on working commit `834ce24`
- Uses `/api/system-details` for real data
- Simulates data for other nodes with dynamic values
- Clear labeling of real vs simulated data

### Testing
1. Test locally: `npm run dev` → `localhost:3001/stats`
2. Test production build: `npm run build && npm start` → `localhost:3005/stats`
3. Test Docker: Build image and update service
4. Test production: `raspi.gabrielskoghd.org/stats`

## Quick Fixes

### If Cloudflare Returns 502
1. Check direct IP access
2. Verify Docker Swarm services
3. Update Docker image
4. **Reboot system** (most effective)

### If Local Development Fails
1. Clear `.next` folder: `rm -rf .next`
2. Restart dev server: `npm run dev`
3. Check for port conflicts
4. Verify API endpoints work

### If Docker Build Fails
1. Check Dockerfile syntax
2. Verify all files are copied
3. Check for build errors in output
4. Ensure `output: 'standalone'` is configured

---

*Last updated: October 24, 2025*
*Issue resolved: Cloudflare 502 error fixed with system reboot*
