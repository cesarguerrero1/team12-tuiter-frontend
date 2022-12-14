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
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from "react-router-dom";
import { configureStore, createSlice } from "@reduxjs/toolkit"
import { Provider } from "react-redux"

//Thunks
import * as userThunks from "../services/users-thunk.js";
import * as tuitThunks from "../services/tuits-thunk.js";

import CheckUser from "../components/authentication/index.js"
import AdminRouter from "../components/admin/index";
import { element } from 'prop-types';

//We need to mock reducers!
const loggedInUser = {
    _id: "6398ae72929feaec315ea881",
    username: "cguerrero.cesar",
    password: "dasdhlakhdljhej",
    maritalStatus: "SINGLE",
    joinedDate: "2022-12-13T06:40:29.279Z",
    isBlocked: false,
    isAdmin: true,
    email: "cesar@engine.xyz",
    blockedBy: "",
    accountType: "ADMIN"
}

const mockUsersReducer = createSlice({
    name: "users",
    initialState: {
        loginAttemptFailed: false,
        isAdmin: true,
        currentUser: loggedInUser,
        allUsers: [loggedInUser],
        totalUsersCount: 1,
        blockedUsersCount: 0
    },
    //For our application all state changes will happen due to server calls. Those are asynchronous calls and so our state
    //management needs to be able to also perform asynchronous actions when the state is eventually updated
    extraReducers: {
        /**
         * When the user attempts to register and a call is made to our server, if the call was successfull then add
         * that user to our local array of users
         * @param {Object} state Plain JavaScript Object that contains the state we have defined for our application
         * @param {Object} action Plain Javascript Object that possibly contains data collected after a given action occurs
         * @returns void 
         */
        [userThunks.registerThunk.fulfilled]: (state, action) => {
            state.allUsers.push(action.payload)
            state.activeUsers = state.activeUsers + 1;
            alert('The user was successfully created!');
            //We need to reload as the statistic counter have doesn't interact with the modal that calls this function
            window.location.reload();
            return
        },
        /**
         * When the user attempts to register and the call fails then alert the user!
         * @param {Object} state Plain JavaScript Object that contains the state we have defined for our application
         * @param {Object} action Plain Javascript Object that possibly contains data collected after a given action occurs
         * @returns void
         */
        [userThunks.registerThunk.rejected]: (state, action) => {
            alert('A user with that username already exists');
            return
        },

        /**
         * If a user attempts to login and the call is successful, inform our state that this is the current user and update our properties
         * accordingly
         * @param {Object} state Plain JavaScript Object that contains the state we have defined for our application
         * @param {Object} action Plain Javascript Object that possibly contains data collected after a given action occurs
         * @returns void
         */
        [userThunks.loginThunk.fulfilled]: (state, action) => {
            state.currentUser = action.payload
            state.loginAttemptFailed = false;
            if (action.payload.isAdmin === true) {
                state.isAdmin = true
            }
            return
        },
        /**
         * If the user attempts to login and the call is unsuccessful, set the currentUser to null and update the other properties accordingly
         * @param {Object} state Plain JavaScript Object that contains the state we have defined for our application
         * @param {Object} action Plain Javascript Object that possibly contains data collected after a given action occurs
         * @returns void
         */
        [userThunks.loginThunk.rejected]: (state, action) => {
            state.currentUser = null
            state.loginAttemptFailed = true;
            state.isAdmin = false;
            return
        },

        /**
         * When the user makes a logout call, it will always return a success error. Making a logout call (assuming you were able to) will always remove anyone
         * who is logged in so even if no one is, it doesn't matter
         * @param {Object} state Plain JavaScript Object that contains the state we have defined for our application
         * @param {Object} action Plain Javascript Object that possibly contains data collected after a given action occurs
         * @returns void
         */
        [userThunks.logoutThunk.fulfilled]: (state, action) => {
            state.currentUser = null
            state.loginAttemptFailed = false;
            state.isAdmin = false;
            return
        },

        /**
         * We need to constantly check if someone is logged in to ensure the correct content is being displayed everywhere. If they are logged in
         * then make them the currentUser and check if they are an admin
         * @param {Object} state Plain JavaScript Object that contains the state we have defined for our application
         * @param {Object} action Plain Javascript Object that possibly contains data collected after a given action occurs
         * @returns void
         */
        [userThunks.isLoggedInThunk.fulfilled]: (state, action) => {
            state.currentUser = action.payload
            state.isAdmin = action.payload.isAdmin;
        },
        /**
         * If someone is not logged in well then make sure the application sets the state appropriately
         * @param {Object} state Plain JavaScript Object that contains the state we have defined for our application
         * @param {Object} action Plain Javascript Object that possibly contains data collected after a given action occurs
         * @returns void
         */
        [userThunks.isLoggedInThunk.rejected]: (state, action) => {
            state.currentUser = null;
            state.isAdmin = false;
        },

        /**
         * In order for the program to operate, we need to ensure we can get all the users from the database. So we ping the server
         * and then we set our state to reflect all of the users, how many there are, and who is blocked or not.
         * @param {Object} state Plain JavaScript Object that contains the state we have defined for our application
         * @param {Object} action Plain Javascript Object that possibly contains data collected after a given action occurs
         * @returns void
         */
        [userThunks.findAllUsersThunk.fulfilled]: (state, action) => {
            state.allUsers = action.payload
            state.totalUsersCount = state.allUsers.length;
            let blockedCount = 0;
            state.allUsers.forEach((user) => {
                if (user.isBlocked === true) {
                    blockedCount++;
                }
            })
            state.blockedUsersCount = blockedCount;
        },
        /**
         * If we ping the sever and there is an error in returning the users then dont do anything! 
         * @param {Object} state Plain JavaScript Object that contains the state we have defined for our application
         * @param {Object} action Plain Javascript Object that possibly contains data collected after a given action occurs
         * @returns void
         */
        [userThunks.findAllUsersThunk.rejected]: (state, action) => {
            return
        },

        /**
         * Attempt to delete a user from the database. Assuming the call is successful, instead of getting all the users again let's just update
         * our current state of users which in theory is the exact same as the database up until this point
         * @param {Object} state Plain JavaScript Object that contains the state we have defined for our application
         * @param {Object} action Plain Javascript Object that possibly contains data collected after a given action occurs
         * @returns void 
         */
        [userThunks.deleteUserThunk.fulfilled]: (state, action) => {
            //Recall that filter will mae a new array with ONLY the values that pass your boolean test
            state.allUsers = state.allUsers.filter((user) => {
                return user._id !== action.payload
            })

            //Update counts
            state.totalUsersCount = state.allUsers.length;
            let blockedCount = 0;
            state.allUsers.forEach((user) => {
                if (user.isBlocked === true) {
                    blockedCount++;
                }
            })
            state.blockedUsersCount = blockedCount;


            return
        },
        /**
         * If the attempt to delete the user fails, then don't do anything
         * @param {Object} state Plain JavaScript Object that contains the state we have defined for our application
         * @param {Object} action Plain Javascript Object that possibly contains data collected after a given action occurs
         * @returns void
         */
        [userThunks.deleteUserThunk.rejected]: (state, action) => {
            return;
        },

        /**
         * Attempt to update a user. If the update to the server is successful we again can just alter our application state instead of pinging the server
         * @param {Object} state Plain JavaScript Object that contains the state we have defined for our application
         * @param {Object} action Plain Javascript Object that possibly contains data collected after a given action occurs
         * @returns void
         */
        [userThunks.updateUserThunk.fulfilled]: (state, action) => {
            //Recall that we want to look for the index and then update that index
            const index = state.allUsers.findIndex((user) => {
                return user._id === action.payload._uid
            })

            state.allUsers[index] = action.payload

            let blockedCount = 0;
            state.allUsers.forEach((user) => {
                if (user.isBlocked === true) {
                    blockedCount++;
                }
            })
            state.blockedUsersCount = blockedCount;

            return
        },
        /**
         * If the call to the server fails for updating a user, then ignore it
         * @param {Object} state Plain JavaScript Object that contains the state we have defined for our application
         * @param {Object} action Plain Javascript Object that possibly contains data collected after a given action occurs
         * @returns void
         */
        [userThunks.updateUserThunk.rejected]: (state, action) => {
            return
        },

        /**
         * Attempt to update the blocked status of the user. If the block update to the server is successful we again can just alter our application state instead of pinging the server
         * @param {Object} state Plain JavaScript Object that contains the state we have defined for our application
         * @param {Object} action Plain Javascript Object that possibly contains data collected after a given action occurs
         * @returns void
         */
        [userThunks.blockUserThunk.fulfilled]: (state, action) => {
            //Recall that we want to look for the index and then update that index
            const index = state.allUsers.findIndex((user) => {
                return user._id === action.payload._uid
            })

            state.allUsers[index] = action.payload

            let blockedCount = 0;
            state.allUsers.forEach((user) => {
                if (user.isBlocked === true) {
                    blockedCount++;
                }
            })
            state.blockedUsersCount = blockedCount;

            return
        },
        /**
         * If the call to the server fails for updating the blocking of a user, then ignore it
         * @param {Object} state Plain JavaScript Object that contains the state we have defined for our application
         * @param {Object} action Plain Javascript Object that possibly contains data collected after a given action occurs
         * @returns void
         */
        [userThunks.blockUserThunk.rejected]: (state, action) => {
            return
        }

    }
}).reducer

