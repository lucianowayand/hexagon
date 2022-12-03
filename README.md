## A simple blog to drag and drop to your server and start posting!
More than a simple blog, hexagon brings some administrative functions such as a password bank, a daily journal and more

### How to deploy
Clone this repository and tweak with the .env filling in the necessary information.

.env example:
```
DATABASE_URL='provider://user:password@address/hexagon?'
BASE_URL = "http://localhost:3000"
```

### Using planet scale, how to make alterations on the database
Prisma by default creates a shadow database to help on the migration process, but Planet Scale doesnt allow that. But its a quick fix, change the database url to the `development branch url` then use the command
```
npx prisma db push
```
to update the development database, after that create a deploy request and merge the branches.

Don't delete the development branch! There is no need to create and delete branches all the time, just keep using the same development branch