<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>

Languages: <a href="/README_PT.md" target="_blank">PT_BR: 🇧🇷</a>

# A Scheduling and Management Solution for Business Events

Desenvolver uma aplicação web com uma API RESTful para possibilitar a leitura da lista
de indicados e vencedores da categoria Pior Filme do Golden Raspberry Awards,
utilizando React para o frontend, Node.js para o backend, e MongoDB como banco de
dados.

## Dependencies and technologies

This project uses various dependencies to manage different aspects of the application. Below is a list of the principal dependencies and development dependencies.

#### @nestjs/mongoose

- Integrates Mongoose with NestJS for MongoDB support.

#### @nestjs/terminus

- Adds health check capabilities to the application.

#### bcrypt

- Library for hashing passwords.

#### mongoose

- MongoDB object modeling tool designed to work in an asynchronous environment.

#### winston

- A versatile logging library for Node.js.

#### mongan

- A versatile logging library for Node.js.

#### zod

- TypeScript-first schema validation library.

#### excelJs

- It provides a wide range of features for creating, reading, modifying, and formatting Excel files.

## Getting Started

### Running the Application in Docker

This application is containerized using Docker. To build and run the application in a Docker container, follow the steps below:

### Prerequisites

Make sure you have Docker and Docker Compose installed on your machine.

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

### 1. Clone the Repository

```bash
git clone https://github.com/your-repo/nestjs-app.git
cd nestjs-app
```

## 2. Installation

To install all the dependencies, use the package manager [npm](https://www.npmjs.com/)

```bash
npm install
```

### 3. Build and Run the Application

Use Docker Compose to build and run the application along with the MongoDB service:

```bash
docker compose up --build
```

If need to only to up the container of MongoDB service or the application separated, you can run:

```bash
docker-compose up nestjs-app --build
```

And run the mongo service app:

```bash
docker compose up mongo --build
```

docker-compose up --build -d ?????? testar isso aqui depois

### 4. Access the Application

Once the containers are up and running, you can access your NestJS application at:

```bash
http://localhost:3000
```

The MongoDB database will be running at:

```bash
mongodb://localhost:27017
```

### 5. Stop the Containers

When you're done, you can stop and remove the running containers by executing:

```bash
docker-compose down
```

This command will stop and remove all containers, networks, and volumes defined in the docker-compose.yml file.

## Additional Commands

### Rebuild the Containers

If you need to rebuild the containers without caching, you can use the following command:

```bash
docker-compose up --build --force-recreate --no-deps

```

### View Logs

To view the logs of the running containers:

```bash
docker-compose logs -f
```

## Database Modeling

## Authentication

If your API requires authentication, ensure you include the necessary headers or tokens in your requests.

## Postman Collections

- Import the Collection: You can import this collection into Postman by using the Import feature in Postman and selecting the JSON file of this collection.
- Run Requests: Use Postman to run requests against your API endpoints, test different scenarios, and view responses.

## Routes

### 1. Producers

- GET /producers
  - Description: Retrieve a list of all producers.
  - Response: Returns an array of producer objects.
- POST /producers
  - Description: Create a new producer.
  - Request Body: JSON object containing producer details (e.g., name).
  - Response: Returns the newly created producer object.
- GET /producers/
  - Description: Retrieve details of a specific producer by ID.
  - Response: Returns a producer object with the specified ID.
- PATCH /producers/
  - Description: Update details of a specific producer by ID.
  - Request Body: JSON object containing updated producer details.
    Response: Returns the updated producer object.
- DELETE /producers/
  - Description: Delete a specific producer by ID.
  - Response: Returns a confirmation message or error if the producer does not exist. 2.

### 2. Studios

GET /studios

Description: Retrieve a list of all studios.
Response: Returns an array of studio objects.
POST /studios

Description: Create a new studio.
Request Body: JSON object containing studio details (e.g., name).
Response: Returns the newly created studio object.
GET /studios/

Description: Retrieve details of a specific studio by ID.
Response: Returns a studio object with the specified ID.
PATCH /studios/

Description: Update details of a specific studio by ID.
Request Body: JSON object containing updated studio details.
Response: Returns the updated studio object.
DELETE /studios/

Description: Delete a specific studio by ID.
Response: Returns a confirmation message or error if the studio does not exist.

### 3. Movies

## GET /movies

Description: Retrieve a list of all movies.
Response: Returns an array of movie objects.
POST /movies

Description: Create a new movie.
Request Body: JSON object containing movie details (e.g., title, year, studioId, producerId).
Response: Returns the newly created movie object.
GET /movies/

Description: Retrieve details of a specific movie by ID.
Response: Returns a movie object with the specified ID.
PATCH /movies/

Description: Update details of a specific movie by ID.
Request Body: JSON object containing updated movie details.
Response: Returns the updated movie object.
DELETE /movies/

Description: Delete a specific movie by ID.
Response: Returns a confirmation message or error if the movie does not exist. 4. Winners
GET /winners

Description: Retrieve a list of all winners.
Response: Returns an array of winner objects.
POST /winners

Description: Create a new winner.
Request Body: JSON object containing winner details (e.g., name).
Response: Returns the newly created winner object.
GET /winners/

Description: Retrieve details of a specific winner by ID.
Response: Returns a winner object with the specified ID.
PATCH /winners/

Description: Update details of a specific winner by ID.
Request Body: JSON object containing updated winner details.
Response: Returns the updated winner object.
DELETE /winners/

Description: Delete a specific winner by ID.
Response: Returns a confirmation message or error if the winner does not exist.

## Demonstration Images

Documentation in development....

## Conclusion

Under development

## Contributing

Pull requests are welcome <3. Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
