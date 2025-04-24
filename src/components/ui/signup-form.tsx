import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from 'react-hook-form';
import { useState } from "react";
import { zodResolver } from '@hookform/resolvers/zod';
import { createUserSchema } from "@/schemas/formSchema";

export function SignUpForm({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  const [output, setOutput] = useState('');
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(createUserSchema),
  });

  function createUser(data: object) {
    setOutput(JSON.stringify(data, null, 2))
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="[&_*_span]:text-red-500 [&_*_span]:text-xs [&_*_span]:mt-2">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Registrar conta</CardTitle>
        </CardHeader>
        <CardContent>

          <form onSubmit={handleSubmit(createUser)}>

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

          <pre>{output}</pre>
        </CardContent>
      </Card>
    </div>
  )
}
