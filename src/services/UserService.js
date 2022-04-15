import Service from './Service';

class UserService extends Service {
  // eslint-disable-next-line no-useless-constructor
  constructor(model) {
    super(model);
  }


  async login(email){
    try {
      const items = await this.model.findOne({email});
      return {
        error: false,
        statusCode: 200,
        data: items,
      };
    } catch (errors) {
      return {
        error: true,
        statusCode: 500,
        errors,
      };
    }
  }
}

export default UserService;
