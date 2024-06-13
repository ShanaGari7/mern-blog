import { Link } from "react-router-dom";
import CallToAction from "../components/CallToAction";
import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import GridCanvasCTA from "../components/GridCanvasCTA";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/post/getPosts");
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);
  return (
    <div>
      <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto ">
        <h1 className="text-3xl font-bold lg:text-6xl">Welcome to Gridify</h1>
        <p className="text-gray-500 text-s sm:text-sm">
          GRIDIFY is your go-to platform for knitting enthusiasts and creators
          alike. Dive into a world where you can draw and design intricate
          patterns on a grid canvas, download your creations, and share your
          artistic flair with others. Discover a wealth of engaging posts on
          knitting techniques, trends, and inspiration. Join a community
          passionate about knitting, where you can read, discuss, and contribute
          through comments. Whether you're a seasoned knitter or just starting
          out, GRIDIFY is your hub for creativity and community in the world of
          knitting.
        </p>
        <Link
          to="/search"
          className="text-xs sm:text-sm text-teal-700 font-bold hover:underline"
        >
          View all posts
        </Link>
      </div>

      <div className="mt-6 p-3 bg-teal-100 dark:bg-slate-700">
        <CallToAction />
      </div>

      <div className="mt-6 p-3 bg-purple-100 dark:bg-slate-700">
        <GridCanvasCTA />
      </div>

      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7">
        {posts && posts.length > 0 && (
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold text-center">Recent Posts</h2>
            <div className="flex flex-wrap gap-4">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <Link
              to={"/search"}
              className="text-lg text-teal-500 hover:underline text-center"
            >
              View all posts
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
