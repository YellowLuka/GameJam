import Phaser from 'phaser'
import eventsCenter from './EventsCenter'
import GameScene from './GameScene'
import Fifth_Scene from './Fifth_Scene'
export default class CollectibleListener extends Phaser.Scene
{
	constructor()
	{
		super('ui-scene')
	}

	create()
	{
		eventsCenter.on('init-Counter', this.initCounter, this) 
	    eventsCenter.on('update-count', this.updateCount, this) 
		
	}

	initCounter(counter){
		this.counter = 0; 
	}

	updateCount(counter)
	{
		this.counter++;
		console.log(this.counter)
		
        
	}

}

