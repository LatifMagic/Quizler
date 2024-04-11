function Progress({ index, numQuestions, points, maxPossiblePoints, answer }) {
  const val = index + Number(answer !== null);
  return (
    <header className="text-sm">
      <div className="w-full bg-gray-200 rounded-full dark:bg-gray-300">
        <div
          className="bg-indigo-500 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
          style={{ width: val * 10 + "%" }}
        >
          {val * 10}%
        </div>
      </div>
      {/* <progress
        className="w-full h-4 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
        max={numQuestions}
        value={index + Number(answer !== null)}
      /> */}
      <p>
        Question <strong>{index + 1}</strong> / {numQuestions}
      </p>
      <p>
        You got :&nbsp;
        <strong
          className={`font-bold ${
            points > 5 ? "text-green-700 " : "text-red-600"
          }`}
        >
          {points}
        </strong>{" "}
        / {maxPossiblePoints}
      </p>
    </header>
  );
}

export default Progress;
