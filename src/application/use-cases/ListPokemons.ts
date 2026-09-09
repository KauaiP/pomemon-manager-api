import { Pokemon } from '@domain/entities/Pokemon';
import { IPokemonRepository } from '@domain/repositories/IPokemonRepository';

export class ListPokemonsUseCase {
  constructor(private pokemonRepository: IPokemonRepository) {}

  async execute(): Promise<Pokemon[]> {
    return await this.pokemonRepository.findAll();
  }
}
