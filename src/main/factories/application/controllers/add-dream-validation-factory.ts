import { RequiredFieldYupValidation } from '@/application/validation'
import { Validation } from '@/application/contracts'
import * as yup from 'yup'

export const makeAddDreamValidation = (): Validation => {
  const schema = yup.object().shape({
    name: yup.string().required(),
    value: yup.number().positive('Somente números positivos').required(),
    time_expectation: yup
      .number()
      .positive('Somente números positivos')
      .min(1, 'O número deve ser no mínimo 1')
      .max(24, 'O número deve ser no máximo 12')
      .required('Campo obrigatório'),
    fk_profile: yup.string().required()
  })

  return new RequiredFieldYupValidation(schema)
}
