import { useFetch } from "../hooks/useFetch";

type Posts = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export const DataFetching = () => {
  const {
    data: posts,
    loading,
    error,
    refreshData
  } = useFetch<Posts[]>("https://jsonplaceholder.typicode.com/posts");
  return (
    <div className="container">
      <h2>Data Fetching</h2>
      <button type="button" onClick={refreshData}>Refresh</button>
      {loading ? (
        "Loading..."
      ) : (
        <div className="all-posts">
          {posts?.map((post) => (
            <div className="post">
              <h2>{post.title}</h2>
              <p>{post.body}</p>
            </div>
          ))}
        </div>
      )}
      {error && <p>{error}</p>}
    </div>
  );
};
