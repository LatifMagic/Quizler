function Header({ numQuestions }) {
  return (
    <div className="font-semibold text-center ">
      <h2 className="text-3xl sm:text-5xl mb-4 ">Welcome To Quizler🔥</h2>
      <h3 className="text-lg">
        {numQuestions} questions to test your knowledge
      </h3>
    </div>
  );
}

export default Header;
