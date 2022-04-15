import bcrypt from 'bcrypt';
// eslint-disable-next-line import/no-extraneous-dependencies
import jwt from 'jsonwebtoken';
import Controller from './Controller';
import User from '../models/UserModel';
import UserService from '../services/UserService';
//import Stripe from '../helpers/Stripe';

const userService = new UserService(new User().getInstance());

class UserController extends Controller {
  constructor(service) {
    super(service);
    this.addUser = this.addUser.bind(this);
    this.login = this.login.bind(this);
  }


  async addUser(req, res){
    const hash = bcrypt.hashSync(req.body.password, 10);
    var userData = req.body;
    userData.password = hash;
    let response = await this.service.insert(userData);
    return res.status(response.statusCode).send(response);
  }

  async login(req, res){
    let loginResponse = await this.service.login(req.body.email);
    if(loginResponse.data){
      //console.log(loginResponse);
      var checkPassword = await bcrypt.compareSync(req.body.password, loginResponse.data.password); // true
      if(checkPassword){
        return res.status(loginResponse.statusCode).send(loginResponse);
      }else{
        var response2 = {
          error: true,
          statusCode: 401,
          error: 'email or password wrong'
        };
        return res.status(response2.statusCode).send(response2);
      }
      
    }else{
      var response2 = {
        error: true,
        statusCode: 401,
        error: 'email or password wrong'
      };
      return res.status(response2.statusCode).send(response2);
    }
    
  }
}

export default new UserController(userService);
