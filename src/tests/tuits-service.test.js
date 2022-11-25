/*
Cesar Guerrero
11/24/22
Team 12 - CS5500 Final

Please note that this code was taken from Assignment 3 
*/

import { findAllTuits, findTuitsByUser, findTuitById, createTuitByUser, deleteTuit } from "../services/tuits-service.js";
import { createUser, deleteUsersByUsername, findAllUsers } from "../services/users-service.js"

//We will make a fake user, post a Tuit from them, then delete both!
describe('User Creates a New Tuit', () => {

  //Create a new user!
  const newUser = {
    username: "Daemon",
    password: "IronThrone",
    email: "daemon@targaryen.com"
  };

  //We are putting a placeholder to hold the newly created Tuit ID so we can delte the Tuit
  let newTuitID = '';

  //Make sure the user doesn't exist!
  beforeAll(() => 
    deleteUsersByUsername(newUser.username)
  )

  //Delete the User and the Tuit
  afterAll(() => {
    deleteUsersByUsername(newUser.username);
    deleteTuit(newTuitID);
  })

  test('Can insert a new tuit with REST API', async () => {
    const createdUser = await createUser(newUser);

    let newTuit = {
      tuit: "Such a tragedy...",
      postedBy: createdUser._id
    }

    const createdTuit = await createTuitByUser(newTuit.postedBy, newTuit)
    newTuitID = createdTuit._id; //Saving it so we can delete it!

    //Now we need to make sure we got the right stuff!
    expect(createdTuit.tuit).toEqual(newTuit.tuit);
    expect(createdTuit.postedBy).toEqual(newTuit.postedBy);
  })
});

describe('Delete a given Tuit', () => {
  //Again create a user
  const newUser = {
    username: "Aemond",
    password: "IronThrone",
    email: "aemond@targaryen.com"
  };

  //We are putting a placeholder to hold the newly created Tuit ID so we can delte the Tuit
  let newTuitID = '';

  //Make sure the user doesn't exist!
  beforeAll(() =>{
    return deleteUsersByUsername(newUser.username)
  })

  //Delete the User and the Tuit
  afterAll(() => {
    deleteUsersByUsername(newUser.username);
    deleteTuit(newTuitID);
  })

  test('Can delete a tuit with REST API', async () => {
    const createdUser = await createUser(newUser);

    let newTuit = {
      tuit: "It was a fair trade...",
      postedBy: createdUser._id
    }

    const createdTuit = await createTuitByUser(newTuit.postedBy, newTuit)
    newTuitID = createdTuit._id; //Saving it so we can delete it!

    //Let's now delete the Tuit
    const status = await deleteTuit(createdTuit._id);

    expect(status.deletedCount).toBeGreaterThanOrEqual(1);
  })
});

describe('User can see all of their tuits', () => {
    //Create a new user that will now post a number of tuits
    const daemon = {
      username: "Daemon",
      password: "IronThrone",
      email: "daemon@targaryen.com"
    };

    //We are putting a placeholder to hold the newly created Tuit ID so we can delte the Tuit
    let newTuitIDs = [];

    //Make sure the user doesn't exist!
    beforeAll(() =>{
      return deleteUsersByUsername(daemon.username)
    })

    //Delete the User and the Tuit
    afterAll(() => {
      deleteUsersByUsername(daemon.username);
      newTuitIDs.map((tid) => {
          deleteTuit(tid);
      })
      
    })

    test('A user can see all of the tuits they have created with REST API', async () => {
      const createdUser = await createUser(daemon);
      let userID = createdUser._id;

      for(let i = 0; i < 10; i++){
        let newTuit = {
          tuit: `Lucky number: ${i}`,
          postedBy: createdUser._id
        }
    
        const createdTuit = await createTuitByUser(newTuit.postedBy, newTuit);
        newTuitIDs.push(createdTuit._id);
      }

      let allUserTuits = await findTuitsByUser(createdUser._id);

      allUserTuits.map((tuit) => {
          //Recall that the way our data is setup, calling findTuitsByUser()
          //will send the user object itself into the 'postedBy' field
          expect(tuit.postedBy._id).toEqual(userID);
          expect(tuit.postedBy.username).toEqual(createdUser.username);
          expect(tuit.postedBy.password).toEqual(createdUser.password);
          expect(tuit.postedBy.email).toEqual(createdUser.email);
      })
    })
});

describe('Find a given Tuit by its ID', () => {
    const rhaenyra = {
        username: "queen_rhaenyra",
        password: "truequeen",
        email: "rhaenyra@targaryen.com"
    }

    let newTuitID = '';

    //Setup
    beforeAll(() => {
      return deleteUsersByUsername(rhaenyra.username)
    })

    //Clean up
    afterAll(() => {
        deleteUsersByUsername(rhaenyra.username);
        deleteTuit(newTuitID);
    })

    test('Retrieve a tuit from REST API by its primary key', async () => {
        
        //Create a new user so we can have them post a Tuit
        const createdUser = await createUser(rhaenyra);

        let rhaenyraTuit = {
            tuit: "House of the Dragon",
            postedBy: createdUser._id
        }

        const createdTuit = await createTuitByUser(createdUser.postedBy, rhaenyraTuit);
        //Save the ID
        newTuitID = createdTuit._id;

        //Quick check that everything is good
        expect(createdTuit.tuit).toEqual(rhaenyraTuit.tuit);
        expect(createdTuit.postedBy).toEqual(rhaenyraTuit.postedBy);
        
        //Now we need to test our find by ID
        const foundTuit = await findTuitById(createdTuit._id);

        //Recall that the way our data is setup postedBy is another object
        expect(foundTuit.tuit).toEqual(createdTuit.tuit);
        expect(foundTuit.postedBy._id).toEqual(createdTuit.postedBy);
        expect(foundTuit.postedBy.username).toEqual(rhaenyra.username);
        
    })
});

//We want to get all the Tuits in the database
describe('can retrieve all tuits with REST API', () => {
    //We need 3 users to create our Tuits
    const usernames = ['rhaenyra', 'daemon', 'viserys']

    const tuitIDs = []

    beforeAll(() => {
      return usernames.map(username => {
          createUser({
            username,
            password: `${username}1`,
            email: `${username}@targaryen.com`
          })
      })
    })

    afterAll(() => {
        //Delete the users
        usernames.map(username => {
          return deleteUsersByUsername(username);
        })

        //Delete the tweets
        tuitIDs.map((tuitID) => {
            return deleteTuit(tuitID);
        })
    })
    
    test('Can retrive all Tuits from REST API', async () => {
        //Grab all of the users so we can find our specific ones
        const allUsers = await findAllUsers();

        const createdUsers = allUsers.filter((user) => {
            return usernames.indexOf(user.username) >= 0
        });

        //Use our created users to have them each create a new Tuit
        for(let i = 0; i < createdUsers.length; i++){
          let createdUser = createdUsers[i];
          const createdTuit = await createTuitByUser(createdUser._id, {
            tuit: createdUser.username,
            postedBy: createdUser._uid
          })

          tuitIDs.push(createdTuit._id);
        }

        //Now we grab all of them
        const allTuits = await findAllTuits();

        //Now we need to see if we find our Tuits!
        const insertedTuits = allTuits.filter((tuit) => {
            tuitIDs.indexOf(tuit._id) >= 0
        })

        insertedTuits.map((tuit) => {
          //User the username associaed with the given tweet to find it within the array we used
          const username = usernames.find(username => username === tuit.postedBy.username);
          expect(tuit.postedBy.username).toEqual(username);
          expect(tuit.postedBy.tuit).toEqual(username);
        })

        
    })

});
