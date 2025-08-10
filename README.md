# Tienda – Angular 19 + Spring Boot 17 + MySQL (Docker Compose)

Sistema de gestión de **productos** y **categorías** desplegado con **Docker Compose**.  
Arquitectura: Nginx (reverse proxy) → Gateway (Spring) → Microservicios (Spring) → MySQL.

## 🌐 Demo / Acceso
- Frontend: `http://<IP_PUBLICA_O_DOMINIO>`
- APIs (vía gateway): `http://<IP_PUBLICA_O_DOMINIO>/api/products` y `http://<IP_PUBLICA_O_DOMINIO>/api/categories`

> Si usas AWS EC2, abre **TCP 80** al público en el *Security Group*. Para una IP fija, asocia una **Elastic IP**.

---

## 🧱 Arquitectura (contenedores)

- `edge` → **Nginx** (puerto 80). Sirve el frontend y hace reverse proxy a `/api` → gateway.
- `frontend` → **Angular** *build prod*.
- `app-gateway` → **Spring Boot** (Netty/Tomcat en 8080). Expone las rutas `/api/**` y enruta a los microservicios.
- `c-app-products-v1` → **Spring Boot** (API productos) conectado a MySQL.
- `c-app-categories` → **Spring Boot** (API categorías) conectado a MySQL.
- `test-db` → **MySQL 8** con volumen `mysql_data` (persistencia).

Los contenedores se comunican por una red interna de Docker; sólo **Nginx** publica el puerto 80.

---

## ✅ Requisitos
- **Docker Engine 25+** y **Docker Compose v2+**
- Linux x86_64 (probado en Amazon Linux 2023 / Ubuntu 22.04)

### Instalar rápidamente en Amazon Linux 2023
```bash
sudo dnf install -y docker
sudo systemctl enable --now docker

# Compose v2 (plugin de usuario)
mkdir -p ~/.docker/cli-plugins
curl -SL https://github.com/docker/compose/releases/download/v2.29.7/docker-compose-linux-x86_64 \
  -o ~/.docker/cli-plugins/docker-compose
chmod +x ~/.docker/cli-plugins/docker-compose

docker --version
docker compose version


# GestionTienda

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.15.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

### Correr el docker-compose
```bash
docker-compose up -d
```
## Archivos importantes
- docker-compose.yml → orquesta todos los servicios.
- edge.conf → configuración de Nginx:
- Sirve el frontend en /
- Proxy a gateway en /api/ (con CORS habilitado y sin pasar Origin/Referer al backend para evitar 403 por CORS/CSRF).

### Link de navegación web

```bash
http://http://13.58.97.22/
```


## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
