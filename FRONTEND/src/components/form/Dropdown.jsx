import React, { useEffect, useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from '@radix-ui/react-label'

const Dropdown = ({ selectItemArray, handleChange }) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    handleChange(value);
  }, [value])


  return (
    <div className="grid w-full items-center gap-4">
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor={selectItemArray[0]?.title}>{selectItemArray[0]?.title}</Label>
        <Select onValueChange={(value) => setValue(value)}>
          <SelectTrigger id={selectItemArray[0]?.title}>
            <SelectValue placeholder={selectItemArray.find((obj) => { obj.value === value })?.value || selectItemArray[0]?.placeholder} />
          </SelectTrigger>
          <SelectContent position="popper">
            {
              selectItemArray.map((obj, index,) => (
                <SelectItem key={obj?.value || index} value={obj?.value}>{obj?.content}</SelectItem>
              ))
            }
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

export default Dropdown



// <Select>
//   <SelectTrigger className="w-[180px]">
//     <SelectValue placeholder="Theme" />
//   </SelectTrigger>
//   <SelectContent>
//     {
//       selectItemArray.map((obj) => (
//         <SelectItem value={obj?.value}>{obj?.content}</SelectItem>
//       ))
//     }
//   </SelectContent>
// </Select>

// <div className="grid w-full items-center gap-4">
{/* <div className="flex flex-col space-y-1.5">
<Label htmlFor="framework">Framework</Label>
<Select>
  <SelectTrigger id="framework">
    <SelectValue placeholder="Select" />
  </SelectTrigger>
  <SelectContent position="popper">
    <SelectItem value="next">Next.js</SelectItem>
    <SelectItem value="sveltekit">SvelteKit</SelectItem>
    <SelectItem value="astro">Astro</SelectItem>
    <SelectItem value="nuxt">Nuxt.js</SelectItem>
  </SelectContent>
</Select>
</div>
</div> */}