import { useCallback, useState } from "react";
import QUESTIONS from "../questions.js";
import Question from "./Question.jsx";
import Summary from "./Summary.jsx";

export default function Quiz() {

    const [userAnswers, setUserAnswers] = useState([]);

    const activeQuestionIndex = userAnswers.length;
    const isQuizComplete = QUESTIONS.length === activeQuestionIndex;

    const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {
       
        setUserAnswers(prevAnswers => {
            return [...prevAnswers, selectedAnswer]
        })

    }, []);

    const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer]);



    if (isQuizComplete) {
        return (
           <Summary userAnswers={userAnswers}></Summary>
        )
    }

    const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
    shuffledAnswers.sort(() => Math.random() - 0.5)

    return (
        <div id="quiz">
           <Question key={activeQuestionIndex}
           index = {activeQuestionIndex}
            onSelectAnswer = {handleSelectAnswer}
            onSkipAnswer = {handleSkipAnswer}
           />
        </div>
    )
}