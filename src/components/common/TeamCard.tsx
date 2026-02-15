import React from 'react';
import { FaLinkedin, FaTwitter, FaGithub } from 'react-icons/fa';

export interface TeamCardProps {
  image: string;
  name: string;
  role: string;
  socials?: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
  className?: string; // allows free placement styling
}

const TeamCard: React.FC<TeamCardProps> = ({
  image,
  name,
  role,
  socials = {},
  className = ""
}) => {
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl cursor-pointer ${className}`}
    >
      {/* Image */}
      <img
        src={image}
        alt={name}
        className="w-full h-full object-cover transition-transform duration-500"
      />

      {/* White Info Box */}
        <div
        className="
            absolute left-1/2 bottom-6
            -translate-x-1/2 translate-y-32
            group-hover:translate-y-0
            transition-transform duration-700 ease-out
            w-[85%]
        "
        >
        <div className="bg-[#f2f2f2] rounded-2xl shadow-xl flex items-center justify-between"
        style={{ padding: '20px' }}
        >
            
            {/* Text */}
            <div>
            <h3 className="text-xl font-semibold text-gray-900" 
            >
                {name}
            </h3>
            <p className="text-gray-600 mt-1"
            >
                {role}
            </p>
            </div>

            {/* Icons */}
            <div className="flex items-center gap-4">
            {socials.linkedin && (
                <a
                href={socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-200 hover:scale-105 hover:bg-[#57ede0] transition"
                >
                <FaLinkedin className="text-gray-800" />
                </a>
            )}

            {socials.twitter && (
                <a
                href={socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-200 hover:scale-105 hover:bg-[#57ede0] transition"
                >
                <FaTwitter className="text-gray-800" />
                </a>
            )}

            {socials.github && (
                <a
                href={socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-200 hover:scale-105 hover:bg-[#57ede0] transition"
                >
                <FaGithub className="text-gray-800" />
                </a>
            )}
            </div>

        </div>
        </div>

    </div>
  );
};

export default TeamCard;
