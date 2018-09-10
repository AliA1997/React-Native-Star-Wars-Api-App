//import createStore and applyMiddleware for creating our store and enhancing our dispatcher
import { createStore, applyMiddleware } from 'redux';
//import thunk for doing asynchronous operations in redux
import thunk from 'redux-thunk';
//import reducer from our reducer file
import reducer from './reducer';
//import your action creators used by dispatchers to alter your global state.
import { fetchData, fetchDataFulfilled, fetchDataRejected } from './reducer';
import axios from 'axios';
import superagent from 'superagent';



//Define your action creators that will be responsible for asynchronouse operatiosn 
export const getPeople = () => {
    //IN order to use await your callback must be asynchronous using async keyword.
    return async dispatch => {
        //Then perform your asynchronous operations.
        try {
            //Have it first fetch data from our starwars url.
            const starWarsPromise = await fetch('https://swapi.co/api/people');
            dispatch(fetchData(true));
            //Then use the json method to get json data from api/
            const people = await starWarsPromise.json();
            console.log('people-----------', people);
            //Now when the data is retrieved dispatch an action altering redux state.
            dispatch(fetchDataFulfilled(people.results))
          } catch(error) {
            console.log('Getting People Error---------', error);
            dispatch(fetchDataRejected(error))
          }
    }
}


// export const getPeople = () => {
//     return dispatch => {
//         //Dispatch the fetchData action creator before retrieving to set our loading state to true.
//         dispatch(fetchData(true));
//         //Then get the data.
//         axios.get('https://swapi.co/api/people').then(res => {
//             //Set the results to the people array.
//             dispatch(fetchDataFulfilled(res.data.results));
//             //Error handle the promise and set your errorMessage
//         }).catch(err => dispatch(fetchDataRejected(err)));
//     }
// }

// export const getPeople = () => {
//     return dispatch => {
//         //Dispatch the fetchData action creator before retrieving to set our loading state to true.
//         dispatch(fetchData(true));
//         //Then do a get request the get the err, and response callback, if there's an error dispatch the fetchDataRejected.
//         superagent.get('https://swapi.co/api/people')
//         //When the data is retrieved we will invoke the end method.
//         .end((err, res) => {
//             //if there is an error use our fetchDataReject
//             if(err) dispatch(fetchDataRejected(err));
//             //We will set our loading state when fetching data is successful.
//             dispatch(fetchDataFulfilled(res.body.results));
//         })
//     }
// }
//Export our store as a default epxport 
export default createStore(reducer, applyMiddleware(thunk));
