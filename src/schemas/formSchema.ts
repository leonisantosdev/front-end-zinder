import { z } from 'zod';

export const createUserSchema = z.object({
  name: z.string().nonempty('O nome é obrigatório').min(3, 'O nome dever conter no mínimo 3 caracteres'),
  email: z.string().email('Formato de e-mail inválido').nonempty('O e-mail é obritório'),
  password: z.string().nonempty('A senha é obrigatória').min(6, 'A senha deve conter no mínimo 6 caracteres')
})

export const loginUserSchema = createUserSchema.pick({
  email: true,
  password: true
})

export type LoginData = z.infer<typeof loginUserSchema>