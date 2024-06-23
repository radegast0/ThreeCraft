import { TextureLoader } from 'three';
import { dirtImg, grassImg, glassImg, woodImg, logImg } from './assets.js';

const dirtTexture = new TextureLoader().load(dirtImg);
const logTexture = new TextureLoader().load(logImg);
const grassTexture = new TextureLoader().load(grassImg);
const glassTexture = new TextureLoader().load(glassImg);
const woodTexture = new TextureLoader().load(woodImg);
const groundTexture = new TextureLoader().load(grassImg);

export { dirtTexture, logTexture, grassImg, glassImg, woodImg, groundTexture };
