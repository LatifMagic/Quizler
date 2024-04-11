function Options({ question, answers, dispatch, active }) {
  const hasAnswered = active !== null;

  return (
    <div className="grid sm:grid-cols-2 gap-4 mt-4 sm:mt-16 place-items-center">
      {answers?.map((answer, index) => (
        <button
          className={`p-2 rounded-full  border-2 w-10/12 border-black/60 ${
            active !== null && index === active
              ? answer === question.correctAnswer
                ? "bg-green-300"
                : "bg-red-400"
              : ""
          }`}
          key={answer}
          disabled={hasAnswered}
          onClick={() => {
            if (!hasAnswered) {
              dispatch({
                type: "newAnswer",
                payload: index,
                score: answer,
              });
            }
          }}
        >
          {answer}
        </button>
      ))}
    </div>
  );
}

export default Options;
