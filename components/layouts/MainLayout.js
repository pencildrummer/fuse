import Head from "next/head";
import Navbar from "../Navbar/Navbar";

export default function MainLayout(props) {
  return (
    <div className="flex flex-col">

      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"/>
        <link href="https://fonts.googleapis.com/css2?family=Syncopate&display=swap" rel="stylesheet" />
      </Head>

      <Navbar />
      <div className="flex-1 overflow-hidden">
        {props.children}
      </div>
    </div>
  )
}