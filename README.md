# Remuner frontend

This project has been produced as technical probe for Remuner. It uses Vue with Vuetify components library.

## Build
```bash
docker-compose build
```

## Launch
For a standalone launch, run:
```bash
docker-compose up -d remuner-frontend
```
If this is supposed to work locally with the backend running in docker, launch:
```bash
docker-compose up -d remuner-frontend-dev
```

## Configuration
Change the backend route in the `.env`file.
