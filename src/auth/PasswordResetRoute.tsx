import { JSX, useEffect, useState } from "react"
import { Navigate, useLocation } from "react-router-dom"

import { Loader } from "lucide-react"
import { validateChangePasswordRouteToken } from "@/api/authTokens"
import { toast } from "sonner"
import { TIME_TOAST } from "@/utils/timeToasts"
import { AxiosError } from "axios"

export function PasswordResetRoute({ children }: { children: JSX.Element }) {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const token = queryParams.get("token")

  const [isValid, setIsValid] = useState<boolean | null>(null)

  useEffect(() => {
    if (!token) {
      setIsValid(false)
      return
    }

    validateChangePasswordRouteToken("/token/validate-forgot-password-token", { token })
      .then((response) => {
        if (response.status === 200) {
          setIsValid(true)
        } else {
          setIsValid(false)
        }
      })
      .catch((error) => {
        const errorMessage = (error as AxiosError<{ message: string }>)?.response?.data.message

        toast.error(`Erro: ${errorMessage}`, {
          duration: TIME_TOAST
        });

        setIsValid(false)
      })

  }, [token])

  if (isValid === null) {
    return <Loader />
  }

  if (!isValid) {
    return <Navigate to="/login" replace />
  }

  return children
}
