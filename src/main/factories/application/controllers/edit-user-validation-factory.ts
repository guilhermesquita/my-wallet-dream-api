import { RequiredFieldYupValidation } from '@/application/validation'
import { Validation } from '@/application/contracts'
import * as yup from 'yup'

export const makeEditUserValidation = (): Validation => {
  const schema = yup.object().shape({
    username: yup.string(),
    email: yup.string().email('invalid email'),
    password: yup.string().min(4, 'Password must be greater than 3 caracters')
  })

  return new RequiredFieldYupValidation(schema)
}
