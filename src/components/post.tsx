import Image from "next/image";
import { AiOutlineLike } from "react-icons/ai";

const Post = ({ post }) => {
  return (
    <div className="my-5 mx-5 w-[40rem] bg-primary p-5">
      <div className="flex flex-col">
        <Image
          className="rounded-full object-cover"
          src={post.user.image}
          width={48}
          alt={post.user.name}
          height={48}
        />
        <p className="pb-5 pt-1 pl-[13px] text-xs">{post.user.name}</p>
      </div>
      <p>{post.text}</p>
      <AiOutlineLike color="white" className="ml-auto" size={24} />
    </div>
  );
};
export default Post;
