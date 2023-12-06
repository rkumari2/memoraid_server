# MEMORAID API
This repository is for the back-end of Memoraid. It is meant to be used in conjunction with the [front-end](https://github.com/rkumari2/memoraid_client). 


## Installation and Usage
- **Clone** this repository: `git clone <repo>`
- Enter (`cd`) into repository folder
- Install dependencies: `npm install`
- Create a SQL database instance (ideally on [ElephantSQL](https://www.elephantsql.com/))
- Create a **.env** file in the repo folder and update the value below
```sh
DB_URL=postgresql://username:password@db_location/db_name
```
- Seed the database: `npm run setup-db`
- Run the app: `npm run dev`

## Available Endpoints
| Route | Method | Response | 
| --- | --- | --- |
| `/` | `GET` | Returns a JSON object describing the API |
| Users and Tokens | 
| `/users` | `GET` | Returns a JSON object containing all the users |
| `/users/tokens` | `GET` | Returns a JSON object containing all the tokens |
| `/users/register` | `POST` | Accepts a JSON object and uses it to create and store a new user |
| `/users/login` | `POST` | Accepts a JSON object and uses it to log in on the client side |
| `/users/tokens/:id` | `DELETE` | Deletes the token when a user logs out |
| Subjects | 
| `/subjects` | `GET` | Returns a JSON object containing all the subjects |
| `/subjects/:user_id` | `GET` | Returns a JSON object containing all the subjects using `user_id` |
| `/subjects/:user_id/new` | `POST` | Accepts a JSON object and uses it to create and store a new subject for a specific user based on `user_id` |
| `/subjects/topic/:subjectId` | `DELETE` | Deletes the subject using its `id` |
| Flashcards |
| `/flashcards` | `GET` | Returns a JSON object containing all the flashcards |
| `/flashcards/subjects/:subject_id` | `GET` | Returns a JSON object containing all the flashcards for a specific subject by its `subject_id` |
| `/flashcards/subjects/:subject_id/random` | `GET` | Returns a JSON object containing one random flashcard |
| `/flashcards/subjects/:subject_id/new` | `POST` | Accepts a JSON object and uses it to create and store a new flashcard in a specific subject using `subject_id` |
| `/flashcards/cards/:id` | `PATCH` | Accepts a JSON objecy and updates a flashcard based on its `id` |
| `/flashcards/cards/:id` | `DELETE` | Deletes a flashcard using its `id` |
| Scores |
| `/scores` | `GET` | Returns a JSON object containing all the scores |
| `/scores/:user_id` | `GET` | Returns a JSON object containing all the scores for a specific user using its `user_id` |
| `/scores/:user_id/new` | `POST` | Accepts a JSON object and uses it to create and store a new score for a specific user using `user_id` |
