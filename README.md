
# Pizza Shop

Projeto desenvolvido nas aulas de ReactJS da plataforma Rocketseat, utilizando Vite. Se trata de uma aplicação de delivery de comida, onde se pode acompanhar os pedidos e diversas métricas.

O projeto foi desenvolvido em ReactJS, utilizando do Tailwind CSS, react-router-dom, react-hook-form, axios, Recharts, e diversas outras ferramentas.

[![Using](https://skillicons.dev/icons?i=react,vite,tailwind&perline=3)](https://skillicons.dev)
## Documentação

O back-end da aplicação pode ser encontrado nesse link: [pizzashop-api](https://github.com/rocketseat-education/pizzashop-api)

*Será necessário utilizar o Docker para o banco de dados Postgres. Ali tem a documentação com os comandos necessários para montar o banco no Docker.

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env.local (deve ser criado)

`VITE_API_URL` (URL da api. Ex: http://localhost:3333)

`VITE_ENABLE_API_DELAY` (boolean para simular delay, false caso não queira)


### •Testes 


Caso não queira utilizar o backend fornecido, pode-se utilizar a biblioteca de testes Vitest. Foram criados alguns testes, que podem ser executados com o comando `pnpm run test`

[![Using](https://skillicons.dev/icons?i=vitest&perline=3)](https://skillicons.dev)

Além do mais, foi utilizada a biblioteca MSW para rodar a aplicação com dados fictícios, através de mocks, e a ferramenta PlayWright para rodar testes e2e. Os mocks estão na pasta `src/api/mocks`

Abrir a aplicação com os dados fictícios: `pnpm run dev:test`

Abrir o playwright para testes e2e: `pnpm playwright test --ui`

**Os testes e2e estão na pasta `/test`