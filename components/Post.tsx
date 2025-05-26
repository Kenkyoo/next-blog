import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";

export type PostProps = {
  id: string;
  title: string;
  author: {
    name: string;
    email: string;
  } | null;
  content: string;
  published: boolean;
  tags?: { name: string }[]; // <- agregá esto
};

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  const authorName = post.author ? post.author.name : "Unknown author";
  return (
    <div onClick={() => Router.push("/post/[id]", `/post/${post.id}`)}>
      <h2>{post.title}</h2>
      <small>By {authorName}</small>
      <ReactMarkdown>{post.content}</ReactMarkdown>
      {post.tags && post.tags.length > 0 && (
        <div className="tags">
          {post.tags.map((tag, index) => (
            <span key={index} className="tag">
              {tag.name}
            </span>
          ))}
        </div>
      )}
      <style jsx>{`
        div {
          color: inherit;
          padding: 2rem;
        }

        .tags {
          margin-top: 1rem;
        }

        .tag {
          background-color: #f2f2f2;
          border-radius: 0.25rem;
          padding: 0.2rem 0.5rem;
          margin-right: 0.5rem;
          font-size: 0.85rem;
          display: inline-block;
        }
      `}</style>
    </div>
  );
};

export default Post;
