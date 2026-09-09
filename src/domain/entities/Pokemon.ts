export interface PokemonProps {
  id: string;
  name: string;
  type: string;
  hp: number;
}

export class Pokemon {
  private props: PokemonProps;

  constructor(props: PokemonProps) {
    this.props = props;
  }

  get id() {
    return this.props.id;
  }

  set id(id: string) {
    this.id = id;
  }

  get name() {
    return this.props.name;
  }

  set name(name: string) {
    this.name = name;
  }

  get type() {
    return this.props.type;
  }

  set type(type: string) {
    this.type = type;
  }

  get hp() {
    return this.props.hp;
  }

  set hp(hp: number) {
    this.hp = hp;
  }
}
