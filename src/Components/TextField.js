import { useField, ErrorMessage } from 'formik'
import React from 'react'

function TextField({label, ...props}) {
    const [field, meta] = useField(props)
  return (
    <div className='mb-4'>
        <label htmlFor={field.name}>{label}</label>
        <input {...field} {...props} className={`form-control shadow-none ${meta.touched && meta.error && 'is_invalid'}`} autoComplete='off'/>
        <ErrorMessage component="div" name={field.name} className="error"/>
    </div>
  )
}

export default TextField