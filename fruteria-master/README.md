# **Proyecto de Gestión de Inventarios y Compras**

Este proyecto es una aplicación web desarrollada en Angular que permite la gestión de productos, usuarios, compras y pedidos. La aplicación está diseñada con un sistema de autenticación que diferencia entre administradores y usuarios, habilitando diferentes funcionalidades según el tipo de usuario que inicie sesión.

---

## **Índice**
1. [Características Generales](#características-generales)
2. [Requisitos Previos](#requisitos-previos)
3. [Instalación](#instalación)
4. [Estructura del Proyecto](#estructura-del-proyecto)
5. [Rutas y Funcionalidades](#rutas-y-funcionalidades)
6. [Descripción de Componentes](#descripción-de-componentes)
7. [Servicios](#servicios)
---

## **Características Generales**
- **Sistema de login**: Autenticación de usuarios con distinción entre *admin* y *usuario*.
- **Gestión de inventarios**: Los administradores pueden agregar, editar o eliminar productos del stock.
- **Carrito de compras**: Los usuarios pueden agregar productos al carrito y gestionarlos.
- **Pedidos realizados**: Un sistema ficticio que muestra al administrador los pedidos que tiene en proceso para prever el stock futuro.
- **Gestión de usuarios**: Visualización de los usuarios conectados por el administrador.

---

## **Requisitos Previos**
Para ejecutar este proyecto necesitarás:
- Node.js (v14+)
- Angular CLI (v12+)
- Un servidor de JSON (por ejemplo, `json-server` para datos ficticios)

---

## **Instalación**
1. Clona este repositorio:
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Inicia el servidor de datos JSON (reemplaza `<ruta_a_db.json>` con tu archivo JSON):
   ```bash
   npx json-server --watch <ruta_a_db.json> (si no pones nada es a localhost) --port 3000
   ```
4. Ejecuta la aplicación Angular:
   ```bash
   ng serve
   ```
5. Accede a la aplicación en `http://localhost:4200`.

---

## **Estructura del Proyecto**
- **Modelos**: Estructuras que definen los datos utilizados en la aplicación (`Stock`).
- **Servicios**: Clases que gestionan la comunicación con la API REST para cada entidad (usuarios, stock, pedidos).
- **Componentes**:
  - `app.component`: Componente principal que contiene el sistema de navegación.
  - `stock-padre`: Gestión de inventario por parte del administrador.
  - `compras`: Gestión de carrito de compras por los usuarios.
  - `pedido-realizado`: Visualización de pedidos ficticios para el administrador.
  - `usuarios`: Gestión de usuarios conectados.
  - `ofertas`: Sección que destaca productos específicos.

---

## **Rutas y Funcionalidades**

### **Login**
- **Ruta**: `/login`
- **Función**: Permite a los usuarios iniciar sesión como *admin* o *usuario*. Dependiendo del rol, se redirige a distintas vistas.

### **Dashboard de Admin**
- **Ruta**: `/stock`, `/usuarios`, `/pedido`
- **Función**: 
  - Gestionar inventarios (Componente `stock-padre`).
  - Visualizar pedidos realizados (Componente `pedido-realizado`).
  - Gestionar usuarios conectados (Componente `usuarios`).

### **Dashboard de Usuario**
- **Ruta**: `/compras`
- **Función**: 
  - Navegar por los productos disponibles.
  - Añadir productos al carrito.
  - Gestionar el carrito de compras.

---

## **Descripción de Componentes**

### **1. StockPadreComponent**
- **Rol**: Exclusivo para *admin*.
- **Funcionalidad**:
  - Añadir productos al stock.
  - Eliminar productos existentes.
  - Visualizar el inventario actual.
- **Detalles**: Los productos añadidos se guardan en el archivo JSON del servidor en la colección `stock`.

### **2. ComprasComponent**
- **Rol**: Exclusivo para *usuarios*.
- **Funcionalidad**:
  - Visualizar productos disponibles (provenientes del stock).
  - Añadir productos al carrito de compras.
  - Gestionar el carrito (modificar cantidades, eliminar productos).
  - Restricción: No se pueden añadir más productos al carrito de los que están disponibles en el stock.

### **3. PedidoRealizadoComponent**
- **Rol**: Exclusivo para *admin*.
- **Funcionalidad**:
  - Mostrar una lista de pedidos ficticios.
  - Permitir al administrador visualizar qué productos llegarán en un futuro para la planificación del stock.

### **4. UsuariosComponent**
- **Rol**: Exclusivo para *admin*.
- **Funcionalidad**:
  - Mostrar una lista de usuarios conectados al sistema.
  - Funcionalidad básica de visualización.

### **5. OfertasComponent**
- **Rol**: Accesible solo para el *admin*.
- **Funcionalidad**:
  - Destacar ciertos productos con descuento.
  - Información adicional sobre promociones.
  - Añadir nuevos descuentos, que el usuario podrá ver.

---

## **Servicios**

### **1. StockSService**
- **Función**: Gestiona la comunicación con la API para la colección `stock`.
- **Métodos**:
  - `getStock`: Obtener todos los productos.
  - `addStock`: Añadir un nuevo producto.
  - `removeFromStock`: Eliminar un producto por su ID.

### **2. PedidoSService**
- **Función**: Gestiona los datos ficticios de pedidos realizados.
- **Métodos**:
  - `getPedidos`: Obtener todos los pedidos.
  - `getPedidosPorTipo`: Filtrar pedidos por tipo (frutas o verduras).

### **3. UsuarioSService**
- **Función**: Gestiona la autenticación y datos de los usuarios.
- **Métodos**:
  - `login`: Autenticar usuarios.
  - `getUsuarios`: Obtener la lista de usuarios conectados.

---

## **Notas Finales**
Este proyecto está diseñado como una aplicación de ejemplo para gestionar inventarios y compras. Puede ser extendido para integrarse con sistemas más robustos o adaptarse a necesidades específicas.
