import React from "react";
import BlogDetails from "./component/BlogDetails";
import RelatedArticles from "./component/RelatedArticles";

function page() {
  return (
    <div>
      <BlogDetails />
      <RelatedArticles />
    </div>
  );
}

export default page;
