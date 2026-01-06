# Kumbh Sava - Deployment Guide

## Production Deployment Options

### Option 1: Frontend (Vercel) + Backend (Railway)

This is the recommended setup for ease of deployment and scaling.

---

## Frontend Deployment (Vercel)

### Prerequisites
- GitHub account
- Vercel account (free tier available)

### Steps

1. **Push to GitHub**
```bash
cd /Users/krishnajaiswal/Team-Ganesha
git init
git add .
git commit -m "Initial commit: Kumbh Sava"
git branch -M main
git remote add origin https://github.com/yourusername/kumbh-sava.git
git push -u origin main
```

2. **Deploy to Vercel**
- Go to [vercel.com](https://vercel.com)
- Click "Import Project"
- Select your GitHub repository
- Configure:
  - **Framework Preset**: Vite
  - **Root Directory**: `frontend`
  - **Build Command**: `npm run build`
  - **Output Directory**: `dist`
  
3. **Environment Variables**
Add in Vercel dashboard:
```
VITE_API_URL=https://your-backend-url.railway.app/api
```

4. **Deploy**
- Click "Deploy"
- Vercel will build and deploy automatically
- Get your URL: `https://kumbh-sava.vercel.app`

---

## Backend Deployment (Railway)

### Prerequisites
- GitHub account (same repo)
- Railway account (free tier with $5 credit)

### Steps

1. **Prepare Backend**

Add to `backend/package.json`:
```json
{
  "engines": {
    "node": ">=18.0.0"
  }
}
```

2. **Deploy to Railway**
- Go to [railway.app](https://railway.app)
- Click "New Project"
- Select "Deploy from GitHub repo"
- Choose your repository
- Select `backend` as root directory

3. **Configure Environment Variables**
In Railway dashboard, add:
```
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/kumbh-sava
JWT_SECRET=your-production-secret-change-this
NODE_ENV=production
CORS_ORIGIN=https://kumbh-sava.vercel.app
```

4. **MongoDB Setup (MongoDB Atlas)**
- Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
- Create free cluster
- Create database user
- Whitelist Railway's IP (or use 0.0.0.0/0 for all IPs)
- Get connection string
- Add to Railway env vars

5. **Deploy**
- Railway auto-deploys on push
- Get your backend URL: `https://your-app.railway.app`

6. **Update Frontend**
- Update `VITE_API_URL` in Vercel to Railway URL
- Redeploy frontend

---

## Option 2: Full Stack on Render

### Prerequisites
- GitHub account
- Render account (free tier available)

### Backend on Render

1. **Create Web Service**
- Go to [render.com](https://render.com)
- "New" → "Web Service"
- Connect GitHub repo
- Configure:
  - **Name**: kumbh-sava-backend
  - **Root Directory**: `backend`
  - **Environment**: Node
  - **Build Command**: `npm install`
  - **Start Command**: `npm start`

2. **Environment Variables**
```
PORT=5000
MONGODB_URI=your-mongodb-atlas-uri
JWT_SECRET=production-secret
NODE_ENV=production
```

3. **Deploy**
- Click "Create Web Service"
- Wait for deployment
- Get URL: `https://kumbh-sava-backend.onrender.com`

### Frontend on Render (Static Site)

1. **Create Static Site**
- "New" → "Static Site"
- Connect same GitHub repo
- Configure:
  - **Name**: kumbh-sava-frontend
  - **Root Directory**: `frontend`
  - **Build Command**: `npm install && npm run build`
  - **Publish Directory**: `dist`

2. **Environment Variables**
```
VITE_API_URL=https://kumbh-sava-backend.onrender.com/api
```

3. **Deploy**
- Click "Create Static Site"
- Get URL: `https://kumbh-sava-frontend.onrender.com`

---

## Option 3: VPS Deployment (DigitalOcean, AWS EC2, etc.)

### Prerequisites
- Ubuntu 20.04+ server
- Domain name (optional)
- SSH access

### Server Setup

1. **Connect to Server**
```bash
ssh root@your-server-ip
```

2. **Install Dependencies**
```bash
# Update system
apt update && apt upgrade -y

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt install -y nodejs

# Install MongoDB
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-6.0.list
apt update
apt install -y mongodb-org

# Start MongoDB
systemctl start mongod
systemctl enable mongod

# Install PM2
npm install -g pm2

# Install Nginx
apt install -y nginx
```

3. **Deploy Application**
```bash
# Clone repository
cd /var/www
git clone https://github.com/yourusername/kumbh-sava.git
cd kumbh-sava

# Setup Backend
cd backend
npm install
cp .env.example .env
nano .env  # Edit with production settings

# Setup Frontend
cd ../frontend
npm install
npm run build

# Start Backend with PM2
cd ../backend
pm2 start server.js --name kumbh-sava-backend
pm2 save
pm2 startup
```

4. **Configure Nginx**
```bash
nano /etc/nginx/sites-available/kumbh-sava
```

Add configuration:
```nginx
# Backend API
server {
    listen 80;
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

# Frontend
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    root /var/www/kumbh-sava/frontend/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

Enable site:
```bash
ln -s /etc/nginx/sites-available/kumbh-sava /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

5. **SSL with Let's Encrypt**
```bash
apt install -y certbot python3-certbot-nginx
certbot --nginx -d yourdomain.com -d www.yourdomain.com -d api.yourdomain.com
```

---

## Option 4: Docker Deployment

### Create Dockerfiles

**Backend Dockerfile:**
```dockerfile
# backend/Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

EXPOSE 5000

CMD ["npm", "start"]
```

**Frontend Dockerfile:**
```dockerfile
# frontend/Dockerfile
FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

**Frontend nginx.conf:**
```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

**Docker Compose:**
```yaml
# docker-compose.yml
version: '3.8'

services:
  mongodb:
    image: mongo:6
    restart: always
    volumes:
      - mongo-data:/data/db
    ports:
      - "27017:27017"

  backend:
    build: ./backend
    restart: always
    ports:
      - "5000:5000"
    environment:
      - MONGODB_URI=mongodb://mongodb:27017/kumbh-sava
      - JWT_SECRET=${JWT_SECRET}
      - NODE_ENV=production
    depends_on:
      - mongodb

  frontend:
    build: ./frontend
    restart: always
    ports:
      - "80:80"
    depends_on:
      - backend

volumes:
  mongo-data:
```

**Deploy with Docker:**
```bash
docker-compose up -d
```

---

## Post-Deployment Checklist

### Security
- [ ] Change JWT_SECRET to strong random string
- [ ] Use HTTPS (SSL/TLS certificates)
- [ ] Set secure CORS origins
- [ ] Enable MongoDB authentication
- [ ] Set up firewall rules
- [ ] Regular security updates

### Performance
- [ ] Enable compression (gzip/brotli)
- [ ] Set up CDN for static assets
- [ ] Configure caching headers
- [ ] Database indexes properly set
- [ ] Monitor memory usage
- [ ] Set up auto-scaling (if needed)

### Monitoring
- [ ] Set up error logging (Sentry, LogRocket)
- [ ] Configure uptime monitoring (UptimeRobot)
- [ ] Database backup automation
- [ ] Performance monitoring (New Relic, DataDog)
- [ ] Set up alerts for downtime

### Backup
- [ ] MongoDB Atlas automated backups
- [ ] Code repository backups
- [ ] Environment variable documentation
- [ ] Disaster recovery plan

---

## Environment Variables Reference

### Backend (.env)
```env
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/kumbh-sava
JWT_SECRET=super-secret-production-key-min-32-chars
CORS_ORIGIN=https://your-frontend-domain.com
```

### Frontend (.env.production)
```env
VITE_API_URL=https://your-backend-domain.com/api
```

---

## Troubleshooting

### CORS Errors
- Verify CORS_ORIGIN matches frontend URL
- Check backend CORS configuration
- Ensure no trailing slashes

### MongoDB Connection
- Verify connection string
- Check IP whitelist in MongoDB Atlas
- Ensure network access from deployment platform

### Build Failures
- Check Node.js version compatibility
- Verify all dependencies installed
- Review build logs for errors

### Performance Issues
- Monitor database queries
- Check server resources (CPU, RAM)
- Enable caching
- Optimize images and assets

---

## Rollback Strategy

### Vercel/Railway
- Use deployment history to rollback
- Pin to specific commit

### VPS
```bash
pm2 stop kumbh-sava-backend
cd /var/www/kumbh-sava
git checkout previous-commit
cd backend
npm install
pm2 restart kumbh-sava-backend
```

---

## Scaling Considerations

### Horizontal Scaling
- Use load balancer (Nginx, AWS ALB)
- Deploy multiple backend instances
- Session management with Redis

### Database Scaling
- MongoDB Atlas auto-scaling
- Read replicas for analytics
- Sharding for very large datasets

### CDN
- Cloudflare for global distribution
- AWS CloudFront
- Vercel Edge Network

---

## Support & Maintenance

### Regular Updates
- Weekly dependency updates
- Monthly security patches
- Quarterly feature releases

### Monitoring
- Daily uptime checks
- Weekly performance reviews
- Monthly cost analysis

---

For detailed setup instructions, see [SETUP.md](SETUP.md)
For API documentation, see [API.md](API.md)
