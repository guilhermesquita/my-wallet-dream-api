import { RequiredFieldYupValidation } from '@/application/validation'
import { Validation } from '@/application/contracts'
import * as yup from 'yup'

export const makeAddWalletValidation = (): Validation => {
  const schema = yup.object().shape({
    payment_day: yup
      .number()
      .positive('Somente números positivos')
      .min(1, 'O número deve ser no mínimo 1')
      .max(30, 'O número deve ser no máximo 30')
      .required('Campo obrigatório')
    // title: yup.string().required(),
    // director: yup.string().required(),
    // year: yup.string().required(),
    // description: yup.string().required(),
    // img: yup.string().required()
  })

  return new RequiredFieldYupValidation(schema)
}
