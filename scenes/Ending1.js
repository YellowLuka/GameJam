import Phaser from 'phaser'
import CollectibleListener from './CollectibleListener'
import eventsCenter from './EventsCenter'
export default class Ending1 extends Phaser.Scene{
    constructor()
    {
        super('ending1')
    }

    create()
    {
        this.scene.run('ui-scene')
        this.add.image(0,0,'ending1').setOrigin(0);
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        //audio
        this.game_music_Ending1Music = this.sound.add('Ending1Music',{volume: 0.1},true)
		this.game_music_Ending1Music.loop = true;
		this.game_music_Ending1Music.play();

        this.button_press_audio = this.sound.add('button_press_audio',{volume: 0.02})

        this.player = this.physics.add.sprite(-100,400,'play').setImmovable(true).setScale(0.2)
		this.player.body.setAllowGravity(false);
        this.player.setVelocityX(60);
        
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
            this.game_music_Ending1Music.stop()
            this.scene.start('menu')
           
        }
    }
    
   
}