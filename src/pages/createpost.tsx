import { useRouter } from "next/router";
import { useState } from "react";
import { api } from "~/utils/api";

const CreatePost = () => {
  const [text, setText] = useState("");
  const router = useRouter();
  const utils = api.useContext();
  const { mutateAsync: postMutation } = api.postRoute.post.useMutation({
    onSuccess: () => {
      utils.postRoute.getPosts.invalidate();
    },
  });
  const handleSubmit = async (e: InputEvent) => {
    e.preventDefault();
    try {
      await postMutation({ text });
      router.push("/");
    } catch (e) {
      console.log("errorrrrrrrrrrrrrrrrrrrrrr", e.message);
    }
  };
  return (
    <div className="mt-5 flex justify-center">
      <div className="h-auto w-[30rem]  bg-primary p-5">
        <form onSubmit={handleSubmit} className="flex flex-col">
          <textarea
            className="textarea p-5"
            placeholder="Write your post"
            onChange={(e) => void setText(e.target.value)}
          ></textarea>
          <button type="submit" className=" btn-outline btn mt-5">
            Create
          </button>
        </form>
      </div>
    </div>
  );
};
export default CreatePost;
