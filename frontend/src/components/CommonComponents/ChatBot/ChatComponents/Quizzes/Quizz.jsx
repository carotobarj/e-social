import React, { useState } from "react";
import FlashCard from "../Quizzes/Flashcard.jsx";

const Quiz = (props) => {
  console.log(props);
  let [questionIndex, setQuestionIndex] = useState(0);

  const incrementIndex = () => setQuestionIndex((prev) => (prev += 1));

  const currentQuestion = props.questions[questionIndex];
  
  if (!currentQuestion) { 
    
    return(
    <div>
    <p>Para más consultas podés contactarte al mail: mejorpfenlahistoria@gmail.com</p>
    <p>¡MUCHAS GRACIAS!</p>
    </div>
     ) 
    
      
  }

  return (
    <FlashCard
      question={currentQuestion.question}
      answer={currentQuestion.answer}
      incrementIndex={incrementIndex}
    />
  );
};

export default Quiz;