# 🛍️ Sistema de Gestión de Productos y Categorías

Este proyecto consiste en una solución completa para la gestión de productos y categorías, desarrollada con **Angular 19** para el Frontend y **Spring Boot con Java 17** para el Backend. Todo el sistema está integrado y orquestado mediante **Docker Compose**, incluyendo la base de datos **MySQL**, los servicios backend y la interfaz web.

---

## 📦 Estructura del Proyecto

- `/frontend/` → Aplicación Angular 19 (interfaz de usuario).
- `/products/` → API REST de gestión de productos (Spring Boot).
- `/categories/` → API REST de gestión de categorías (Spring Boot).
- `docker-compose.yml` → Archivo para levantar toda la solución.

---

## ✅ Funcionalidades Implementadas

### Requerimientos Funcionales

- ✔️ **Listar** productos y categorías.
- ✔️ **Crear** nuevos registros.
- ✔️ **Editar** información existente.
- ✔️ **Eliminar** registros.
- ✔️ **Validación de campos** tanto en el **frontend** como en el **backend**.

### Requerimientos No Funcionales

- ✔️ Interfaz responsiva y amigable.
- ✔️ Contenedores independientes para cada servicio.
- ✔️ Levantamiento del sistema completo con un solo comando Docker.

---

## 🛠️ Tecnologías Utilizadas

| Módulo        | Tecnología              |
|---------------|-------------------------|
| Frontend      | Angular 19              |
| Backend       | Spring Boot (Java 17)   |
| Base de Datos | MySQL 8                 |
| Orquestación  | Docker Compose          |

---

## 🚀 Instrucciones para levantar el sistema

1. **Clona este repositorio:**

   ```bash
   git clone https://github.com/usuario/repositorio.git
   cd repositorio
   ```

2. **Levanta todos los servicios con docker-compose
   ```bash
   docker-compose up -d
   ```
3. **Accede a la aplicación**
- 🌐 Frontend: http://localhost:4200

- 🔗 API de Productos: http://localhost:8081/api/products

- 🔗 API de Categorías: http://localhost:8082/api/categories
