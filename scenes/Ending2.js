import Phaser from 'phaser'
import CollectibleListener from './CollectibleListener'
import eventsCenter from './EventsCenter'
export default class Ending2 extends Phaser.Scene{
    constructor()
    {
        super('ending2')
    }

    create()
    {
        this.add.image(0,0,'ending2').setOrigin(0);

        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        //audio
        this.game_music_Ending2Music = this.sound.add('Ending2Music',{volume: 0.1},true)
		this.game_music_Ending2Music.loop = true;
		this.game_music_Ending2Music.play();

        this.button_press_audio = this.sound.add('button_press_audio',{volume: 0.02})

        this.time.addEvent({
            delay: 5000,
            callback: ()=>{
                this.add.image(1000,700,'EndingText')
            },
        })

        
        
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.spacebar))
        {
            this.button_press_audio.play()
            this.game_music_Ending2Music.stop();
            this.scene.start('menu')
        }
    }
    
   
}