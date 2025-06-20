// ...existing code...

// Define un tipo para el usuario
export interface User {
  nombres: string;
  apellidos: string;
  correo: string;
  direccion: string;
  celular: string;
  tipoIdentificacion: string;
  numeroIdentificacion: string;
  contraseña: string;
  confirmar: string;
  activo: boolean;
  token: string;
}

// Guarda un usuario
export const saveUser = (user: User): void => {
  const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
  users.push(user);
  localStorage.setItem('users', JSON.stringify(users));
};

// Busca usuario por correo
export const getUserByEmail = (email: string): User | undefined => {
  const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
  return users.find((u: User) => u.correo === email);
};

// Activa usuario por token
export const activateUser = (token: string): void => {
  const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
  const updated = users.map((u: User) =>
    u.token === token ? { ...u, activo: true } : u
  );
  localStorage.setItem('users', JSON.stringify(updated));
};