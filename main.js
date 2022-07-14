import Phaser from 'phaser'
import Fourth_Scene from './scenes/Fourth_Scene'
import GameScene from './scenes/GameScene'

import MenuScene from './scenes/MenuScene'
import PreloadScene from './scenes/PreloadScene'
import Second_Scene from './scenes/Second_Scene'
import Third_Scene from './scenes/Third_Scene'
import Fifth_Scene from './scenes/Fifth_Scene'
import CollectibleListener from './scenes/CollectibleListener'
import UIScene from './scenes/UI'
import First_Scene from './scenes/FirstScene'
import Documents_Scene from './scenes/Documents_Scene'
import Ending1 from './scenes/Ending1'
import Ending2 from './scenes/Ending2'
import Ending3 from './scenes/Ending3'
import ItsAllClear_Scene from './scenes/ItsAllClearScene'
import Dizzy_Scene from './scenes/DizzyScene'
import Credits from './scenes/Credits'
import GalleryScene from './scenes/Gallery'

const config = {
	type: Phaser.AUTO,
	width: 1280,
	height: 720,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 150 },
			
		}
	},
	scene: [PreloadScene,
			MenuScene,
			GameScene,
			Second_Scene,
			Third_Scene,
			Fourth_Scene,
			Fifth_Scene,
			CollectibleListener,
			UIScene,
			First_Scene,
			Documents_Scene,
			Ending1,
			Ending2,
			Ending3,
			ItsAllClear_Scene,
			Dizzy_Scene,
			Credits,
			GalleryScene
			],
}

export default new Phaser.Game(config)
