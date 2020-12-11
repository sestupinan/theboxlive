# README

## Progresividad, internacionalizable y visualización de datos

En el proyecto implementamos los siguientes idiomas usando la libreria de react-intl para volver internacionalizable la pagina:

1. **Mandarin**
2. **Español**
3. **Ingles**

Se implementó un PWA el cual garantiza la visualización de datos incluso cuando el navegador está sin conexión. Para ello guardamos la información como cache en el local storage.

Se implementó un componente de visualización de datos en la pagina de estadisticas, el cual permite observar el comportamiento de los inventarios.

## Descripción del proyecto

Este proyecto está enfocado en proveerle un software de manejo de productos, transacciones y servicios para pequeñas tiendas y negocios. Le permitirá agregar productos a su inventario, ver estadísticas de su inventario, revisar las transacciones que se han realizado en su tienda, y eliminar, agregar llevar un registro de los empleados y almacénes disponibles. Para cada una de las funcionalidades descritas, el usuario podrá encontrar una ventana específica desde la cual puede acceder desde el navbar principal de la página.

## URL Live Demo

El live demo podrá encontrarlo aquí: https://theboxuniandes.herokuapp.com/

## Instrucciones de despliegue (Pre-Requerimientos: Instalación de React y Node.js)

Para desplegar la aplicación es necesario realizar dos pasos: primero ejecutar la aplicación back y después ejecutar la aplicación front.

Para el primer paso, es necesario ubicarse en el directorio 202020_S2_E6/Entrega4 desde una terminal. Desde allí, se ejecuta el comando "npm install" y luego el comando "npm start".

Para el segundo paso, es necesario ubicarse en el directorio 202020_S2_E6/Entrega4/front desde una terminal. Desde allí, se ejecuta el comando "npm install" y luego el comando "npm start" o para desplegar un servidor web "http-server -o". Aparecerá un aviso de que el puerto 3000 ya está en uso (debido a que allí se ejecutó el back). Se debe ingresar "Y" para que el front use el siguiente puerto disponible (usualmente es el 3001).

Después de lo anterior, ya debería ser posible acceder a la aplicación desde la URL: http://localhost:3000/.

Ya en la página, el usuario será capaz de ver la home page, agreagr productos al inventario, ver estadísticas de sus tiendas, ver las transacciones, y agregar, ver y eliminar empleados y tiendas en su perfil. Además, puede visualizar el registro y login a la página. Todo lo anterior puede acceder mediante el navbar que se encuentra en la aprte superior de la página.

## URL Vídeo

En el siguiente link podrá encontrar el vídeo del funcionamiento de la aplicación:
