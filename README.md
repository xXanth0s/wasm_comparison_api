# API

This API is the endpoint for the comparison of JavaScript (Vue.js) and WebAssembly (Blazor)


## Installation

Use the package manager npm to install the API

```bash
npm install
```

## Database Installation
The API uses a mongoDB, which must be hosted locally. 
To install it, please check the [official website from MongoDB](https://docs.mongodb.com/manual/installation/) 

## Database Structure

The Database must contain several Collections. 
In the folder database is a json file for every collection. The collection must be named as the file.

## Configuration

The database connection sting, the database name and port can be changed in the `.env` file


## Usage

```
npm start:watch
```

## Endpoinds
```
/                                  # Default endpoint for smoke test 

[POST]   /result                   # Adds a result 
[GET]    /result/average           # Gets the average of all results for every browser, framework and count

[GET]    /sortable/:count          # Returns an array with {count} Elements
                                   # with different GUIDs (maximum 100.000)
[GET]    /sortable/number/:count   # Returns an array with {count} Elements
                                   # with different Integers (maximum 100.000)

[GET]    /task                     # Gets a list with To-Do Tasks
[POST]   /task                     # Adds a To-Do Task
[PUT]    /task/:id                 # Updates a To-Do Task
[DELETE] /task/:id                 # Deletes a To-Do Task

[GET]    /video                    # Gets a list of Video meta Data
[POST]   /video                    # Adds Meta Data (Video must be saved separatelt)
[GET]    /video/:id                # Gets meta data for specific video
[GET]    /video/thumbnail/:id      # Gets image file for video
[GET]    /video/data/:id           # Gets video file for video

```
