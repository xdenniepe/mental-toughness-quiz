import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getLocalStorageItem } from '../services/helper';
import { quizData } from '../data';

import Home from '../pages/Home';
import Quiz from '../pages/Quiz';
import Notification from '../component/Notification';

const AppRouter = () => {
  const serviceId = import.meta.env.VITE_SERVICE_ID;
  const templateId = import.meta.env.VITE_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_PUBLIC_KEY;
  const replyTo = import.meta.env.VITE_REPLY_TO;

  const [templateParams, setTemplateParams] = useState({
    first_name: '',
    to_email: '',
    reply_to: replyTo,
    control_percent: 0,
    commitment_percent: 0,
    confidence_percent: 0,
    challenge_percent: 0,
  });
  const [questions, setQuestions] = useState(quizData.questions);
  const [isUser, setIsUser] = useState(false);
  const [show, setShow] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    setUserInfo(getLocalStorageItem('userInfo'));
  }, []);

  useEffect(() => {
    if (!isUser) {
      setQuestions(quizData.questions);
    }
  }, [isUser]);

  useEffect(() => {
    if (userInfo != null) {
      setTemplateParams((prevParams) => ({
        ...prevParams,
        ['first_name']: userInfo.firstName,
        ['to_email']: userInfo.email,
      }));
      setIsUser(true);
    } else {
      setIsUser(false);
    }
  }, [userInfo]);

  return (
    <Router>
      <Notification show={show} setShow={setShow} />
      <Routes>
        <Route path="/" element={!isUser ? <Home setUserInfo={setUserInfo} /> : <Quiz serviceId={serviceId} templateId={templateId} templateParams={templateParams} setTemplateParams={setTemplateParams} publicKey={publicKey} questions={questions} setQuestions={setQuestions} setIsUser={setIsUser} show={show} setShow={setShow} />} />
        <Route path="*" element={() => <Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
