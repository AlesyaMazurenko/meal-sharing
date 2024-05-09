import useSWR from "swr";

const fetcher = (url) => {
  return fetch(url).then((res) => res.json());
};

  const { data, error, isLoading } = useSWR(
    `http://localhost:5001/api/meals/${id}`,
    fetcher
  );
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error in fetching data</div>;
  console.log("data", data[0]);