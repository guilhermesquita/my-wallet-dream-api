import { RequiredFieldYupValidation } from '@/application/validation'
import { Validation } from '@/application/contracts'
import * as yup from 'yup'

export const makeEditWalletValidation = (): Validation => {
  const schema = yup.object().shape({
    name: yup.string(),
    payment_day: yup
      .number()
      .positive('Somente números positivos')
      .min(1, 'O número deve ser no mínimo 1')
      .max(30, 'O número deve ser no máximo 30')
    // email: yup.string().email(),
    // password: yup.string().min(4, 'Password must be greater than 3 caracters')
  })

  return new RequiredFieldYupValidation(schema)
}
