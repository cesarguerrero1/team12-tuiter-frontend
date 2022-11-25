/*
Cesar Guerrero
11/24/22
Team 12 - CS5500 Final

Please note that this code was taken from Assignment 3 
*/

import { UserList } from "../components/profile/user-list.js";
import { screen, render } from "@testing-library/react";
import { HashRouter } from "react-router-dom";
import { findAllUsers } from "../services/users-service.js";

test('user list renders async', async () => {
    const users = await findAllUsers();
        render(
        <HashRouter>
            <UserList users={users} />
        </HashRouter>
    );
    const linkElement = screen.getByText(/alice/i);
    expect(linkElement).toBeInTheDocument();
})