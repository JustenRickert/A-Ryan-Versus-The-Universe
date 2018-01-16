import Fighter from './fighter';

enum Up {
  Health = 'HEALTH',
  Damage = 'DAMAGE',
  Cd = 'COOLDOWN'
}

export default class Upgrade {
  up: Up;
  level: number;

  constructor(upgrade: Up) {
    this.up = upgrade;
    this.level = 0;
  }

  levelUp = () => {
    this.level++;
  };
}
