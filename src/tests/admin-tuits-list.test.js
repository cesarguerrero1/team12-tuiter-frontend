import Tuits from "../components/tuits";
import '@testing-library/jest-dom';
import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import {updateTuit, findAllTuits} from "../services/admin-service";
import {createTuitByUser, deleteTuit} from "../services/tuits-service";
import {createUser, deleteUser} from "../services/admin-service";
import axios from "axios";

const MOCKED_USERS = [
    {username: 'alice', password: 'alice123', email: 'alice123@weyland.com'},
    {username: 'bob', password: 'bob123', email: 'bob123@bigjeff.com'},
  ]

const MOCKED_TUITS = [
    {tuit: "sarah_conors tuit", postedBy: {"username": "sarah_conor"}, _id: "123",
        image: null, youtube: null, published: "Jan 20, 2022", postedOn: "2022-12-07T00:13:06.882Z", stats: {
            replies: 0,
            retuits: 0,
            likes: 0
        }}
];

test('tuit list renders async', async () => {
    const testUser = await createUser(MOCKED_USERS[0]);
    const createdTuit = await createTuitByUser(testUser._id, {tuit: "bye"});
    const tuits = await findAllTuits();
    console.log("TUITS ------- ", tuits);
    render(
        <HashRouter>
            <Tuits tuits={tuits} currentUser={testUser}/>
        </HashRouter>);
    const linkElement = screen.getByText(/bye/i);
    expect(linkElement).toBeInTheDocument();
  
    // Cleans up.
    await deleteTuit(createdTuit._id);
    await deleteUser(testUser._id);
});

test('tuit list updates async', async () => {
    const testUser = await createUser(MOCKED_USERS[0]);
    const createdTuit = await createTuitByUser(testUser._id, {tuit: "bye"});
    const tuits = await findAllTuits();
    render(
        <HashRouter>
            <Tuits tuits={tuits} currentUser={testUser}/>
        </HashRouter>);
    const linkElement = screen.getByText(/bye/i);
    expect(linkElement).toBeInTheDocument();
  
    const updatedTuit = await updateTuit(createdTuit._id, {tuit: "bye boys"})
    console.log(updatedTuit);
    const tuits2 = await findAllTuits();
    render(
        <HashRouter>
            <Tuits tuits={tuits2} currentUser={testUser}/>
        </HashRouter>);
    const linkElement2 = screen.getByText(/bye boys/i);
    expect(linkElement2).toBeInTheDocument();

    // Cleans up.
    await deleteTuit(createdTuit._id);
    await deleteUser(testUser._id);
})

test('tuit list renders mocked', async () => {
    jest.spyOn(axios, 'get').mockImplementation()
    axios.get.mockImplementation(() =>
      Promise.resolve({ data: {tuits: MOCKED_TUITS  } }));
    const response = await findAllTuits();
    const tuits = response.tuits;
    render(
        <HashRouter>
            <Tuits tuits={tuits} currentUser={MOCKED_USERS[0]}/>
        </HashRouter>);

    const linkElement = await screen.getByText('sarah_conors tuit');    
    expect(linkElement).toBeInTheDocument();
});
