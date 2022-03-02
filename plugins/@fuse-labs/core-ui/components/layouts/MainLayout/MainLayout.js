import Navbar from '../../misc/Navbar/Navbar.js'

export default function MainLayout(props) {
  return (
    <div className="flex flex-col">

      <Navbar />
      
      <div className="flex-1 overflow-hidden">
        {props.children}
      </div>
    </div>
  )
}