import Phaser from 'phaser'


export default class Credits extends Phaser.Scene{
    constructor()
    {
        super('credits')
    }

    create()
    {
        this.add.image(0,0,'Credits').setOrigin(0);
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.button_press_audio = this.sound.add('button_press_audio',{volume: 0.02})

        this.menu_music = this.sound.add('menu_theme',{volume: 0.1})
        this.menu_music.loop = true;
        this.menu_music.play();

		
        this.time.addEvent({
            delay: 5000,
            callback: ()=>{
                this.add.image(700,700,'EndingText')
            },
        })
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.spacebar))
        {
            this.button_press_audio.play();
            this.menu_music.stop();
            this.scene.start('menu')
           
        }
    }
    
   
}

