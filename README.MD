# Fibonacci Numbers
This is an example full stack application.
It consists of two parts: backend and frontend.
- Server-side application built with ExpressJS.
- Client-side application built with React.

### Local deployment
In order to deploy Fibonacci Numbers app locally, you should install:
- Node JS ([Installing Node.js](https://nodejs.org/en/download/package-manager/))
- MySQL ([Download MySQL Community Server](https://dev.mysql.com/downloads/mysql/))

After installing MySQL server, create database user and database. Open terminal (command line).  
Access MySQL-console:
```bash
mysql -u root -p
```
In MySQL-console run following commands to create user and database for the application.  
Create user with username **fibonacci** and password **011235** (change username and password if you wish):
```sql
CREATE USER 'fibonacci'@'localhost' IDENTIFIED BY '011235';
```
Create database named **fibonacci_db** (change database name if you wish):
```sql
CREATE DATABASE fibonacci_db;
```
Grant all rights to user **fibonacci** for database **fibonacci_db** (use your username and database name if you have changed them in previous steps):
```sql
GRANT ALL ON fibonacci_db.* TO 'fibonacci'@'localhost';
```
You can check new users rights with command:
```sql
SHOW GRANTS FOR fibonacci@localhost;
```
The output will be something like this:

>      +--------------------------------------------------------------------+
>      | Grants for fibonacci@localhost                                     |
>      +--------------------------------------------------------------------+
>      | GRANT USAGE ON *.* TO `fibonacci`@`localhost`                      |
>      | GRANT ALL PRIVILEGES ON `fibonacci_db`.* TO `fibonacci`@`localhost`|
>      +--------------------------------------------------------------------+
>      2 rows in set (0,00 sec)

Leave SQL-console:
```sql
quit
```

Navigate in the terminal (command line) to the folder, where you want this app to be stored.  
```bash
cd path/to/the/folder
```
And clone the app from repository:
```bash
git clone https://github.com/melnikov-anton/fib-numb.git
```
Navigate into apps folder:
```bash
cd fib-namb
```
Inside **fib-numb** folder run:
```bash
npm install
```
Navigate into **frontend** folder:
```bash
cd frontend
```
Inside **frontend** folder run:
```bash
npm install
```
And after that run (inside **frontend** folder):
```bash
npm run build
```
After installing modules and compiling React (frontend) app return into **fib-numb** folder:
```bash
cd ..
```
Inside **fib-numb** folder rename file **.env.example** to **.env**:
```bash
mv .env.example .env
```
Edit **.env** file in case you have changed username, password and database name.  
Now everything is ready to start application. To do it run:
```bash
node app.js
```
Open browser and navigate to [http://localhost:3000](http://localhost:3000) .
