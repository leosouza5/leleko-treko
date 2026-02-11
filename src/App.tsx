import { Header } from "./components/Header";
import styles from "./App.module.css"
import { Tip } from "./components/Tip";
import { Letter } from "./components/Letter";
import { Input } from "./components/Input";
import { Button } from "./components/Button";
import { LettersUsed, type LettersUsedProps } from "./components/LettersUsed";
import { WORDS, type Challenge } from "./utils/words";
import { useEffect, useState, useRef } from "react";
import { Toaster, toast } from "sonner";

export default function App() {
  const [score, setScore] = useState(0)
  const [letter, setLetter] = useState("")
  const [lettersUsed, setLettersUsed] = useState<LettersUsedProps[]>([])
  const [challenge, setChallenge] = useState<Challenge | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const ATTEMPTS_MARGIN = 5

  const handleRestartGame = () => {
    const isConfirmed = window.confirm("Tem certeza que deseja reiniciar o jogo?")

    if (isConfirmed) {
      startGame()
    }
  }
  const handleConfirm = () => {
    if (!challenge) {
      return
    }

    if (!letter.trim()) {
      toast.error("Digite uma letra")
      return
    }

    const value = letter.toUpperCase()

    console.log(lettersUsed);

    const exists = lettersUsed.find(letter => letter.value.toUpperCase() === value)

    if (exists) {
      toast.warning("Você já usou essa letra")
      return
    }

    const hits = challenge.word.toUpperCase().split("").filter(char => char === value).length

    const correct = hits > 0
    const currentScore = score + hits

    if (!correct) {
      toast.error("Letra não encontrada")
    }

    setLettersUsed(prev => [...prev, { value, correct }])
    setScore(currentScore)
    setLetter("")

    // Retorna o foco para o input
    setTimeout(() => {
      inputRef.current?.focus()
    }, 100)
  }

  function startGame() {
    const index = Math.floor(Math.random() * WORDS.length)
    const randomWord = WORDS[index]

    setChallenge(randomWord)
    setLetter("")
    setScore(0)
    setLettersUsed([])
  }

  function endGame(message: string) {
    toast.success(message, {
      duration: 5000,
    })
    startGame()
  }

  useEffect(() => {
    startGame()
  }, [])

  useEffect(() => {
    if (!challenge) {
      return
    }

    setTimeout(() => {
      if (score === challenge.word.length) {
        return endGame("Parabéns, você venceu!")
      }
      const attemptLimit = challenge.word.length + ATTEMPTS_MARGIN

      if (lettersUsed.length === attemptLimit) {
        return endGame("Que pena você usou todas as tentativas!")
      }
    })

  }, [score, lettersUsed.length])

  if (!challenge) {
    return
  }

  return (
    <div className={styles.container}>
      <Toaster position="top-center" richColors />
      <main>
        <Header
          current={lettersUsed.length}
          max={challenge.word.length + ATTEMPTS_MARGIN}
          onRestart={handleRestartGame} />
        <Tip tip={challenge.tip} />

        <div className={styles.word}>
          {challenge.word.split("").map((letter, index) => {
            const letterUsed = lettersUsed.find(
              used => used.value.toUpperCase() === letter.toUpperCase()
            )
            return <Letter key={index} value={letterUsed?.value} />
          })}

        </div>

        <h4>Palpite</h4>

        <div className={styles.guess}>
          <Input
            ref={inputRef}
            autoFocus
            maxLength={1}
            value={letter}
            placeholder="?"
            onChange={(e) => { setLetter(e.target.value) }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleConfirm()
              }
            }}
          />
          <Button title="Confirmar" onClick={handleConfirm} />
        </div>

        <LettersUsed data={lettersUsed} />
      </main>
    </div>
  )

}