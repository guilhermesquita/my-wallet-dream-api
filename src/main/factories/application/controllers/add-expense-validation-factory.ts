import { RequiredFieldYupValidation } from '@/application/validation'
import { Validation } from '@/application/contracts'
import * as yup from 'yup'

export const makeAddExpenseValidation = (): Validation => {
  const schema = yup.object().shape({
    name: yup.string().required(),
    value: yup.number().positive('Somente números positivos').required(),
    fk_wallet: yup.number().required('Carteira obrigatória')
  })

  return new RequiredFieldYupValidation(schema)
}
