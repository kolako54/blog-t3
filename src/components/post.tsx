import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { AiOutlineLike, AiTwotoneLike } from "react-icons/ai";
import { useUpdaceCache } from "~/hook/updateCache";
import { BsTrash } from "react-icons/bs";
import { api } from "~/utils/api";

const Post = ({ post }) => {
  const queryClient = useQueryClient();
  const utils = api.useContext();
  const hasLiked = post.postLikes.length > 0;
  const { mutateAsync: likeMutation } = api.postRoute.like.useMutation({
    onSuccess: (data, variables, action = "like") => {
      // useUpdaceCache({ data, variables, action: "like" });
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

  const { mutateAsync: deleteMutation, error } =
    api.postRoute.deletePost.useMutation({
      onSuccess: () => {
        utils.postRoute.getPosts.invalidate();
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
          const prevData = oldData;
          const value = action === "like" ? 1 : -1;
          const newData = prevData.map((post) => {
            if (post.id === variables.postId) {
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
  const handleDelete = async (postId) => {
    try {
      await deleteMutation({ postId });
    } catch (e) {
      console.log(e.message);
    }
  };
  console.log("errrrorrrrrr", error?.message);
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
      <div className="ml-auto flex flex-row-reverse pt-5">
        <div className="flex flex-col items-center justify-center">
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
        <BsTrash
          size={24}
          className="mr-2 cursor-pointer"
          onClick={() => handleDelete(post.id)}
        />
      </div>
    </div>
  );
};
export default Post;
