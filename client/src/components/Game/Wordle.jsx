import { useState, useEffect } from 'react';
import './Wordle.css';
import api from '../../utils/api';
import { useGame } from '../../hooks/useGame';

const WORD_LENGTH = 5;
const MAX_ATTEMPTS = 6;

function evaluateGuess(guess, target) {
  const result = [];
  const targetLetters = target.split('');
  const used = Array(targetLetters.length).fill(false);

  for (let i = 0; i < WORD_LENGTH; i++) {
    if (guess[i] === targetLetters[i]) {
      result.push({ letter: guess[i], status: 'correct' });
      used[i] = true;
    } else {
      result.push({ letter: guess[i], status: 'absent' });
    }
  }

  for (let i = 0; i < WORD_LENGTH; i++) {
    if (result[i].status === 'correct') continue;

    const letter = guess[i];
    const targetIndex = targetLetters.findIndex(
      (char, idx) => char === letter && !used[idx]
    );

    if (targetIndex !== -1) {
      result[i].status = 'present';
      used[targetIndex] = true;
    }
  }

  return result;
}

export default function Wordle({ setCurrentPage }) {
  const [targetWord, setTargetWord] = useState('');
  const [guessInput, setGuessInput] = useState('');
  const [guesses, setGuesses] = useState([]);
  const [results, setResults] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState('Arvaa 5 kirjaiminen sana');
  const [loadingWord, setLoadingWord] = useState(true);
  const [keyStatuses, setKeyStatuses] = useState({});
  const { submitGame, loading: submitting } = useGame();
  const [startTime] = useState(() => Date.now());

  useEffect(() => {
    const fetchWord = async () => {
      try {
        setLoadingWord(true);
        const response = await api.get('/game/word');
        setTargetWord(response.data.word.toLowerCase());
      } catch (error) {
        console.error('Failed to fetch daily word', error);
        setMessage('Could not load the daily word.');
      } finally {
        setLoadingWord(false);
      }
    };

    fetchWord();
  }, []);

  const saveResult = async (attempts) => {
    const elapsedSeconds = Math.max(1, Math.round((Date.now() - startTime) / 1000));

    try {
      await submitGame({
        word: targetWord,
        attempts,
        time: elapsedSeconds,
      });
    } catch (error) {
      console.error('Failed to save game result', error);
    }
  };

  const handleLetterClick = (letter) => {
    if (gameOver || loadingWord || submitting || guessInput.length >= WORD_LENGTH) return;
    setGuessInput((prev) => prev + letter.toLowerCase());
  };

  const handleBackspace = () => {
    setGuessInput((prev) => prev.slice(0, -1));
  };

  const handleGuess = async (e) => {
    e?.preventDefault();

    if (gameOver || loadingWord || submitting) return;

    const guess = guessInput.trim().toLowerCase();

    if (guess.length !== WORD_LENGTH) {
      setMessage('Please enter exactly 5 letters');
      return;
    }

    const evaluation = evaluateGuess(guess, targetWord);

    const nextGuesses = [...guesses, guess];
    const nextResults = [...results, evaluation];

    const nextStatuses = { ...keyStatuses };

    evaluation.forEach(({ letter, status }) => {
      const currentStatus = nextStatuses[letter.toLowerCase()];
      if (
        !currentStatus ||
        status === 'correct' ||
        (status === 'present' && currentStatus !== 'correct')
      ) {
        nextStatuses[letter.toLowerCase()] = status;
      }
    });

    setGuesses(nextGuesses);
    setResults(nextResults);
    setKeyStatuses(nextStatuses);
    setGuessInput('');

    if (guess === targetWord) {
      setGameOver(true);
      setMessage('Arvasit sanan oikein! Onneksi olkoon!');
      await saveResult(nextGuesses.length);
      return;
    }

    if (nextGuesses.length >= MAX_ATTEMPTS) {
      setGameOver(true);
      setMessage(`Peli päättyi. Sana oli ${targetWord.toUpperCase()}`);
      await saveResult(nextGuesses.length);
      return;
    }

    setMessage('Yritä toista arvausta');
  };

  const rows = Array.from({ length: MAX_ATTEMPTS }, (_, index) => {
    const guess = guesses[index] || '';
    const result = results[index] || null;

    return { guess, result };
  });

  const keyboardRows = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'Å'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ö', 'Ä'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
  ];

  return (
    <div className="wordle-page">
      <button className="back-button" onClick={() => setCurrentPage('home')}>
        ← Takaisin etusivulle
      </button>

      <div className="wordle-container">
        <h3>Päivän Sana</h3>
        <p className="wordle-status">{message}</p>

        <div className="wordle-grid">
          {rows.map((row, rowIndex) => (
            <div key={rowIndex} className="wordle-row">
              {Array.from({ length: WORD_LENGTH }, (_, colIndex) => {
                const letter = row.guess[colIndex] || '';
                const status = row.result?.[colIndex]?.status || '';

                return (
                  <div key={colIndex} className={`wordle-tile ${status}`}>
                    {letter.toUpperCase()}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        <form onSubmit={handleGuess} className="wordle-form">
          <input
            type="text"
            value={guessInput}
            onChange={(e) => setGuessInput(e.target.value.toLowerCase())}
            maxLength={WORD_LENGTH}
            disabled={gameOver || loadingWord || submitting}
            placeholder="Type a word"
          />
          <button type="submit" disabled={gameOver || loadingWord || submitting}>
            {submitting ? 'Saving...' : 'Arvaa'}
          </button>
          <button type="button" onClick={handleBackspace} disabled={gameOver || loadingWord || submitting}>
            Poista
          </button>
        </form>

        <div className="keyboard">
          {keyboardRows.map((row, rowIndex) => (
            <div key={rowIndex} className="keyboard-row">
              {row.map((letter) => {
                const status = keyStatuses[letter.toLowerCase()] || '';
                return (
                  <button
                    key={letter}
                    type="button"
                    className={`keyboard-key ${status}`}
                    onClick={() => handleLetterClick(letter)}
                  >
                    {letter}
                  </button>
                );
              })}
            </div>
          ))}

          <div className="keyboard-row">
            <button type="button" className="keyboard-key wide" onClick={() => handleGuess()}>
              Arvaa
            </button>
            <button type="button" className="keyboard-key wide" onClick={handleBackspace}>
              Poista
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
