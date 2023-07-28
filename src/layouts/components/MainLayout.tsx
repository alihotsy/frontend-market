
import { Navbar } from "../../shared/Navbar"
import '../css/main-layout.css'

interface Props {
    children: JSX.Element | JSX.Element[]
}

export const MainLayout = ({ children }:Props) => {
  
  return (
    <div className="main-container">
        <Navbar/>
        { children }
        
    </div>
  )
}
