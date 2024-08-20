import { RequiredFieldYupValidation } from '@/application/validation'
import { Validation } from '@/application/contracts'
import * as yup from 'yup'

export const makeAuthenticateValidation = (): Validation => {
  const schema = yup.object().shape({
    // name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required().min(4, 'Password must be greater than 3 caracters'),
  })

  return new RequiredFieldYupValidation(schema)
}