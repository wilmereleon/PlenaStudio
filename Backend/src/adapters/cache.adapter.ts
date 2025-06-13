/**
 * CacheAdapter
 * 
 * Adaptador simple para cache en memoria.
 * Permite almacenar, recuperar y eliminar datos temporalmente en el backend.
 * Ideal para acelerar respuestas de la API y reducir consultas repetidas a la base de datos.
 */
export class CacheAdapter {
  private cache: Map<string, { value: any; expiresAt?: number }> = new Map();

  /**
   * Guarda un valor en el cache.
   * @param key Clave única para el valor.
   * @param value Valor a almacenar.
   * @param ttl Tiempo de vida en milisegundos (opcional).
   */
  set(key: string, value: any, ttl?: number): void {
    const expiresAt = ttl ? Date.now() + ttl : undefined;
    this.cache.set(key, { value, expiresAt });
  }

  /**
   * Recupera un valor del cache.
   * @param key Clave del valor a recuperar.
   * @returns El valor almacenado o undefined si no existe o expiró.
   */
  get<T = any>(key: string): T | undefined {
    const entry = this.cache.get(key);
    if (!entry) return undefined;
    if (entry.expiresAt && entry.expiresAt < Date.now()) {
      this.cache.delete(key);
      return undefined;
    }
    return entry.value as T;
  }

  /**
   * Elimina un valor del cache.
   * @param key Clave del valor a eliminar.
   */
  delete(key: string): void {
    this.cache.delete(key);
  }

  /**
   * Limpia todo el cache.
   */
  clear(): void {
    this.cache.clear();
  }
}

export const cacheAdapter = new CacheAdapter();