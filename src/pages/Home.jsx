import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import Error from "./Error";
import Header from "../components/Header";
import {
  PlayerContext,
  QuizContext,
  QuizDispatchContext,
} from "../context/context";
import { useContext } from "react";

const categories = [
  "General Knowledge",
  "Arts",
  "Movies",
  "Food",
  "Geography",
  "History",
  "Science",
  "Society",
  "Sports",
];

const diffs = ["easy", "medium", "hard"];

function Home() {
  const dispatch = useContext(QuizDispatchContext);
  const state = useContext(QuizContext);
  const {
    player,
    setPlayer,
    difficulty,
    category,
    numQuestions,
    handleCategory,
    handleDifficulty,
  } = useContext(PlayerContext);
  const { status } = state;

  return (
    <div className="h-screen flex flex-col gap-8 items-center justify-center">
      {status === "error" ? (
        <Error />
      ) : status === "loading" ? (
        <Spinner />
      ) : (
        <>
          <Header numQuestions={numQuestions} />
          <div className="flex flex-col gap-4 items-center">
            <input
              type="text"
              placeholder="Insert your name"
              className="px-4 py-2 rounded-full border-2 border-black w-72  bg-white/80"
              value={player}
              onChange={(e) => setPlayer(e.target.value)}
            />
            <div className="flex flex-col md:flex-row items-center justify-center gap-2 ">
              <select
                className="px-2 py-2 rounded-full border-2 w-48 border-black bg-transparent"
                value={category}
                onChange={handleCategory}
              >
                <option className="bg-transparent" disabled>
                  Select Category
                </option>
                {categories?.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <select
                className="px-2 py-2 rounded-full border-2 w-48 border-black bg-transparent capitalize"
                value={difficulty}
                onChange={handleDifficulty}
              >
                <option className="bg-transparent" disabled>
                  Select Difficulty
                </option>
                {diffs?.map((dif) => (
                  <option key={dif} value={dif}>
                    {dif}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            {player.length > 2 && player.length < 20 ? (
              <Link to="/quizzes">
                <button
                  className="py-2 w-48 bg-[#f2fe03] hover:bg-yellow-400 border-2  border-yellow-400 
                   text-base rounded-full "
                  onClick={() => dispatch({ type: "play" })}
                >
                  Play
                </button>
              </Link>
            ) : (
              <button
                className="py-2 w-48 bg-gray-300 cursor-not-allowed text-base rounded-full"
                disabled
              >
                play
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
