import { TYPE } from './utility/constants';

export const quizData = {
  id: '1',
  topic: 'Mental Toughness',
  level: 'Initial',
  totalQuestions: 18,
  perQuestionScore: 5,
  choices: ['1', '2', '3', '4', '5'],

  questions: [
    {
      id: 1,
      question: 'Even when under considerable pressure I usually remain calm.',
      type: TYPE.control,
      reversed: false,
      userAnswer: null,
    },
    {
      id: 2,
      question: 'I tend to worry about things well before they actually happen. ',
      type: TYPE.control,
      reversed: true,
      userAnswer: null,
    },
    {
      id: 3,
      question: 'I usually find it hard to summon enthusiasm for the tasks I have to do. ',
      type: TYPE.commit,
      reversed: true,
      userAnswer: null,
    },
    {
      id: 4,
      question: 'I generally cope well with any problems that occur. ',
      type: TYPE.challenge,
      reversed: false,
      userAnswer: null,
    },
    {
      id: 5,
      question: 'I generally feel that I am a worthwhile person.',
      type: TYPE.confidence,
      reversed: false,
      userAnswer: null,
    },
    {
      id: 6,
      question: '“I just don’t know where to begin” is a feeling I usually have when presented with several things to do at once.',
      type: TYPE.commit,
      reversed: true,
      userAnswer: null,
    },
    {
      id: 7,
      question: 'I usually speak my mind when I have something to say.',
      type: TYPE.confidence,
      reversed: false,
      userAnswer: null,
    },
    {
      id: 8,
      question: 'When I make mistakes, I usually let it worry me for days after.',
      type: TYPE.confidence,
      reversed: true,
      userAnswer: null,
    },
    {
      id: 9,
      question: 'In discussions, I tend to back-down even when I feel strongly about something. ',
      type: TYPE.confidence,
      reversed: true,
      userAnswer: null,
    },
    {
      id: 10,
      question: 'I generally feel in control.',
      type: TYPE.control,
      reversed: false,
      userAnswer: null,
    },
    {
      id: 11,
      question: 'I often wish my life was more predictable. ',
      type: TYPE.challenge,
      reversed: true,
      userAnswer: null,
    },
    {
      id: 12,
      question: 'When I am feeling tired I find it difficult to get going. ',
      type: TYPE.control,
      reversed: true,
      userAnswer: null,
    },
    {
      id: 13,
      question: 'I am generally able to react quickly when something unexpected happens. ',
      type: TYPE.challenge,
      reversed: false,
      userAnswer: null,
    },
    {
      id: 14,
      question: 'However bad things are, I usually feel they will work out positively in the end. ',
      type: TYPE.confidence,
      reversed: false,
      userAnswer: null,
    },
    {
      id: 15,
      question: 'I generally look on the bright side of life.',
      type: TYPE.confidence,
      reversed: false,
      userAnswer: null,
    },
    {
      id: 16,
      question: 'I generally find it hard to relax. ',
      type: TYPE.confidence,
      reversed: true,
      userAnswer: null,
    },
    {
      id: 17,
      question: 'I usually find it difficult to make a mental effort when I am tired. ',
      type: TYPE.commit,
      reversed: true,
      userAnswer: null,
    },
    {
      id: 18,
      question: 'If I feel somebody is wrong, I am not afraid to argue with them. ',
      type: TYPE.confidence,
      reversed: false,
      userAnswer: null,
    },
  ],
};

export const answerValues = {
  1: 'Strongly Disagree',
  2: 'Disagree',
  3: 'Neutral',
  4: 'Agree',
  5: 'Strongly Agree',
};

export const resultsData = [
  {
    type: TYPE.control,
    score: 0,
    total: 0,
    percentage: 0,
  },
  {
    type: TYPE.confidence,
    score: 0,
    total: 0,
    percentage: 0,
  },
  {
    type: TYPE.commit,
    score: 0,
    total: 0,
    percentage: 0,
  },
  {
    type: TYPE.challenge,
    score: 0,
    total: 0,
    percentage: 0,
  },
];
