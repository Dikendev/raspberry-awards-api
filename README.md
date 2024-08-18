<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>

Languages: <a href="/README_PT.md" target="_blank">PT_BR: 🇧🇷</a>

# A Scheduling and Management Solution for Business Events

Develop a web application with a RESTful API to enable reading the list of nominees and winners of the Worst Picture category of the Golden Raspberry Awards, using React for the frontend, Node.js for the backend, and MongoDB as the database.

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
git clone https://github.com/Dikendev/raspberry-awards-api
cd raspberry-awards-api
```

### 2. Env file

Here is an example of a `.env` file to run the application

```plaintext
PORT=3000
NODE_ENV='dev'
ORGANIZATION=report
CONTEXT=raspberry
APP=HUB

DATABASE_URL="mongodb://localhost:27017"
```

### 3. Installation

To install all the dependencies, use the package manager [npm](https://www.npmjs.com/)

```bash
npm install
```

### 4. Build and Run the Application

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

### 5. Access the Application

Once the containers are up and running, you can access your NestJS application at:

```bash
http://localhost:3000
```

The MongoDB database will be running at:

```bash
mongodb://localhost:27017
```

### 6. Stop the Containers

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

## LOG

### Morgan

Morgan is a middleware for logging HTTP requests in Node.js applications. It provides a simple and customizable way to log incoming requests, including details such as the request method, URL, status code, and response time. This helps in monitoring and debugging the application's HTTP traffic.

- **Customizable Formats**: Supports various predefined log formats and allows custom formats.
- **Real-time Monitoring**: Provides real-time logging of HTTP requests, aiding in immediate debugging.
- **Stream Support**: Can be configured to stream logs to other logging libraries like Winston.
- **Performance**: Lightweight and does not significantly impact application performance.

### Winston

Winston helps in capturing and managing logs from different parts of the application, providing a comprehensive logging solution.

- **Multiple Transports**: Supports logging to multiple destinations like files, databases, and the console.
- **Log Levels**: Allows setting different log levels (e.g., info, error, debug) for better log management.
- **Custom Formats**: Supports custom log formats, including JSON and timestamped logs.
- **Asynchronous Logging**: Handles logging asynchronously, ensuring minimal impact on application performance.
- **Extensible**: Easily extendable with custom transports and plugins.

### CLS (Continuation-Local Storage)

CLS (Continuation-Local Storage) is used to maintain context across asynchronous calls in Node.js. It allows you to store and retrieve data throughout the lifecycle of a request, even as it passes through various asynchronous operations. This is particularly useful for logging, as it enables you to associate log entries with specific requests or transactions, providing better traceability and debugging capabilities.

- **Context Preservation**: Maintains context across asynchronous operations, ensuring consistent data access.
- **Request Tracking**: Associates log entries with specific requests, improving traceability.
- **Error Handling**: Enhances error tracking by maintaining context information across async calls.
- **Debugging**: Simplifies debugging by providing a consistent context throughout the request lifecycle.
- **Integration**: Easily integrates with logging libraries like Winston to enhance log context.

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

- GET /studios
  - Description: Retrieve a list of all studios.
  - Response: Returns an array of studio objects.
- POST /studios
  - Description: Create a new studio.
  - Request Body: JSON object containing studio details (e.g., name).
  - Response: Returns the newly created studio object.
- GET /studios/
  - Description: Retrieve details of a specific studio by ID.
  - Response: Returns a studio object with the specified ID.
- PATCH /studios/
  - Description: Update details of a specific studio by ID.
  - Request Body: JSON object containing updated studio details.
  - Response: Returns the updated studio object.
- DELETE /studios/
  - Description: Delete a specific studio by ID.
  - Response: Returns a confirmation message or error if the studio does not exist.

### 3. Movies

- GET /movies
  - Description: Retrieve a list of all movies.
  - Response: Returns an array of movie objects.
- POST /movies
  - Description: Create a new movie.
  - Request Body: JSON object containing movie details (e.g., title, year, studioId, producerId).
  - Response: Returns the newly created movie object.
- GET /movies/
  - Description: Retrieve details of a specific movie by ID.
  - Response: Returns a movie object with the specified ID.
- PATCH /movies/
  - Description: Update details of a specific movie by ID.
  - Request Body: JSON object containing updated movie details.
  - Response: Returns the updated movie object.
- DELETE /movies/
  - Description: Delete a specific movie by ID.
  - Response: Returns a confirmation message or error if the movie does not exist.

### 3. Analytics

- GET /analytics/largest-gap

  - Description: Retrieve the producer with the largest gap between wins.
  - Response: Returns an object containing the producer with the largest gap between wins.

- GET /analytics/fastest-wins

  - Description: Retrieve the producer with the fastest consecutive wins.
  - Response: Returns an object containing the producer with the fastest consecutive wins.

- GET /analytics/movie-counts
  - Description: Retrieve the count of movies for each producer.
  - Response: Returns an array of objects, each containing a producer and their respective movie count.

## Demonstration Images

Documentation in development....

## Conclusion

Project made for interview purpose

## Contributing

Pull requests are welcome <3. Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
