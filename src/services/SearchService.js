import Service from './Service';
import dotenv from "dotenv";
dotenv.config();

class SearchService extends Service {
    constructor(model) {
        super(model);
        this.createSearch = this.createSearch.bind(this);
        this.getNumber = this.getNumber.bind(this);
        this.getNames = this.getNames.bind(this);
    }

    async createSearch(data) {
        try {
            var post = new this.model({
                number: data.number,
                name: data.name
            });
            data = await post.save()
            return {
                error: false,
                statusCode: 202,
                data: data,
            };
        } catch (error) {
            console.log(error)
            return {
                error: true,
                statusCode: 500,
                message: 'search are Not Found',
            };
        }
    }


    async getNumber(test) {
        // console.log(test)
        try {
            let data = await this.model.find({
                "$match": [
                    { number: { $regex: new RegExp(test) } },

                ]
            })
            console.log(data);
            return {
                error: false,
                statusCode: 202,
                data: data,
            };
        } catch (err) {
            console.log(err);
            return {
                error: true,
                statusCode: 500,
                message: 'Cannot Get number',
                errors: err,
            };
        }
    }


    async getNames(data) {
        console.log(data);
        try {
            let name = await this.model.find({
                "$or": [
                    { name: { $regex: data } },
                ]
            })
            return {
                error: false,
                statusCode: 202,
                data: name,
            };
        } catch (err) {
            return {
                error: true,
                statusCode: 500,
                message: 'Cannot Get name',
                errors: err,
            };
        }
    }




}

export default SearchService;