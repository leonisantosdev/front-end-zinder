import { Moon, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useNavigate } from "react-router-dom"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { RecoverPasswordSchema, recoverPasswordSchema } from "@/schemas/formSchema"
import { AxiosError } from "axios"
import { toast } from "sonner"
import { TIME_TOAST } from "@/utils/timeToasts"
import { sendEmailForgotPassword } from "@/api/userClient"
import { useState } from "react"

export function ForgotPasswordForm({ className, ...props }: React.ComponentProps<"div">) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit } = useForm<RecoverPasswordSchema>({
    resolver: zodResolver(recoverPasswordSchema),
  });

  const onSubmit = async (data: RecoverPasswordSchema) => {
    setLoading(true);

    try {
      const response = await sendEmailForgotPassword('/user/recover-password', data)

      toast.success(response?.data?.message, {
        duration: TIME_TOAST
      });

      navigate('/login');
    } catch (error) {
      const errorMessage = (error as AxiosError<{ message: string }>)?.response?.data?.message || "Erro ao fazer login. Tente novamente.";

      toast.error(`Erro: ${errorMessage}`, {
        duration: TIME_TOAST
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-4">
            <a href="#" className="flex flex-col items-center gap-2 font-medium">
              <div className="rounded-full p-2 bg-[rgba(255,255,255,0.09)]">
                <Moon className="h-8 w-8 rounded-b-full" />
              </div>
            </a>
            <h1 className="text-xl font-medium">Digite seu e-mail para redefinir sua senha</h1>
            <div className="text-center text-sm">
              Já tem uma conta? <a onClick={() => navigate('/login')} className="underline underline-offset-4 hover:cursor-pointer hover:text-gray-400">Entrar</a>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="grid gap-3">  
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="seu@email.com"
                {...register('email')}
              />
            </div>
            <Button type="submit" disabled={loading} className="w-full hover:cursor-pointer text-center mt-5">
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="animate-spin h-4 w-4" />
                  Enviando...
                </div>
              ) : (
                'Enviar'
              )}
            </Button>
          </div>
        </div>
      </form>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  )
}
