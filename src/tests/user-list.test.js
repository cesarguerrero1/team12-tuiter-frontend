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
import axios from "axios";

jest.mock('axios');

const MOCKED_USERS = [
  { username: 'ellen_ripley', password: 'lv426', email: 'repley@weyland.com', _id: "123" },
  { username: 'sarah_conor', password: 'illbeback', email: 'sarah@bigjeff.com', _id: "234" },
]

test('user list renders static user array', () => {
    render(
        //Rend the UserList component and send it a mock array of users
        <HashRouter>
            <UserList users={MOCKED_USERS} />
        </HashRouter>
    );
    //Grab the screen 
    const linkElement = screen.getByText(/ellen_ripley/i);
    expect(linkElement).toBeInTheDocument();
        
});

test('user list renders mocked', async () => {
  axios.get.mockImplementation(() =>
    Promise.resolve({ data: { users: MOCKED_USERS } })
  );
  const response = await findAllUsers();
  const users = response.users;

  render(
    <HashRouter>
      <UserList users={users} />
    </HashRouter>);

  const user = screen.getByText(/ellen_ripley/i);
  expect(user).toBeInTheDocument();
});

