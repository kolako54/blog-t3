import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

const HeaderLayout = () => {
  const { data: session } = useSession();
  console.log("dataaaaa", session);
  return (
    <div className="text-white-100  block h-auto w-screen bg-primary">
      <ul className="container m-auto flex items-center justify-around p-4 px-10 text-white">
        <li className="mr-[2em] font-bold">Brand</li>
        {session && (
          <li className="mr-auto px-5 text-[#EDEF7F]">
            Welcome {session.user.name} :)
          </li>
        )}
        <div className="flex items-center">
          <li className="px-5">Blogs</li>
          <Link href="/createpost">
            <li className="px-5">Create Post</li>
          </Link>
          <Link href="/">
            <li className="px-5">Home</li>
          </Link>
          {!session ? (
            <button className="btn-outline btn" onClick={() => signIn()}>
              Sign In
            </button>
          ) : (
            <>
              <li
                className="cursor-pointer border-[1px] border-solid border-[#DD726E] px-5 text-[#DD726E]"
                onClick={() => signOut()}
              >
                Sign out
              </li>
            </>
          )}
        </div>
      </ul>
    </div>
  );
};
export default HeaderLayout;
