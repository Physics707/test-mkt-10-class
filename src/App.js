import React, { useState, useEffect, useRef } from 'react';
import useAntiCheat from "./hooks/useAntiCheat";
// === ВОПРОСЫ ===
const testVariants = {
  1: [
    {
      q: "Какое из приведённых утверждений является первым положением МКТ?",
      a: [
        "Все вещества состоят из молекул, между которыми есть промежутки",
        "Молекулы движутся прямолинейно и равномерно",
        "Молекулы притягиваются только при соприкосновении",
        "Температура определяет массу молекул"
      ],
      correct: 0
    },
    {
      q: "Что доказывает броуновское движение?",
      a: [
        "Существование молекул и их хаотичное движение",
        "Наличие электромагнитного поля",
        "Существование атомного ядра",
        "Постоянство скорости света"
      ],
      correct: 0
    },
    {
      q: "Относительная молекулярная масса Mᵣ определяется как:",
      a: [
        "Отношение массы молекулы к 1/12 массы атома углерода-12",
        "Масса одного моля вещества в граммах",
        "Сумма масс всех атомов в молекуле",
        "Произведение числа Авогадро на массу молекулы"
      ],
      correct: 0
    },
    {
      q: "Число Авогадро Nₐ равно:",
      a: ["6,02·10²³ моль⁻¹", "3,14·10²³ моль⁻¹", "9,81·10²³ моль⁻¹", "1,6·10⁻¹⁹ моль⁻¹"],
      correct: 0
    },
    {
      q: "Молярная масса M связана с массой одной молекулы m₀ формулой:",
      a: ["M = m₀·Nₐ", "M = m₀/Nₐ", "M = Nₐ/m₀", "M = m₀ + Nₐ"],
      correct: 0
    },
    {
      q: "Какой газ состоит из одноатомных молекул?",
      a: ["Аргон", "Кислород", "Азот", "Углекислый газ"],
      correct: 0
    },
    {
      q: "Если температура газа увеличивается, то средняя кинетическая энергия молекул:",
      a: ["Увеличивается", "Уменьшается", "Не меняется", "Становится отрицательной"],
      correct: 0
    },
    {
      q: "Какой порядок размера молекул по методу Рэлея?",
      a: ["10⁻¹⁰ м", "10⁻⁶ м", "10⁻¹⁵ м", "10⁻³ м"],
      correct: 0
    },
    {
      q: "Рассчитайте количество вещества в 117 г натрия (M = 23 г/моль).",
      a: ["5,09 моль", "2,5 моль", "10 моль", "0,2 моль"],
      correct: 0
    },
    {
      q: "Масса молекулы кислорода (M = 32 г/моль) равна:",
      a: ["5,3·10⁻²⁶ кг", "3,2·10⁻²⁵ кг", "6,02·10⁻²³ кг", "1,66·10⁻²⁷ кг"],
      correct: 0
    }
  ],
  2: [
    {
      q: "Какое утверждение отражает третье положение МКТ?",
      a: [
        "Молекулы взаимодействуют друг с другом",
        "Молекулы имеют форму шара",
        "Молекулы движутся только при нагревании",
        "Молекулы не могут проникать друг в друга"
      ],
      correct: 0
    },
    {
      q: "Диффузия доказывает:",
      a: [
        "Непрерывное и хаотичное движение молекул",
        "Существование магнитного поля",
        "Квантовую природу света",
        "Постоянство атмосферного давления"
      ],
      correct: 0
    },
    {
      q: "Количество вещества ν вычисляется по формуле:",
      a: ["ν = N / Nₐ", "ν = m·M", "ν = m + M", "ν = N·Nₐ"],
      correct: 0
    },
    {
      q: "Моль — это количество вещества, в котором содержится столько же молекул, сколько атомов в:",
      a: ["12 г углерода", "1 г водорода", "16 г кислорода", "100 г воды"],
      correct: 0
    },
    {
      q: "Если N — число молекул, то масса тела m =",
      a: ["N·m₀", "N/m₀", "N + m₀", "m₀/N"],
      correct: 0
    },
    {
      q: "Какой из газов двухатомный?",
      a: ["Кислород", "Гелий", "Неон", "Аргон"],
      correct: 0
    },
    {
      q: "При охлаждении газа средняя скорость молекул:",
      a: ["Уменьшается", "Увеличивается", "Не меняется", "Становится равной нулю"],
      correct: 0
    },
    {
      q: "Порядок массы молекулы воды:",
      a: ["10⁻²⁶ кг", "10⁻²³ кг", "10⁻³⁰ кг", "10⁻¹⁸ кг"],
      correct: 0
    },
    {
      q: "Сколько молекул в 0,5 моль воды?",
      a: ["3,01·10²³", "6,02·10²³", "1,2·10²⁴", "1,5·10²²"],
      correct: 0
    },
    {
      q: "Масса молекулы азота (M = 28 г/моль) равна:",
      a: ["4,65·10⁻²⁶ кг", "2,8·10⁻²⁵ кг", "1,66·10⁻²⁷ кг", "6,02·10⁻²³ кг"],
      correct: 0
    }
  ]
};

