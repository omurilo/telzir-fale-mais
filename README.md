# Desafio Vizir 

## Fale Mais - Telzir

### O Fale mais é uma iniciativa da Telzir para deixar transparente a nossa relação com o cliente, com ela é possível saber antes/depois quanto custou uma chamada.

# Objetivo

### Construir uma aplicação, abordando orientação a objetos, arquitetura de software, testes, clean code, e responsividade.

# Aplicações
> Linguagem escolhida: Javascript

- **Backend utilizando Hapi.js (Node.js)**
  - Para armazenar os dados será utilizado um banco PostgreSQL

- **Frontend utilizando React JS**

# Primeiros Passos

### 1 - Clonar esse repositório na sua máquina
```bash
git clone git@github.com:omurilo/telzir-fale-mais.git && cd telzir-fale-mais
```

### 2 - Criar o .env e configurar as váriaveis de ambiente
```bash
# copy .env.example, go to .env.development and configure a variables
cp backend/.env.example backend/.env.development
code backend/.env.development
```

### 3 - Se você tiver docker na sua máquina, rode:
```bash
npm run docker:dev # to initialize postgres and api in dev mode
```

> Mas se você não tiver o docker, precisará de uma instância do PostgreSQL rodando, após confirmar isso, rode:

```bash
npm run migrate && npm run dev
```

### Voilá! A Api já estará rodando, os seeds já foram inseridos e agora é só partir pro frontend e depois testar.

### 4 - Iniciar a aplicação do frontend