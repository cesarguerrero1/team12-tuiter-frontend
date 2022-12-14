/*
Cesar Guerrero
12/4/22
CS5500 - After meeting with the professor we are going back and retroactively just making sure all of our pull requests are lined up.

To take advantage of Redux, we will need to use and implement the following:
1. useEffect
2. useDispatch
3. useSelector
4. Thunk Files
*/

//React
import React, {useEffect, useState} from "react";
import { useSelector, useDispatch} from "react-redux";

//Other
import Tuits from "../tuits";

//Thunks
import {createTuitThunk, findTuitsThunk, deleteTuitThunk} from "../../services/tuits-thunk.js";

const Home = () => {
  //Here we are implementing the redux state for getting the uers and tuits
  const {currentUser, isAdmin} = useSelector((state) => state.users);
  const { allTuits } = useSelector((state) => state.tuits);
  const [tuit, setTuit] = useState('');
  
  const dispatch = useDispatch();

  function createTuit(){
    if(tuit === ""){
      alert("You need to write content to tuit!");
      return
    }
    dispatch(createTuitThunk({tuit, postedBy: currentUser._id}))
  }
  
  //This is no longer used!
  function deleteTuit(tid){
    dispatch(deleteTuitThunk(tid))
  }

  useEffect(() => {
    dispatch(findTuitsThunk(isAdmin))
  }, [dispatch, isAdmin]);

    //Notice we only want to allow someone to post a tuit if they are logged in!
    return(
        <div className="ttr-home">
          <div className="border border-bottom-0">
            <h4 className="fw-bold p-2">Home Screen</h4>
            {
              currentUser &&
              <div className="d-flex">
                <div className="p-2">
                  <img alt="Profile Logo" className="ttr-width-50px rounded-circle" src="../images/nasa-logo.jpg"/>
                </div>
                <div className="p-2 w-100">
                  <textarea onChange={(e) => setTuit(e.target.value)} placeholder="What's happening?" className="w-100 border-0"></textarea>
                  <div className="row">
                    <div className="col-10 ttr-font-size-150pc text-primary">
                      <i className="fas fa-portrait me-3"></i>
                      <i className="far fa-gif me-3"></i>
                      <i className="far fa-bar-chart me-3"></i>
                      <i className="far fa-face-smile me-3"></i>
                      <i className="far fa-calendar me-3"></i>
                      <i className="far fa-map-location me-3"></i>
                    </div>
                    <div className="col-2">
                      <button onClick={createTuit} className={`btn btn-primary rounded-pill fa-pull-right fw-bold ps-4 pe-4`}>Tuit</button>
                    </div>
                  </div>
                </div>
              </div>
            }
          </div>
          <Tuits currentUser={currentUser} tuits={allTuits} deleteTuit={deleteTuit}/>
        </div>
    );
};

export default Home;