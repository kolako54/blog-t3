import Image from "next/image";
import { AiOutlineLike, AiTwotoneLike } from "react-icons/ai";
import { api } from "~/utils/api";

const Post = ({ post }) => {
  const hasLiked = post.postLikes.length > 0;
  const { mutateAsync: likeMutation } = api.postRoute.like.useMutation();
  const { mutateAsync: unlikeMutation } = api.postRoute.unlike.useMutation();
  const handleLike = async (postId) => {
    console.log("handleLike");
    try {
      await likeMutation({ postId });
    } catch (e) {
      console.log(e.message);
    }
  };
  const handleUnlike = async (postId: any) => {
    console.log("handleUnlike");
    try {
      await unlikeMutation({ postId });
    } catch (e) {
      console.log(e.message);
    }
  };
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
      {hasLiked ? (
        <AiTwotoneLike
          color="white"
          className="ml-auto"
          size={24}
          onClick={() => handleUnlike(post.id)}
        />
      ) : (
        <AiOutlineLike
          color="white"
          className="ml-auto"
          size={24}
          onClick={() => handleLike(post.id)}
        />
      )}
    </div>
  );
};
export default Post;
