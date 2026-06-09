import Navbar from "../components/navbar/Navbar";

import AuthorCard from "../components/posts/AuthorCard";
import ShareButtons from "../components/posts/ShareButtons";
import RelatedPosts from "../components/posts/RelatedPosts";

function PostDetails() {
  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto p-10">

        <h1 className="text-5xl font-bold mb-5">
          React Complete Guide
        </h1>

        <p className="text-gray-500 mb-10">
          Published 2 days ago
        </p>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="md:col-span-2">

            <p>
              Blog content goes here...
            </p>

            <div className="mt-10">
              <ShareButtons />
            </div>

          </div>

          <div>

            <AuthorCard />

            <div className="mt-5">
              <RelatedPosts />
            </div>

          </div>

        </div>

      </div>
    </>
  );
}

export default PostDetails;