# Advinhe

Projeto React + TypeScript de um jogo simples de adivinhar palavras por letras, com tema de tecnologia.

## Sobre o projeto

O jogador recebe uma dica e tenta descobrir a palavra, digitando uma letra por vez.

Principais comportamentos:

- Escolhe uma palavra aleatoria da lista em `src/utils/words.ts`
- Mostra dica da palavra atual
- Aceita 1 letra por tentativa
- Bloqueia letra repetida
- Mostra feedback com notificacoes (`sonner`)
- Lista letras usadas, destacando acerto e erro
- Reinicia automaticamente ao vencer ou perder
- Permite reinicio manual pelo botao no cabecalho

## Regras do jogo

- O limite de tentativas e: `tamanho da palavra + 5`
- Cada acerto soma pontos com base na quantidade de ocorrencias da letra na palavra
- O jogo termina com vitoria quando a pontuacao atinge o tamanho da palavra
- O jogo termina com derrota quando as tentativas chegam ao limite

## Tecnologias

- React 19
- TypeScript
- Vite
- CSS Modules
- Sonner (toasts)

## Estrutura principal

```text
src/
  App.tsx
  utils/words.ts
  components/
    Header/
    Tip/
    Letter/
    Input/
    Button/
    LettersUsed/
```

## Como rodar localmente

### Requisitos

- Node.js 18+ (recomendado 20+)
- npm

### Passos

```bash
npm install
npm run dev
```

Aplicacao em modo desenvolvimento:

- `http://localhost:5173`

## Scripts disponiveis

- `npm run dev`: inicia servidor de desenvolvimento
- `npm run build`: gera build de producao
- `npm run preview`: sobe servidor para testar build local

## Personalizacao

Para adicionar ou alterar desafios (palavra + dica), edite:

- `src/utils/words.ts`
