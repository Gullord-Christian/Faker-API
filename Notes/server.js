// importing express by declaring function
const express = require("express");
// calls on the function express (does not need to be called app)
const app = express();


// express configuration - allows POST -- needs to be above all routes and methods
app.use( express.json() );
// recognizes json
app.use( express.urlencoded({ extended: true }) );


// req is short for request
// res is short for response
const users = [
  { firstName: "Reimu",  lastName: "Hakurei"    },
  { firstName: "Marisa", lastName: "Kirisame"   },
  { firstName: "Sanae",  lastName: "Kochiya"    },
  { firstName: "Sakuya", lastName: "Izayoi"     },
  { firstName: "Momiji", lastName: "Inubashiri" }
];
  
// READ one -- get one item
//get request - takes 2 arguments: (path, function(request, response))
app.get("/api/users", (req, res) => {
  res.json( users );
});

// Create - POST
app.post("/api/users", (req, res) => {
  // req.body will contain the form data from Postman or from React
  // we can push it into the users array for now...
  // later on this will be inserted into a database
  users.push(req.body); 

  // we always need to respond with something
  res.json( { status: "ok" } );
});

// UPDATE -- PUT (read one + create)
app.put("/api/users/:id", (req, res) => {
  // we can get this `id` variable from req.params, we can get any variable if it exists in the params
  const id = req.params.id;

  // assuming this id is the index of the users array we can replace the user like so
  users[id] = req.body;

  // we always need to respond with something
  res.json( { status: "ok" } );
});

// DELETE - 
app.delete("/api/users/:id", (req, res) => {
  // we can get this `id` variable from req.params
  const id = req.params.id;
  // assuming this id is the index of the users array we can remove the user like so
  users.splice(id, 1);
  // we always need to respond with something
  res.json( { status: "ok" } );
});



// telling the server that we are running on a certain port
const server = app.listen(8000, () =>
  console.log(`Server is locked and loaded on port ${server.address().port}!`)
);
