import config from "../config";

export default class FoodTruckService {

    constructor(){
        this.abortController = new AbortController();
    }
    componentWillUnmount() {
        console.log('unmounting')
        this.abortController.abort();
    }
    getAllFoodTrucks(){
        return fetch(`${config.api_base}/`, {signal:this.abortController.signal})
            .then(res => {
                return res.json();
            })
            .catch((error) =>{
                this.setState({ error: error, isLoaded: true })
            })
    }

    getFoodTruckByName(name){
        return fetch(`${config.api_base}/search?name=${name}`, {signal:this.abortController.signal})
            .then(res => {
                return res.json();
            })
            .catch((error) =>{
                this.setState({ error: error, isLoaded: true })
            })
    }
}