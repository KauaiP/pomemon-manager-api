import express, { Request, Response, NextFunction } from 'express';
import { InMemoryPokemonRepository } from '@infrastructure/InMemoryPokemonRepository';
import { Pokemon } from '@domain/entities/Pokemon';

const app = express();

const pokemonRepository = new InMemoryPokemonRepository();

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);

  next();
});

app.use(express.json());
//! https://localhost:3333/api/v1/pokemons?type=fire

app.get('/api/v1/pokemons', async (req: Request, res: Response) => {
  const { type } = req.query;

  const result = type
    ? await pokemonRepository.findByType(String(type))
    : await pokemonRepository.findAll();

  return res.status(200).json(result);
});

app.get('/api/v1/pokemons/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const pokemon = await pokemonRepository.findById(String(id));

  if (!pokemon) {
    return res
      .status(404)
      .json({ error: 'Pokémon não encontrado no catálogo.' });
  }

  return res.status(200).json(pokemon);
});

app.post('/api/v1/pokemons', async (req: Request, res: Response) => {
  const { id, name, type, hp } = req.body;

  if (!id || !name || !type || !hp) {
    return res.status(400).json({
      error:
        'Campos obrigatórios ausentes: id, name, type e hp são necessários.',
    });
  }

  if (await pokemonRepository.exists(id)) {
    return res.status(400).json({ error: 'Pokémon com este ID já existe.' });
  }

  const newPokemon = await pokemonRepository.create({
    id,
    name,
    type,
    hp: Number(hp),
  });

  return res.status(201).json({
    message: 'Pokémon cadastrado com sucesso!',
    data: newPokemon,
  });
});

app.put('/api/v1/pokemons/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  if (typeof id !== 'string') {
    return res.status(400).json({ error: 'ID inválido.' });
  }

  const { name, type, hp } = req.body;

  if (!name && !type && !hp) {
    return res.status(400).json({
      error: 'Envie ao menos um campo para atualizar: name, type ou hp.',
    });
  }

  const dadosAtualizados: Partial<Pokemon> = {};
  if (name) dadosAtualizados.name = name;
  if (type) dadosAtualizados.type = type;
  if (hp) dadosAtualizados.hp = Number(hp);

  const pokemonAtualizado = await pokemonRepository.update(
    id,
    dadosAtualizados,
  );

  if (!pokemonAtualizado) {
    return res
      .status(404)
      .json({ error: 'Pokémon não encontrado no catálogo.' });
  }

  return res.status(200).json({
    message: 'Pokémon atualizado com sucesso!',
    data: pokemonAtualizado,
  });
});

app.delete('/api/v1/pokemons/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  if (typeof id !== 'string') {
    return res.status(400).json({ error: 'ID inválido.' });
  }

  const deletado = await pokemonRepository.delete(id);

  if (!deletado) {
    return res
      .status(404)
      .json({ error: 'Pokémon não encontrado no catálogo.' });
  }

  return res.status(204).send();
});

const PORT = 3333;

app.listen(PORT, () => {
  console.log(`⚡️ [server]: API rodando em http://localhost:${PORT}`);
});
