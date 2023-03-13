## A simple blog to drag and drop to your server and start posting!
More than a simple blog, hexagon brings some administrative functions such as a password bank, a daily journal and more

### Firebase
To mount the app even on your local machine you'll need firebase auth credentials, just add them to your `.env` file

### How to deploy
Clone this repository and tweak with the .env filling in the necessary information.

Follow this steps:

1- Create a docker container with the docker-compose file for mysql

2- Create the .env file with your database url and the firebase credentials

3- Run `npx prisma migrate dev --name init` to create the database

4- Run `npx prisma db seed --preview-feature` to populate the database with some initial data

5- Run `npm run dev` to start the server

.env example:
```
DATABASE_URL='provider://user:password@address/hexagon?'
BASE_URL = "http://localhost:3000"
FIREBASE_API_KEY=Abcdef...
FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
FIREBASE_PROJECT_ID=your-project
FIREBASE_STORAGE_BUCKET=your-project.appspot.com
FIREBASE_MESSAGING_SENDER_ID=345678...
FIREBASE_APP_ID=1:345....:web:abcde....
```

### Using planet scale, how to make alterations on the database
Prisma by default creates a shadow database to help on the migration process, but Planet Scale doesnt allow that. But its a quick fix, change the database url to the `development branch url` then use the command
```
npx prisma db push
```
to update the development database, after that create a deploy request and merge the branches.

Don't delete the development branch! There is no need to create and delete branches all the time, just keep using the same development branch


```
