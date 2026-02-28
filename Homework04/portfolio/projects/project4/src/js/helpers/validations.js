export const validateEmail = (email) =>
  /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i.test(email);

export const validateUrl = (url) =>
  /^(https?:\/\/)?(www\.)?[\w-]+\.[a-z]{2,}(\/.*)?$/i.test(url);
