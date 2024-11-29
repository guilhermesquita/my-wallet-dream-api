import { RequiredFieldYupValidation } from '@/application/validation'
import { Validation } from '@/application/contracts'
import * as yup from 'yup'

export const makeAddUserValidation = (): Validation => {
  const schema = yup.object().shape({
    username: yup
      .string()
      .required()
      .min(2, 'Username must be greater than 3 caracters'),
    email: yup.string().email('invalid email').required(),
    password: yup
      .string()
      .required()
      .min(4, 'Password must be greater than 3 caracters')
  })

  return new RequiredFieldYupValidation(schema)
}
