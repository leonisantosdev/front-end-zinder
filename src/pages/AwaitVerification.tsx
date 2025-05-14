// import { ButtonTranslate } from '@/components/ButtonTranslate';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function AwaitVerification() {
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(10);

  useEffect(() => {
    sessionStorage.removeItem('justRegistered');
  }, []);

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
    <div className="flex flex-col items-center justify-center min-h-screen text-[#fff]">
      <Button
        onClick={() => navigate('/login')}
        variant="outline"
        className="absolute left-0 top-0 mt-5 ml-2 bg-transparent cursor-pointer"
      >
        <ChevronLeft />
      </Button>
      <div className="rounded-2xl p-8 max-w-md w-full text-center ">
        <h1 className="text-3xl font-bold mb-8 text-[#fff]">
          Verifique seu e-mail
        </h1>
        <p className="mb-6 text-md text-[#fff]">
          Um link de verificação foi enviado para seu e-mail.
        </p>
        <div className="text-7xl font-bold my-8 text-[#fff]">{seconds}s</div>
        <p className="mt-4 text-sm text-[#fff]">
          Você será redirecionado para o login após o tempo expirar.
        </p>
      </div>
      {/* <ButtonTranslate /> */}
    </div>
  );
}
