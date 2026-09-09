/* eslint-disable prettier/prettier */
import { Request, Response } from 'express';
import { ListPokemonsUseCase } from '@application/use-cases/ListPokemons';
import { CreatePokemonUseCase } from '@application/use-cases/CreatePokemons';
import { getByIdUseCase } from '@application/use-cases/GetByIdPokemon';
import { DeletePokemonUseCase } from '@application/use-cases/DeletePokemon';
import { UpdatePokemonUseCase } from '@application/use-cases/UpdatePokemon';

export class PokemonController {
  constructor(
    private listPokemonsUseCase: ListPokemonsUseCase,
    private createPokemonUseCase: CreatePokemonUseCase,
    private getByIdPokemon: getByIdUseCase,
    private deletePokemon: DeletePokemonUseCase,
    private updatePokemon: UpdatePokemonUseCase
  ) {}

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { id, name, type, hp } = req.body;
      // eslint-disable-next-line prettier/prettier
      const pokemon = await this.createPokemonUseCase.execute({ id, name, type, hp });

      return res.status(201).json({
        message: 'Pokemon criado com sucesso!',
        data: { id: pokemon.id, name: pokemon.name, type: pokemon.type, hp: pokemon.hp },
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Erro interno no servidor' });
    }
  }

  async list(req: Request, res: Response): Promise<Response> {
    const pokemons = await this.listPokemonsUseCase.execute();

    const formattedPokemons = pokemons.map((p) => ({
      id: p.id,
      name: p.name,
      type: p.type,
      hp: p.hp
    }));

    return res.status(200).json({ data: formattedPokemons });
  }

  async getById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const pokemon = await this.getByIdPokemon.execute(String(id));

      return res.status(200).json({
        message: "Pokemon encontrado com sucesso",
        data: pokemon
      });
    } catch(error) {
      if (error instanceof Error) {
        return res.status(400).json({error: error.message})
      }
      return res.status(500).json({error: 'erro interno no servidor'})
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      await this.deletePokemon.execute(String(id));

      return res.status(200).json({message: 'Pokemon deletado com sucesso'})
    } catch(error) {
      if (error instanceof Error) {
        return res.status(400).json({error: error.message})
      }
      return res.status(500).json({error: 'erro interno no servidor'})
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
  try {
    const { id } = req.params;
    const { name, type, hp } = req.body;

    if (typeof id !== 'string') {
      return res.status(400).json({ error: 'ID inválido.' });
    }

    const pokemonUpdated = await this.updatePokemon.execute({
      id,
      data: { name, type, hp },
    });

    return res.status(200).json({
      message: 'Pokemon atualizado com sucesso',
      data: pokemonUpdated,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(500).json({ error: 'erro interno no servidor' });
  }
}

}