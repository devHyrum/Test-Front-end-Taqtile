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
    return 'A senha deve ter pelo menos 7 caracteres';
  }

  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).+$/;
  if (!passwordRegex.test(password)) {
    return 'A senha deve ter pelo menos um dígito e uma letra';
  }

  return null;
};

export const validateName = (name: string): string | null => {
  if (!name) {
    return 'O campo nome é obrigatório';
  }

  const words = name.split(' ');
  if (words.length < 2) {
    return 'O nome deve conter pelo menos duas palavras';
  }

  return null;
};

export const validatePhone = (phone: string): string | null => {
  if (!phone) {
    return 'O campo telefone é obrigatório';
  }

  const cleanedPhone = phone.replace(/\D/g, '');

  const phoneRegex = /^\d{10,11}$/;
  if (!phoneRegex.test(cleanedPhone)) {
    return 'Por favor, insira um telefone válido';
  }

  return null;
};

export const validateBirthDate = (birthDate: string): string | null => {
  if (!birthDate) {
    return 'O campo data de nascimento é obrigatório';
  }

  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(birthDate)) {
    return 'A data de nascimento deve estar no formato YYYY-MM-DD';
  }

  const birthDateObject = new Date(birthDate);
  const today = new Date();
  const minDate = new Date('1905-01-01');

  if (birthDateObject < minDate) {
    return `A data de nascimento não pode ser anterior a ${minDate.toISOString().split('T')[0]}`;
  }

  if (birthDateObject > today) {
    return 'A data de nascimento não pode estar no futuro';
  }

  return null;
};

export const validateRole = (role: string): string | null => {
  const allowedRoles = ['admin', 'user'];
  if (!allowedRoles.includes(role)) {
    return 'O papel fornecido é inválido';
  }

  return null;
};
