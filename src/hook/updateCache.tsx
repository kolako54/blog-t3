import { useQueryClient } from "@tanstack/react-query";

export const useUpdateCache = ({ data, variables, action }) => {
  console.log("usepdatecacheeeeee", data);
  const queryClient = useQueryClient();
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
};
