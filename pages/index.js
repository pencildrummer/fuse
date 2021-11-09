import Navbar from "../components/Navbar/Navbar";
import PrintersGrid from "../components/PrintersGrid/PrintersGrid";

export default function Home() {
  return (
    <div>
      <Navbar>

      </Navbar>

      <PrintersGrid printers={[
        {
          id: 1,
          name: 'Longer LK4 PRO'
        }
      ]}/>
    </div>    
  )
}
