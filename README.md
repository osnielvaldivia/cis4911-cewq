# Getting Started

These instructions will get you a copy of the project running on your local machine

## Prerequisites

You must have Git and NodeJS installed on your local machine:

- [Git](https://git-scm.com/downloads)
- [NodeJS](https://nodejs.org/en/download/)

After Git and NodeJS are installed you must clone the repository to your local machine.

Open CMD or any CLI in the folder you want to put the project and type this command

```bash
    git clone https://github.com/osnielvaldivia/cis4911-cewq.git
```

## Database setup

1. Obtain a Mongo Atlas URI to store data
2. Create a file called "default.json" in config
3. Structure the file like such

```json
{
  "mongoURI": "<MongoURIGoesHere>",
  "jwtSecret": "<JWTSecretGoesHere>"
}
```

## Install packages

Go to the project root and type in this command in a CMD or any CLI

```bash
npm install
```

## Run the API

Run dev nodemon server

```bash
npm run server
```

Run with just node

```bash
node server
```

## Maintenance

### Remove unused dependencies

1. In the root of the project run

```bash
npx depcheck
```

2. Remove any unused dependencies in package.json

3. Execute npm clean script

```bash
npm run clean
```

## Authors

- [Osniel Valdivia](https://github.com/osnielvaldivia)
- [Francisco Espinosa Castillo](https://github.com/francespinosa)
