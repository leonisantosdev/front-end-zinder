import { ButtonTranslate } from '@/components/ButtonTranslate'
import { ForgotPasswordForm } from '@/components/forgot-password-form'

export const ForgotPassword = () => {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <div className="w-full max-w-sm">
        <ForgotPasswordForm />
      </div>
      <ButtonTranslate/>
    </div>
  )
}