# medium

A template of README best practices to make your README simple to understand and easy to use. 

## Table of Contents

- [Packages](#packages)
- [Installation](#installation)
- [Usage](#usage)
- [Support](#support)
- [Contributing](#contributing)

## Packages

- server
  - GraphQL server built with Node.js, Typescript, [Type-GraphQL](https://19majkel94.github.io/type-graphql/), Redis & PostgreSQL
- web
  - Next.js React website using Typescript
- common
  - Shared Typescript code between server & web

## Installation

1. Clone and install dependencies

```
git clone https://github.com/moritz91/medium.git
cd medium
yarn
```

2. Make sure you have PostgreSQL running on your computer with a database called `codeponder2` and a user who has access to that database with the username `postgres` and password `postgres`

- Mac: https://www.codementor.io/engineerapart/getting-started-with-postgresql-on-mac-osx-are8jcopb
- Windows: https://www.guru99.com/download-install-postgresql.html
- Docker: https://www.youtube.com/watch?v=G3gnMSyX-XM
- Linux: you know what your doing
- How to create a user: https://medium.com/coding-blocks/creating-user-database-and-adding-access-on-postgresql-8bfcd2f4a91e

3. Make sure you have redis running on your computer

- Mac: https://medium.com/@petehouston/install-and-config-redis-on-mac-os-x-via-homebrew-eb8df9a4f298
- Windows: https://redislabs.com/blog/redis-on-windows-10/
- Linux: you know what your doing

```
yarn build:deps
```

5. Setup Github client id and secret by going to https://github.com/settings/applications/new

- you can set `Application name` to anything you want
- `Homepage URL` can be either
  - https://github.com/benawad/codeponder (to connect w/main instance at codeponder.com)
  - https://localhost:3000 (to connect to instance on your computer locally)
- `Authorization callback URL`
  - http://localhost:4000/oauth/github

5. Create a `.env` file in `packages/server` and fill in your client id and secret

```
GITHUB_CLIENT_ID=<YOUR_CLIENT_ID_HERE>
GITHUB_CLIENT_SECRET=<YOUR_CLIENT_SECRET_HERE>
DB_USER=postgres
DB_PASS=postgres
SESSION_SECRET=asjdfkljaklsfs
```

6. While in the `server` package you can start the server with

```
yarn start
```

To verified it worked, you can go to http://localhost:4000

7. While in the `web` package you can start the website with

```
yarn dev
```

The website should be available at http://localhost:3000 now

## Support

Please [open an issue](https://github.com/moritz91/medium/issues/new) for support.

## Contributing

Please contribute using [Github Flow](https://guides.github.com/introduction/flow/). Create a branch, add commits, and [open a pull request](https://github.com/moritz91/medium/compare/).
