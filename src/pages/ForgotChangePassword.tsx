import { ForgotChangePasswordForm } from '@/components/forgot-change-password-form';

export const ForgotChangePassword = () => {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-md">
        <ForgotChangePasswordForm />
      </div>
    </div>
  );
};
