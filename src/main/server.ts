import express, { Request, Response, NextFunction } from 'express';

const app = express();

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);

  next();
});

app.use(express.json());

// Banco temporário em memória 
interface Pokemon {
  id: string;
  name: string;
  type: string;
  hp: number;
}

const pokemons: Pokemon[] = [
  { id: '1', name: 'Bulbasaur', type: 'Grass', hp: 45 },
  { id: '4', name: 'Charmander', type: 'Fire', hp: 39 },
  { id: '7', name: 'Squirtle', type: 'Water', hp: 44 },
];

//! https://localhost:3333/pokemons?type=fire

app.get('/api/v1/pokemons', (req: Request, res: Response) => {
  const { type } = req.query;

  // Se o cliente enviou um filtro por tipo (ex: ?type=Fire)
  if (type) {
    const filteredPokemons = pokemons.filter(
      (p) => p.type.toLowerCase() === String(type).toLowerCase()
    );
    return res.status(200).json(filteredPokemons);
  }

  return res.status(200).json(pokemons);
});

//! https://localhost:3333/pokemons/1

app.get('/api/v1/pokemons/:id', (req: Request, res: Response) => {
  const { id } = req.params; // Extrai o parâmetro da rota

  const pokemon = pokemons.find((p) => p.id === id);

  if (!pokemon) {
    return res.status(404).json({ error: 'Pokémon não encontrado no catálogo.' });
  }

  return res.status(200).json(pokemon);
});


app.post('/api/v1/pokemons', (req: Request, res: Response) => {
  const { id, name, type, hp } = req.body;

  if (!id || !name || !type || !hp) {
    return res.status(400).json({
      error: 'Campos obrigatórios ausentes: id, name, type e hp são necessários.'
    });
  }

  const pokemonExists = pokemons.some((p) => p.id === id);
  if (pokemonExists) {
    return res.status(400).json({ error: 'Pokémon com este ID já existe.' });
  }

  const newPokemon: Pokemon = { id, name, type, hp: Number(hp) };
  pokemons.push(newPokemon);

  return res.status(201).json({
    message: 'Pokémon cadastrado com sucesso!',
    data: newPokemon,
  });
});

const PORT = 3333;

app.listen(PORT, () => {
  console.log(`⚡️ [server]: API rodando em http://localhost:${PORT}`);
});