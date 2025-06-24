"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cacheAdapter = exports.CacheAdapter = void 0;
/**
 * CacheAdapter
 *
 * Adaptador simple para cache en memoria.
 * Permite almacenar, recuperar y eliminar datos temporalmente en el backend.
 * Ideal para acelerar respuestas de la API y reducir consultas repetidas a la base de datos.
 */
class CacheAdapter {
    constructor() {
        this.cache = new Map();
    }
    /**
     * Guarda un valor en el cache.
     * @param key Clave única para el valor.
     * @param value Valor a almacenar.
     * @param ttl Tiempo de vida en milisegundos (opcional).
     */
    set(key, value, ttl) {
        const expiresAt = ttl ? Date.now() + ttl : undefined;
        this.cache.set(key, { value, expiresAt });
    }
    /**
     * Recupera un valor del cache.
     * @param key Clave del valor a recuperar.
     * @returns El valor almacenado o undefined si no existe o expiró.
     */
    get(key) {
        const entry = this.cache.get(key);
        if (!entry)
            return undefined;
        if (entry.expiresAt && entry.expiresAt < Date.now()) {
            this.cache.delete(key);
            return undefined;
        }
        return entry.value;
    }
    /**
     * Elimina un valor del cache.
     * @param key Clave del valor a eliminar.
     */
    delete(key) {
        this.cache.delete(key);
    }
    /**
     * Limpia todo el cache.
     */
    clear() {
        this.cache.clear();
    }
}
exports.CacheAdapter = CacheAdapter;
exports.cacheAdapter = new CacheAdapter();
