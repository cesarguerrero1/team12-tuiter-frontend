/*
Cesar Guerrero
11/24/22
Team 12 - CS5500 Final

Please note that this code was taken from Assignment 3 
*/

import Tuits from "../components/tuits/index.js";
import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import {findAllTuits} from "../services/tuits-service.js";
import axios from "axios";

jest.mock('axios');

const MOCKED_USERS = [
  "alice", "bob", "charlie"
];

const MOCKED_TUITS = [
  "alice's tuit", "bob's tuit", "charlie's tuit"
];

const createdTuits = []

for(let i = 0; i < MOCKED_USERS.length; i++){
    createdTuits.push({
      tuit:MOCKED_TUITS[i],
      postedBy:{
          username:MOCKED_USERS[i]
      }
    })
}

//Sending a dummy function for deletedTuit
function deletedTuit(){
  return
}

test('tuit list renders static tuit array', () => {

  render(
    //Render the tuits on the screen!
    <HashRouter>
        <Tuits tuits={createdTuits} deletedTuit={deletedTuit}/>
    </HashRouter>
  )

  //Grab the screen
  const tuitElement1 = screen.getByText(/alice's tuit/i);
  const tuitElement2 = screen.getByText(/bob's tuit/i);
  const tuitElement3 = screen.getByText(/charlie's tuit/i);

  //Check that every tweet made it!
  expect(tuitElement1).toBeInTheDocument();
  expect(tuitElement2).toBeInTheDocument();
  expect(tuitElement3).toBeInTheDocument();
});

test('tuit list renders async', async () => {
  // TODO: implement this
})

test('tuit list renders mocked', async () => {
    //Mock the async call and pass in the tuits we made!
    axios.get.mockImplementation(() => {
        return Promise.resolve({data: {tuits: createdTuits}})
    });

    //Mock our call and get the response
    const response = await findAllTuits();
    const tuits = response.tuits;
    
    render(
      //Render the tuits on the screen!
      <HashRouter>
          <Tuits tuits={createdTuits} deletedTuit={deletedTuit}/>
      </HashRouter>
    )
  
    //Grab the screen
    const tuitElement1 = screen.getByText(/alice's tuit/i);
    const tuitElement2 = screen.getByText(/bob's tuit/i);
    const tuitElement3 = screen.getByText(/charlie's tuit/i);
  
    //Check that every tweet made it!
    expect(tuitElement1).toBeInTheDocument();
    expect(tuitElement2).toBeInTheDocument();
    expect(tuitElement3).toBeInTheDocument();

});
