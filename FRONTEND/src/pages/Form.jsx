import React from 'react'
import Box from '@/components/form/Box'
import Dropdown from '@/components/form/Dropdown'

const selectItemArray = [
  { value: 'light', content: "Light" },
  { value: 'dark', content: "Dark" },
  { value: 'system', content: "System" },
]


const Form = () => {
  return (
    <div className='py-10 h-full overflow-auto'>
      <Box />
    </div>
  )
}

export default Form
