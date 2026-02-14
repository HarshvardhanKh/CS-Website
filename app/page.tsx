import Footer from "@/src/components/common/Footer";
import {Skiper19} from "@/src/components/ui/stroke"
import ImageHover from "@/src/components/common/ImageHover";
import Navbar from "@/src/components/common/Navbar";
import HorizontalGallery from "@/src/components/gallery/HorizontalGallery";

export default function Home() {
  return (
    <>
    <div><Navbar/></div>
    <div>
      <Skiper19 />
      <ImageHover/>
      <HorizontalGallery/>
      <Footer/>
    </div>
    
    
      
    </>
  );
}