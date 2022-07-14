import { Console } from 'console';
import Phaser from 'phaser'

import eventsCenter from './EventsCenter'
import Third_Scene from './Third_Scene';

export default class Dizzy_Scene extends Phaser.Scene {

    constructor()
	{
		super('dizzy-scene')
	}

    create() {
        //bg
        this.add.image(0,0,'DizzyScene').setOrigin(0);

        //space handling
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        //audio
        this.game_music_labs = this.sound.add('Labs_bgAudio',{volume: 0.1},true)
		this.game_music_labs.loop = true;
		this.game_music_labs.play();

        //space text
        this.time.addEvent({
            delay: 3000,
            callback: ()=>{
                this.add.image(1100,700,'dtext')
            },
        })
    }   

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.spacebar))
        {
            this.game_music_labs.stop();
            this.scene.start('first-scene')
        }
    }
    
}