const singleTuit = {
    isBlocked: false,
    isFlagged: true,
    postedOn: "2022-12-14T03:30:39.217Z",
    tuit: "newTuit!",
    _id: "6399435fe24cf7e344b2a05c",
    stats: {
        likes: 0,
        replies: 0,
        retuits: 0
    },
    postedBy: loggedInUser
}

const mockTuitsReducer = createSlice({
    name: "tuits",
    initialState: {
        allTuits: [singleTuit],
        totalTuitsCount: 1,
        blockedTuitsCount: 0,
        flaggedTuitsCount: 1,
    },

    //For our application all state changes will happen due to server calls. Those are asynchronous calls and so our state
    //management needs to be able to also perform asynchronous actions when the state is eventually updated
    extraReducers: {
        /**
         * In addition to users, we need to get Tuits in order for Tuiter to work. The call to server will return an array of
         * Tuits which we will then store in the state of the application so we don't have to keep pinging the server
         * @param {Object} state Plain JavaScript Object that contains the state we have defined for our application
         * @param {Object} action Plain Javascript Object that possibly contains data collected after a given action occurs
         * @returns void
         */
        [tuitThunks.findTuitsThunk.fulfilled]: (state, action) => {
            state.allTuits = action.payload
            //Update counts for Tuits
            state.totalTuitsCount = state.allTuits.length;
            let blockedCount = 0;
            let flaggedCount = 0;
            state.allTuits.forEach((tuit) => {
                if (tuit.isBlocked) {
                    blockedCount++;
                }
                if (tuit.isFlagged) {
                    flaggedCount++;
                }
            })
            state.blockedTuitsCount = blockedCount;
            state.flaggedTuitsCount = flaggedCount;

        },
        /**
         * If the call to the server fails for the tuits, don't do anything
         * @param {Object} state Plain JavaScript Object that contains the state we have defined for our application
         * @param {Object} action Plain Javascript Object that possibly contains data collected after a given action occurs
         * @returns void 
         */
        [tuitThunks.findTuitsThunk.rejected]: (state, action) => {
            return
        },

        /**
         * Attempt to call the server to delete a tuit and then update our application depending on the return status. Again a deletion
         * on the server side does not necessitate a call to the server! We can just update our application as it should already be in sync
         * @param {Object} state Plain JavaScript Object that contains the state we have defined for our application
         * @param {Object} action Plain Javascript Object that possibly contains data collected after a given action occurs
         * @returns void
         */
        [tuitThunks.deleteTuitThunk.fulfilled]: (state, action) => {
            //Look at our stored Tuits and filter out only the Tuits that match our logic
            state.allTuits = state.allTuits.filter((tuit) => {
                return tuit._id !== action.payload
            })
            //Update counts
            state.totalTuitsCount = state.allTuits.length;
            let blockedCount = 0;
            let flaggedCount = 0;
            state.allTuits.forEach((tuit) => {
                if (tuit.isBlocked) {
                    blockedCount++;
                }
                if (tuit.isFlagged) {
                    flaggedCount++;
                }
            })
            state.blockedTuitsCount = blockedCount;
            state.flaggedTuitsCount = flaggedCount;
        },
        /**
         * Don't do anything if the call to delete fails
         * @param {Object} state Plain JavaScript Object that contains the state we have defined for our application
         * @param {Object} action Plain Javascript Object that possibly contains data collected after a given action occurs
         * @returns void
         */
        [tuitThunks.deleteTuitThunk.rejected]: (state, action) => {
            return
        },

        /**
         * Attempt to create a Tuit and if we are successful store it in the application state so we are in sync with the database
         * @param {Object} state Plain JavaScript Object that contains the state we have defined for our application
         * @param {Object} action Plain Javascript Object that possibly contains data collected after a given action occurs
         * @returns void 
         */
        [tuitThunks.createTuitThunk.fulfilled]: (state, action) => {
            state.allTuits.push(action.payload)
            state.totalTuitsCount = state.allTuits.length;
            //We need to reload as the statistic counter have doesn't interact with the modal that calls this function
            alert('The Tuit was successfully created!');
            window.location.reload();
            return
        },
        /**
         * If the call to the server to create a tuit fails, do nothing
         * @param {Object} state Plain JavaScript Object that contains the state we have defined for our application
         * @param {Object} action Plain Javascript Object that possibly contains data collected after a given action occurs
         * @returns void
         */
        [tuitThunks.createTuitThunk.rejected]: (state, action) => {
            alert('The Tuit could not be created... Contact an admin!');
            window.location.reload();
            return
        },

        /**
         * Attempt to call the server to update a tuit and then update that same tuit in the application state
         * @param {Object} state Plain JavaScript Object that contains the state we have defined for our application
         * @param {Object} action Plain Javascript Object that possibly contains data collected after a given action occurs
         * @returns void
         */
        [tuitThunks.updateTuitThunk.fulfilled]: (state, action) => {
            const newTuit = action.payload
            //Find the tuit we updated in the application state so we keep everything in sync
            if (newTuit) {
                let index = state.allTuits.findIndex((tuit) => {
                    return tuit._id === newTuit._id
                })

                state.allTuits[index] = {
                    ...state.allTuits[index],
                    ...newTuit
                }
            }

            //Update the counts
            state.totalTuitsCount = state.allTuits.length;
            let blockedCount = 0;
            let flaggedCount = 0;
            state.allTuits.forEach((tuit) => {
                if (tuit.isBlocked) {
                    blockedCount++;
                }
                if (tuit.isFlagged) {
                    flaggedCount++;
                }
            })
            state.blockedTuitsCount = blockedCount;
            state.flaggedTuitsCount = flaggedCount;


        },
        /**
         * If the update fails, don't do anything to the application state
         * @param {Object} state Plain JavaScript Object that contains the state we have defined for our application
         * @param {Object} action Plain Javascript Object that possibly contains data collected after a given action occurs
         * @returns void
         */
        [tuitThunks.updateTuitThunk.rejected]: (state, action) => {
            return
        },
    }
}).reducer

