import Phaser from 'phaser'

import eventsCenter from './EventsCenter'

export default class Second_Scene extends Phaser.Scene
{
    constructor()
	{
		super('second-scene')
	}

    create() {

		this.scene.run('ui-scene')
        //bg
        this.add.image(0,0,'secondscene').setOrigin(0);

        //adding keys handling
		this.cursors = this.input.keyboard.createCursorKeys();
        
        //audio
		this.game_music = this.sound.add('game_theme',{volume: 0.1},true)
		this.game_music.loop = true;
		this.game_music.play();

		this.game_music_wind = this.sound.add('windbg',{volume: 1},true)
		this.game_music_wind.loop = true;
		this.game_music_wind.play();

		this.game_music_pickup = this.sound.add('item_pickup',{volume: 1},true)

		this.game_music_Running_Sound = this.sound.add('Running_Sound',{volume: 0.1},true)

		this.game_music_open_the_door = this.sound.add('open_the_door',{volume: 0.15},true)

		this.game_music_ded = this.sound.add('ded',{volume: 0.15},true)

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
		this.PlatformEnemy2 = this.physics.add.sprite(1250,400,'Enemy1').setGravityY(0);
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
		this.physics.add.collider(this.PlatformEnemy2, platforms);

		//collisions with player
		this.physics.add.collider(this.player, this.collectible, this.GetCollectible, null, this)
		this.physics.add.collider(this.player, this.abyss, this.ReturnToMonke, null, this);
		this.physics.add.collider(this.player, this.Projectile, this.ReturnToMonke, null, this);
		this.physics.add.collider(this.player, this.Projectile1, this.ReturnToMonke, null, this);
		this.physics.add.collider(this.player, this.PlatformEnemy1,  this.ReturnToMonke, null, this);
		this.physics.add.collider(this.player, this.PlatformEnemy2,  this.ReturnToMonke, null, this);
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

		} else if(this.player.body.touching.down) {
			this.game_music_Running_Sound.play()
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
		
		if (this.PlatformEnemy2.x < 960 && this.PlatformEnemy2.body.velocity.x <= 0) {
			this.PlatformEnemy2.setVelocityX(110);
		} else if (this.PlatformEnemy2.x > 1240 && this.PlatformEnemy2.body.velocity.x >= 0) {
			this.PlatformEnemy2.setVelocityX(-110);
		}
	}

	ReturnToMonke() {
		this.game_music_ded.play();
		this.game_music_wind.stop();
		this.game_music.stop();
		this.scene.restart();
	}

	SceneSwap(){
		this.game_music_open_the_door.play()
		this.game_music_wind.stop();
		this.game_music.stop();
		this.scene.start('third-scene');
	}

	GetCollectible(){
		this.game_music_pickup.play();
		this.collectible.destroy()
		eventsCenter.emit('update-count', this.count)
	}

	collectibleSetVisible(){
		this.collectible.setVisible(true)
	}
}