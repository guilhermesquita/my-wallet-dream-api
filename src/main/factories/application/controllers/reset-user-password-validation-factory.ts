import { RequiredFieldYupValidation } from '@/application/validation'
import { Validation } from '@/application/contracts'
import * as yup from 'yup'

export const makeResetUserPasswordValidation = (): Validation => {
  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(4, 'Password must be greater than 3 caracters').required(),
  })

  return new RequiredFieldYupValidation(schema)
}