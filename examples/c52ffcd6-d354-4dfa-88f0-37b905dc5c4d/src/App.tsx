import React, { useState, useEffect, useCallback } from 'react';
import { Timer, RefreshCw, Trophy, History, BarChart2, Volume2, VolumeX, Settings } from 'lucide-react';

const sampleTexts = [
  "生活就像骑自行车，为了保持平衡，你必须保持前进。",
  "学而不思则罔，思而不学则殆。",
  "千里之行，始于足下。",
  "不积跬步，无以至千里；不积小流，无以成江海。",
  "工欲善其事，必先利其器。",
  "天行健，君子以自强不息。",
  "业精于勤，荒于嬉；行成于思，毁于随。",
  "知之者不如好之者，好之者不如乐之者。",
  "读书破万卷，下笔如有神。",
  "书山有路勤为径，学海无涯苦作舟。"
];

const keySound = new Audio('data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA/+M4wAAAAAAAAAAAAEluZm8AAAAPAAAAAwAAAbAAkJCQkJCQkJCQkJCQkJCQkJCQwMDAwMDAwMDAwMDAwMDAwMDAwODg4ODg4ODg4ODg4ODg4ODg4ODg//////////////////////////8AAAAATGF2YzU4LjEzAAAAAAAAAAAAAAAAJAYAAAAAAAAAAbD5+staAAAAAAAAAAAAAAAAAAAA//MUZAAAAAGkAAAAAAAAA0gAAAAATEFN//MUZAMAAAGkAAAAAAAAA0gAAAAARTMu//MUZAYAAAGkAAAAAAAAA0gAAAAAOTku//MUZAkAAAGkAAAAAAAAA0gAAAAAN');

