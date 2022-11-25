/*
Cesar Guerrero
Team 12 - CS5500 Final
11/24/22

*/

import {useEffect} from "react"
import {useDispatch} from "react-redux"
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
