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

//Sending a dummy function for deletedTuit
function deletedTuit(){
    return
}

//Note that we removed the mock as we actually want to make an axios call
test('user list renders async', async () => {
    const tuits = await findAllTuits();
        render(
        <HashRouter>
            <Tuits tuits={tuits} deletedTuit={deletedTuit}/>
        </HashRouter>
    );

    const tuitElement = screen.getByText(/Snoopy is such a good dog!/i);
    expect(tuitElement).toBeInTheDocument();
})