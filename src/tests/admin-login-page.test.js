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
 * @file This file represents the testing for our admin-login-page. We are testing just basic button clicks and making sure everything is working!
 */

import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import {MemoryRouter} from "react-router-dom";

import CheckUser from "../components/authentication/index.js"
import usersReducer from "../reducers/users-reducer.js"
import { configureStore } from "@reduxjs/toolkit"
import { Provider } from "react-redux"
import LoginPage from "../components/admin/login";
import * as userThunks from "../services/users-thunk";

/**
 * We want to ensure that clicking around the page works and inputs are handled correctly
 */
describe('Testing Admin Login Page', () => {

    //We are using Redux so we need a store
    const store = configureStore({
        reducer: {
            users: usersReducer,
        }
    })

    //React Testing doesn't natively allow CORS so mocking it is!
    const mockingLoginCheck = jest.spyOn(userThunks, 'isLoggedInThunk');

    //These are the elements of interest on our page
    let errorMessage = ''
    let loginButton = null;
    let usernameInput = null;
    let passwordInput = null;

    //Before every test we want to render a new screen and mock the loginCheck
    beforeEach(async () => {
        mockingLoginCheck.mockReturnValueOnce({type:"NobodyIsInitiallyLoggedIn", payload:null});
        errorMessage = ''; 
        act(() => {
            render(
                <Provider store={store}>
                    <CheckUser>
                        <MemoryRouter initialEntries={['/admin/login']}>
                            <LoginPage/>
                        </MemoryRouter>
                    </CheckUser>
                </Provider>)
        })

        await waitFor(() => {
            loginButton = screen.getByText((content, element) => {
                return element.className === "btn fse-login-button"
            });
            usernameInput = screen.getByText((content, element) => {
                return element.id === "username";
            })
            passwordInput = screen.getByText((content, element) => {
                return element.id === "password";
            })
        })
    })

    //Screen first appearing. We should have no error message
    test('Screen First Loads', async () => {
        errorMessage = screen.getByText((content, element) => {
            return element.id === "fse-error-messages";
        })
        expect(errorMessage.innerHTML).toEqual('');
    })
    
    //Click on button with nothing inputted
    test('Immediately click on button', async () => {
        fireEvent.click(loginButton);
        
        await waitFor(() => {
            errorMessage = screen.getByText((content, element) => {
                return element.id === "fse-error-messages";
            })
            expect(errorMessage.innerHTML).toEqual('Please input a username and/or password');
        })

    })
    
    //Click on button with just username
    test('Type in only a username and then click button', async () => {
        fireEvent.change(usernameInput, {target: {value: "nonsense"}});
        expect(usernameInput.value).toEqual('nonsense');
        fireEvent.click(loginButton);

        await waitFor(() => {
            errorMessage = screen.getByText((content, element) => {
                return element.id === "fse-error-messages";
            });
            expect(passwordInput.value).toEqual('');
            expect(errorMessage.innerHTML).toEqual('Please input a username and/or password');
        })
    })
    
    //Click on button with just password
    test('Type in only a password and then click button', async () => {
        fireEvent.change(passwordInput, {target: {value: "nonsense"}});
        expect(passwordInput.value).toEqual('nonsense');
        fireEvent.click(loginButton);

        await waitFor(() => {
            errorMessage = screen.getByText((content, element) => {
                return element.id === "fse-error-messages";
            });
            expect(usernameInput.value).toEqual('');
            expect(errorMessage.innerHTML).toEqual('Please input a username and/or password');
        })
    })

    //Test clicking with invalid username and password
    test('Type in a username and password and then click the button', async () => {
        fireEvent.change(usernameInput, {target: {value: "nonsense"}});
        fireEvent.change(passwordInput, {target: {value: "nonsense1"}});
        fireEvent.click(loginButton);

        await waitFor(() => {
            errorMessage = screen.getByText((content, element) => {
                return element.id === "fse-error-messages";
            });
            expect(errorMessage.innerHTML).toEqual('Attempting to Login...');
        })
    })

})