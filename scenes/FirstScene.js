import Phaser from 'phaser'

import eventsCenter from './EventsCenter'
import Third_Scene from './Third_Scene';

export default class First_Scene extends Phaser.Scene {

    constructor()
	{
		super('first-scene')
	}

    create() {
		this.scene.run('ui-scene')
        //bg
        this.add.image(0,0,'firstscene').setOrigin(0);

        //adding keys handling
		this.cursors = this.input.keyboard.createCursorKeys();

        //audio
		this.game_music = this.sound.add('game_theme',{volume: 0.07},true)
		this.game_music.loop = true;
		this.game_music.play();

        this.game_music_wind = this.sound.add('windbg',{volume: 1},true)
		this.game_music_wind.loop = true;
		this.game_music_wind.play();

        this.game_music_Running_Sound = this.sound.add('Running_Sound',{volume: 0.1},true)

        this.game_music_papers_Sound = this.sound.add('papers',{volume: 0.2},true)

        this.game_music_pickup = this.sound.add('item_pickup',{volume: 1},true)

        this.game_music_tp = this.sound.add('tp_usage',{volume: 0.15},true)

        this.game_music_ded = this.sound.add('ded',{volume: 0.15},true)

        //Documents
        this.Documents = this.physics.add.sprite(830,330,'Documents').setImmovable(true).setScale(0.1)
		this.Documents.body.setAllowGravity(false);

        //dodanie gracza
		this.player = this.physics.add.sprite(449,330,'play')
		this.player.setScale(0.2)
		this.player.setCollideWorldBounds();

        //collectible
		this.collectible = this.physics.add.sprite(31,580,'Collectible').setImmovable(true).setScale(0.3).setVisible(false);
		this.collectible.body.setAllowGravity(false);

        //platforms
        let platforms = this.physics.add.staticGroup();
        platforms.create(649, 359, 'PlatformHitBox').setVisible(false);

        //lightning
		this.add.image(1260,600,'Lightning').setScale(0.2);
		
        //speech bubble
        this.bubble = this.add.image(700,250,'DocumentsBubble').setScale(0.2).setVisible(false);

        //przechodzenie
        this.Swaper = this.physics.add.staticGroup();

        //enemy
        this.Projectile = this.physics.add.sprite(227,455,'Projectile').setScale(0.25);
		this.Projectile1 = this.physics.add.sprite(1048,425,'Projectile').setScale(0.25);

        //Przechodzenie między scenami veria alpha (działa)
		let Swaper = this.physics.add.staticGroup();
		Swaper.create(1250,620, 'Teleport');
		this.physics.add.collider(this.player,Swaper,this.SceneSwap,null,this);

        //plat set visible
        this.plat = this.physics.add.staticGroup()
        this.plat.create(649, 695, 'ZFloorHB').setVisible(false);
        this.physics.add.collider(this.player, this.plat, this.TpAndcollectibleSetVisible, null, this);
        this.physics.add.collider(this.player, this.collectible, this.GetCollectible, null, this)

        //collisions with platforms
		this.physics.add.collider(this.player, platforms);
        this.physics.add.collider(this.Projectile, this.plat);
		this.physics.add.collider(this.Projectile1, this.plat);
        this.physics.add.collider(this.player, this.Projectile, this.ReturnToMonke, null, this);
		this.physics.add.collider(this.player, this.Projectile1, this.ReturnToMonke, null, this);
        this.physics.add.collider(this.player, this.Documents, this.DocumentsRead, null, this)
        
    }
    
    update() {
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

        if (this.Projectile.body.touching.down) {
			this.Projectile.setVelocityY(-350);
		  } else if (this.Projectile1.body.touching.down) {
			this.Projectile1.setVelocityY(-350);
		  }

        if(this.player.x < 545) {
			this.bubble.setVisible(false)
		} else if(this.player.x > 540 && this.player.y < 400) {
			this.bubble.setVisible(true)
		} 
    }

    TpAndcollectibleSetVisible(){
		this.collectible.setVisible(true);  
	}

    SceneSwap() {
        this.game_music_tp.play()
        this.player.x = 449
        this.player.y = 326
    }

    GetCollectible(){
		this.game_music_pickup.play();	
		this.collectible.destroy()
		eventsCenter.emit('update-count', this.count)
	}

    ReturnToMonke() {
        this.game_music_ded.play();
		this.game_music_wind.stop();
		this.game_music.stop();
		this.scene.restart();
	}

    DocumentsRead() {
        this.game_music_papers_Sound.play();
        this.game_music_wind.stop();
		this.game_music.stop();
        this.scene.start('documents-scene');
    }
}