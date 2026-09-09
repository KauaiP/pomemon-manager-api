import { IPokemonRepository } from '@domain/repositories/IPokemonRepository';

export class DeletePokemonUseCase {
  constructor(private pokemonRepository: IPokemonRepository) {}

  async execute(data: string): Promise<boolean> {
    const pokemonExists = await this.pokemonRepository.findById(data);
    if (!pokemonExists) {
      throw new Error('Pokemon com esse ID não encontrado');
    }
    return await this.pokemonRepository.delete(data);
  }
}