function App() {
  const [text, setText] = useState(sampleTexts[0]);
  const [input, setInput] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [isFinished, setIsFinished] = useState(false);
  const [mistakes, setMistakes] = useState(0);
  const [history, setHistory] = useState<Array<{ wpm: number; accuracy: number; date: Date }>>([]);
  const [bestScore, setBestScore] = useState({ wpm: 0, accuracy: 100 });
  const [countdown, setCountdown] = useState<number | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [difficulty, setDifficulty] = useState('normal');
  const [lastMistakeTime, setLastMistakeTime] = useState(0);
  const [isComposing, setIsComposing] = useState(false);
  const [committedInput, setCommittedInput] = useState('');

  const calculateWPM = useCallback(() => {
    if (!startTime) return 0;
    const timeInMinutes = (Date.now() - startTime) / 60000;
    const words = committedInput.length / 2;
    return Math.round(words / timeInMinutes);
  }, [committedInput.length, startTime]);

  const calculateAccuracy = useCallback(() => {
    if (committedInput.length === 0) return 100;
    const errors = Array.from(committedInput).reduce((count, char, index) => {
      return count + (char !== text[index] ? 1 : 0);
    }, 0);
    return Math.round(((committedInput.length - errors) / committedInput.length) * 100);
  }, [committedInput, text]);

  const playKeySound = () => {
    if (soundEnabled) {
      keySound.currentTime = 0;
      keySound.play().catch(() => {});
    }
  };

  const resetGame = () => {
    const newText = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
    setText(newText);
    setInput('');
    setCommittedInput('');
    setStartTime(null);
    setWpm(0);
    setAccuracy(100);
    setIsFinished(false);
    setMistakes(0);
    setCountdown(3);
    setIsComposing(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newInput = e.target.value;
    setInput(newInput);
    
    if (!isComposing) {
      setCommittedInput(newInput);
      
      if (!startTime && newInput.length === 1) {
        setStartTime(Date.now());
      }

      if (newInput.length <= text.length) {
        const lastChar = newInput[newInput.length - 1];
        const expectedChar = text[newInput.length - 1];
        
        if (lastChar === expectedChar) {
          playKeySound();
        } else {
          const now = Date.now();
          if (now - lastMistakeTime > 500) {
            setLastMistakeTime(now);
            if (soundEnabled) {
              new Audio('data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA/+M4wAAAAAAAAAAAAEluZm8AAAAPAAAAAwAAAeAAUFBQUFBQUFBQUFBQUFBQUFBQgICAgICAgICAgICAgICAgICAgKCgoKCgoKCgoKCgoKCgoKCgoKDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ//////////////////////////8AAAAATGF2YzU4LjEzAAAAAAAAAAAAAAAAJAUAAAAAAAAAAdDxzadRAAAAAAAAAAAAAAAAAAAA//MUZAAAAAGKAAAAAAAA0gAAAABTEFN//MUZAMAAAGKAAAAAAAAA0gAAAAAOTku//MUZAYAAAGKAAAAAAAAA0gAAAABNTMu//MUZAkAAAGKAAAAAAAAA0gAAAABNTMu').play().catch(() => {});
            }
          }
        }

        const newMistakes = Array.from(newInput).reduce((count, char, index) => {
          return count + (char !== text[index] ? 1 : 0);
        }, 0);
        setMistakes(newMistakes);

        if (newInput.length === text.length) {
          const finalWpm = calculateWPM();
          const finalAccuracy = calculateAccuracy();
          setIsFinished(true);
          setWpm(finalWpm);
          setAccuracy(finalAccuracy);
          setHistory(prev => [...prev, { wpm: finalWpm, accuracy: finalAccuracy, date: new Date() }]);
          
          if (finalWpm > bestScore.wpm) {
            setBestScore(prev => ({ ...prev, wpm: finalWpm }));
          }
          if (finalAccuracy > bestScore.accuracy) {
            setBestScore(prev => ({ ...prev, accuracy: finalAccuracy }));
          }
        }
      }
    }
  };

  useEffect(() => {
    if (!isFinished && startTime) {
      const interval = setInterval(() => {
        setWpm(calculateWPM());
        setAccuracy(calculateAccuracy());
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isFinished, startTime, calculateWPM, calculateAccuracy]);

  useEffect(() => {
    if (countdown !== null) {
      if (countdown > 0) {
        const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
        return () => clearTimeout(timer);
      } else {
        setCountdown(null);
      }
    }
  }, [countdown]);

  const averageWpm = history.length > 0 
    ? Math.round(history.reduce((sum, score) => sum + score.wpm, 0) / history.length)
    : 0;

  const averageAccuracy = history.length > 0
    ? Math.round(history.reduce((sum, score) => sum + score.accuracy, 0) / history.length)
    : 100;

  // 只使用已提交的输入内容计算进度
  const progressPercentage = startTime ? (
    committedInput.split('').reduce((count, char, index) => {
      return count + (char === text[index] ? 1 : 0);
    }, 0) / text.length * 100
  ) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center p-4">
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-indigo-600">打字练习</h1>
          <div className="flex gap-4">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              title={soundEnabled ? "关闭声音" : "开启声音"}
            >
              {soundEnabled ? <Volume2 size={24} /> : <VolumeX size={24} />}
            </button>
            <div className="relative">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                title="设置"
              >
                <Settings size={24} />
              </button>
              {showSettings && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg p-4 z-10">
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      难度设置
                    </label>
                    <select
                      value={difficulty}
                      onChange={(e) => setDifficulty(e.target.value)}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="easy">简单</option>
                      <option value="normal">普通</option>
                      <option value="hard">困难</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
            <button
              onClick={resetGame}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <RefreshCw size={20} />
              重新开始
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="flex items-center gap-2 bg-indigo-50 p-3 rounded-lg">
            <Timer className="text-indigo-600" />
            <span className="text-lg font-semibold">速度：{wpm} 字/分</span>
          </div>
          <div className="flex items-center gap-2 bg-indigo-50 p-3 rounded-lg">
            <Trophy className="text-indigo-600" />
            <span className="text-lg font-semibold">准确率：{accuracy}%</span>
          </div>
          <div className="flex items-center gap-2 bg-indigo-50 p-3 rounded-lg">
            <History className="text-indigo-600" />
            <span className="text-lg font-semibold">最佳：{bestScore.wpm} 字/分</span>
          </div>
          <div className="flex items-center gap-2 bg-indigo-50 p-3 rounded-lg">
            <BarChart2 className="text-indigo-600" />
            <span className="text-lg font-semibold">平均：{averageWpm} 字/分</span>
          </div>
        </div>

        <div className="mb-2 w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        <div className="mb-8 p-4 bg-gray-50 rounded-lg relative">
          {countdown !== null && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-50 bg-opacity-90 rounded-lg">
              <span className="text-6xl font-bold text-indigo-600">{countdown}</span>
            </div>
          )}
          <p className="text-xl leading-relaxed">
            {text.split('').map((char, index) => {
              let color = 'text-gray-600';
              if (index < committedInput.length) {
                color = committedInput[index] === char ? 'text-green-600' : 'text-red-600';
              }
              return (
                <span key={index} className={color}>
                  {char}
                </span>
              );
            })}
          </p>
        </div>

        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          onCompositionStart={() => setIsComposing(true)}
          onCompositionEnd={() => {
            setIsComposing(false);
            setCommittedInput(input);
          }}
          disabled={isFinished || countdown !== null}
          className="w-full p-4 text-xl border-2 border-indigo-200 rounded-lg focus:border-indigo-600 focus:outline-none transition-colors"
          placeholder="开始输入..."
        />

        {isFinished && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-center text-green-700 text-lg">
              恭喜完成！
              <br />
              最终速度：{wpm} 字/分
              <br />
              准确率：{accuracy}%
              <br />
              {wpm >= averageWpm && '太棒了！你超越了平均水平！'}
            </p>
          </div>
        )}

        {history.length > 0 && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-3">练习记录</h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between text-gray-600 mb-2">
                <span>平均速度：{averageWpm} 字/分</span>
                <span>平均准确率：{averageAccuracy}%</span>
              </div>
              <div className="h-24 flex items-end gap-1">
                {history.slice(-20).map((score, index) => (
                  <div
                    key={index}
                    className="bg-indigo-600 w-full"
                    style={{
                      height: `${(score.wpm / Math.max(...history.map(s => s.wpm))) * 100}%`,
                    }}
                    title={`速度: ${score.wpm} 字/分\n准确率: ${score.accuracy}%\n时间: ${score.date.toLocaleString()}`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;