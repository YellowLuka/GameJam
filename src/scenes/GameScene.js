import Phaser from 'phaser'

export default class GameScene extends Phaser.Scene
{
	
	constructor()
	{
		super('game-scene')
	}

	

	create()
	{
		this.add.image(0,0,'gamebg').setOrigin(0);

		//dodanie gracza
		this.player = this.physics.add.sprite(200,100,'play')
		this.player.setScale(0.2)
		this.player.setCollideWorldBounds(true);

		//platformy
		let platforms = this.physics.add.staticGroup();
		platforms.create(600, 400, 'platforms');
    	platforms.create(225, 250, 'platforms').setScale(2);
    	platforms.create(750, 220, 'platforms');

		//woda
		this.watter = this.physics.add.staticGroup();
		this.watter.create(450,720,'watter');
		//kolizje
		this.physics.add.collider(this.player, platforms);
		this.physics.add.collider(this.player,this.watter);

		//dodanie obsługi strzałek
		this.cursors = this.input.keyboard.createCursorKeys();
		
	}

	
	//Movment
	update ()
	{
		if (this.cursors.left.isDown)
		{
			this.player.setVelocityX(-160);
		}
		else if (this.cursors.right.isDown)
		{
			this.player.setVelocityX(160);
		}
		else
		{
			this.player.setVelocityX(0);
		}

		if (this.cursors.up.isDown && this.player.body.touching.down)
		{
			this.player.setVelocityY(-330);
		}
	}
}