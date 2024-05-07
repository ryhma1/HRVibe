# VHRVibe

This project is made for the group project creating a health-app in Metropolia.

In this ReadMe you'll understand the basics of the API server on how it's works and what type of functions it has.

<!--  -->

## Screenshots

`index.html / logged-index.html`
![index.html](/back-end/readme-pics/index.png)

`about.html / logged-about.html`
![about.html](/back-end/readme-pics/about-us.png)

`login-signup.html`
![login-signup.html](/back-end/readme-pics/login.png)
![login-signup.html](/back-end/readme-pics/signup.png)

`profile.html`
![profile.html](/back-end/readme-pics/profile.png)

`measure.html`
![measure.html](/back-end/readme-pics/measurements.png)

`settings.html`
![settings.html](/back-end/readme-pics/settings.png)

`user.html`
![user.html](/back-end/readme-pics/user.png)

`contact.html`
![contact.html](/back-end/readme-pics/contact.png)

<!--  -->

## Apidoc

Didn't successfully get Apidoc working. Overall documentation can be found in some parts of the code itself.

<!--  -->

## Endpoints

### Home

Login
```
POST http://localhost:3000/api/auth/login
content-type: application/json
```

Create a user (useless, since KubiosCloud credentials are used to login)
```
POST http://localhost:3000/api/users
content-type: application/json
```

---

### Logged In

### `/api/data`

Post profile data

```
POST http://localhost:3000/api/data
content-type: application/json
Authorization: Bearer <token>
```

Display users data in the profile (requires token)

```
GET http://localhost:3000/api/data
Authorization: Bearer <token>
```

---

### Measurements
(Doesn't work, problems fetching information from KubiosCloud)

### `/api/user-data`

```
GET http://localhost:3000/api/user-data
Authorization: Bearer <token>
```

### `/api/user-info`

```
GET http://localhost:3000/api/user-info
Authorization: Bearer <token>
```


<!--  -->

## Links

### App
[HRvibe](https://hyte-server.northeurope.cloudapp.azure.com)

### Git
[Front End, Back End & Testing](https://github.com/ryhma1/HRVibe)


<!--  -->

## Database

### Structure
![db](/back-end/db/hrvbie-db.png)

<!--  -->

## Bugs / Problems

- Profile information editing.
- KubiosCloud measurement data and information not available.
- App not working on the server due to framework issues.