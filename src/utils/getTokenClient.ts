export const getTokenClient = () => {
  const token = localStorage.getItem('token');
  return token;
};

