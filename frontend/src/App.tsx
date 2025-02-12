
import './App.css'
import { Button } from './components/button'
import "tailwindcss"
import { PlusIcon } from './icons/PlusIcon'

function App() {

  return (
    <>
      <Button startIcon={<PlusIcon size='md'/>} varient='primary' size='md' text='Click Me' />
      <Button varient='secondary' size='md' text='Click Me Again' />
    </>
  )
}

export default App
