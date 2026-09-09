import { ListPokemonsUseCase } from '@application/use-cases/ListPokemons';
import { CreatePokemonUseCase } from '@application/use-cases/CreatePokemons';
import { getByIdUseCase } from '@application/use-cases/GetByIdPokemon';
import { DeletePokemonUseCase } from '@application/use-cases/DeletePokemon';
import { UpdatePokemonUseCase } from '@application/use-cases/UpdatePokemon';
import { PokemonController } from '@infrastructure/http/controllers/pokemon.controller';
import { InMemoryPokemonRepository } from '@infrastructure/database/InMemoryPokemonRepository';

const pokemonRepository = new InMemoryPokemonRepository();

export function makePokemonController(): PokemonController {
  const listPokemonsUseCase = new ListPokemonsUseCase(pokemonRepository);
  const createPokemonUseCase = new CreatePokemonUseCase(pokemonRepository);
  const getByIdPokemonUsecase = new getByIdUseCase(pokemonRepository);
  const deletePokemon = new DeletePokemonUseCase(pokemonRepository);
  const updatePokemon = new UpdatePokemonUseCase(pokemonRepository);

  return new PokemonController(
    listPokemonsUseCase,
    createPokemonUseCase,
    getByIdPokemonUsecase,
    deletePokemon,
    updatePokemon,
  );
}