const App = () => {
  // === Состояния ===
  const [screen, setScreen] = useState('start'); // 'start', 'disclaimer', 'test', 'result'
  const [studentName, setStudentName] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedVariant, setSelectedVariant] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answers, setAnswers] = useState(Array(10).fill(null));
  const [timeLeft, setTimeLeft] = useState(90); // 1.5 мин = 90 сек
  const [isTabFocused, setIsTabFocused] = useState(true);
  const [blurCount, setBlurCount] = useState(0);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const timerRef = useRef(null);
  const blurTimerRef = useRef(null);

  // === Сохранение попыток в localStorage ===
  useEffect(() => {
    const saved = localStorage.getItem('mkt-test-attempts');
    if (saved) setAttempts(parseInt(saved, 10));
  }, []);

  const saveAttempt = () => {
    const newAttempts = attempts + 1;
    setAttempts(newAttempts);
    localStorage.setItem('mkt-test-attempts', newAttempts.toString());
  };

  // === Античитинг ===
  useEffect(() => {
  const handleVisibilityChange = () => {
    if (document.hidden) {
      setIsTabFocused(false);
      setBlurCount(prev => prev + 1);

      // Завершаем тест сразу при первом сворачивании
      saveAttempt();
      calculateScore();
      setScreen('result');
    } else {
      setIsTabFocused(true);
    }
  };

  document.addEventListener('visibilitychange', handleVisibilityChange);
  return () => {
    document.removeEventListener('visibilitychange', handleVisibilityChange);
  };
}, []);


    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (blurTimerRef.current) clearTimeout(blurTimerRef.current);
    };
  }, [blurCount]);

  // === Таймер ===
  useEffect(() => {
    if (screen !== 'test') return;

    if (timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else {
      // Автоматический переход
      handleNext();
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [timeLeft, screen]);

  // === Вспомогательные функции ===
  const calculateScore = () => {
    let total = 0;
    const variant = testVariants[selectedVariant];
    answers.forEach((ans, i) => {
      if (ans !== null && ans === variant[i].correct) total += 1;
    });
    setScore(total);
  };

  const handleNext = () => {
    if (selectedAnswer !== null) {
      const newAnswers = [...answers];
      newAnswers[currentQuestion] = selectedAnswer;
      setAnswers(newAnswers);
    }

    if (currentQuestion < 9) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(answers[currentQuestion + 1]);
      setTimeLeft(90);
    } else {
      saveAttempt();
      calculateScore();
      setScreen('result');
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // === Компоненты ===
  if (screen === 'start') {
    return (
      <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
        <StarBackground />
        <div className="relative z-10 flex flex-col items-center justify-center p-6">
          <h1 className="text-3xl font-bold mb-2 text-cyan-300 neon-glow">Тест по физике — 10 класс</h1>
          <p className="text-xl mb-6 text-cyan-200">Основные положения МКТ газов</p>
          <p className="text-lg mb-6">Учитель физики: Кунгозин Даулет Багдашұлы</p>

          <input
            type="text"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            placeholder="ФИ учащегося"
            className="w-full max-w-md p-3 mb-4 rounded bg-gray-800 border border-cyan-500/30 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />

          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="w-full max-w-md p-3 mb-4 rounded bg-gray-800 border border-cyan-500/30 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
          >
            <option value="">Выберите класс</option>
            <option value="10Б">10Б</option>
            <option value="10Г">10Г</option>
            <option value="10Д">10Д</option>
          </select>

          <select
            value={selectedVariant}
            onChange={(e) => setSelectedVariant(e.target.value)}
            className="w-full max-w-md p-3 mb-6 rounded bg-gray-800 border border-cyan-500/30 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
          >
            <option value="">Выберите вариант</option>
            <option value="1">Вариант 1</option>
            <option value="2">Вариант 2</option>
          </select>

          <button
            onClick={() => {
              if (studentName && selectedClass && selectedVariant) {
                setScreen('disclaimer');
              }
            }}
            disabled={!studentName || !selectedClass || !selectedVariant}
            className={`px-8 py-3 rounded-lg font-bold transition-all duration-300 ${
              studentName && selectedClass && selectedVariant
                ? 'bg-cyan-600 hover:bg-cyan-500 neon-glow text-white'
                : 'bg-gray-700 text-gray-400 cursor-not-allowed'
            }`}
          >
            Далее
          </button>
        </div>
      </div>
    );
  }

  if (screen === 'disclaimer') {
    return (
      <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
        <StarBackground />
        <div className="relative z-10 flex flex-col items-center justify-center p-6">
          <h2 className="text-2xl font-bold mb-6 text-cyan-300 neon-glow">Внимание!</h2>
          <div className="bg-gray-800/70 p-6 rounded-xl max-w-2xl text-left border border-cyan-500/20">
            <ul className="list-disc pl-5 space-y-2">
              <li>На каждый вопрос даётся <strong>1,5 минуты</strong>.</li>
              <li>После истечения времени — автоматический переход к следующему вопросу.</li>
              <li><strong>При сворачивании вкладки/браузера тест завершится</strong> и засчитается как одна попытка.</li>
              <li>Правильные/неправильные ответы <strong>не показываются</strong> во время теста.</li>
              <li>Кнопка «Назад» отсутствует.</li>
              <li>Формулы отображаются в формате Unicode.</li>
            </ul>
          </div>
          <button
            onClick={() => {
              setScreen('test');
              setTimeLeft(90);
              setCurrentQuestion(0);
              setSelectedAnswer(answers[0] || null);
            }}
            className="mt-8 px-8 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-lg neon-glow transition-all"
          >
            Начать тест
          </button>
        </div>
      </div>
    );
  }

  if (screen === 'test') {
    const questions = testVariants[selectedVariant];
    const question = questions[currentQuestion];

    return (
      <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
        <StarBackground />
        <div className="relative z-10 p-4 max-w-3xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div className="text-2xl font-mono font-bold text-cyan-300 neon-glow">
              {formatTime(timeLeft)}
            </div>
            <div className="text-lg">Вопрос {currentQuestion + 1} из 10</div>
          </div>

          <div className="text-xl mb-6 p-4 bg-gray-800/50 rounded-lg">{question.q}</div>

          <div className="space-y-3 mb-8">
            {question.a.map((answer, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedAnswer(idx)}
                className={`w-full p-4 text-left rounded-lg transition-all duration-200 ${
                  selectedAnswer === idx
                    ? 'bg-cyan-900/80 border border-cyan-400 neon-glow text-cyan-100'
                    : 'bg-gray-800 hover:bg-gray-700/70 text-white'
                }`}
              >
                {answer}
              </button>
            ))}
          </div>

          <button
            onClick={handleNext}
            disabled={selectedAnswer === null}
            className={`px-8 py-3 font-bold rounded-lg transition-all ${
              selectedAnswer !== null
                ? 'bg-cyan-600 hover:bg-cyan-500 text-white neon-glow'
                : 'bg-gray-700 text-gray-400 cursor-not-allowed'
            }`}
          >
            {currentQuestion === 9 ? 'Завершить тест' : 'Далее'}
          </button>
        </div>
      </div>
    );
  }

  if (screen === 'result') {
    return (
      <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden flex flex-col items-center justify-center p-6">
        <StarBackground />
        <div className="relative z-10 bg-gray-800/70 p-8 rounded-2xl max-w-md text-center border border-cyan-500/30">
          <h2 className="text-3xl font-bold mb-6 text-cyan-300 neon-glow">Результаты</h2>
          <p><strong>ФИ:</strong> {studentName}</p>
          <p><strong>Класс:</strong> {selectedClass}</p>
          <p><strong>Вариант:</strong> {selectedVariant}</p>
          <p><strong>Баллы:</strong> {score} / 10</p>
          <p><strong>Попытка №:</strong> {attempts}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-lg neon-glow"
          >
            Пройти снова
          </button>
        </div>
      </div>
    );
  }

  return null;
};

// === Анимированный звёздный фон ===
const StarBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(100)].map((_, i) => {
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const delay = Math.random() * 5;
        const size = Math.random() * 2 + 1;
        return (
          <div
            key={i}
            className="absolute rounded-full bg-cyan-300 animate-pulse"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              width: `${size}px`,
              height: `${size}px`,
              animationDelay: `${delay}s`,
              opacity: Math.random() * 0.7 + 0.3,
            }}
          />
        );
      })}
    </div>
  );
};

// === Глобальные стили неона ===
const styles = `
  .neon-glow {
    box-shadow: 0 0 8px #00ffff, 0 0 16px #00ffff, 0 0 24px #00ffff;
    transition: box-shadow 0.3s ease;
  }
  body {
    margin: 0;
    background: #000;
    color: white;
    font-family: 'Segoe UI', system-ui, sans-serif;
  }
`;
const NeonStyle = () => <style>{styles}</style>;

export default () => (
  <>
    <NeonStyle />
    <App />
  </>
);
