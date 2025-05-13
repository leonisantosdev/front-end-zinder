import { z } from 'zod';

// Primeiro, defina o schema base sem o refine
const UserSchemaBase = z.object({
  name: z.string().nonempty('O nome é obrigatório').min(3, 'O nome deve conter no mínimo 3 caracteres'),
  email: z.string().email('Formato de e-mail inválido').nonempty('O e-mail é obrigatório'),
  password: z.string().nonempty('A senha é obrigatória').min(8, 'A senha deve conter no mínimo 8 caracteres'),
  confirmPassword: z.string().nonempty('A confirmação de senha é obrigatória').min(8, 'As senhas devem conter no mínimo 8 caracteres'),
});

export const UserSchema = UserSchemaBase.refine(
  (data) => data.password === data.confirmPassword,
  {
    message: 'As senhas não conferem',
    path: ['confirmPassword'],
  }
);


export const loginUserSchema = UserSchemaBase.pick({
  email: true,
  password: true,
});

export const forgotPasswordSchema = UserSchemaBase.pick({
  email: true,
});

export const forgotChangePasswordSchema = UserSchemaBase.pick({
  password: true,
  confirmPassword: true,
}).refine((data) => data.password === data.confirmPassword, {
  message: 'As senhas não conferem',
  path: ['confirmPassword'],
});


export type LoginUserSchema = z.infer<typeof loginUserSchema>;
export type RegisterUserSchema = z.infer<typeof UserSchema>;
export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;
export type ForgotChangePasswordSchema = z.infer<typeof forgotChangePasswordSchema>;