import { Asteroid } from "./asteroid";
import { Bounty } from "./bounty";
import { Missile } from "./missile";
import { Shield } from "./shield";
import { Starship } from "./starship";
import { TextEntity } from "./text";

export type Entities = Asteroid | Missile | Starship | Bounty | TextEntity | Shield;
