import config from "../config";

export default class FoodTruckService {

    constructor(){
        this.abortController = new AbortController();
    }

    getAllFoodTrucks(){
        return fetch(`${config.api_base}/`, {signal:this.abortController.signal})
            .then(res => {
                return res.json();
            })
            .catch((error) =>{
                //TODO  - FIGURE OUT HOW TO HANDLE THE REJECTION!
                Promise.reject(error);
            })
    }

    getFoodTruckByName(name){
        return fetch(`${config.api_base}/search?name=${name}`, {signal:this.abortController.signal})
            .then(res => {
                return res.json();
            })
            .catch((error) =>{
                //TODO  - FIGURE OUT HOW TO HANDLE THE REJECTION!
                Promise.reject(error);
            })
    }

    leaveFoodTruckReview(user, jwt, truck, rating, review){
        return fetch(`${config.api_base}/food-trucks/${truck.name}/reviews/`,
    {
          method: 'POST',
          // not sure if we need the string
          body: JSON.stringify({
              rating: rating,
              review: review
          }),
          headers: {
            'Content-Type': 'application/json',
              'Authorization' : `Bearer ${jwt}`
          },
           mode: 'cors', // no-cors, *cors, same-origin
          credentials: 'include'
        }).then(res => {
            return res.json();
        })
        .catch((error) =>{
            //TODO  - FIGURE OUT HOW TO HANDLE THE REJECTION!
            Promise.reject(error);
        })
    }
}