import Phaser from 'phaser'

import eventsCenter from './EventsCenter'

export default class Second_Scene extends Phaser.Scene
{
    constructor()
	{
		super('second-scene')
	}

    create() {
        //bg
        this.add.image(0,0,'secondscene').setOrigin(0);

        //adding keys handling
		this.cursors = this.input.keyboard.createCursorKeys();
        
        //audio
		this.game_music = this.sound.add('game_theme',{volume: 0.1},true)
		this.game_music.loop = true;
		this.game_music.play();

        //adding player
		this.player = this.physics.add.sprite(126,362,'play')
		this.player.setScale(0.2)
		this.player.setCollideWorldBounds();

		//lightning
		this.add.image(1250,340,'Lightning').setScale(0.2);

		//collectible
		this.collectible = this.physics.add.sprite(930,115,'Collectible').setImmovable(true).setScale(0.3).setVisible(false);
		this.collectible.body.setAllowGravity(false);

		//enemy
		this.Projectile = this.physics.add.sprite(427,455,'Projectile').setScale(0.25);
		this.Projectile1 = this.physics.add.sprite(748,425,'Projectile').setScale(0.25);
		this.PlatformEnemy1 = this.physics.add.sprite(1070,150,'Enemy1');
		this.PlatformEnemy1.enableBody = true;

        //abyss
		this.abyss = this.physics.add.staticGroup(); 
		this.abyss.add(this.add.sprite(450,800,'AbyssHitBox').setScale(1.8).setVisible(false))
		

        //platforms
        let platforms = this.physics.add.staticGroup();
        platforms.create(126, 390, 'scfhitbox').setScale(0.6).setVisible(false);
        platforms.create(300, 390, 'scfhitbox').setVisible(false);
		platforms.create(427,515, 'R3Hitbox').setVisible(false);
		platforms.create(748,480, 'R3Hitbox').setVisible(false);
		platforms.create(555, 535, 'MiniHitBox').setVisible(false);
		platforms.create(645, 500, 'MiniHitBox').setVisible(false).setScale(0.5,0.5);
		platforms.create(875,440, 'lhitbox').setVisible(false);
		platforms.create(1110,440,'PlanetHitBox').setVisible(false);
		platforms.create(950,190,'DPlanetHitBox').setVisible(false);

		
		//Set Visible Plat
		this.plat = this.physics.add.staticGroup()
        this.plat.create(1230,263,'lhitbox').setVisible(false);
		

		//Przechodzenie między scenami veria alpha (działa)
		let Swaper = this.physics.add.staticGroup();
		Swaper.create(1244,340, 'platforms').setVisible(false);
		this.physics.add.collider(this.player,Swaper,this.SceneSwap,null,this);
		


        //collisions with platforms
		this.physics.add.collider(this.player, platforms);
		this.physics.add.collider(this.Projectile, platforms);
		this.physics.add.collider(this.Projectile1, platforms);
		this.physics.add.collider(this.PlatformEnemy1, platforms);

		//collisions with player
		this.physics.add.collider(this.player, this.collectible, this.GetCollectible, null, this)
		this.physics.add.collider(this.player, this.abyss, this.ReturnToMonke, null, this);
		this.physics.add.collider(this.player, this.Projectile, this.ReturnToMonke, null, this);
		this.physics.add.collider(this.player, this.Projectile1, this.ReturnToMonke, null, this);
		this.physics.add.collider(this.player, this.PlatformEnemy1,  this.ReturnToMonke, null, this);
		this.physics.add.collider(this.player, this.plat,  this.collectibleSetVisible, null, this);
		
    }

    update ()
	{
		
		if (this.cursors.left.isDown)
		{
			this.player.setVelocityX(-110);
		}
		else if (this.cursors.right.isDown)
		{
			this.player.setVelocityX(110);
		}
		else
		{
			this.player.setVelocityX(0);
		}

		if (this.cursors.up.isDown && this.player.body.touching.down)
		{
			this.player.setVelocityY(-230);

		} else if(this.cursors.down.isDown) {

			this.player.setVelocityY(180);
		}

		if (this.Projectile.y < 490 && this.Projectile.body.touching.down) {
			this.Projectile.setVelocityY(-350);
		  } else if (this.Projectile1.y < 450 && this.Projectile1.body.touching.down) {
			this.Projectile1.setVelocityY(-350);
		  }

		if (this.PlatformEnemy1.x < 830 && this.PlatformEnemy1.body.velocity.x <= 0) {
			this.PlatformEnemy1.setVelocityX(60);
		  } else if (this.PlatformEnemy1.x > 1065 && this.PlatformEnemy1.body.velocity.x >= 0) {
			this.PlatformEnemy1.setVelocityX(-60);
		  }

	}

	ReturnToMonke() {
		this.game_music.stop();
		this.scene.restart();
	}

	SceneSwap(){
		this.game_music.stop();
		this.scene.start('third-scene');
	}

	GetCollectible(){
		this.count = 1
		this.scene.run('ui-scene')
		console.log("XD")
		console.log(this.count)
		this.collectible.destroy()
		this.count++
		eventsCenter.emit('update-count', this.count)
	}

	collectibleSetVisible(){
		this.collectible.setVisible(true)
	}
}