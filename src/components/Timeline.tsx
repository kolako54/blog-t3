import { api } from "~/utils/api";
import Post from "./post";

const Timeline = () => {
  const { data: posts } = api.postRoute.getPosts.useQuery({});

  console.log("postsssss", posts);
  return (
    <div className=" m-auto flex w-min flex-col items-center">
      {posts?.map((post) => {
        return <Post post={post} key={post.id} />;
      })}
    </div>
  );
};
export default Timeline;
