import { EntityRepository, Repository } from 'typeorm';
import { Board } from './board.entity';

@EntityRepository(Board)
export class BoardRepository extends Repository<Board> {
  getAll() {
    return this.find();
  }

  getById(id: string) {
    return this.findOne({ id });
  }

  deleteById(id: string) {
    return this.delete({ id });
  }
}
