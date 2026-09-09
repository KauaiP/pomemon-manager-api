import { Pokemon, PokemonProps } from '@domain/entities/Pokemon';
import { IPokemonRepository } from '@domain/repositories/IPokemonRepository';

export class InMemoryPokemonRepository implements IPokemonRepository {
  public pokemons: Pokemon[] = [];

  async findAll(): Promise<Pokemon[]> {
    return this.pokemons;
  }

  async findByType(type: string): Promise<Pokemon[]> {
    return this.pokemons.filter(
      (p) => p.type.toLowerCase() === type.toLowerCase(),
    );
  }

  async findById(id: string): Promise<Pokemon | null> {
    const pokemon = this.pokemons.find((p) => p.id === id);
    return pokemon ?? null;
  }

  async create(pokemon: Pokemon): Promise<Pokemon> {
    this.pokemons.push(pokemon);
    return pokemon;
  }

  // eslint-disable-next-line prettier/prettier
  async update(id: string, data: Partial<PokemonProps>): Promise<Pokemon | null> {
    const index = this.pokemons.findIndex((p) => p.id === id);

    if (index === -1) {
      return null;
    }

    const existente = this.pokemons[index];

    const atualizado = new Pokemon({
      id: existente.id,
      name: data.name ?? existente.name,
      type: data.type ?? existente.type,
      hp: data.hp ?? existente.hp,
    });

    this.pokemons[index] = atualizado;
    return atualizado;
  }

  async delete(id: string): Promise<boolean> {
    const index = this.pokemons.findIndex((p) => p.id === id);

    if (index === -1) {
      return false;
    }

    this.pokemons.splice(index, 1);
    return true;
  }
}
