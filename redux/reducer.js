//Define your initialState
const initialState = {
    //Have a people array responsible for getting the data and setting to the array.
    people: [],
    //Have the loading state indicate if it's done getting data.
    loading: true,
    //Have state for error message for recieving an error.
    errorMessage: '',
}

//Define your action types 
//Initiate the api call
const GET_PEOPLE = 'GET_PEOPLE';
//Gets the players on api call is fullfilled
const GET_PEOPLE_FULFILLED = 'GET_PEOPLE_FULFILLED';
//When there is a error return an errror action type. 
const GET_PEOPLE_REJECTED = 'GET_PEOPLE_REJECTED';


//Define your reducer that will return the initialState by default
const reducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_PEOPLE: 
        return {...state, loading: action.payload};
        case GET_PEOPLE_FULFILLED:
        return {...state, people: action.payload, loading: action.loading};
        case GET_PEOPLE_REJECTED:
        return {...state, errorMessage: action.payload, loading: action.loading};
        default: 
        return state;
    }
}

//Define your action create that set your loading state.
export const fetchData = (bool) => {
    //return a action type and a loading state indicating it is getting data. 
    return {
        type: GET_PEOPLE,
        payload: bool,
    };
}

//Define a action creator to set your loading state to false, and return the data when the promise is resolved
export const fetchDataFulfilled = (data) => {
    //Return a action type and a loading to false, and the data.
    return {
        type: GET_PEOPLE_FULFILLED,
        payload: data,
        loading: false,
    };
}

//Define a action creator that catches a error and sets an errorMessage
export const fetchDataRejected = (error) => {
    //Return a action type and a payload with a error
    return {
        type: GET_PEOPLE_REJECTED,
        payload: error,
        loading: false,
    };
}

//Export the reducer as a default export 
export default reducer;