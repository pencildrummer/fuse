import DevicesGrid from "../components/DevicesGrid/DevicesGrid";
import MainLayout from "../components/layouts/MainLayout";

export default function Home() {
  return (
    <MainLayout>

      <DevicesGrid printers={[
        {
          id: 1,
          name: 'Longer LK4 PRO',
          brand: 'LONGER',
          model: 'LK4 Pro',
          type: 'fdm',
          connected: true,
          camera: {
            live: true
          }
        },
        {
          id: 2,
          name: 'Elegoo MARS PRO',
          brand: 'Elegoo',
          model: 'MARS PRO',
          type: 'sla',
        },
        {
          id: 3,
          name: 'CNC 3018',
          brand: 'VEVOR',
          model: '3018 Pro',
          type: 'cnc',
        }
      ]}/>
    
    </MainLayout>
  )
}
