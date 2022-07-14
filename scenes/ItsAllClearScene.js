import { Console } from 'console';
import Phaser from 'phaser'

import eventsCenter from './EventsCenter'
import Third_Scene from './Third_Scene';

export default class ItsAllClear_Scene extends Phaser.Scene {

    constructor()
	{
		super('itsallclear-scene')
	}

    create() {
        //bg
        this.add.image(0,0,'ItsAllCelarScene').setOrigin(0);

        //space handling
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.game_music = this.sound.add('game_theme',{volume: 0.07},true)
		this.game_music.loop = true;
		this.game_music.play();

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
            this.game_music.stop();
            this.scene.start('fifth-scene')
        }
    }
    
}