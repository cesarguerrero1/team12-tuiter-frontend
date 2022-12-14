import {
  findAllTuits,
  updateTuit,
  createUser, 
  blockUser,
  updateUser,
  deleteUser
} from "../services/admin-service";
import {createTuitByUser, deleteTuit} from "../services/tuits-service";


describe('findAllTuits', () => {
  const testUser = {
      username: 'testUser',
      password: 'testing123',
      email: 'test@robot.com'
  };
  // Multiple tuits to insert.
  const testTuitContents = [  
      'First', 'Second', 'Third'
  ];

  test('can retrieve all tuits with REST API', async () => {
      // Assumes createUser has been tested.
      const createdUser = await createUser(testUser);
      testTuitContents.map(async content => {
          const createdTuit = await createTuitByUser(createdUser._id, {"tuit" : content});

          // Verifies created tuit matches the parameter tuit.
          expect(createdTuit.tuit).toEqual(content);
          expect(createdTuit.postedBy).toEqual(createdUser._id);
      });

      const inDbTuits = await findAllTuits();
      // Number of tuits retrieved should be at least the number just inserted.
      expect(inDbTuits.length).toBeGreaterThanOrEqual(testTuitContents.length);
      console.log(inDbTuits);

      // Filters for the users just inserted.
      const tuitsInserted = inDbTuits.filter(
          tuit => testTuitContents.indexOf(tuit.tuit) >= 0);
      console.log(tuitsInserted);
      // Verifies the tuits inserted matched the ones just sent.
      tuitsInserted.forEach(tuit => {
          const testTuitContent = testTuitContents.find(content => content === tuit.tuit);
          expect(tuit.tuit).toEqual(testTuitContent);
      });

      // Cleans up after testing
      tuitsInserted.map(async tuit => {
          await deleteTuit(tuit._id);
      })
      deleteUser(createdUser._id);
  });

  test('can update tuit with REST API', async () => {
    const tuitText = "update api";
    // Assumes createUser has been tested.
    const createdUser = await createUser(testUser);
    const createdTuit = await createTuitByUser(createdUser._id, {"tuit" : tuitText});

    // Verifies created tuit matches the parameter tuit.
    expect(createdTuit.tuit).toEqual(tuitText);
    expect(createdTuit.postedBy).toEqual(createdUser._id);

    const inDbTuits = await findAllTuits();

    // Filters for the users just inserted.
    const tuitsInserted = inDbTuits.filter(
        tuit => tuit.tuit === tuitText);
    expect(tuitsInserted[0].tuit).toEqual(tuitText);

    const updatedTuitText = "update api test";
    const updatedTuit = await updateTuit(createdTuit._id, {"tuit" : updatedTuitText});
    console.log(updatedTuit);

    const inDbTuitsUpdate = await findAllTuits();

    // Filters for the users just inserted.
    const tuitsUpdated = inDbTuitsUpdate.filter(
        tuit => tuit.tuit === updatedTuitText);
    console.log(tuitsUpdated);
    expect(tuitsUpdated[0].tuit).toEqual(updatedTuitText);

    // Cleans up after testing
    await deleteTuit(createdTuit._id);
    await deleteUser(createdUser._id);
});
});

describe('createUser', () => {
    // sample user to insert
    const ripley = {
      username: 'ellenripley',
      password: 'lv426',
      email: 'ellenripley@aliens.com'
    };
  
    // clean up after test runs
    // Skipped mocking delete users as we currently support deleting users only by ID 
  
    test('admin can insert new users with REST API', async () => {
      // insert new user in the database
      const newUser = await createUser(ripley);
  
      // verify inserted user's properties match parameter user
      expect(newUser.username).toEqual(ripley.username);
      expect(newUser.password).toEqual(ripley.password);
      expect(newUser.email).toEqual(ripley.email);
      expect(newUser.isAdmin).toEqual(false);
    });
});

  //creates a user as an Admin
describe('creatAdmin', () => {

    // sample admin to create
    const sowell = {
      username: 'thommas_sowell',
      password: 'compromise',
      email: 'compromise@solutions.com',
      isAdmin: true,
    };
  
    test('admin can insert an admin with REST API', async () => {
      // insert new user in the database
      const newUser = await createUser(sowell);
  
      // verify inserted user's properties match parameter user
      expect(newUser.username).toEqual(sowell.username);
      expect(newUser.password).toEqual(sowell.password);
      expect(newUser.email).toEqual(sowell.email);
      expect(newUser.isAdmin).toEqual(true);
    });
});

describe('blockUser',  () => {
    // sample user the admin wants to block
    const adam = {
      username: 'adam_smith',
      password: 'not0sum',
      email: 'wealth@nations.com',
      isBlocked: false
    };
  
    test('admin blocks a user via REST API', async () => {
      // insert the user in the database
      const newUser = await createUser(adam);
  
      //verify user is intially unblocked
      expect(newUser.isBlocked).toEqual(false);
      newUser.isBlocked = true;
      //verify the user is now updated with the blocked status
      const status = await blockUser(newUser);
      expect(newUser.isBlocked).toEqual(true);
  
    });
});

describe('updateUser',  () => {
    // sample user the admin wants to block
    const adam = {
      username: 'adam_smith',
      password: 'not0sum',
      email: 'wealth@nations.com',
      isBlocked: false
    };
  
    test('admin updates a user via REST API', async () => {
      // insert the user in the database
      const newUser = await createUser(adam);
  
      //verify user's intial name
      expect(newUser.isBlocked).toEqual("adam_smith");
      newUser.username = 'john_smith';
      //verify the user's name is now updated
      const status = await updateUser(newUser);
      expect(newUser.username).toEqual("john_smith");
  
    });
});

describe('deleteUser',  () => {
    // sample user the admin wants to block
    const adam = {
      username: 'adam_smith',
      password: 'not0sum',
      email: 'wealth@nations.com',
      isBlocked: false
    };
  
    test('admin updates a user via REST API', async () => {
      // insert the user in the database
      const newUser = await createUser(adam);
  
      //verify user's  existance with his username
      expect(newUser.username).toEqual("adam_smith");
      //verify the user to be deleted
      const status = await deleteUser(newUser);
      expect(status.deletedCount).toEqual(1);
  
    });
});

describe('findAllUsers',  () => {

    // sample users we'll insert to then retrieve
    const usernames = [
      "larry", "curley", "moe"
    ];
  
    // setup data before test
    beforeAll(() =>
      // insert several known users
      usernames.map(username =>
        createUser({
          username,
          password: `${username}123`,
          email: `${username}@stooges.com`
        })
      )
    );
  
    // clean up after ourselves
    afterAll(() =>
      // delete the users we inserted
      usernames.map(username =>
        deleteUsersByUsername(username)
      )
    );
  
    test('admin can retrieve all users from REST API', async () => {
      // retrieve all the users
      const users = await findAllUsers();
  
      // there should be a minimum number of users
      expect(users.length).toBeGreaterThanOrEqual(usernames.length);
  
      // let's check each user we inserted
      const usersWeInserted = users.filter(
        user => usernames.indexOf(user.username) >= 0);
  
      // compare the actual users in database with the ones we sent
      usersWeInserted.forEach(user => {
        const username = usernames.find(username => username === user.username);
        expect(user.username).toEqual(username);
        expect(user.password).toEqual(`${username}123`);
        expect(user.email).toEqual(`${username}@stooges.com`);
      });
    });
});