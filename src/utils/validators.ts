export const validateEmail = (email: string): string | null => {
  if (!email) {
    return 'O campo de e-mail é obrigatório';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return 'Por favor, insira um e-mail válido.';
  }

  return null;
};

export const validatePassword = (password: string): string | null => {
  if (!password) {
    return 'O campo senha é obrigatório';
  }

  if (password.length < 7) {
    return 'A senha deve ser de mínimo 7 caracteres';
  }

  const passwordRegex = /^(?=.*[0-9])(?=.*[a-zA-Z])/;

  if (!passwordRegex.test(password)) {
    return 'A senha deve ter pelo menos um dígito e uma letra';
  }

  return null;
};
