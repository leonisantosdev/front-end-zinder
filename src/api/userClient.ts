import axios from 'axios';
import { API_URL } from './config/urls.js';

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
export const forgotChangePassword = async (
  route: string,
  datasForChangePassword: object
) => {
  try {
    const response = await axios.patch(`${API_URL}${route}`, datasForChangePassword);

    return response;
  } catch (error) {
    
    console.error('Erro na requisição:', error);
    throw error;
  }
};
