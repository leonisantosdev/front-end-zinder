import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterData, UserSchema } from "@/schemas/formSchema";
import { registerData } from "@/api/authClient";
import { useNavigate } from "react-router-dom";
import { toast } from 'sonner';

export function SignUpForm({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterData>({
    resolver: zodResolver(UserSchema),
  });

    const onSubmit = async (data: RegisterData) => {
      try {
        const response = await registerData('/user/register', data);
        const { token } = response.data;
        console.log(token)
        localStorage.setItem("token", token);
        toast.success('Conta criada com sucesso!');

        navigate("/verify-email");

      } catch (error) {
        alert("Erro ao regitrar conta: " + (error || "Erro desconhecido"));
      }
    };

  return (
    <div className={cn("flex flex-col gap-6 ", className)} {...props}>
      <Card className="[&_*_span]:text-red-500 [&_*_span]:text-xs [&_*_span]:mt-2 bg-transparent shadow-[0_0_15px_5px_rgba(255,255,255,0.02)]">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Registrar conta</CardTitle>
        </CardHeader>
        <CardContent>

          <form onSubmit={handleSubmit(onSubmit)}>

            <div className="flex flex-col gap-6">

              <div className="grid">
                <Label className="mb-4" htmlFor="name">Nome Completo</Label>
                <Input
                  placeholder="João Silva Gomes"
                  type="text"
                  {...register('name')}
                />
                {errors.name && <span>{errors.name.message}</span>}
              </div>

              <div className="grid">
                <Label className="mb-4" htmlFor="email">Email</Label>
                <Input
                  type="email"
                  placeholder="seu@email.com"
                  {...register('email')}
                />
                {errors.email && <span>{errors.email.message}</span>}
              </div>

              <div className="grid">
                <Label className="mb-4" htmlFor="password">Senha</Label>
                <Input 
                type="password" 
                placeholder="*****************"
                {...register('password')}
                />
                {errors.password && <span>{errors.password.message}</span>}
              </div>

              <Button type="submit" className="w-full text-black bg-white hover:cursor-pointer hover:bg-gray-300 text-center">
                Registrar
              </Button>
            </div>

          </form>
        </CardContent>
      </Card>
    </div>
  )
}