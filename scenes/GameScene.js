import Phaser from 'phaser'
import eventsCenter from './EventsCenter'

export default class GameScene extends Phaser.Scene
{
	
	constructor()
	{
		super('game-scene')
	}
	
	create()
	{
		this.scene.launch('ui')
		//tlo
		this.add.image(0,0,'gamebg').setOrigin(0);
		
		//audio
		this.game_music = this.sound.add('game_theme',{volume: 0.07},true)
		this.game_music.loop = true;
		this.game_music.play();

		//dodanie gracza
		this.player = this.physics.add.sprite(180,135,'play')
		this.player.setScale(0.2)
		this.player.setCollideWorldBounds();

		//platformy hitboxy
		let platforms = this.physics.add.staticGroup();
    	platforms.create(219, 240, 'SRHitbox').setScale(0.9).setVisible(false);
    	platforms.create(650, 320, 'R3Hitbox').setVisible(false);
		platforms.create(884, 560, 'R4Hitbox').setVisible(false);
		platforms.create(783, 386, 'R5Hitbox').setVisible(false);
		platforms.create(1070, 700, 'SHitBox').setVisible(false);
		platforms.create(928, 330, 'MiniHitBox').setVisible(false);
		platforms.create(470, 300,'APlatform').setVisible(false);
		platforms.create(562,308,'CHitBox').setVisible(false);
		
		//dodatkowe platformy
		this.add.image(562,300,'Chain').setScale(0.35)

		this.plat = this.physics.add.staticGroup()
		this.plat.create(670,500,'APlatform')

		//chmurki dialogowe
		this.add.image(300,60,'bubble').setScale(0.7);
		
		//collectible
		this.collectible = this.physics.add.sprite(490,350,'Collectible').setImmovable(true).setScale(0.3)
		this.collectible.body.setAllowGravity(false);

		//lightning
		this.add.image(1260,600,'Lightning').setScale(0.2);

		//abyss
		this.watter = this.physics.add.staticGroup(); 
		this.watter.create(450,750,'AbyssHitBox').setVisible(false);

		//Enemy
		this.PlatformEnemy1 = this.physics.add.sprite(1230,646,'Enemy1');
		this.PlatformEnemy2 = this.physics.add.sprite(910,290,'Enemy1').setGravityY(0);
		this.PlatformEnemy1.enableBody = true;
		this.Projectile = this.physics.add.sprite(645,285,'Projectile').setScale(0.25);
		

		//collisions with platforms
		this.physics.add.collider(this.player, platforms);
		this.physics.add.collider(this.PlatformEnemy1, platforms);
		this.physics.add.collider(this.PlatformEnemy2, platforms);
		this.physics.add.collider(this.Projectile, platforms);

		//Przechodzenie między scenami veria alpha (działa)
		let Keepo = this.physics.add.staticGroup();
		Keepo.create(1250,620, 'Teleport');
		this.physics.add.collider(this.player,Keepo,this.SceneSwap,null,this);

		//collisions with player
		this.physics.add.collider(this.player, this.collectible, this.GetCollectible, null, this)
		this.physics.add.collider(this.player, this.watter, this.ReturnToMonke, null, this);
		this.physics.add.collider(this.player, this.Projectile, this.ReturnToMonke, null, this);
		this.physics.add.collider(this.player, this.PlatformEnemy1,  this.ReturnToMonke, null, this);
		this.physics.add.collider(this.player, this.PlatformEnemy2,  this.ReturnToMonke, null, this);
		this.physics.add.collider(this.player, this.plat,  this.BubbleSetVisible, null, this);
		
		//dodanie obsługi strzałek
		this.cursors = this.input.keyboard.createCursorKeys();

	}

	//Movement
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
		
		if (this.PlatformEnemy1.x < 900 && this.PlatformEnemy1.body.velocity.x <= 0) {
			this.PlatformEnemy1.setVelocityX(110);
		  } else if (this.PlatformEnemy1.x > 1210 && this.PlatformEnemy1.body.velocity.x >= 0) {
			this.PlatformEnemy1.setVelocityX(-110);
		  }

		if (this.Projectile.y < 300 && this.Projectile.body.touching.down) {
			this.Projectile.setVelocityY(-300);
		  } 

	}


	ReturnToMonke() {
		this.game_music.stop();
		this.scene.restart();
	}

	BubbleSetVisible() {
		//60 promisow na sekunde, do naprawienia moze idk XDD
		let bubble = this.add.image(600,400,'Bubble2ph').setScale(0.7)
			const promise1 = new Promise((resolve, reject) => {
				setTimeout(() => {
				  bubble.setVisible(false)  
				}, 200);
			  });  
		}
	
	SceneSwap(){
		this.game_music.stop();
		this.scene.start('second-scene');
	}
	
	//dziala, pot krew i lzy
	GetCollectible(){
		this.count = 1
		this.scene.run('ui-scene')
		console.log("XD")
		console.log(this.count)
		this.collectible.destroy()
		this.count++
		eventsCenter.emit('update-count', this.count)
	}

}

