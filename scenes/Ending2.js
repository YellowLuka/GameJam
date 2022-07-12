import Phaser from 'phaser'


export default class Ending2 extends Phaser.Scene{
    constructor()
    {
        super('ending2')
    }

    create()
    {
        this.add.image(0,0,'ending2').setOrigin(0);
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.spacebar))
        {
            this.scene.start('menu')
        }
    }
    
   
}