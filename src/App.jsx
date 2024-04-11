import { useReducer, useState } from "react";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Quizzes from "./pages/Quizzes";
import shuffle from "./utils/shuffle";
import {
  PlayerContext,
  QuizContext,
  QuizDispatchContext,
} from "./context/context";

const initialState = {
  index: 0,
  questions: [],
  // 'loading', 'error', 'ready', 'active', 'finished'
  status: "loading",
  answer: null,
  points: 0,
  active: null,
  answers: [],
  check: null,
};
function reducer(state, action) {
  switch (action.type) {
    case "dataReceived": {
      let ansrs = action.payload[state.index].incorrectAnswers;
      ansrs.push(action.payload[state.index].correctAnswer);
      shuffle(ansrs);
      return {
        ...state,
        questions: action.payload,
        status: "ready",
        answers: [...new Set(ansrs)],
        check: "new",
      };
    }
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "play": {
      let ansrs = state.questions[state.index].incorrectAnswers;
      ansrs.push(state.questions[state.index].correctAnswer);
      shuffle(ansrs);
      return {
        ...state,
        status: "active",
        answers: [...new Set(ansrs)],
      };
    }
    case "newAnswer": {
      const question = state.questions.at(state.index);

      return {
        ...state,
        answer: action.payload,
        points:
          action.score === question.correctAnswer
            ? state.points + 1
            : state.points,
        active: action.payload,
      };
    }
    case "nextQuestion": {
      let ansrs = state.questions[state.index + 1].incorrectAnswers;
      ansrs.push(state.questions[state.index + 1].correctAnswer);
      shuffle(ansrs);
      return {
        ...state,
        index: state.index + 1,
        answer: null,
        active: null,
        answers: [...new Set(ansrs)],
      };
    }
    case "finish":
      return { ...state, status: "finished" };
    case "reset":
      return { ...initialState };
    default:
      return state;
  }
}

function App() {
  const [difficulty, setDifficulty] = useState("easy");
  const [category, setCategory] = useState("General Knowledge");
  const [player, setPlayer] = useState("");
  const [state, dispatch] = useReducer(reducer, initialState);
  const { questions, status, check } = state;

  const numQuestions = questions?.length;
  const maxPossiblePoints = numQuestions;
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetch(
          `https://the-trivia-api.com/v2/questions?categories=${category}&difficulties=${difficulty}`
        );

        dispatch({
          type: "dataReceived",
          payload: await data.json(),
        });
      } catch (err) {
        dispatch({ type: "dataFailed" });
      }
    };

    getData();
  }, [category, difficulty, check]);

  function handleDifficulty(e) {
    const val = e.target.value;
    setDifficulty(val);
    console.log(val);
  }
  function handleCategory(e) {
    const val = e.target.value;
    setCategory(val);
    console.log(val);
  }

  return (
    <QuizContext.Provider value={state}>
      <QuizDispatchContext.Provider value={dispatch}>
        <PlayerContext.Provider
          value={{
            player,
            setPlayer,
            difficulty,
            category,
            numQuestions,
            maxPossiblePoints,
            handleCategory,
            handleDifficulty,
          }}
        >
          <Routes>
            {status === "active" || status === "finished" ? (
              <Route path="/quizzes" element={<Quizzes />} />
            ) : (
              <Route path="/" element={<Home />} />
            )}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </PlayerContext.Provider>
      </QuizDispatchContext.Provider>
    </QuizContext.Provider>
  );
}

export default App;
