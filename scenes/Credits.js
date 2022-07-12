import Phaser from 'phaser'


export default class Credits extends Phaser.Scene{
    constructor()
    {
        super('credits')
    }

    create()
    {
        this.add.image(0,0,'Credits').setOrigin(0);
        this.esc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
		
        
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.esc))
        {
            this.scene.start('menu')
        }
    }
    
   
}

