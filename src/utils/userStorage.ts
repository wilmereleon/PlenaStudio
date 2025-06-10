// utils/userStorage.ts
export const saveUser = (user) => {
  const users = JSON.parse(localStorage.getItem('usuariosRegistrados') || '[]');
  localStorage.setItem('usuariosRegistrados', JSON.stringify([...users, user]));
};

export const getUserByEmail = (email) => {
  const users = JSON.parse(localStorage.getItem('usuariosRegistrados') || '[]');
  return users.find((u) => u.email === email);
};

export const activateUser = (token) => {
  const users = JSON.parse(localStorage.getItem('usuariosRegistrados') || '[]');
  const updated = users.map((u) => (u.token === token ? { ...u, activo: true } : u));
  localStorage.setItem('usuariosRegistrados', JSON.stringify(updated));
};