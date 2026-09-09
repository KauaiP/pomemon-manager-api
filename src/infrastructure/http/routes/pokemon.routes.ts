import { Router } from 'express';
import { makePokemonController } from '@main/factories/makePokemonFactory';

const pokemonRoutes = Router();
const pokemonController = makePokemonController();

pokemonRoutes.get('/', (req, res) => {
  /*
    #swagger.tags = ['Pokemons']
    #swagger.summary = 'Lista todos os pokemons'
    #swagger.description = 'Endpoint para listar pokemons cadastrados, com filtro opcional por tipo.'
    #swagger.parameters['type'] = {
      in: 'query',
      required: false,
      type: 'string',
      description: 'Filtra os Pokémon por tipo (ex: Fire, Water)'
    }
    #swagger.responses[200] = {
      description: 'Lista de Pokémon retornada com sucesso.',
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: { $ref: '#/components/schemas/Pokemon' }
          }
        }
      }
    }
  */
  return pokemonController.list(req, res);
});

pokemonRoutes.get('/:id', (req, res) => {
  /*
    #swagger.tags = ['Pokemons']
    #swagger.summary = 'Busca um pokemon pelo ID'
    #swagger.parameters['id'] = {
      in: 'path',
      required: true,
      type: 'string',
      example: '1'
    }
    #swagger.responses[200] = {
      description: 'Pokémon encontrado.',
      content: {
        'application/json': {
          schema: { $ref: '#/components/schemas/Pokemon' }
        }
      }
    }
    #swagger.responses[404] = {
      description: 'Pokémon não encontrado.',
      content: {
        'application/json': {
          schema: { $ref: '#/components/schemas/ErrorResponse' }
        }
      }
    }
  */
  return pokemonController.getById(req, res);
});

pokemonRoutes.post('/', (req, res) => {
  /*
    #swagger.tags = ['Pokemons']
    #swagger.summary = 'Cria um novo pokemon'
    #swagger.requestBody = {
      required: true,
      content: {
        'application/json': {
          schema: { $ref: '#/components/schemas/PokemonInput' }
        }
      }
    }
    #swagger.responses[201] = {
      description: 'Pokémon cadastrado com sucesso.',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              message: { type: 'string', example: 'Pokémon cadastrado com sucesso!' },
              data: { $ref: '#/components/schemas/Pokemon' }
            }
          }
        }
      }
    }
    #swagger.responses[400] = {
      description: 'Campos obrigatórios ausentes ou ID já existente.',
      content: {
        'application/json': {
          schema: { $ref: '#/components/schemas/ErrorResponse' }
        }
      }
    }
  */
  return pokemonController.create(req, res);
});

pokemonRoutes.put('/:id', (req, res) => {
  /*
    #swagger.tags = ['Pokemons']
    #swagger.summary = 'Atualiza um pokemon existente'
    #swagger.parameters['id'] = {
      in: 'path',
      required: true,
      type: 'string',
      example: '1'
    }
    #swagger.requestBody = {
      required: true,
      content: {
        'application/json': {
          schema: { $ref: '#/components/schemas/PokemonUpdateInput' }
        }
      }
    }
    #swagger.responses[200] = {
      description: 'Pokémon atualizado com sucesso.',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              message: { type: 'string', example: 'Pokémon atualizado com sucesso!' },
              data: { $ref: '#/components/schemas/Pokemon' }
            }
          }
        }
      }
    }
    #swagger.responses[400] = {
      description: 'Nenhum campo válido enviado.',
      content: {
        'application/json': {
          schema: { $ref: '#/components/schemas/ErrorResponse' }
        }
      }
    }
    #swagger.responses[404] = {
      description: 'Pokémon não encontrado.',
      content: {
        'application/json': {
          schema: { $ref: '#/components/schemas/ErrorResponse' }
        }
      }
    }
  */
  return pokemonController.update(req, res);
});

pokemonRoutes.delete('/:id', (req, res) => {
  /*
    #swagger.tags = ['Pokemons']
    #swagger.summary = 'Remove um pokemon do catálogo'
    #swagger.parameters['id'] = {
      in: 'path',
      required: true,
      type: 'string',
      example: '1'
    }
    #swagger.responses[204] = {
      description: 'Pokémon removido com sucesso (sem conteúdo de retorno).'
    }
    #swagger.responses[404] = {
      description: 'Pokémon não encontrado.',
      content: {
        'application/json': {
          schema: { $ref: '#/components/schemas/ErrorResponse' }
        }
      }
    }
  */
  return pokemonController.delete(req, res);
});

export { pokemonRoutes };
