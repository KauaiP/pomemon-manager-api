import { Pokemon } from '@domain/entities/Pokemon';
import { IPokemonRepository } from '@domain/repositories/IPokemonRepository';

interface CreatePokemonDTO {
  id: string;
  name: string;
  type: string;
  hp: number;
}

export class CreatePokemonUseCase {
  constructor(private pokemonReository: IPokemonRepository) {}

  async execute(data: CreatePokemonDTO): Promise<Pokemon> {
    const pokemonAlreadyExists = await this.pokemonReository.findById(data.id);

    if (pokemonAlreadyExists) {
      throw new Error('Usuario com este id ja existe');
    }

    const pokemon = new Pokemon(data);
    await this.pokemonReository.create(pokemon);
    return pokemon;
  }
}
