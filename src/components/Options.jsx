function Options({ question, answers, dispatch, active }) {
  const hasAnswered = active !== null;
  return (
    <div className="grid sm:grid-cols-2 gap-4 mt-4 sm:mt-16 place-items-center">
      {answers?.map((answer, index) => (
        <button
          className={`p-2 rounded-full bg-transparent border-2 w-10/12 border-black/60 ${
            index === active
              ? answer !== question.correctAnswer
                ? "bg-red-400"
                : "bg-green-400"
              : ""
          }`}
          key={answer}
          disabled={hasAnswered}
          onClick={() => {
            dispatch({
              type: "newAnswer",
              payload: index,
              score: answer,
            });
          }}
        >
          {answer}
        </button>
      ))}
    </div>
  );
}

export default Options;
