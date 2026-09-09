import path from 'path';
import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    version: '1.0.0',
    title: 'Pokemon Manager API',
    description:
      'API de gerenciamento de Pokémon desenvolvida para a disciplina Tópicos Especiais em Engenharia de Software (UFF)',
  },
  host: 'localhost:3333',
  basePath: '/',
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [
    {
      name: 'Pokemons',
      description: 'Endpoints de gerenciamento de pokemons',
    },
  ],
  definitions: {
    Pokemon: {
      id: '1',
      name: 'Bulbasaur',
      type: 'Grass',
      hp: 45,
    },
    PokemonInput: {
      $id: '25',
      $name: 'Pikachu',
      $type: 'Electric',
      $hp: 35,
    },
    PokemonUpdateInput: {
      name: 'Pikachu',
      type: 'Electric',
      hp: 35,
    },
    ErrorResponse: {
      error: 'Pokémon não encontrado no catálogo.',
    },
  },
};

const outputFile = path.resolve(__dirname, 'swagger-output.json');
const endpointsFiles = [path.resolve(__dirname, '../server.ts')];

swaggerAutogen({ openapi: '3.0.0' })(outputFile, endpointsFiles, doc);
