import { getRepository, Repository } from 'typeorm';

import { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from '../../dtos';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {this.repository = getRepository(User);}

  async findUserWithGamesById({ user_id }: IFindUserWithGamesDTO): Promise<User> {
    return await this.repository.findOneOrFail({relations:['games'], where:{id: user_id}})
  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {
    return await this.repository.query("SELECT * FROM users ORDER BY users.first_name"); // Complete usando raw query
  }

  async findUserByFullName({ first_name, last_name }: IFindUserByFullNameDTO): Promise<User[] | undefined> {
    return await this.repository.query("SELECT u.email, u.first_name, u.last_name FROM users as u WHERE u.first_name ILIKE $1 AND u.last_name ILIKE $2", [first_name, last_name])
  }
}
