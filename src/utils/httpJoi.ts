import Joi, { SchemaMap } from 'joi'
export const validate = function <TSchema = any, isStrict = false, T = TSchema>(
  schema: SchemaMap<T, isStrict>,
  params: Object,
) {
  const rules = Joi.object(schema)
  return rules.validateAsync(params)
}
