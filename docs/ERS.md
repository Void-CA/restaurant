# Documento ERS – Sistema Web de Gestión de Órdenes para Restaurante

## 1. Introducción

### 1.1 Propósito

Este documento define los requisitos funcionales y no funcionales del sistema web que optimiza el flujo de trabajo entre meseros y cocina en un restaurante. La herramienta permitirá a los meseros registrar pedidos en tiempo real, enviarlos a cocina y recibir notificaciones cuando los platillos estén listos para ser servidos.

### 1.2 Alcance

La aplicación será utilizada exclusivamente por el personal del restaurante (meseros y cocina). Permitirá:

- Tomar pedidos desde la mesa.
- Enviar órdenes a cocina automáticamente.
- Visualizar el estado de cada orden.
- Notificar a los meseros cuando la comida esté lista.
- Gestionar mesas y facturas.

## 2. Descripción general

### 2.1 Problemática actual

El restaurante presenta una alta ineficiencia operativa causada por la comunicación verbal o escrita entre meseros y cocina. Esto genera errores frecuentes, pérdida de pedidos, largos tiempos de espera para los clientes y dificultad en la facturación.

### 2.2 Objetivo de la solución

Optimizar el proceso operativo del restaurante mediante una aplicación web que:

- Mejore la comunicación interna entre meseros y cocina.
- Agilice la toma y seguimiento de pedidos.
- Minimice errores en la preparación de comidas.
- Permita una atención más rápida al cliente.

## 3. Requisitos del sistema

### 3.1 Requisitos funcionales

#### 3.1.1 Gestión de mesas

- Listar mesas con su estado (disponible, ocupada, reservada, en limpieza).
- Cambiar el estado de la mesa automáticamente según el flujo del pedido.

#### 3.1.2 Gestión de pedidos

- El mesero selecciona una mesa y registra una orden.
- Cada orden incluye uno o varios productos con cantidades y notas.
- La orden se envía en tiempo real a la cocina.
- La cocina marca productos como "en preparación" o "listos".
- El mesero es notificado cuando una orden está lista para ser servida.

#### 3.1.3 Gestión de facturas

- Al finalizar una comida, el mesero genera una factura para la mesa.
- La factura resume las órdenes asociadas a la mesa.
- Se registra el cierre de la cuenta (manual, por ahora).

#### 3.1.4 Usuarios y roles

- **Mesero:** visualiza mesas, toma pedidos, gestiona facturas.
- **Cocina:** visualiza órdenes recibidas, actualiza su estado.
- _(Administrador se puede agregar en fases futuras)._

### 3.2 Requisitos no funcionales

- **Arquitectura Web:** React (frontend) + Django (backend).
- **Interfaz rápida y responsiva:** adecuada para tablets.
- **Seguridad:** autenticación por usuario con roles.
- **Rendimiento:** respuesta inmediata entre mesero y cocina.
- **Escalabilidad:** soporte para más roles o funciones futuras (reserva de mesas, administrador, reportes).
- **Modo offline:** en evaluación; se priorizará una arquitectura que pueda extenderse a soporte offline si es necesario.
- **Soporte para dispositivos compartidos:** posible implementación en un dispositivo centralizado por zona.

## 4. Flujo del sistema

### Flujo básico de pedido

1. Mesero selecciona una mesa.
2. Toma el pedido del cliente desde la app.
3. Envía la orden a cocina.
4. Cocina recibe la orden y comienza preparación.
5. Cocina marca productos como "listos".
6. Mesero recibe notificación de que la comida está lista.
7. Mesero entrega la comida.
8. Al finalizar, se genera la factura.

## 5. Casos de uso

### UC-01: Toma de pedido

- **Actor:** Mesero
- **Descripción:** Selecciona mesa, añade productos, envía orden a cocina.

### UC-02: Preparación en cocina

- **Actor:** Cocina
- **Descripción:** Visualiza órdenes pendientes, marca productos como listos.

### UC-03: Notificación de orden lista

- **Actor:** Mesero
- **Descripción:** Recibe notificación para recoger comida de cocina.

### UC-04: Generación de factura

- **Actor:** Mesero
- **Descripción:** Revisa las órdenes de la mesa, genera y cierra factura.

## 6. Modelo de datos

Incluye los siguientes modelos principales (basados en tus modelos Django):

- **Table:** mesas físicas
- **Product:** menú del restaurante
- **Bill:** facturas
- **Order:** pedidos individuales
- **OrderItem:** productos dentro de una orden
