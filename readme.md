#  Report.it

## Description
Report.it is a web-application that allows users to anonymously report acts of discrimination and harassment

## User Stories
- As a user I want to see the map of reports in my area
- As a user I need to create an account to report an assault
- As a user I want to edit my personal info
- As a user I want to edit/delete my account
- As a returning user I want to login on the platform
- As a logged in user I want to log out from my session
- As a user I want to delete a report
- 404: As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I  know it's my fault

## Backlog
- Heatmap
- Colour coded pins for differents types of attacks
- Personal map with own reports
- Resource page with links to local associations
- Map filers with motivation, verbal, time, date

# Client/Frontend

## React Router Routes

| HTTP Verb | Endpoint       | Request body            | Success | Error | Description                                                  |
| --------- | -------------- | ----------------------- | ------- | ----- | ------------------------------------------------------------ |
| `GET`    | `/auth/me` | `Saved Session` | 200     | 404   | Check if user is logged in and return profile page                      |
| `POST`    | `/auth/login`  | `{ username, password}` | 200     | 500   | Login route to log in the existing user.                     |
| `POST`    | `/auth/logout` | N/A                     | 204     | 500   | Logout route. Destroys the current login session.            |
| `GET`     | `/auth/me`     | N/A                     | 200     | 500   | Returns user data from session storage, for react FE authentication. |
|           |                |                         |         |       |                                                              |

## Components
- Navbar
- HomePage
- Map
- ReportForm
- EditAccount
- SignUp
- Login
- Account

## Services
- Auth Service
    auth.login(user)
    auth.signup(user)
    auth.logout()
    auth.me()
    auth.getUser() // synchronous

- Report Service
    report.getAll()
    report.getOneByUser(userId)
    report.create()
    report.delete(id)

- User Servicer
    user.details(id)
    user.edit(id)
    user.delete(id)

# Server/Backend

## Models

User model
```
{
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    dateOfBirth: {type: Date},
    sex: {type: String},
    sexualOrientation: {type: String},
    ethnicity: {type: String},
    nationality: {type: String},
    reports: [{type: Schema.Types.ObjectId, red:'Report'}]
}
```

Report model
```
{
    motivation: {type: String, required: true, enum: ['sexist', 'racist', 'homophobic', 'transphobic', 'islamophobic', 'antisemitic', 'other']},
    type: {type: String, required: true, enum: ['verbal', 'physical']},
    space: {type: String, required: true, enum: ['public', 'private']},
    description: {type: String, required: true},
    time: {type: time, required: true},
    date: {type: Date, required: true},
    location: {type: String, coordinates:[], required: true},
    user: {type: Schema.Types.ObjectId,ref:'User'}
}
```

## Api Endpoints

| HTTP Verb | Endpoint       | Request body            | Success | Error | Description                                                  |
| --------- | -------------- | ----------------------- | ------- | ----- | ------------------------------------------------------------ |
| `GET`    | `/auth/me` | `Saved Session` | 200     | 404   | Check if user is logged in and return profile page                      |
| `POST`    | `/auth/login`  | `{ username, password}` | 200     | 500   | Login route to log in the existing user.                     |
| `POST`    | `/auth/logout` | N/A                     | 204     | 500   | Logout route. Destroys the current login session.            |
| `GET`     | `/auth/me`     | N/A                     | 200     | 500   | Returns user data from session storage, for react FE authentication. |
|           |                |                         |         |       |                                                              |


## Links
[Trello](https://trello.com/b/AL5zm68u/reportit)
[Git]()
[Slides]()

