import LightFXBackground from '@/components/LightFXBackground';
import TeamCard from '@/src/components/common/TeamCard';
import LightRays from '@/components/LightRays';

export default function TeamPage() {
  const executiveMembers = [
    {
      name: "Member One",
      role: "President",
      image: "https://images.pexels.com/photos/34408249/pexels-photo-34408249.jpeg"
    },
    {
      name: "Member Two",
      role: "Vice President",
      image: "https://images.pexels.com/photos/34408249/pexels-photo-34408249.jpeg"
    },
    {
      name: "Member Three",
      role: "Secretary",
      image: "https://images.pexels.com/photos/34408249/pexels-photo-34408249.jpeg"
    }
  ];

  return (
    <>
   

    
      <LightFXBackground />
     <div className="absolute inset-0 z-10 pointer-events-none">
        <LightRays />
      </div>
      {/* Spacer for navbar separation */}
      <div className="relative z-10 h-96"></div>
      
      <div className="relative z-10 pb-20">

          {/* Executive Committee Section */}
          <div className="w-full flex flex-col items-center">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12" style={{ color: '#FFA300' }}>
              Executive Committee
            </h2>
            <div className="border-b border-gray-600 w-3/4"></div>
            
            {/* Spacer between line and cards */}
            <div className="h-20"></div>

            {/* Team Cards Grid */}
            <div className="flex justify-center items-center w-full">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {executiveMembers.map((member, index) => (
                  <TeamCard
                    key={index}
                    image={member.image}
                    name={member.name}
                    role={member.role}
                    className="w-[320px] h-[450px]"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
    </>
  );
}
