import { Validation } from '@/application/contracts'
import { RequiredFieldYupValidation } from '@/application/validation'
import * as yup from 'yup'

export const makeListUserPageableValidation = (): Validation => {
  const schema = yup.object().shape({
    pageNumber: yup.number(),
    size: yup.number(),
    orderBy: yup.string(),
    order: yup
      .string()
      .oneOf(['ASC', 'DESC'], 'only types ASC and DESC are allowed'),
    name: yup.string(),
    email: yup.string().email(),
    created_at_start: yup
      .string()
      .matches(
        /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/,
        'Field must be a date AAAA-MM-DD HH:MM:SS'
      ),
    created_at_end: yup
      .string()
      .matches(
        /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/,
        'Field must be a date AAAA-MM-DD HH:MM:SS'
      )
  })
  return new RequiredFieldYupValidation(schema)
}