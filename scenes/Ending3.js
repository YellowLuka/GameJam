import Phaser from 'phaser'
import CollectibleListener from './CollectibleListener'
import eventsCenter from './EventsCenter'
export default class Ending1 extends Phaser.Scene{
    constructor()
    {
        super('ending3')
    }

    create()
    {
        this.add.image(0,0,'fifthscene').setOrigin(0);
        this.add.image(793,333,'far').setOrigin(0).setDepth(-2);
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.game_music_Ending3Music = this.sound.add('Ending3Music',{volume: 0.2},true)
		this.game_music_Ending3Music.loop = true;
		this.game_music_Ending3Music.play();

        this.button_press_audio = this.sound.add('button_press_audio',{volume: 0.02})

        this.physics.pause();
        this.physics.add.sprite(200,400,'play').setScale(0.2)
        this.add.image(100,100,'Enemy1')
        this.add.image(1000,500,'Enemy1')
        this.add.image(800,632,'Ending3Bubble').setScale(0.6)
		
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
            this.game_music_Ending3Music.stop();
            this.scene.start('menu')
        }
    }
    
   
}

