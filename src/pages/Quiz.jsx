/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { quizData, answerValues, resultsData } from '../data';
import { TYPE } from '../utility/constants';
import { addLeadingZero, getPercentage } from '../services/helper';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';

const Quiz = (props) => {
  const { questions, setQuestions, setIsUser, templateId, templateParams, setTemplateParams, serviceId, publicKey, setShow } = props;

  const [isReview, setIsReview] = useState(false);
  const [isResult, setIsResult] = useState(false);
  const [isFinish, setIsFinish] = useState(false);
  const [results, setResults] = useState(resultsData);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [countdown, setCountdown] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);

  const { choices } = quizData;
  const { question, userAnswer } = questions[activeQuestion];

  // USE EFFECT

  useEffect(() => {
    if (isResult) {
      const scoreByType = {};
      const maxScorePerQuestion = 5;
      const reversedChoices = [...quizData.choices].reverse();

      questions.forEach((question) => {
        const { type, userAnswer, reversed } = question;
        let score = parseInt(userAnswer);

        if (reversed) {
          const originalIndex = userAnswer != null ? quizData.choices.indexOf(userAnswer.toString()) : 0;
          score = parseInt(reversedChoices[originalIndex]);
        }

        if (!scoreByType[type]) {
          scoreByType[type] = { score: 0, count: 0 };
        }

        scoreByType[type].score += score;
        scoreByType[type].count += 1;
      });

      const typeCounts = getTypeCounts(questions);
      console.log('typeCounts : ', typeCounts);

      const updatedResults = results.map((result) => {
        const typeData = scoreByType[result.type];
        if (typeData) {
          const maxPossibleScore = typeData.count * maxScorePerQuestion;
          const percentage = getPercentage(typeData.score, maxPossibleScore);

          switch (result.type) {
            case TYPE.control:
              setTemplateParams((prevParams) => ({
                ...prevParams,
                control_percent: percentage,
              }));
              break;
            case TYPE.confidence:
              setTemplateParams((prevParams) => ({
                ...prevParams,
                confidence_percent: percentage,
              }));
              break;
            case TYPE.commit:
              setTemplateParams((prevParams) => ({
                ...prevParams,
                commitment_percent: percentage,
              }));
              break;
            case TYPE.challenge:
              setTemplateParams((prevParams) => ({
                ...prevParams,
                challenge_percent: percentage,
              }));
              break;
            default:
              break;
          }

          return {
            ...result,
            score: typeData.score,
            total: maxPossibleScore,
            percentage,
          };
        }
        return result;
      });

      setResults(updatedResults);
    }
  }, [isResult]);

  useEffect(() => {
    if (countdown === 0) return;

    const timerId = setTimeout(() => {
      setCountdown(countdown - 1);
    }, 1000);

    return () => clearTimeout(timerId);
  }, [countdown]);

  // EVENT HANDLING

  const getTypeCounts = () => {
    const typeCounts = {};

    questions.forEach((question) => {
      const { type } = question;

      if (!typeCounts[type]) {
        typeCounts[type] = 0;
      }

      typeCounts[type] += 1;
    });

    return typeCounts;
  };

  const handleSelectedAnswer = (a) => {
    setSelectedAnswerIndex(a - 1);

    const updatedQuestions = questions.map((q, index) => {
      if (index === activeQuestion) {
        return { ...q, userAnswer: a };
      }
      return q;
    });

    setQuestions(updatedQuestions);
  };

  const handleNext = (e) => {
    e.preventDefault();
    e.stopPropagation();
    scrollToTop();

    setSelectedAnswerIndex(null);

    if (activeQuestion === questions.length - 1) {
      setIsReview(true);
    } else {
      setActiveQuestion((prev) => prev + 1);
    }
  };

  const handleBack = (e) => {
    e.preventDefault();
    e.stopPropagation();
    scrollToTop();

    setSelectedAnswerIndex(null);

    if (activeQuestion > 0) {
      setActiveQuestion((prev) => prev - 1);
    }
  };

  const handleBackToReview = (e) => {
    scrollToTop();
    e.preventDefault();
    e.stopPropagation();
    setIsReview(true);
    setSelectedAnswerIndex(null);
  };

  const handleEdit = (questionId) => {
    scrollToTop();
    setIsFinish(true);
    setActiveQuestion(questionId - 1);
    setIsReview(false);
  };

  const handleEmailResult = (e) => {
    e.preventDefault();
    e.stopPropagation();
    scrollToTop();

    // Send Email
    emailjs
      .send(serviceId, templateId, templateParams, publicKey)
      .then((response) => {
        console.log('EMAIL SENT SUCCESSFULLY!', response);
        setShow(true);

        // Reset states
        setCountdown(3);
        setSelectedAnswerIndex(null);
        localStorage.removeItem('userInfo');
        localStorage.clear();
        setActiveQuestion(0);
        setIsReview(false);
        setIsResult(false);
        setIsFinish(false);

        setIsUser(false);
      })
      .catch((error) => {
        console.error('EMAIL NOT SENT!', error);
      });
  };

  const handleReset = () => {
    setSelectedAnswerIndex(null);
    localStorage.removeItem('userInfo');
    localStorage.clear();
    setActiveQuestion(0);
    scrollToTop();
    setIsReview(false);
    setIsResult(false);
    setIsFinish(false);

    setIsUser(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    scrollToTop();
    setIsResult(true);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Optional: Adds smooth scrolling effect
    });
  };

  // Main rendering logic using if-else instead of nested ternary
  if (isResult && results[0].score > 0) {
    return (
      <div className="default-font">
        <div className="p-4 flex flex-col items-center text-center">
          <p className="xs:text-2xl sm:text-4xl font-bold text-blue-600 text-center xs:pb-2 sm:pb-4">Congratulations on completing the Mental Toughness Quiz!</p>
          <div className="text-slate-700 font-medium space-y-8 sm:w-1/2">
            <p className="sm:mt-8 xs:mt-4">{`You've just taken a big step towards understanding your mental strength. The quiz measured four key traits: control, commitment, confidence, and challenge. These insights will help you recognize your strengths and areas for improvement as you face life's challenges.`}</p>
            <p>{`To better understand your results, the four aspects of mental toughness are represented below as a percentage. The higher the percentage, the more you possess that attribute.`}</p>
            <p>
              {`From the results, rank `} <b>control, commitment, confidence, and challenge</b> {` according to percentage from highest to lowest.`}
            </p>
            <p className="font-semibold">{`The highest is your greatest attribute, and the lowest is the most significant opportunity for growth. `}</p>
          </div>
        </div>
        <div className="main-container">
          {/* desktop view */}
          <div className={`px-4 flex flex-row sm:visible xs:hidden w-1/2 -mt-10`}>
            <div className="flex flex-row space-x-4 h-64 w-full justify-evenly content-center items-center">
              {results.map((result, index) => (
                <div key={result.type} className="flex flex-col items-center">
                  <div className="font-semibold text-lg text-blue-900 mt-5 text-center">{result.type}</div>
                  <div className="relative w-48 h-48 mt-2">
                    <svg className="w-full h-full z-10 relative" viewBox="0 0 100 100">
                      <circle className="text-gray-200 stroke-current" strokeWidth="10" cx="50" cy="50" r="40" fill="transparent"></circle>
                      <circle className="text-blue-900  progress-ring__circle stroke-current" transform="rotate(-90 50 50)" strokeWidth="10" strokeLinecap="round" cx="50" cy="50" r="40" fill="transparent" strokeDasharray="251.2" strokeDashoffset={`calc(251.2 - (251.2 * ${result.percentage}) / 100)`}></circle>
                      <text x="50" y="50" fontSize="14" textAnchor="middle" alignmentBaseline="middle">
                        {`${result.percentage}%`}
                      </text>
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* mobile view */}
          <div className={`px-4 xs:visible sm:hidden flex flex-col`}>
            <div className="flex-1 flex-col space-x-4 h-64 pb-4 mt-4 w-full justify-evenly content-center items-center">
              {results.map((result, index) => (
                <div key={result.type} className="flex flex-col items-center">
                  <div className="font-semibold text-lg text-blue-900 mt-5 text-center">{result.type}</div>
                  <div className="relative w-36 h-36 mt-2">
                    <svg className="w-full h-full z-10 relative" viewBox="0 0 100 100">
                      <circle className="text-gray-200 stroke-current" strokeWidth="10" cx="50" cy="50" r="40" fill="transparent"></circle>
                      <circle className="text-blue-900  progress-ring__circle stroke-current" transform="rotate(-90 50 50)" strokeWidth="10" strokeLinecap="round" cx="50" cy="50" r="40" fill="transparent" strokeDasharray="251.2" strokeDashoffset={`calc(251.2 - (251.2 * ${result.percentage}) / 100)`}></circle>
                      <text x="50" y="50" fontSize="14" textAnchor="middle" alignmentBaseline="middle">
                        {`${result.percentage}%`}
                      </text>
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 m-0 bg-white w-full z-50">
          <button onClick={(e) => handleEmailResult(e)} className="w-full text-[18px] font-medium bg-gradient-to-r from-[#1a78c5] to-[#002f80] py-5 px-[42px] text-white cursor-pointer">
            <p>Email the Results</p>
          </button>
        </div>
      </div>
    );
  }

  if (isReview) {
    return (
      <div className="default-font">
        <div className="text-center p-4 bg-white w-full border-b border-black/10">
          <button onClick={handleReset} type="button" className="xs:text-xs float-right sm:top-2 xs:top-2 flex w-10 h-10 items-center font-medium place-content-center rounded-[5px] text-[18px] border-[#002f80]/60 border-2 sm:py-4 sm:px-12 xs:px-4 text-[#002f80] cursor-pointer">
            Reset
          </button>
          <div className="flex flex-col items-center text-center">
            <h2 className="xs:text-[24px] md:text-3xl font-bold text-blue-600 xs:text-left sm:text-left  xs:-mt-2">Review Answers</h2>
            <p className="xs:text-left sm:text-left xs:text-xs">(1 = Strongly Disagree, 5 = Strongly Agree)</p>
          </div>
        </div>

        <div className="main-container">
          <div className="flex-1 flex flex-col space-y-8 overflow-y-auto h-64 xs:-mt-8 p-4">
            {questions.map((q, index) => (
              <div key={`q-${index}-${q.id}`}>
                <div className="flex flex-row space-x-4 mt-4">
                  <div>
                    <span className="xs:text-2xl md:text-3xl font-bold text-blue-600/30">{addLeadingZero(q.id)}</span>
                  </div>
                  <div className="flex flex-col w-full">
                    <p className="text-md font-normal m-0 text-slate-700">{q.question}</p>
                    <p className="flex flex-row text-slate-700 xs:text-sm mt-2 w-full items-center">
                      Answer: <span className="flex font-semibold xs:text-sm text-blue-600/90 ml-2 w-full">{`${answerValues[q.userAnswer]}`}</span>
                    </p>
                  </div>
                  <div className="flex flex-col items-center">
                    <b className="flex items-center justify-center w-12 h-12 text-lg font-bold text-blue-600 border-blue-600 bg-blue-50 rounded-full p-6">{q.userAnswer}</b>
                    <button onClick={() => handleEdit(q.id)} type="button" className="text-center w-full text-md text-blue-600 py-4 cursor-pointer">
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="sticky bottom-0 m-0 bg-white w-full">
          <button onClick={(e) => handleSubmit(e)} className="w-full text-[18px] bg-gradient-to-r from-[#1a78c5] to-[#002f80] py-4 px-[42px] text-white cursor-pointer">
            Submit Answers
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-row w-full justify-between p-2 items-center">
        <div className="xs:text-sm sm:text-sm text-left bg-white text-blue-600 sm:px-10 float-left m-2">
          <p>1 = Strongly Disagree</p>
          <p>2 = Disagree</p>
          <p>3 = Neutral</p>
          <p>4 = Agree</p>
          <p>5 = Strongly Agree</p>
        </div>
        <button onClick={handleReset} type="button" className="flex w-10 h-10 items-center sm:mx-10 mr-4 font-medium place-content-center rounded-[5px] text-[18px] border-[#002f80]/60 border-2 py-[10px] px-12 text-[#002f80] cursor-pointer">
          Reset
        </button>
      </div>
      {/* <div className="flex flex-col max-w-xl max-h-xl xl:max-w-[520px] xl:max-h-[300px] justify-between xs:max-w-xs"> */}

      <div className="main-container">
        <div className="sub-container">
          <div className="flex flex-row max-w-xl max-h-xl xl:max-w-[520px] items-center content-between">
            {activeQuestion >= 1 ? (
              <button className="items-center text-base -ml-6" onClick={(e) => handleBack(e)}>
                <ChevronLeftIcon className="w-auto h-6 font-bold text-blue pr-2" strokeWidth={3} />
              </button>
            ) : (
              <></>
            )}
            <div>
              <span className="xs:text-[32px] sm:text-4xl font-bold text-blue-600 text-left">{addLeadingZero(activeQuestion + 1)}</span>
              <span className="xs:text-[16px] sm:text-lg font-bold text-gray-300 text-left">/{addLeadingZero(questions.length)}</span>
            </div>
          </div>
          <h2 className="text-lg font-normal m-0 mt-4 flex-1 flex-col p-4">{question}</h2>
          <ul className="flex flex-row mt-4 space-x-5 justify-center">
            {choices.map((choice, index) => (
              <li key={choice} onClick={() => handleSelectedAnswer(choice)} className={`text-slate-700 text-lg border-[1px] rounded-[16px] mt-[15px] p-[16px] cursor-pointer ${selectedAnswerIndex === index && selectedAnswerIndex !== null ? 'text-blue-600 border-blue-600 bg-blue-50 ' : ''}`}>
                <div className="flex justify-between">
                  <p>{choice}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="flex justify-end xs:mt-[26px] sm:mt-24 xs:invisible sm:visible">
            {isFinish && !isReview ? (
              <button onClick={(e) => handleBackToReview(e)} className="w-64 rounded-[9px] text-[18px] bg-gradient-to-r from-[#1a78c5] to-[#002f80] py-[10px] px-[42px] text-white cursor-pointer">
                Back to Review
              </button>
            ) : (
              <div className="flex flex-row w-full justify-end">
                <button onClick={(e) => handleNext(e)} className="float-right w-32 rounded-[9px] text-[18px] bg-gradient-to-r from-[#1a78c5] to-[#002f80] py-[10px] text-white cursor-pointer disabled:cursor-not-allowed disabled:text-black/60 disabled:bg-gradient-to-r disabled:from-[#e7e8e9] disabled:to-[#e7e8e9]" disabled={selectedAnswerIndex === null}>
                  {activeQuestion === questions.length - 1 ? 'Finish' : 'Next'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-end sm:invisible xs:visible">
        {isFinish && !isReview ? (
          <button onClick={(e) => handleBackToReview(e)} className="w-full fixed bottom-0 text-centertext-md font-semibold bg-gradient-to-r from-[#1a78c5] to-[#002f80] py-4 text-white cursor-pointer">
            Back to Review
          </button>
        ) : (
          <button onClick={(e) => handleNext(e)} className="w-full fixed bottom-0 text-center text-md font-semibold bg-gradient-to-r from-[#1a78c5] to-[#002f80] py-4 text-white cursor-pointer disabled:cursor-not-allowed disabled:text-black/60 disabled:bg-gradient-to-r disabled:from-[#e7e8e9] disabled:to-[#e7e8e9]" disabled={selectedAnswerIndex === null}>
            <p>{activeQuestion === questions.length - 1 ? 'Finish' : 'Next'}</p>
          </button>
        )}
      </div>
    </div>
  );
};

export default Quiz;
