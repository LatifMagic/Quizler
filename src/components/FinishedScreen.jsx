import { Link } from "react-router-dom";

function FinishScreen({ points, maxPossiblePoints, dispatch }) {
  const percentage = (points / maxPossiblePoints) * 100;
  return (
    <div className="w-full flex flex-col text-center justify-center items-center mt-40">
      <p className="bg-indigo-300 w-3/4 p-4 rounded-full text-xl">
        You scored <strong>{points} </strong>
        out of {maxPossiblePoints}{" "}
        <span
          className={`font-bold ${
            points > 5 ? "text-green-700 " : "text-red-600"
          }`}
        >
          ({Math.ceil(percentage)}%)
        </span>
      </p>
      <p className="mt-4 text-gray-600">
        Go back &nbsp;
        <Link to="/">
          <button
            className="text-blue-500"
            onClick={() => dispatch({ type: "reset" })}
          >
            Play Again
          </button>
        </Link>
        .
      </p>
    </div>
  );
}

export default FinishScreen;
