export default function Post({ post }) {
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.issue}</p>
    </div>
  );
}
