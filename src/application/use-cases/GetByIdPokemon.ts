import { Pokemon } from '@domain/entities/Pokemon';
import NotFoundError from '@domain/errors/NotFoundError';
import { IPokemonRepository } from '@domain/repositories/IPokemonRepository';

export class getByIdUseCase {
  constructor(private pokemonRepository: IPokemonRepository) {}

  async execute(data: string): Promise<Pokemon> {
    const findPokemon = await this.pokemonRepository.findById(data);

    if (!findPokemon) {
      throw new NotFoundError(
        'Pokemon com esse ID não encontrado na base de dados',
      );
    }
    return findPokemon;
  }
}
