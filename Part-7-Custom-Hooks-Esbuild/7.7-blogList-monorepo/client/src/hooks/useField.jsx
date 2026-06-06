import { useState } from "react"

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }
  const reset = () => setValue('')
  return {
    props: {
      type,
      value,
      onChange,
    },
    actions: {
      reset
    }
  }
}

export default useField