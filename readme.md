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

## Backlog
- Heatmap
- Colour coded pins for differents types of attacks
- Personal map with own reports
- Resource page with links to local associations
- Map filers with motivation, verbal, time, date

# Client/Frontend

## React Router Routes

| Path | Component     |  Permissions          | Behaviours | 
| ---- | --------------| --------------------- |----------- |
| `/` | `homepage` | `all` | `Homapge with map of all reports` |
| `/signup` | `SignupPage` |`anon only` |`Signup form, link to login, navigate to homepage after signup` |
| `/login` | `LoginPage` |`anon only` | `Login form, link to signup, navigate to homepage after login`|
|`/	` | `n/a`|`anon only`| `Navigate to homepage after logout, expire session` |
|`/report/add` | `ReportForm`|`user only` |`Navigates to report form, navigates back to home page, with added report`|
| `/report/:id`| `n/a` | `user only` |`deletes the relevant report`|
|`/account/:id` |`Account` |`user only` |`Navigates to personal area`|
|`/account/edit/:id` | `EditAccount`|`user only`| `navigates to edit perosnal info form, and then back to personal area with saved edits`|

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
| `POST`    | `/auth/signup`  | `user model` | 200     | 500   | Checks if fields not empty and user not exists, then create user with encrypted password, and store user in session                     |
| `POST`    | `/auth/login` | `{username, password}`               | 204     | 500   | Checks if fields not empty, if user exists (404), and if password matches, then stores user in session login session.            |
| `GET`     | `/auth/me`     | N/A                     | 200     | 500   | Returns user data from session storage, for react FE authentication. |
|    `POST`      |  `/auth/logout  `            |        `id`                 |         |       |   Logs out the user |
|     `GET`     |      `/report `       |    n/a      |         |       |       finds all reports         |
| `POST`	| ` /report`	| `{report model}` |`creates a new report`|
| `DELETE` | `/report/:id` |	`{id}` |	`deletes report`|
| `PUT` | `	/user/:id` | `	{user model}	` | `		edits user information` |
| `DELETE` | `	/user/:id` | `	{id} `	| `	deletes users` |


## Links
[Trello](https://trello.com/b/AL5zm68u/reportit)
[Git]()
[Slides]()

