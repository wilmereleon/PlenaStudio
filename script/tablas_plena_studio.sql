-- Tabla USUARIO
CREATE TABLE usuario (
    id_usuario      INT AUTO_INCREMENT PRIMARY KEY,
    nombre          VARCHAR(100)    NOT NULL,
    apellido        VARCHAR(100)    NOT NULL,
    email           VARCHAR(150)    NOT NULL UNIQUE,
    password        VARCHAR(256)    NOT NULL,
    fecha_registro  DATETIME        DEFAULT CURRENT_TIMESTAMP
);

-- Tabla PRODUCTO
CREATE TABLE producto (
    id_producto     INT AUTO_INCREMENT PRIMARY KEY,
    nombre          VARCHAR(200)    NOT NULL,
    descripcion     VARCHAR(500),
    precio          DECIMAL(10,2)   NOT NULL CHECK (precio > 0),
    stock           INT             NOT NULL CHECK (stock >= 0),
    imagen_url      VARCHAR(500),
    fecha_creacion  DATETIME        DEFAULT CURRENT_TIMESTAMP
);

-- Tabla CARRITO
CREATE TABLE carrito (
    id_carrito      INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario      INT             NOT NULL,
    fecha_creacion  DATETIME        DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
);

-- Tabla CARRITO_ITEM
CREATE TABLE carrito_item (
    id_carrito_item INT AUTO_INCREMENT PRIMARY KEY,
    id_carrito      INT             NOT NULL,
    id_producto     INT             NOT NULL,
    cantidad        INT             NOT NULL CHECK (cantidad > 0),
    precio_unitario DECIMAL(10,2)   NOT NULL,
    FOREIGN KEY (id_carrito) REFERENCES carrito(id_carrito),
    FOREIGN KEY (id_producto) REFERENCES producto(id_producto)
);

-- Tabla ORDEN
CREATE TABLE orden (
    id_orden        INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario      INT             NOT NULL,
    fecha_orden     DATETIME        DEFAULT CURRENT_TIMESTAMP,
    estado          VARCHAR(50)     NOT NULL,
    total           DECIMAL(10,2)   NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
);

-- Tabla ORDEN_ITEM
CREATE TABLE orden_item (
    id_orden_item   INT AUTO_INCREMENT PRIMARY KEY,
    id_orden        INT             NOT NULL,
    id_producto     INT             NOT NULL,
    cantidad        INT             NOT NULL CHECK (cantidad > 0),
    precio_unitario DECIMAL(10,2)   NOT NULL,
    FOREIGN KEY (id_orden) REFERENCES orden(id_orden),
    FOREIGN KEY (id_producto) REFERENCES producto(id_producto)
);

-- Tabla para búsquedas (opcional, para auditoría)
CREATE TABLE busqueda (
    id_busqueda     INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario      INT,
    termino         VARCHAR(255)    NOT NULL,
    filtros         VARCHAR(255),
    fecha_busqueda  DATETIME        DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
);

-- Tabla de contacto (para mensajes de clientes)
CREATE TABLE contacto (
    id_contacto     INT AUTO_INCREMENT PRIMARY KEY,
    nombre          VARCHAR(100)    NOT NULL,
    email           VARCHAR(150)    NOT NULL,
    mensaje         TEXT            NOT NULL,
    fecha_envio     DATETIME        DEFAULT CURRENT_TIMESTAMP
);