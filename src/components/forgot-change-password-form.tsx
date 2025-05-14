import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Label } from '@/components/ui/label';
import { useTranslation } from 'react-i18next';
import {
  forgotChangePasswordSchema,
  ForgotChangePasswordSchema,
} from '@/schemas/formSchema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { PasswordInput } from '@/components/PasswordInput';
import { forgotChangePassword } from '@/api/userClient';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export function ForgotChangePasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const token = params.get('token');
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotChangePasswordSchema>({
    resolver: zodResolver(forgotChangePasswordSchema),
  });

  const onSubmit = async (data: ForgotChangePasswordSchema) => {
    try {
      const payload = { ...data, token };
      console.log(data.password, token);

      const response = await forgotChangePassword(
        '/user/forgot-change-password',
        payload
      );

      if (response.status === 200) {
        setTimeout(() => {
          toast.success(response?.data?.message);
        }, 300);
      }

      navigate('/login');
    } catch (error) {
      const errorMessage = (error as AxiosError<{ message: string }>)?.response
        ?.data?.message;

      toast.error(`Erro: ${errorMessage}`);
    }
  };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card className="py-10 bg-transparent shadow-[0_0_15px_5px_rgba(255,255,255,0.02)]">
        <CardHeader className="flex flex-col gap-3 items-center">
          <CardTitle className="text-3xl text-center py-2">
            {t('Redefinição de senha')}
          </CardTitle>
          <CardDescription className="text-center">
            {t('Digite sua nova senha para redefinir suas credenciais')}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="password">{t('Nova senha')}</Label>
                <PasswordInput
                  placeholder="*****************"
                  className="py-5"
                  {...register('password')}
                />
                {errors.password && (
                  <span className="text-sm text-red-500">
                    {errors.password.message}
                  </span>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="confirmPassword">{t('Confirme a senha')}</Label>
                <PasswordInput
                  className="py-5"
                  placeholder="*****************"
                  {...register('confirmPassword')}
                />
                {errors.confirmPassword && (
                  <span className="text-sm text-red-500">
                    {errors.confirmPassword.message}
                  </span>
                )}
              </div>

              <Button
                variant="default"
                type="submit"
                className="w-full hover:cursor-pointer py-5"
              >
                {t('Redefinir')}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
