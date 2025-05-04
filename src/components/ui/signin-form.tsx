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
// import { Moon } from 'lucide-react';
import { LoginUserSchema, loginUserSchema } from "@/schemas/formSchema"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginData } from '../../api/authClient';
import { Separator } from "@/components/ui/separator";
import { AxiosError } from "axios"
import { toast } from "sonner"
import { TIME_TOAST } from "@/utils/timeToasts"

export function SignInForm({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { register, handleSubmit, formState: { errors } } = useForm<LoginUserSchema>({
    resolver: zodResolver(loginUserSchema),
  });

  const onSubmit = async (data: LoginUserSchema) => {
    try {
      const response = await loginData('/user/login', data);
      const { token } = response.data;

      localStorage.setItem("token", token);
      navigate("/dashboard");
    } catch (error) {

      const errorMessage = (error as AxiosError<{ message: string }>)?.response?.data?.message || "Erro ao fazer login. Tente novamente.";

      toast.error(`Erro: ${errorMessage}`, {
        duration: TIME_TOAST
      });
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="py-10 bg-transparent shadow-[0_0_15px_5px_rgba(255,255,255,0.02)]">
        <CardHeader className="flex flex-col gap-3 items-center">
          {/* <div className="rounded-full p-2 bg-[rgba(255,255,255,0.05)]">
            <Moon className="h-8 w-8 rounded-b-full" />
          </div> */}
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
                    onClick={() => navigate('/forgot-password')}
                    className="font-light ml-auto inline-block text-sm underline-offset-4 hover:underline hover:cursor-pointer"
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
              <div className="flex items-center my-3">
                <Separator className="flex-1" />
                  <span className="px-3 text-sm text-muted-foreground">{t('signin.separator')}</span>
                <Separator className="flex-1" />
              </div>
              <Button
                variant="default"
                type="submit"
                className="w-full hover:cursor-pointer py-5"
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
              className="underline hover:cursor-pointer underline-offset-4 text-white hover:text-gray-400 ml-1"
            >
              {t('signin.register')}
            </a>
          </div>
        </CardFooter>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4">
        {t('signin.terms.t1')} <a className="hover:text-gray-200" href="#">{t('signin.terms.t2')}</a>{" "}{t('signin.terms.t3')} <a className="hover:text-gray-200" href="#">{t('signin.terms.t4')}</a>.
      </div>
    </div>
  );
}