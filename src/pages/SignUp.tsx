// import { ButtonTranslate } from '@/components/ButtonTranslate'
// import { Button } from '@/components/ui/button'
import { SignUpForm } from '@/components/ui/signup-form'
// import { ChevronLeft } from 'lucide-react'
// import { useNavigate } from 'react-router-dom'

export const SignUp = () => {
  // const navigate = useNavigate();

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-md">
        <SignUpForm/>
      </div>
      {/* <ButtonTranslate/> */}
    </div>
  )
}