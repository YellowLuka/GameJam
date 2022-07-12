import Phaser from 'phaser'


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

        this.physics.pause();
        this.physics.add.sprite(200,400,'play').setScale(0.2)
        this.add.image(100,100,'Enemy1')
        this.add.image(1000,500,'Enemy1')
        this.add.image(800,650,'buble')// to do zmiany na napis koncowy
		
        
        
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.spacebar))
        {
            this.scene.start('ending2')
        }
    }
    
   
}

