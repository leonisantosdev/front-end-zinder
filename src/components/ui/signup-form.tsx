import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterUserSchema, UserSchema } from "@/schemas/formSchema";
import { registerData } from "@/api/authClient";
import { useNavigate } from "react-router-dom";
import { toast } from 'sonner';
import { useTranslation } from "react-i18next";
import { AxiosError } from "axios";
import { ChevronLeft, Loader2 } from "lucide-react";
import { useState } from "react";
import { PasswordInput } from "../PasswordInput";

export function SignUpForm({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterUserSchema>({
    resolver: zodResolver(UserSchema),
  });

  const onSubmit = async (data: RegisterUserSchema) => {
    setLoading(true);
    try {
      const response = await registerData('/user/register', data);
      const { token } = response.data;

      localStorage.setItem("token", token);
      toast.success(response?.data?.message);

      sessionStorage.setItem("justRegistered", "true");
      navigate("/await-verify-email");
    } catch (error) {
      const errorMessage = (error as AxiosError<{ message: string }>)?.response?.data?.message || "Erro ao cadastrar. Tente novamente.";
      toast.error(`Erro: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="bg-transparent shadow-[0_0_15px_5px_rgba(255,255,255,0.02)]">
        <Button onClick={() => navigate('/login')} variant='outline' className='relative w-12 left-0 top-0 mx-3 bg-transparent cursor-pointer'><ChevronLeft/></Button>
        <CardHeader className="flex flex-col gap-3 items-center">
          <div className="flex flex-col gap-3 items-center">
            <CardTitle className="text-3xl text-center">{t('signup.title')}</CardTitle>
          </div>
          <CardDescription className="text-center">
            {t('signup.subtitle')}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <Label htmlFor="name">{t('signup.fullName')}</Label>
                <Input
                  placeholder={t('signup.fullNamePlaceholder')}
                  type="text"
                  className="py-5"
                  {...register('name')}
                />
                {errors.name && <span className="text-sm text-red-500">{errors.name.message}</span>}
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="email">{t('signup.email')}</Label>
                <Input
                  type="email"
                  placeholder={t('signup.placeholderEmail')}
                  className="py-5"
                  {...register('email')}
                />
                {errors.email && <span className="text-sm text-red-500">{errors.email.message}</span>}
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="password">{t('signup.password')}</Label>
                <PasswordInput 
                  placeholder="*****************"
                  {...register('password')}
                />
                {errors.password && <span className="text-sm text-red-500">{errors.password.message}</span>}
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="confirmPassword">{t('signup.confirmPassword')}</Label>
                <PasswordInput
                  placeholder="*****************"
                  {...register('confirmPassword')}
                />
                {errors.confirmPassword && <span className="text-sm text-red-500">{errors.confirmPassword.message}</span>}
              </div>

              <Button type="submit" disabled={loading} className="w-full hover:cursor-pointer text-center mt-5">
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="animate-spin h-4 w-4" />
                    {t('signup.loading')}
                  </div>
                ) : (
                  t('signup.register')
                )}
              </Button>
            </div>
          </form>
        </CardContent>

        <CardFooter className="text-center text-sm flex justify-center items-center gap-1">
          <div>
            {t('signup.haveAccount')}{" "}
            <a
              onClick={() => navigate('/login')}
              className="underline hover:cursor-pointer underline-offset-4 text-white hover:text-gray-400 ml-1"
            >
              {t('signup.login')}
            </a>
          </div>
        </CardFooter>
      </Card>

      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary  ">
        {t('signin.terms.t1')} <a href="#">{t('signin.terms.t2')}</a>{" "}
        {t('signin.terms.t3')} <a href="#">{t('signin.terms.t4')}</a>.
      </div>
    </div>
  )
}
