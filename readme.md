# ACADEMLO MOTORS

Academlo Motors es un sistema integral para facilitar el agendamiento de citas destinado a usuarios que buscan servicios de reparación de vehículos. Este proyecto se centra en proporcionar una experiencia sin problemas, desde el registro hasta la gestión eficiente de citas para el mantenimiento de vehículos.


## Tecnologías Utilizadas

* Node.js y Express: Desarrollado en el entorno de ejecución Node.js y utilizando el marco Express para la construcción de la aplicación web.

* Sequelize: Seleccionado como ORM para interactuar con la base de datos relacional PostgreSQL, facilitando las operaciones de base de datos y asegurando una estructura de datos coherente.

* PostgreSQL: Se eligió como sistema de gestión de base de datos relacional para almacenar datos de manera estructurada y eficiente.

* Firebase: Utilizado para el almacenamiento eficiente y escalable de archivos, como imágenes relacionadas con los vehículos.


## Funcionalidades Principales

* Registro y Autenticación Segura: Implementado con JSON Web Tokens (JWT) para asegurar la autenticación de usuarios.

* Protección de Contraseñas: Utiliza Bcrypt para garantizar la seguridad de las contraseñas almacenadas en la base de datos.

* Subida de Archivos con Firebase: Ofrece la capacidad de cargar archivos, como imágenes relacionadas con los vehículos, utilizando Firebase Storage para un almacenamiento eficiente y escalable.

* Identificadores Únicos con UUID: Utiliza UUID para generar identificadores únicos que se utilizan en las rutas de las imágenes y otros elementos, garantizando así la singularidad y la gestión efectiva.

* Manejo de Errores Efectivo: Incorpora un sistema robusto de manejo de errores para proporcionar mensajes claros y soluciones adecuadas cuando surgen problemas durante la ejecución.

* Validación de Entrada con Zod: Implementa Zod para validar la entrada de datos y asegurar la consistencia y validez de los datos proporcionados por los usuarios.

* Límite de Solicitudes (Request Limit): Implementa un sistema de límite de solicitudes para proteger el backend contra posibles ataques de denegación de servicio (DoS) o abuso. Este mecanismo ayuda a garantizar la disponibilidad y la eficiencia del sistema al controlar el número de solicitudes que un usuario puede hacer en un período específico.

## Pasos para ejecutar este backend

1. Clona el repositorio: git clone https://github.com/Samuel33d/academlo-motors2

2. Instalar dependencias con el siguiente comando:

```
npm install
```

3. Se deberá crear una base de datos, puede crearla de manera local o utilizar https://www.elephantsql.com/

4. Clonar el archivo `.env.template` y renombrarlo a `.env` y agregar los valores de las variables de entorno.

5. ejecutar el comando:

```
npm run start:dev
```
