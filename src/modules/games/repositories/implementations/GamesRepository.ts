import { getRepository, Repository } from 'typeorm';

import { User } from '../../../users/entities/User';
import { Game } from '../../entities/Game';

import { IGamesRepository } from '../IGamesRepository';

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    return await this.repository
              .createQueryBuilder("games")
              .where("games.title ILIKE :title", { title: `%${param}%`})
              .getMany();
  }

  async countAllGames(): Promise<[{ count: string }]> {
    return await this.repository.query("SELECT COUNT(*) FROM games"); // Complete usando raw query
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    const res = await this.repository
    .createQueryBuilder("games")
    .leftJoinAndSelect("games.users","users")
    .where("games.id = :game_id",{game_id: id})
    .getMany();

    return res[0].users
      // Complete usando query builder
  }
}
