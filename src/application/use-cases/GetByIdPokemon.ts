import { Pokemon } from '@domain/entities/Pokemon';
import { IPokemonRepository } from '@domain/repositories/IPokemonRepository';

export class getByIdUseCase {
  constructor(private pokemonRepository: IPokemonRepository) {}

  async execute(data: string): Promise<Pokemon> {
    const findPokemon = await this.pokemonRepository.findById(data);

    if (!findPokemon) {
      throw new Error('Não existe pokemon com esse id');
    }
    return findPokemon;
  }
}
