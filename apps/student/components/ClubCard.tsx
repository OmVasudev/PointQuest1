import React from "react";
import Image from "next/image";
import Link from "next/link";

interface ClubCardProps {
  imageSrc: string;
  title: string;
}

const ClubCard: React.FC<ClubCardProps> = ({ imageSrc, title }) => {
  return (
    <Link href={`/display/${title}`}>
      <div className="border border-gray-400 max-w-xs rounded-lg overflow-hidden shadow-lg m-4 bg-black text-white border border-gray-800">
        <div className="flex justify-center mt-4">
          {/* <Image
          src={imageSrc}
          alt={title}
          width={100}
          height={100}
          className="rounded-full"
        /> */}
        </div>
        <div className="px-6 py-4 text-center">
          <div className="font-bold text-xl mt-4">{title}</div>
        </div>
      </div>
    </Link>
  );
};

export default ClubCard;
