import { useContext } from "react";
import FinishScreen from "../components/FinishedScreen";
import NextButton from "../components/NextButton";
import Options from "../components/Options";
import Progress from "../components/Progress";
import Spinner from "../components/Spinner";
import Error from "./Error";
import {
  PlayerContext,
  QuizContext,
  QuizDispatchContext,
} from "../context/context";

function Quizzes() {
  const dispatch = useContext(QuizDispatchContext);
  const state = useContext(QuizContext);
  const { player, numQuestions, maxPossiblePoints } = useContext(PlayerContext);
  const { index, questions, status, answer, points, active, answers } = state;

  const question = questions[index];

  return (
    <div className="flex flex-col items-center justify-center gap-20">
      {status === "error" ? (
        <div className="flex justify-center items-center h-screen">
          <Error />
        </div>
      ) : status === "loading" ? (
        <Spinner />
      ) : (
        <>
          {status !== "finished" ? (
            <>
              <h1
                className="text-center text-4xl mt-12 font-bold text-black/80 border-2 border-black/80 py-2 px-8 rounded-md
              bg-transparent shadow-lg uppercase"
              >
                Player&nbsp;
                <span className="uppercase text-indigo-500 ">{player}</span>
              </h1>
              <div className=" w-11/12 md:3/4 lg:w-4/6 min-h-96  border-2 border-black/70 p-4 rounded-md">
                <Progress
                  index={index}
                  numQuestions={numQuestions}
                  points={points}
                  maxPossiblePoints={maxPossiblePoints}
                  answer={answer}
                />
                <h3 className="text-xl sm:text-2xl font-semibold uppercase text-center">
                  {question?.question.text}
                </h3>
                <Options
                  question={question}
                  answers={answers}
                  dispatch={dispatch}
                  active={active}
                />
                <div className="grid place-items-center mt-10">
                  <NextButton
                    dispatch={dispatch}
                    answer={answer}
                    index={index}
                    numQuestions={numQuestions}
                  />
                </div>
              </div>
            </>
          ) : (
            <FinishScreen
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              dispatch={dispatch}
            />
          )}
        </>
      )}
    </div>
  );
}

export default Quizzes;
