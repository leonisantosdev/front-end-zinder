import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff } from 'lucide-react';
import type { ComponentPropsWithoutRef } from 'react';

type PasswordInputProps = ComponentPropsWithoutRef<typeof Input>;

export function PasswordInput(props: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <Input
        type={showPassword ? 'text' : 'password'}
        className={`pr-10 py-5 ${props.className ?? ''}`}
        {...props}
      />
      <Button
        type="button"
        variant="link"
        size="icon"
        className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 bg-transparent text-muted-foreground hover:text-white cursor-pointer"
        onClick={() => setShowPassword((prev) => !prev)}
      >
        {showPassword ? (
          <EyeOff className="h-4 w-4" />
        ) : (
          <Eye className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
}
