import {
  findAllTuits,
  updateTuit
} from "../services/admin-service";
import {
  createUser, deleteUser
} from "../services/users-service";
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