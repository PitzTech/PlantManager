<h1 align="center">
  <img alt="Plant Manager" title="Plant Manager" src=".github/logo.png" />
</h1>
<blockquote align="center">“Sucesso não é o resultado de um jogo, mas o destino de uma jornada”!</blockquote>
<p align="center">
  <img alt="License" src="https://img.shields.io/static/v1?label=license&message=MIT&color=32B768&labelColor=000000">

 <img src="https://img.shields.io/static/v1?label=NLW&message=05&color=32B768&labelColor=000000" alt="NLW 05" />
</p>

<br>

<p align="center">
  <img alt="Plant Manager" src=".github/plantmanager.png" width="100%">
</p>

## ✨ Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

-  [React Native](https://reactnative.dev/)
-  [Typescript](https://www.typescriptlang.org/)
-  [Expo](https://expo.io/)

## 💻 Projeto

Aplicativo para lhe ajudar a lembrar de cuidar de suas plantas de forma fácil de acordo com cada tipo de plantinha.

## 🔖 Layout

Você pode visualizar o layout do projeto através [desse link](https://www.figma.com/file/IhQRtrOZdu3TrvkPYREzOy/PlantManager/duplicate). É necessário ter conta no [Figma](http://figma.com/) para acessá-lo.

## 🚀 Como executar

-  Clone o repositório
-  Instale as dependências com `yarn`
-  Inicie seu app com `expo start`
-  Inicie a fake api com `npx json-server --watch ./src/services/server.json -p 3333 --delay 700`. Substitua o host pelo seu endereço IP local. Faça o mesmo no arquivo API dentro de services.
-  Inicie a ponte o servidor `npx ngrok http 3333` e coloque o endereço criado na propriedade `baseUrl` do arquivo [/src/services/api.ts](/src/services/api.ts)

*  OBS: Caso teste em vm local: `adb reverse tcp:3333 tcp:3333` com a `baseURL: "http://localhost:3333"`

## 📄 Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE.md) para mais detalhes.

---

Projeto concluido com ♥ by PitzTech durante a NLW 5 :wave:

<p align="center">
  <a href="https://www.linkedin.com/in/victor-laurentino-do-nascimento/"><img alt="LinkedIn" src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white"></a>
  &nbsp;&nbsp;&nbsp;&nbsp;
  <a href="mailto:victorlaurentino7@gmail.com?subject=Oi%20Victor!%20Vim%20do%20seu%20GitHub"><img alt="Gmail" src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white"></a>
  &nbsp;&nbsp;&nbsp;&nbsp;
  <a href="https://www.linkedin.com/in/victor-laurentino-do-nascimento/"><img alt="LinkedIn" src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white"></a>
</p>

<sup>Apoio da [Rocketseat](https://discord.com/invite/gCRAFhc)</sup>
