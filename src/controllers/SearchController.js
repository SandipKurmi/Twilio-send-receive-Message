import Controller from './Controller';
import Search from '../models/SearchModel';
import SearchService from '../services/SearchService';

const searchService = new SearchService(new Search().getInstance());


class SearchController extends Controller {
    constructor(service) {
        super(service);
        this.createSearch = this.createSearch.bind(this);
        this.getNumber = this.getNumber.bind(this);
        this.getNames = this.getNames.bind(this);


    }

    async createSearch(req, res) {
        var data = req.body
        const response = await this.service.createSearch(data);
        if (response.error) return res.status(response.statusCode).send(response);
        return res.status(response.statusCode).send(response);
    }

    async getNumber(req, res) {
        const test = req.params.key;
        // console.log(data);
        const response = await this.service.getNumber(test);
        if (response.error) return res.status(response.statusCode).send(response);
        return res.status(response.statusCode).send(response);
    }

    async getNames(req, res) {
        const data = req.params.name;
        // console.log(data)
        const response = await this.service.getNames(data);
        if (response.error) return res.status(response.statusCode).send(response);
        return res.status(response.statusCode).send(response);
    }

}

export default new SearchController(searchService);