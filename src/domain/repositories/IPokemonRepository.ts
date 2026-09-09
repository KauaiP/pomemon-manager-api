import { Pokemon } from '@domain/entities/Pokemon';

// preferi ja deixar tudo como Promisse,
// quando mudarmos para um banco de dados real não será necessário mudar as assinaturas
export interface IPokemonRepository {
  findAll(): Promise<Pokemon[]>;
  findByType(type: string): Promise<Pokemon[]>;
  findById(id: string): Promise<Pokemon | null>;
  create(pokemon: Pokemon): Promise<Pokemon>;
  update(id: string, data: Partial<Pokemon>): Promise<Pokemon | null>;
  delete(id: string): Promise<boolean>;
}
