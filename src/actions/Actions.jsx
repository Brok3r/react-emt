import {LIST_BUS_STOP, RECEIVE_POSTS, REQUEST_POSTS} from '../constants/ActionTypes'


export function list_bus_stop(stop){
    return {
        type: LIST_BUS_STOP,
        stop
    };
}

export function requestPost(stop){
    return {
        type: REQUEST_POSTS,
        stop
        }
}

export function receivePosts(stop, json) {
    console.log("Metodo recibe post: "+ typeof json)
    console.log(json)
    return {
        type: RECEIVE_POSTS,
        stop,
        posts: json.estimaciones.map(child => child),
        receivedAt: Date.now()
    }
}


// Meet our first thunk action creator!
// Though its insides are different, you would use it just like any other action creator:
// store.dispatch(fetchPosts('reactjs'))

export function fetchPosts(linea) {

    // Thunk middleware knows how to handle functions.
    // It passes the dispatch method as an argument to the function,
    // thus making it able to dispatch actions itself.

    return function (dispatch) {

        // First dispatch: the app state is updated to inform
        // that the API call is starting.

        dispatch(requestPost(linea))

        // The function called by the thunk middleware can return a value,
        // that is passed on as the return value of the dispatch method.

        // In this case, we return a promise to wait for.
        // This is not required by thunk middleware, but it is convenient for us.
        return fetch("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D'http%3A%2F%2Fpasoporparada.emtpalma.es%2FEMTPalma%2FFront%2Fpasoporparada.es.svr%3Fp%3D002'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys")
            .then(function (response) {
                return response.json();
            })
            .then(function (json) {
                var obj = JSON.parse(json.query.results.body)
                dispatch(receivePosts(linea, obj))
            })
            .catch(function (error) {
                console.log('Request failed', error)
            });
    }
}
//export function fetchPosts(subreddit) {
//
//    // Thunk middleware knows how to handle functions.
//    // It passes the dispatch method as an argument to the function,
//    // thus making it able to dispatch actions itself.
//
//    return function (dispatch) {
//
//        // First dispatch: the app state is updated to inform
//        // that the API call is starting.
//
//        dispatch(requestPost(subreddit))
//
//        // The function called by the thunk middleware can return a value,
//        // that is passed on as the return value of the dispatch method.
//
//        // In this case, we return a promise to wait for.
//        // This is not required by thunk middleware, but it is convenient for us.
//
//        return fetch(`http://www.reddit.com/r/meneame.json`)
//            .then(response => response.json())
//            .then(json =>
//
//                // We can dispatch many times!
//                // Here, we update the app state with the results of the API call.
//
//                dispatch(receivePosts(subreddit, json))
//            )
//
//        // In a real world app, you also want to
//        // catch any error in the network call.
//    }
//}

