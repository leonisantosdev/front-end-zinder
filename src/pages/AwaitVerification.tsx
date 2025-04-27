import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function AwaitVerification() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login'); // Volta para login se não verificar
    }, 60000); // 1 minuto

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">Verifique seu e-mail!</h1>
      <p className="mt-4">Você tem 1 minuto para clicar no link enviado.</p>
    </div>
  );
}
