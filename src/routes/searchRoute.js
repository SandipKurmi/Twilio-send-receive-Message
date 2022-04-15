import searchController from '../controllers/SearchController';


export default (router) => {
    router.post(`/api/search`, searchController.createSearch);
    router.get(`/api/number/:key`, searchController.getNumber);
    router.get(`/api/name/:name`, searchController.getNames);

};