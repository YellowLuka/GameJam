import Phaser from 'phaser'
import GameScene from './scenes/GameScene'

import MenuScene from './scenes/MenuScene'
import PreloadScene from './scenes/PreloadScene'

const config = {
	type: Phaser.AUTO,
	width: 1280,
	height: 720,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 200 }
		}
	},
	scene: [PreloadScene,MenuScene,GameScene],
}

export default new Phaser.Game(config)
