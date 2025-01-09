# API Endpoints

## auth

### login

`url/users/login` type: post raw : { "email":"<sumanmihirp1@gmail.com>",
"password":"test@123" }

### register

`url/users/register` type: post raw : { "email": "<sumanmihirp1@gmail.com>",
"username": "mihir", "password": "test@123", "fullname": "Mihir Suman" }

## Reminders

endpoint - `url/reminder`

### add reminder

`endpoint/addReminder` type: post BE LOGGED IN FIRST raw: { "title":"remind me
to kill them all", "description":"title of your sex tape" }

### get reminder

`endpoint/getReminder` type: get
