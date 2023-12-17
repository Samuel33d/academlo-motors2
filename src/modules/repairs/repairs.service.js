import User from '../users/users.model.js';
import Repair from './repairs.model.js';

export class RepairsServices {
  static async create(data) {
    return await Repair.create(data);
  }
  static async findAll() {
    return await Repair.findAll({
      where: {
        status: ['pending', 'completed'],
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'userId', 'user_id']
      },
      include: [{
        model: User,
        attributes: ['name', 'email']
      }]
    });
  }
  static async findOne(id) {
    return await Repair.findOne({
      where: {
        id,
        status: ['pending', 'completed'],
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'userId', 'user_id']
      },
      include: [{
        model: User,
        attributes: ['name', 'email']
      }]
    });
  }

  static async update(repair) {
    return await repair.update({
      status: 'completed'
    })
  }

  static async delete(repair) {
    return await repair.update({
      status: 'cancelled'
    })
  }
}
