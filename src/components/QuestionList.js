import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data)
      });
  }, []);

  function handleDeleteItem(deletedItem) {
    const newQuestions = questions.filter((question) => question.id !== deletedItem.id);
    setQuestions(newQuestions);
  }

  function handleAnswerChange(id, correctIndex) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "correctIndex": correctIndex
      })
    })
    console.log(correctIndex);
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map((question) => (
          <QuestionItem question={question} key={question.id} onDeleteItem={handleDeleteItem} onAnswerChange={handleAnswerChange} />
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;
