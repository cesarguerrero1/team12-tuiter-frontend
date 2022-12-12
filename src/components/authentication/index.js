/*
Cesar Guerrero
12/4/22
CS5500 - Final

Again going back and retroactively correcting files
*/

import {useEffect} from "react"
import {useDispatch} from "react-redux"

//Reducers
import { isLoggedInThunk } from "../../services/users-thunk.js";

/**
 * The CheckUser function will call our Redux Reducer in order to ping the server and check if a user is logged in or not! If they are then they are stored in the 
 * reducer otherwise null is stored in the reducer
 * @param children - children is all of the child components that belong to this component
 * @returns The function will return any child components within it. Look at the index.js from the tuiter directroy to see the full site map
 */
function CheckUser({children}){

    const dispatch = useDispatch();

    useEffect( () => {
        dispatch(isLoggedInThunk())
    }, [dispatch])

    return (children);
}

export default CheckUser;