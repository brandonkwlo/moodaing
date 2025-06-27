<h1 align="center">
<img src="./public/hippo.png" alt="moodaing" width="200">
<br>
Moodaing
</br>
</h1>

An AI Chrome extension designed to process user-selected text from a website or a page itself for snappy searches. Use it to explore more about what you're reading or if you're too lazy to switch tabs to the ChatGPT website.

![video_demo](./docs/moodaing_video_demo.gif)

## Tech Stack

- React
- Vite
- Chrome Extensions API
- TypeScript
- JavaScript
- HTML & CSS
- Groq API

## Setup

To clone the repository and use it, you will need [Node.js](https://nodejs.org/en/download/). Then:

```bash
# Clone the repository
$ git clone https://github.com/brandonkwlo/moodaing.git

# Go into repository
$ cd moodaing

# Install dependencies
$ npm install

# Build the extension
$ npm run build

# Run the backend server to run Groq
$ cd src/server
$ node index.js
```

Go to the Chrome Browser where you will navigate to the extension page within Chrome settings. Here, enable "developer mode", then click "Load unpacked" and select the "dist/" folder of the project.
