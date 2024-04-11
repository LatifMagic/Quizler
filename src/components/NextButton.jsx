function NextButton({ dispatch, answer, index, numQuestions }) {
  if (answer === null) return null;
  if (index < numQuestions - 1)
    return (
      <button
        className="p-2 w-36 border-2 border-black/60 bg-indigo-300  hover:bg-indigo-500 
        hover:text-white transition-all duration-150 ease-linear rounded-full "
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next
      </button>
    );
  if (index === numQuestions - 1)
    return (
      <button
        className="p-2 w-36 border-2 border-black/60 bg-indigo-300  hover:bg-indigo-500
      rounded-full "
        onClick={() => dispatch({ type: "finish" })}
      >
        Finsh
      </button>
    );
}

export default NextButton;
