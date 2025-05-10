import axios from 'axios';

const API_URL = 'http://localhost:3333';

// Valida rota de redefinição de senha do usuário (ROTA PRIVADA)
export const validateChangePasswordRouteToken = async(route: string, token: object) => {
  try {
    const response = await axios.post(`${API_URL}${route}`, token);
    
    return response;
  } catch (error) {
    console.error('Erro na requisição:', error);
    throw error;
  }
}