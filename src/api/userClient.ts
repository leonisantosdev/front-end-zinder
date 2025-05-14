import axios from 'axios';

const API_URL = 'https://apizinder.up.railway.app';

// Enviar e-mail para redefinir senha
export const sendEmailForgotPassword = async (route: string, data: object) => {
  try {
    const response = await axios.post(`${API_URL}${route}`, data);

    return response;
  } catch (error) {
    console.error('Erro na requisição:', error);
    throw error;
  }
};

// Envia a nova senha para rota do back-end para redefinir a senha.
export const forgotChangePassword = async (route: string, datasForChangePassword: object) => {
  try {
    const response = await axios.patch(`${API_URL}${route}`, datasForChangePassword);

    return response;
  } catch (error) {
    console.error('Erro na requisição:', error);
    throw error;
  }
};