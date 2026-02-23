# Polo 🌐

![Badge de Licença](https://img.shields.io/badge/license-MIT-blue.svg)
![Badge do GitHub](https://img.shields.io/github/last-commit/Fortuna09/Polo)
[![Netlify Status](https://api.netlify.com/api/v1/badges/3f07841a-7ed1-4765-a04a-fb4ec6a3fabd/deploy-status)](https://app.netlify.com/projects/polodata/deploys)

![Prévia do Polo em ação](./previa-polo.gif)

### [➡️ Acesse a demonstração ao vivo aqui!](https://polodata.netlify.app/)

---

## 📖 Sobre o Projeto

**Polo** é um dashboard interativo de exploração de dados globais, construído para transformar números complexos do Banco Mundial em visualizações claras e intuitivas. Este projeto foi desenvolvido como uma peça central de portfólio para demonstrar habilidades avançadas em desenvolvimento front-end, visualização de dados e design de UI/UX.

A plataforma permite que os usuários comparem países, analisem tendências ao longo do tempo e explorem dados geoespaciais através de uma interface limpa, responsiva e com um tema customizado.

## ✨ Features

- **Seleção Dinâmica de Indicadores:** Alterne entre diferentes conjuntos de dados como PIB, População Total e Expectativa de Vida.
- **Filtros Interativos:** Refine a visualização por ano e selecione múltiplos países para comparação.
- **Múltiplos Tipos de Gráficos:** Visualize os dados de três formas distintas:
    - **Gráfico de Barras:** Para comparações diretas entre países em um único ano.
    - **Gráfico de Linhas:** Para analisar a tendência de um ou mais países ao longo do tempo.
    - **Mapa Mundial (Coroplético):** Para uma visualização geoespacial da distribuição dos dados.
- **Tema Customizado e Moderno:** Paleta de cores "Índigo Profissional" com variáveis CSS para fácil manutenção e escalabilidade.
- **Experiência de Usuário Polida:**
    - **Landing Page** imersiva com animações sutis.
    - **Roteamento** entre a página de entrada e o dashboard com `react-router-dom`.
    - **Skeleton Loaders** para feedback visual durante o carregamento de dados.
    - **Tooltips customizados** e informativos em todas as visualizações.

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído com as seguintes tecnologias de ponta:

- **Front-End:** React, TypeScript, Vite
- **Roteamento:** React Router DOM
- **Estilização:** Tailwind CSS (com customização de tema e animações)
- **Visualização de Dados:**
    - Chart.js & react-chartjs-2
    - React Simple Maps
    - D3-Scale
- **Comunicação com API:** Axios

## 🚀 Como Executar o Projeto

Para rodar o Polo localmente, siga estes passos:

```bash
# 1. Clone o repositório
git clone https://github.com/Fortuna09/Polo

# 2. Navegue para a pasta do projeto
cd Polo

# 3. Instale as dependências
npm install

# 4. Inicie o servidor de desenvolvimento
npm run dev
```

Agora, abra [http://localhost:5173](http://localhost:5173) no seu navegador.

## 🧠 Desafios e Aprendizados

Durante o desenvolvimento do Polo, superei vários desafios técnicos que foram cruciais para meu aprendizado:

- **Gerenciamento de Dependências (React 18 vs 19):** O projeto foi iniciado com uma versão experimental do React 19, o que causou conflitos (`ERESOLVE`) com bibliotecas do ecossistema. O desafio foi diagnosticar a causa raiz e realizar o downgrade controlado para o React 18, garantindo a estabilidade e compatibilidade do projeto.
- **União de Dados Geoespaciais (Data Joining):** Um dos maiores desafios foi fazer a correspondência entre os dados da API do Banco Mundial e as formas geográficas do mapa. O problema foi resolvido através de um processo de debugging sistemático, utilizando `console.log` para inspecionar as estruturas de dados e implementando um "dicionário reverso" para garantir uma correspondência robusta entre os nomes e códigos dos países.
- **Refatoração para Múltiplos Indicadores:** Transformar o dashboard de uma visualização de um único dado (PIB) para uma plataforma flexível que suporta múltiplos indicadores exigiu uma refatoração significativa da lógica de estado, das chamadas de API e do processamento de dados para que todos os componentes se adaptassem dinamicamente.

## 📬 Contato

**Rafael Fortuna**

- **LinkedIn:** [linkedin.com/in/seu-perfil](https://www.linkedin.com/in/rafael-fortuna-990184264/)

.