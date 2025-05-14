import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function EmailVerifiedSuccess() {
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(10);

  useEffect(() => {
    const countdown = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(countdown);
          navigate('/login');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white">
      <Button
        onClick={() => navigate('/login')}
        variant="outline"
        className="absolute left-0 top-0 mt-5 ml-2 bg-transparent"
      >
        <ChevronLeft />
      </Button>
      <div className="rounded-2xl p-8 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold mb-8">
          E-mail verificado com sucesso!
        </h1>
        <p className="mb-6 text-md">
          Agora você pode fazer login na sua conta.
        </p>
        <div className="text-7xl font-bold my-8">{seconds}s</div>
        <p className="mt-4 text-sm">
          Você será redirecionado para a página de login.
        </p>
      </div>
    </div>
  );
}
