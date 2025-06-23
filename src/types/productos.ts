// Listado actualizado de productos disponibles
export const productosDisponibles = [
  { productId: "1", nombre: "Aretes Luna Dorada", descripcion: "Aretes Luna Dorada", precio: 28000, imagen: "earring01.jpeg" },
  { productId: "2", nombre: "Aretes Flor de Cristal", descripcion: "Aretes Flor de Cristal", precio: 32000, imagen: "earring04.jpeg" },
  { productId: "3", nombre: "Anillo Aurora Plateado", descripcion: "Anillo Aurora Plateado", precio: 24000, imagen: "ring01.jpeg" },
  { productId: "4", nombre: "Anillo Esencia Minimalista", descripcion: "Anillo Esencia Minimalista", precio: 22000, imagen: "ring02.jpeg" },
  { productId: "5", nombre: "Anillo Corazón de Plata", descripcion: "Anillo Corazón de Plata", precio: 26000, imagen: "ring03.jpeg" },
  { productId: "6", nombre: "Aretes Gota de Luz", descripcion: "Aretes Gota de Luz", precio: 30000, imagen: "womenEarring0.jpeg" },
  { productId: "7", nombre: "Aretes Perla Elegante", descripcion: "Aretes Perla Elegante", precio: 34000, imagen: "womenEarring01.jpeg" },
  { productId: "8", nombre: "Aretes Hoja Tropical", descripcion: "Aretes Hoja Tropical", precio: 29000, imagen: "womenEarring02.jpeg" },
  { productId: "9", nombre: "Aretes Estrella de Mar", descripcion: "Aretes Estrella de Mar", precio: 31000, imagen: "womenEarring03.jpeg" },
  { productId: "10", nombre: "Aretes Círculo Moderno", descripcion: "Aretes Círculo Moderno", precio: 27000, imagen: "womenEarring04.jpeg" },
  { productId: "11", nombre: "Aretes Rosa Pastel", descripcion: "Aretes Rosa Pastel", precio: 33000, imagen: "womenEarring05.jpeg" },
  { productId: "12", nombre: "Aretes Sol Naciente", descripcion: "Aretes Sol Naciente", precio: 28000, imagen: "womenEarring06.jpeg" },
  { productId: "13", nombre: "Aretes Bohemia Chic", descripcion: "Aretes Bohemia Chic", precio: 35000, imagen: "womenEarring07.jpeg" },
  { productId: "14", nombre: "Aretes Lluvia de Plata", descripcion: "Aretes Lluvia de Plata", precio: 32000, imagen: "womenEarring08.jpeg" },
  { productId: "15", nombre: "Aretes Vintage Coral", descripcion: "Aretes Vintage Coral", precio: 30000, imagen: "womenEarring09.jpeg" },
  { productId: "16", nombre: "Aretes Esfera Dorada", descripcion: "Aretes Esfera Dorada", precio: 29000, imagen: "womenEarring10.jpeg" },
  { productId: "17", nombre: "Aretes Minimal Oro", descripcion: "Aretes Minimal Oro", precio: 26000, imagen: "womenEarring11.jpeg" },
  { productId: "18", nombre: "Aretes Fantasía Azul", descripcion: "Aretes Fantasía Azul", precio: 31000, imagen: "womenEarring12.jpeg" },
  { productId: "19", nombre: "Aretes Encanto Natural", descripcion: "Aretes Encanto Natural", precio: 27000, imagen: "womenEarring13.jpeg" },
  { productId: "20", nombre: "Aretes Fiesta de Color", descripcion: "Aretes Fiesta de Color", precio: 34000, imagen: "womenEarring14.jpeg" },
];

export type Producto = typeof productosDisponibles[0];

export type CartItem = Producto & { cantidad: number };
