/**
* @jest-environment jsdom
*/

/*
Cesar Guerrero
12/13/22
CS5500 - Fall 2022
Final Project
*/

/**
 * @file This file represents the testing for our admin-home-page. We are testing just basic button clicks and making sure everything is working!
 */

import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit"
import { Provider } from "react-redux"

//Thunks
import * as userThunks from "../services/users-thunk";

//Reducers
import usersReducer from "../reducers/users-reducer.js";
import tuitsReducer from "../reducers/tuits-reducer.js";

import CheckUser from "../components/authentication/index.js"
import AdminRouter from "../components/admin/index";

describe('Testing Unauthenticated Users', () => {
    //We are using Redux so we need a store
    const store = configureStore({
        reducer: {
            users: usersReducer,
            tuits: tuitsReducer,
        }
    })

    beforeEach(async () => {
        //React Testing doesn't natively allow CORS so mocking it is!
        const mockingLoginCheck = jest.spyOn(userThunks, 'isLoggedInThunk');
        //mockingLoginCheck.mockReturnValueOnce({ type: "LoggedIn", payload: { username: "Cesar", isAdmin: true } });
        //Render the page at the given path
        act(() => {
            render(
                <Provider store={store}>
                    <CheckUser>
                        <MemoryRouter initialEntries={['/home']}>
                            <AdminRouter />
                        </MemoryRouter>
                    </CheckUser>
                </Provider>)
        })
    })

    test('No one is logged in so the page should be empty', async () => {
        await waitFor(() => {
            const mainDiv = screen.getByText((content, element) => {
                return element.className === "row my-2";
            })
            //The mainDiv should have zero children as being on this page without currentUser and isAdmin being valid
            //causes a redirect!
            expect(mainDiv.children.length).toEqual(0);
        })
    })

});