//We are using Redux so we need a store
const mockedStore = configureStore({
    reducer: {
        users: mockUsersReducer,
        tuits: mockTuitsReducer,
    }
})

describe('Testing Authenticated Users on Users Pathname', () => {

    beforeEach(async () => {
        //React Testing doesn't natively allow CORS so mocking it is!
        const mockingLoginCheck = jest.spyOn(userThunks, 'isLoggedInThunk');
        mockingLoginCheck.mockReturnValueOnce({ type: "LoggedIn", payload: loggedInUser });
        //Render the page at the given path
        act(() => {
            render(
                <Provider store={mockedStore}>
                    <CheckUser>
                        <MemoryRouter initialEntries={['/home']}>
                            <AdminRouter />
                        </MemoryRouter>
                    </CheckUser>
                </Provider>
            )
        })
    })

    //Testing Admin Navigator and Stats
    test('Testing Admin Navigator and Stats', async () => {
        await waitFor(() => {
            //We expect the navigator to show our name as the active admin
            const adminPresent = screen.getByText(/Current Admin: cguerrero.cesar/);
            expect(adminPresent).toBeInTheDocument();
            //We expect the navigator to have the logout link so we can logout
            const logoutLinkPresent = screen.getByText(/Logout/);
            expect(logoutLinkPresent).toBeInTheDocument();

            //We expect the stats to all be present with a given value
            const totalRegisteredUsers = screen.getByText(/Total Registered Users/);
            expect(totalRegisteredUsers).toBeInTheDocument();
            expect(parseInt(totalRegisteredUsers.nextSibling.innerHTML)).toBeGreaterThanOrEqual(0);

            const totalBlockedUsers = screen.getByText(/Total Blocked Users/);
            expect(totalBlockedUsers).toBeInTheDocument();
            expect(parseInt(totalBlockedUsers.nextSibling.innerHTML)).toBeGreaterThanOrEqual(0);

            const totalNumTuits = screen.getByText(/Total Number of Tuits/);
            expect(totalNumTuits).toBeInTheDocument();
            expect(parseInt(totalNumTuits.nextSibling.innerHTML)).toBeGreaterThanOrEqual(0);

            const totalBlockedTuits = screen.getByText(/Total Blocked Tuits/);
            expect(totalBlockedTuits).toBeInTheDocument();
            expect(parseInt(totalBlockedTuits.nextSibling.innerHTML)).toBeGreaterThanOrEqual(0);

            const totalFlaggedTuits = screen.getByText(/Total Flagged Tuits/);
            expect(totalFlaggedTuits).toBeInTheDocument();
            expect(parseInt(totalFlaggedTuits.nextSibling.innerHTML)).toBeGreaterThanOrEqual(0);
        })
    })

    
    //Testing that the users table appears with a User when at path 'url/home'
    test('Testing Users Table', async () => {
        await waitFor(() => {
            const userEditMessage = screen.getByText(/Click on any of the following rows to edit a User/);
            expect(userEditMessage).toBeInTheDocument();

            //We want to make sure the row is there
            const table = screen.getByText((content, element) => {
                return element.className === "table-responsive";
            }).children[0];

            const row = table.children[1].children[0];
            //We want to make sure the table is showing the correct stuff
            expect(row.children[0].innerHTML).toEqual("cguerrero.cesar");
            expect(row.children[1].innerHTML).toEqual("cesar@engine.xyz");
            expect(row.children[2].innerHTML).toEqual("ADMIN");
            expect(row.children[3].innerHTML).toEqual("FALSE");
            expect(row.children[4].innerHTML).toEqual("2022-12-13");
        })
    })

    test('Make sure User Modal is hidden and then appears after click', async () => {
        await waitFor(() => {
            const userModal = screen.getByText((content, element) => {
                return element.id === 'userModal'
            })
            //The modal should not have the class d-block as that would make its display value equal to block (display:block)
            expect(userModal.className).not.toContain('d-block');
            fireEvent.click(screen.getByText((content, element) => {return element.id === 'userModalButton'}));
        })

        await waitFor(() => {
            const userModal = screen.getByText((content, element) => {
                return element.id === 'userModal'
            })
            //The modal should not have the class d-block as that would make its display value equal to block (display:block)
            expect(userModal.className).toContain('d-block');
        })
    })
});


