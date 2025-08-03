# Documentación de Despliegue y Ejecución

## Frontend (Angular)

### Comandos para desarrollo local

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo (usa environment.ts)
ng serve
```

- Accede a la app en: http://localhost:4200
- El frontend hará peticiones al backend en http://localhost:8080 (ajusta en environment.ts si es necesario).

### Comando para producción


# Generar build de producción (usa environment.prod.ts)
ng build --configuration=production
```

- Los archivos optimizados se generan en la carpeta `dist/`.
- Sube el contenido de `dist/` a tu servidor web (Vercel, Netlify, Apache, Nginx, S3, etc).

---

## Backend (Spring Boot)

### Comandos para desarrollo local

```bash
# Desde la carpeta del backend
# Usando Maven Wrapper (recomendado)
./mvnw spring-boot:run
# O si tienes Maven instalado
mvn spring-boot:run
```

- El backend estará disponible en: http://localhost:8080
- Puedes cambiar el puerto en `application.properties` con `server.port`.

### Comando para producción

```bash
# Generar el .jar para producción
./mvnw clean package -Pprod
# O con Maven instalado
mvn clean package -Pprod
```

- El archivo se genera en `target/backend-reservas-0.0.1-SNAPSHOT.jar` (o similar).
- Sube el .jar a tu servidor y ejecútalo con:

```bash
java -jar backend-reservas-0.0.1-SNAPSHOT.jar
```

---

## Notas
- Ajusta las URLs en los archivos `environment.ts` y `environment.prod.ts` del frontend según tu entorno.
- Configura CORS en el backend para aceptar peticiones del frontend en producción.
- Para pruebas locales, asegúrate de que ambos servidores (frontend y backend) estén corriendo.
- Si tienes dudas, revisa los archivos de configuración o consulta esta guía.
