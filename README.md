# fitfeel
SPA built to allow users to mentally check in before and after workouts. It can be as simple or as detailed as the user likes with pre-written selections and options to add more.

# Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites
Before you get started you'll need the following installed: 
- NodeJS
- npm

**Installing Node:***
If you have `homebrew` installed, in your console: 

`brew install node`

Verify node is installed with `node -v`:

```
$ node -v
v7.7.2
```

Verify npm is installed with `npm -v`:

```
$ npm -v
4.1.2
```

If no homebrew, install from the [Node Website](https://nodejs.org/en/) and verify as seen above.

### Installing
Save repository to desire directory & `cd` into the directory in your console:

`cd fitfeel`

Install all node modules:

`npm install`

To run both backend server and front app: 

`npm run dev`

Go to `http://localhost:3000` in your browser to view and test app.

### Running the tests
All backend tests written in [Jasmine](https://jasmine.github.io/pages/getting_started.html), React tests in [Cypress](https://www.cypress.io/) coming soon. To run tests, in the project directory:

`npm test`

# Deployment
Deployed through [Heroku](www.heroku.com):

In the project directory:

-After committing all changes to _master_:

`git push heroku master`

- If any changes made to the database:

`heroku db:seed:all`

- Visit the site:

https://piontekle-fitfeel.herokuapp.com/

# Upcoming features:

- [ ] React tests in Cypress
- [ ] Teammates to cheer user progress
- [ ] Prompts to check in upon sign in
- [ ] Scales for check in emotions to record range of feelings

# Built With

[ReactJS](https://reactjs.org/) - Frontend library

[NodeJS](https://nodejs.org/en/), [Express](https://expressjs.com/) - Backend engine and framework

[PostgreSQL](https://www.postgresql.org/) - Database

[Material Design Lite](https://getmdl.io/) - CSS library


=======

# Author
Lauren Piontek
=======

