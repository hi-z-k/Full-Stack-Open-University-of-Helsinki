import { useState } from 'react'
import { TextField, Stack, Button } from '@mui/material'

const Togglable = ({ buttonLabel, children }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button type="submit" onClick={toggleVisibility} variant='contained' style={{ marginTop: 30, width: '40%' }}>{buttonLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <Button type="submit" onClick={toggleVisibility} variant='outlined' style={{ marginTop: 10, width: '10%' }}>cancel</Button>
      </div>
    </div>
  )
}

export default Togglable