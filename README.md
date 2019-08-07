# Building Real-time Apps with React

### Abstract
Adding realtime functionality to your app is a great way to drive engagement and provide value to your users. In this talk we'll look at some of the technologies you can use to add realtime features to your React / React Native apps, as well as how to use them. We'll also discuss how to architect your React apps with realtime data in mind.

Slides: https://slides.com/jaydenwindle/realtime-react

## Demo App
```bash
$ git clone git@github.com:jaydenwindle/realtime-react-talk.git
$ cd realtime-react-talk
```

### Using Local State
```bash
$ git checkout state
$ cd example_app && yarn start # start the app
```

### Using Polling
```bash
$ git checkout polling 
$ cd example_app && yarn start # start the app
$ cd example_server && node index.js # start the server
```

### Using Server Sent Events
```bash
$ git checkout sse
$ cd example_app && yarn start # start the app
$ cd example_server && node index.js # start the server
```

### Using Websockets
```bash
$ git checkout websockets
$ cd example_app && yarn start # start the app
$ cd example_server && node index.js # start the server
```