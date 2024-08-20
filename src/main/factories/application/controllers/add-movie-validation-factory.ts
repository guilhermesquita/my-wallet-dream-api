import { RequiredFieldYupValidation } from '@/application/validation'
import { Validation } from '@/application/contracts'
import * as yup from 'yup'

export const makeAddMovieValidation = (): Validation => {
  const schema = yup.object().shape({
    title: yup.string().required(),
    director: yup.string().required(),
    year: yup.string().required(),
    description: yup.string().required(),
    img: yup.string().required()
  })

  return new RequiredFieldYupValidation(schema)
}