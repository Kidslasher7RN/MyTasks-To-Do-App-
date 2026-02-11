import {useRouteError} from "react-router-dom";
import {Link} from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center">
      <h1 className="text-4xl font-bold">Oops!</h1>{" "}
      <h2 className="my-4 text-xl">
        {error?.statusText || error?.message || "Something went wrong T_T"}
      </h2>
      {error?.status && (
        <p className="mb-4 text-gray-500">Status : {error.status}</p>
      )}
      <Link
        to="/"
        className="mt-4 inline-block bg-indigo-600 p-4 text-white rounded hover:bg-indigo-700"
      >
        ← Back to Home
      </Link>
    </div>
  );
}
