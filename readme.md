#  Report.it

## Description
is a map based platform for reporting acts of discrimination against women, the LGBTQI+ community as well as ethnic and  religious minorities.

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
- Map filers with time an date

# Client/Frontend

## React Router Routes

| Path | Component     |  Permissions          | Behaviours | 
| ---- | --------------| --------------------- |----------- |
| `/` | `homepage` | all | Homapge with map of all reports|
| `/signup` | `SignupPage` |anon only|Signup form, link to login, navigate to homepage after signup|
| `/login` | `LoginPage` |anon only| Login form, link to signup, navigate to homepage after login|
|`/	` | `n/a`|anon only| Navigate to homepage after logout, expire session|
|`/report/add` | `ReportForm`|user only|Navigates to report form, navigates back to home page, with added report|
| `/report/:id`| `n/a` | user only|deletes the relevant report|
|`/account/:id` |Account |user only|Navigates to personal area|
|`/account/edit/:id` | `EditAccount`|user only| navigates to edit perosnal info form, and then back to personal area with saved edits|

## Components
- Account
- AnnonRoute
- CreateReport
- EditAccount
- EditReport
- Home
- Login
- Map
- Navbar
- OneReportInfo
- PrivateRoute
- SignUp

## Services
- Auth Service
    -   auth.login(user)
    -   auth.signup(user)
    -   auth.logout()
    -   auth.me()

- Report Service
    -   report.allReports()
    -   report.oneReport()
    -   report.createReport()
    -   report.updateReport()
    -   report.deleteReport()

- User Servicer
    -   user.userEdit()
    -   user.delete()

# Server/Backend

## Models

User model
```
{
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  dateOfBirth: {type: String},
  sex: {type: String, enum: ['', 'Male', 'Female', 'Trans', 'Intersex', 'Other']},
  sexualOrientation: {type: String, enum: ['', 'Heterosexual', 'Homosexual', 'Bisexual', 'Asexual', 'Other']},
  ethnicity: {type: String, enum: ['', 'White', 'Black', 'Asian', 'Hispanic', 'Latinx', 'Middle Eastern', 'Mixed', 'Other']},
  nationality: {type: String},
  reports: [{type: Schema.Types.ObjectId, ref:'Report'}]
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
}
```

Report model
```
{
  role: {type: String, required: true, enum: ['Victim', 'Witness']},
  motivation: {type: String, required: true, enum: ['Sexist', 'Racist', 'Homophobic', 'Transphobic', 'Islamophobic', 'Antisemitic', 'Other']},
  type: {type: String, required: true, enum: ['Verbal', 'Physical']},
  space: {type: String, required: true, enum: ['Outside', 'Inside']},
  description: {type: String},
  time: {type: String, required: true},
  date: {type: String, required: true},
  location: {type: [Number], required: true},
  user: {type: Schema.Types.ObjectId,ref:'User'}
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
}
```

## Api Endpoints

| HTTP Verb | Endpoint       | Request body            | Success | Error | Description                                                  |
| --------- | -------------- | ----------------------- | ------- | ----- | ------------------------------------------------------------ |
| `GET`| `/auth/me` |Saved Session| 200| 404| Check if user is logged in and return profile page                      |
| `POST`| `/auth/signup`  | user model| 200| 500 | Checks if fields not empty and user not exists, then create user with encrypted password, and store user in session|
| `POST`| `/auth/login` | {username, password}| 204 | 500| Checks if fields not empty, if user exists (404), and if password matches, then stores user in session login session.            |
| `GET`| `/auth/me`     | n/a | 200 | 500 | Returns user data from session storage, for react FE authentication. |
| `POST`|`/auth/logout`|id| | 204 |   Logs out the user |
| `GET`| `/report `| n/a | 200| 400 | finds all reports |
| `GET`| `/report/:id `| n/a | 200 | 400 | finds one report by ID |
| `POST`| ` /report`| {report-model}|201| 500|creates a new report|
| `PUT` | `	/report/:id` | {id, report-model}|200 | 501 |edits report details|
| `DELETE` | `/report/:id` |{id} |202|500|deletes report|
| `PUT` | `	/user/:id` | {id, user-model}|200|501|edits user information|
| `DELETE` | `/user/:id` | {id} |500|202|deletes users|


## Links
- [Trello](https://trello.com/b/AL5zm68u/reportit)
- [Git](https://github.com/jphrubant?tab=repositories)
- [Slides](https://docs.google.com/presentation/d/1QpxGmGoAFeYdrxLytdisQrgfHTWk8nlBKkTaoaGOxt4/edit#slide=id.g711faf2059_0_31)

