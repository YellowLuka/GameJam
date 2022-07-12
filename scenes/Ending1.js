import Phaser from 'phaser'


export default class Ending1 extends Phaser.Scene{
    constructor()
    {
        super('ending1')
    }

    create()
    {
        this.add.image(0,0,'ending1').setOrigin(0);
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);


        this.player = this.physics.add.sprite(-100,400,'play').setImmovable(true).setScale(0.2)
		this.player.body.setAllowGravity(false);
        this.player.setVelocityX(100);
        
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.spacebar))
        {
            this.scene.start('ending2')
        }
    }
    
   
}