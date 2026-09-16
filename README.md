EVALUACION PRACTICA react/firebase

Aplicación móvil desarrollada en React Native con Expo y Firebase para la gestión de autenticación de usuarios y administración de perfil en cloud Firestore.


INTEGRANTES:

Gerardo Andrés Jovel Franco 20240396
Anthony Tyler Hui Guevara 20210073


DESCRIPCION DEL PROYECTO: 

Esta aplicación permite el registro e inicio de sesion seguro de usuarios mediante Firebase Auth. Una vez autenticado, el usuario accede a un dashboard donde puede visualizar y actualizar su información personal (Nombre, fecha de nacimiento, Canet y URL de imagen) almacenada en Cloud Firestore.


PALETA DE COLORES: 

Fondo Principal: #E5D4CE
 
Botones Principales / Avatar Header: #29335C
 
Botón de Cerrar Sesión (Rojo): #DB2B39
 
Bordes y Detalles Secundarios: #6E8894
 
Texto Oscuro Principal: #1D1A05


DEPENDENCIAS UTILIZADAS:

-Expo SDK 
-React Native
-FireBase
-@react-navigation/native
-@react-navigation/native-stack


INSTRUCCIONES DE EJECUCION:

1- clonar el repositorio e instalar dependencias:

npm install

2- Configurar variables de entorno: 
crea un archivo .env en la raiz del proyecto

API_KEY=""
AUTH_DOMAIN=""
PROJECT_ID=""
STORAGE_BUCKET=""
MESSAGING_SENDER_ID=""
APP_ID=""

3- iniciar la prueba:
npx expo start
