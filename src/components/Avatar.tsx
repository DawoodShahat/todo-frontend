import Image from "next/image";
import UserAvatar from "../assets/images/profile.jpg";

export default function Avatar() {
  return (
    <div className="border-2 rounded-full w-fit">
      <Image
        src={UserAvatar}
        width={200}
        height={200}
        alt="user"
        className="object-cover h-[100px] w-[100px] rounded-full"
      />
    </div>
  );
}
