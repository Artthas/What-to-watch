export const saveEmail = (email: string): void => {
  localStorage.setItem('email', email);
};

export const getEmail = (): string => {
  const email = localStorage.getItem('email');
  return email ?? '';
};
