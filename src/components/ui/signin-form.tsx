import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { Moon } from 'lucide-react';
import { LoginData, loginUserSchema } from "@/schemas/formSchema"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from 'axios';

export function SignInForm({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { register, handleSubmit, formState: { errors } } = useForm<LoginData>({
    resolver: zodResolver(loginUserSchema),
  });

  const onSubmit = async (data: LoginData) => {
    try {
      const response = await axios.post('http://localhost:3333/user/login', data);
      console.log(response.data);

      const { token } = response.data;
      localStorage.setItem("token", token);

      console.log(token)
      navigate("/dashboard");
    } catch (error) {

      alert("Erro ao fazer login: " + (error || "Erro desconhecido"));
      
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="py-10 bg-transparent shadow-[0_0_15px_5px_rgba(255,255,255,0.02)]">
        <CardHeader className="flex flex-col gap-3 items-center">
          <div className="rounded-full p-3 bg-[rgba(255,255,255,0.05)]">
            <Moon className="h-10 w-10 rounded-b-full" />
          </div>
          <CardTitle className="text-3xl text-center py-2">{t('signin.title')}</CardTitle>
          <CardDescription className="text-center">
            {t('signin.subtitle')}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">{t('signin.email')}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t('signin.placeholder')}
                  className="py-5"
                  {...register('email')}
                />
                {errors.email && <span className="text-sm text-red-500">{errors.email.message}</span>}
              </div>

              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">{t('signin.password')}</Label>
                  <a
                    href="#"
                    className="font-light ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    {t('signin.forgot')}
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  className="py-5"
                  placeholder="*****************"
                  {...register('password')}
                />
                {errors.password && <span className="text-sm text-red-500">{errors.password.message}</span>}
              </div>

              <Button
                type="submit"
                className="w-full text-black bg-white hover:cursor-pointer hover:bg-gray-300 py-5"
              >
                {t('signin.login')}
              </Button>
            </div>
          </form>
        </CardContent>

        <CardFooter className="mt-3 text-center text-sm flex justify-center items-center gap-1">
          <div>
            {t('signin.noAccount')}{" "}
            <a
              onClick={() => navigate('/register')}
              className="underline hover:cursor-pointer underline-offset-4 text-blue-500 hover:text-blue-600 ml-1"
            >
              {t('signin.register')}
            </a>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}