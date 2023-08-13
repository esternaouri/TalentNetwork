# TalentNetwork

The TalentNetwork is a web API application that provides users with access to Suppliers, employees, subcontractors data.

the API allows users to search for workers  by name , category & more users data.
this application is kind of Social Media
it also allows Creators & Admin to access, create, edit & delete users.

the fronted application can be find here : https://github.com/esternaouri/ClientApp.

----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
instalation :

To install the TalentNetwork API, follow these steps:

Clone the repository to your local machine using the following command:
git clone https://github.com/esternaouri/TalentNetwork

Open the solution file TalentNetwork.sln in Visual Studio.

Build the solution to restore NuGet packages and compile the project.

Create a new Microsoft SQL Server database to store the application data.

Open the file appsettings.json located in the TalentNetwork project folder and modify the following connection string with your own Microsoft SQL Server database connection string:
"ConnectionStrings": {
  "TalentNetwork": "Server=<your-server-name>;Database=<your-database-name>;Trusted_Connection=True;MultipleActiveResultSets=true"
}
Open the Package Manager Console in Visual Studio, select the TalentNetworkDAL project, and run the following command to create the database schema:
Update-Database
Run the project in Visual Studio, The API server should now be running on your local machine.
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
usage: 
to run without installation, the app is hosted on a private server, please go here - https://talentnetwork20230728135054.azurewebsites.net/{any api endpoint }.
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
To use the API, you can send HTTP requests to the API's endpoints using a tool such as Postman .
for looging in you have to be autorized. 
using jwt .
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

User Registration: - User must register himself by filling some personal details.
User Login: After registration user will enter User Id and password for logging in order to get access to the system.
Search in posts: User can search/sort posts.
Create post: users  can create new details for theire post and more CRUD action.
Massages: User can send messege by direct connecting to watssup 
Personal: User can edit/delette personal details on his  own post  aswell.
Admmin: can mange users data like password reset, or editing and more CRUD action.
 

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
The program is divided into 3 projects implementing the N-Tiers Architecture.

Database is created with Entity Framework Code First.
Data is seeded on installation.
queries are written in LINQ.
Usage of Repository Pattern & implementation of dependency injection.
Usage of AutoMapper & DTO's.
Usage of OData queries for filtering/ordering/sorting.
Global Exception Handling custom Middleware for Auth Controller with custom exceptions.
JWT Authentication.
Authorization: 2  user roles - [IsAdmin/ ! IsAdmin].
Identity Core usage.

Caching custom Middleware: responses are saved in cache for 10 seconds.
Api Versioning for possiable future development.















