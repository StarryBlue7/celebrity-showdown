# Celebrity Showdown
tbd

## Summary - WIP
Celebrity Showdown application is deployed to [Heroku here](https://powerful-badlands-23075.herokuapp.com/).

tbd

### Database Schema
![Image celebshowdown_db database, underlying table relationships](./img/celebshowdown_db_schema.png)

### Homepage

### User Profile

### Showdowns


## Installation - WIP
Ensure you have Node.js installed locally to install packages to and from the public npm registry. Node.js installation documentation.

1. Clone the repository to your local machine.

2. Install application dependencies `npm install`.
Required when when you first set up the project for local development or use OR if any changes are made to the project's dependencies. More Node information here.

3. Set up your database mysql shell from the db folder in your terminal with `mysql -u root -p` Steps 2-4 need to be repeated after after any changes to your database or database modules.

4. `source schema.sql` to use the updated schema.

5. `quit` to exit your mysql shell.

6. From the root folder, add the seed data to your now established database with npn run seed

7. Then, start the application with npm start. 

8. Open the website in local browser at http://localhost:3001

## Usage - WIP


## Built with
* [Node](https://nodejs.org/en/) - Asynchronous event-driven JavaScript runtime environment that executes JavaScript code outside a web browser
* [NPM](https://www.npmjs.com/) - Node package manager, used in conjunction with JS and Inquirer to support application logic and Command Line interface.
  * [Axios](https://www.npmjs.com/package/axios) - Used for api request to CelebrityBucks
  * [MySQL2](https://www.npmjs.com/package/mysql2) - MySQL client to connect to a MySQL database for app Models.
  * [Sequelizejs](https://sequelize.org/) -  Promise-based Node.js ORM for Postgres, MySQL, MariaDB, SQLite and Microsoft SQL Server. Used for database creation and management via Models abstraction of database tables.
  * [Expressjs](https://expressjs.com/) - Leveraged for API's, utility methods, and middleware.
  * [Express Handlebars](https://www.npmjs.com/package/express-handlebars) - Used for page Views (app content templates).
  * [Express Session](https://www.npmjs.com/package/express-session) - Used for session authentication and managing cookies.
  * [Connect Session Sequelize](https://www.npmjs.com/package/connect-session-sequelize) - Used for session authentication.
  * [Dotenv](https://www.npmjs.com/package/dotenv) - Module for managing environmental variables.
  * [Bcrypt](https://www.npmjs.com/package/bcrypt) - Used for password hashing.
* [Bootstrap](https://getbootstrap.com/docs/5.0/getting-started/introduction/) - Style and icon framework.
* [CSS](https://devdocs.io/css/) - Custom application styling.
* [Javascript](https://developer.mozilla.org/en-US/docs/Web/javascript) - Core app logic
* [Git](https://git-scm.com/doc) - Version control system to track changes to source code
* [GitHub](https://docs.github.com/en) - Hosts the code repository

## Authors
|**Gabriel Crosetti** | **Vince Lee** | **Sarah Hollingsworth** |
|-----------------|---------------|------------------|
| - [Portfolio](https://gabrielcrosetti.github.io/my-portfolio/)| - [Portfolio](https://starryblue7.github.io/portfolio/)| - [Portfolio](https://sahhollingsworth.github.io/sarah-hollingsworth-portfolio_advanced-css/) |
| - [Github](https://github.com/gabrielcrosetti)| - [Github](https://github.com/StarryBlue7) | - [Github](https://github.com/sahhollingsworth) |
| - [LinkedIn](https://www.linkedin.com/in/gabriel-crosetti/)| - [LinkedIn](https://www.linkedin.com/in/vince-lee/) | - [LinkedIn](https://www.linkedin.com/in/sarahhollingsworth/)|

## Acknowledgements -
* Celebrity names, stats, and images generated from the [Celebrity Bucks API](https://rapidapi.com/brianiswu/api/celebrity-bucks/details) 

