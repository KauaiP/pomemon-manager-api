import { IPokemonRepository } from '@domain/repositories/IPokemonRepository';
import { Pokemon, PokemonProps } from '@domain/entities/Pokemon';
import NotFoundError from '@domain/errors/NotFoundError';

interface UpdatePokemonDTO {
  id: string;
  data: Partial<Omit<PokemonProps, 'id'>>;
}

export class UpdatePokemonUseCase {
  constructor(private pokemonRepository: IPokemonRepository) {}

  async execute({ id, data }: UpdatePokemonDTO): Promise<Pokemon> {
    const pokemonExists = await this.pokemonRepository.findById(id);

    if (!pokemonExists) {
      throw new NotFoundError('Pokemon com esse ID não encontrado');
    }

    const updatedPokemon = await this.pokemonRepository.update(id, data);

    if (!updatedPokemon) {
      throw new Error('Erro ao atualizar o Pokémon');
    }

    return updatedPokemon;
  }
}
