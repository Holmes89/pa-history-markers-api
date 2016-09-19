# Pennsylvania History Markers
Full outline of functioning API will be published on a site in the near future.

## Prerequisites

You will need a [Node.js](http://nodejs.org) (with NPM) installed.

## Installation

`npm install`

## Running

* `node src/app.js`
* Visit api at [http://localhost:8080](http://localhost:8080).

## Customization

* process.env.PORT - set new PORT
* process.env.HOST - set host string for the documentation on api
* process.env.DATABASE - set database endpoint if hosting your own server

## Restore database

Database files can be found in the database directory.

Run the following command to restore:

`mongorestore --dir=database/ --gzip`
