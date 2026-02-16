
import {Skiper19} from "@/src/components/ui/stroke"
import ImageHover from "@/src/components/common/ImageHover";
import Navbar from "@/src/components/common/Navbar";
import Footer from "@/src/components/ui/Footer"
import CardStack from "@/src/components/common/CardStack";



export default function Home() {
  return (
    <>
    <div><Navbar/></div>
    <div><Skiper19 />
    <CardStack/>
    </div>
    <div style={{ height: "500px", position: "relative" }}>
      <ImageHover/>
    </div>
    <div style={{ position: "relative", zIndex: 100 }}>
      <Footer/>
    </div>
    </>
  );
}
