export const createObjectByFields = (
    obj: any,
    isDefault: boolean,
    filter: any
  ): any => {
    const result = {}
    for (const key in filter) {
      if (key in obj) {
        result[key] = convertToTypes(obj[key], typeof filter[key])
      } else if (!isEmpty(filter[key]) && isDefault) {
        result[key] = convertToTypes(filter[key], typeof filter[key])
      }
    }
    return result
  }
  
  const isEmpty = (value: any): boolean => {
    return value === null || value === undefined || value === '' || value === 0
  }
  
  const convertToTypes = (value: any, type: any): any => {
    if (type === 'number') {
      return +value
    }
    return value
  }