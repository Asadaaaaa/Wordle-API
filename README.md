# Wordle API

Welcome to the backend API for the Wordle game by OctaTech! This API allows you to start a new game session, submit guessed words, and retrieve game status. You can access the frontend web version of the Wordle game at https://wordle.otech.id.

## Endpoints

### Session

#### GET /api/session

Retrieves a session code for a new game.

**Response**

```json
{
  "sessionCode": "{session code}"
}
```

### Words

#### GET /api/play?session={session code}

Starts a game session with the specified session code.

**Response**

```json
{
  "resCode": 1,
  "message": "Session Not Found!"
}
```

```json
{
  "resCode": "OK",
  "session": "{session code}"
}

```


#### POST /api/guessed

Submits a guessed word for the specified session.

**Request Body**

```json
{
  "session": "{session code}",
  "guessed": ["{array of alphabet}"]
}
```

**Response**

```json
{
  "resCode": 1,
  "message": "Session Not Found!"
}
```

```json
{
  "session": "{session code}",
  "resCode": 2,
  "message": "Words Not Found!"
}
```

```json
{
  "session":"{session code}",
  "resCode": "OK",
  "guessed": ["{array of guessed words}"],
  "message": "You Lose!"
}
```

```json
{
"session": "{session code}",
"resCode": "OK",
"guessed": ["{array of guessed words}"],
"message": "Added guessed word!"
}
```

```json
{
  "session":"{session code}",
  "resCode": "OK",
  "guessed": true,
  "message": "You Win!"
}
```

## Usage

To use this API, simply send a request to the appropriate endpoint with the required parameters. The response will be a JSON object containing the relevant data.

## Contributions

We welcome contributions to this project. If you have an idea for a new feature or have found a bug, please open an issue so we can discuss it. If you'd like to make a pull request, please follow the guidelines below:

1. Fork the repository.
2. Create a new branch for your feature.
3. Make your changes.
4. Test your changes to ensure they work as expected.
5. Commit your changes and push to your branch.
6. Open a pull request, describing the changes you've made and why they are necessary.

## License

This project is licensed under the MIT License.
```
MIT License

Copyright (c) 2022 Mikail Asada

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