describe('Testing Authenticated Users on Tuiter Pathname', () => {

    beforeEach(async () => {
        //React Testing doesn't natively allow CORS so mocking it is!
        const mockingLoginCheck = jest.spyOn(userThunks, 'isLoggedInThunk');
        mockingLoginCheck.mockReturnValueOnce({ type: "LoggedIn", payload: loggedInUser });
        //Render the page at the given path
        act(() => {
            render(
                <Provider store={mockedStore}>
                    <CheckUser>
                        <MemoryRouter initialEntries={['/home/tuits']}>
                            <AdminRouter />
                        </MemoryRouter>
                    </CheckUser>
                </Provider>
            )
        })
    })

    //Testing Admin Navigator and Stats
    test('Testing Admin Navigator and Stats', async () => {
        await waitFor(() => {
            //We expect the navigator to show our name as the active admin
            const adminPresent = screen.getByText(/Current Admin: cguerrero.cesar/);
            expect(adminPresent).toBeInTheDocument();
            //We expect the navigator to have the logout link so we can logout
            const logoutLinkPresent = screen.getByText(/Logout/);
            expect(logoutLinkPresent).toBeInTheDocument();

            //We expect the stats to all be present with a given value
            const totalRegisteredUsers = screen.getByText(/Total Registered Users/);
            expect(totalRegisteredUsers).toBeInTheDocument();
            expect(parseInt(totalRegisteredUsers.nextSibling.innerHTML)).toBeGreaterThanOrEqual(0);

            const totalBlockedUsers = screen.getByText(/Total Blocked Users/);
            expect(totalBlockedUsers).toBeInTheDocument();
            expect(parseInt(totalBlockedUsers.nextSibling.innerHTML)).toBeGreaterThanOrEqual(0);

            const totalNumTuits = screen.getByText(/Total Number of Tuits/);
            expect(totalNumTuits).toBeInTheDocument();
            expect(parseInt(totalNumTuits.nextSibling.innerHTML)).toBeGreaterThanOrEqual(0);

            const totalBlockedTuits = screen.getByText(/Total Blocked Tuits/);
            expect(totalBlockedTuits).toBeInTheDocument();
            expect(parseInt(totalBlockedTuits.nextSibling.innerHTML)).toBeGreaterThanOrEqual(0);

            const totalFlaggedTuits = screen.getByText(/Total Flagged Tuits/);
            expect(totalFlaggedTuits).toBeInTheDocument();
            expect(parseInt(totalFlaggedTuits.nextSibling.innerHTML)).toBeGreaterThanOrEqual(0);
        })
    })

    
    //Testing that the users table appears with a User when at path 'url/home'
    test('Testing Tuits Table', async () => {
        await waitFor(() => {
            const tuitEditMessage = screen.getByText(/Click on any of the following rows to edit a Tuit/);
            expect(tuitEditMessage).toBeInTheDocument();

            //We want to make sure the row is there
            const table = screen.getByText((content, element) => {
                return element.className === "table-responsive";
            }).children[0];

            const row = table.children[1].children[0];
            //We want to make sure the table is showing the correct stuff
            expect(row.children[0].innerHTML).toEqual("newTuit!");
            expect(row.children[1].innerHTML).toEqual("2022-12-14");
            expect(row.children[2].innerHTML).toEqual("cguerrero.cesar");
            expect(row.children[3].innerHTML).toEqual("FALSE");
            expect(row.children[4].innerHTML).toEqual("TRUE");
        })
    })

    test('Make sure Tuit Modal is hidden and then appears after click', async () => {
        await waitFor(() => {
            const tuitModal = screen.getByText((content, element) => {
                return element.id === 'tuitModal'
            })
            //The modal should not have the class d-block as that would make its display value equal to block (display:block)
            expect(tuitModal.className).not.toContain('d-block');
            fireEvent.click(screen.getByText((content, element) => {return element.id === 'tuitModalButton'}));
        })

        await waitFor(() => {
            const tuitModal = screen.getByText((content, element) => {
                return element.id === 'tuitModal'
            })
            //The modal should not have the class d-block as that would make its display value equal to block (display:block)
            expect(tuitModal.className).toContain('d-block');
        })
    })
});
