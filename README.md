# ChatArena

A group chat web app developed using node js, express js and socket.io. Here, user can chat in a particular group of same interest.

## Demo

You can visit the link below to experience this web app.

**Live Link:** [https://chatarena.onrender.com](https://chatarena.onrender.com)

  
## Tech Stack

**Client:** Ejs template engine, CSS, Bulma CSS

**Server:** Node, Express, Socket.io

**Database:** MongoDB Atlas

  
## Screenshots

![chatlist](https://user-images.githubusercontent.com/63785612/127862277-f757161b-1ad9-4e3e-83f1-bbcd2d5c99fa.JPG)
![chatwindow](https://user-images.githubusercontent.com/63785612/127862561-01dc5d81-e81e-4f48-ae1b-bb3f10194d56.JPG)

  
## Run Locally

Clone the project

```bash
  git clone https://github.com/Rohit-Gupta11/chatArena.git
```

Go to the project directory

```bash
  cd chatArena
```

Install dependencies

```bash
  npm install
```

Create a .env file and write the following in this file.

```bash
  MONGO_URI='<Your MongoDB connection URI>'
```


Start the server

```bash
  npm start
```


## Features

- Realtime group chatting
- User Authentication with JWT (Web tokens)
- Chat history storage in MongoDB Atlas
- Multiple groups available to chat
- Alert on other user appears and leaves
- Cross platform
  
