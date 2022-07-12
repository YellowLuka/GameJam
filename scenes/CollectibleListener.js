import Phaser from 'phaser'
import eventsCenter from './EventsCenter'
export default class CollectibleListener extends Phaser.Scene
{
	constructor()
	{
		super('ui-scene')
	}

	create()
	{
		this.counter = 0;
        
	    eventsCenter.on('update-count', this.updateCount, this)
        
	    // clean up when Scene is shutdown
	    /* this.events.on(Phaser.Scenes.Events.SHUTDOWN, () => {
		eventsCenter.off('update-count', this.updateCount, this)
	}) */
	}

	updateCount(count)
	{
		this.counter += count
        console.log(this.counter)
	}
}

