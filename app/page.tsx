import Footer from "@/src/components/common/Footer";
import {Skiper19} from "@/src/components/ui/stroke"
import ImageHover from "@/src/components/common/ImageHover";
import Navbar from "@/src/components/common/Navbar";
import HorizontalGallery from "@/src/components/gallery/HorizontalGallery";
import TargetCursor from "@/src/components/common/TargetCursor";
import TeamCard from "@/src/components/common/TeamCard";

export default function Home() {
  return (
    <>

    
    <TargetCursor 
        spinDuration={2}
        hideDefaultCursor
        parallaxOn
  hoverDuration={0.2}
/>
    <div><Navbar/></div>
    <div>
      <Skiper19 />
      <ImageHover/>
      
      <TeamCard
        image="https://images.pexels.com/photos/34408249/pexels-photo-34408249.jpeg"
        name="John Doe"
        role="Lead Developer"
        socials={{
          linkedin: "https://linkedin.com/in/johndoe",
          twitter: "https://twitter.com/johndoe",
          github: "https://github.com/johndoe"
        }}
        className="w-[400px] h-[600px]"
      />
      
      <HorizontalGallery/>
      <Footer/>
    </div>
    
    
      
    </>
  );
}