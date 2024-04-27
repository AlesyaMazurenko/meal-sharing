import { Link } from "react-router-dom";

export default function NotFoundPage() {
    return (
      <div className="container">
        <h1>Oops the page you are looking for is not found</h1>
        <h2>Maybe you'll try again</h2>
        <Link to={"/"}>Go back</Link>
      </div>
    );
}