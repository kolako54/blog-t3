import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { AiOutlineLike, AiTwotoneLike } from "react-icons/ai";
import { useUpdaceCache } from "~/hook/updateCache";
import { api } from "~/utils/api";

const Post = ({ post }) => {
  const queryClient = useQueryClient();
  const hasLiked = post.postLikes.length > 0;
  const { mutateAsync: likeMutation } = api.postRoute.like.useMutation({
    onSuccess: (data, variables, action = "like") => {
      //   useUpdaceCache({ data, variables, client: "like" });
      queryClient.setQueryData(
        [
          ["postRoute", "getPosts"],
          {
            input: {},
            type: "query",
          },
        ],
        (oldData) => {
          console.log("old dataaaaaaaaa", oldData);
          const prevData = oldData;
          const value = action === "like" ? 1 : -1;
          const newData = prevData.map((post) => {
            if (post.id === variables.postId) {
              console.log("postttttttttttttttttttttttttttttttttttttttt", data);
              return {
                ...post,
                postLikes: action === "like" ? [data.userId] : [],
                _count: {
                  postLikes: post._count.postLikes + value,
                },
              };
            } else {
              return post;
            }
          });
          console.log("NewDataa......", newData);
          return newData;
        }
      );
    },
  });

  const { mutateAsync: unlikeMutation } = api.postRoute.unlike.useMutation({
    onSuccess: (data, variables, action = "unlike") => {
      //   useUpdaceCache({ data, variables, client: "like" });
      queryClient.setQueryData(
        [
          ["postRoute", "getPosts"],
          {
            input: {},
            type: "query",
          },
        ],
        (oldData) => {
          console.log("old dataaaaaaaaa", oldData);
          const prevData = oldData;
          const value = action === "like" ? 1 : -1;
          console.log("actionnn", action);
          const newData = prevData.map((post) => {
            if (post.id === variables.postId) {
              console.log(
                "postttttttttttttttttttttttttttttttttttttttt",
                data.userId
              );
              return {
                ...post,
                postLikes: action === "like" ? [data.userId] : [],
                _count: {
                  postLikes: post._count.postLikes + value,
                },
              };
            } else {
              return post;
            }
          });
          console.log("NewDataa......", newData);
          return newData;
        }
      );
    },
  });
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
          className="object-coverer rounded-full"
          src={post.user.image}
          width={48}
          alt={post.user.name}
          height={48}
        />
        <p className="pb-5 pt-1 pl-[13px] text-xs">{post.user.name}</p>
      </div>
      <p>{post.text}</p>
      <div className="flex flex-col justify-center items-center">
        {hasLiked ? (
          <AiTwotoneLike
            color="white"
            className="ml-auto cursor-pointer"
            size={24}
            onClick={() => handleUnlike(post.id)}
          />
        ) : (
          <AiOutlineLike
            color="white"
            className="ml-auto cursor-pointer"
            size={24}
            onClick={() => handleLike(post.id)}
          />
        )}
        <p className="ml-auto pr-2 text-xs">{post._count.postLikes}</p>
      </div>
    </div>
  );
};
export default Post;
