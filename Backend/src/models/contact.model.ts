/**
 * Modelo para mensajes de contacto enviados desde el formulario.
 */
export interface ContactMessage {
  id: string;                // Identificador único del mensaje
  nombre: string;            // Nombre del remitente
  email: string;             // Correo electrónico del remitente
  mensaje: string;           // Contenido del mensaje
  fecha: string;             // Fecha de envío (ISO string)
  leido: boolean;            // Indica si el mensaje fue leído por el equipo
}