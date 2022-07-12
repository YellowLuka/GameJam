import Phaser from 'phaser'
import eventsCenter from './EventsCenter'

export default class Third_Scene extends Phaser.Scene
{
    constructor()
	{
		super('third-scene')
	}

    create() {
        this.scene.launch('ui')
        //bg
        this.add.image(0,0,'thirdscene').setOrigin(0);

        //adding keys handling
		this.cursors = this.input.keyboard.createCursorKeys();

        //adding player
		this.player = this.physics.add.sprite(8,440,'play')
		this.player.setScale(0.2)
		this.player.setCollideWorldBounds();

        //collectible
		this.collectible = this.physics.add.sprite(230,215,'Collectible').setImmovable(true).setScale(0.3).setVisible(false)
		this.collectible.body.setAllowGravity(false);

        //platforms
        let platforms = this.physics.add.staticGroup();
        platforms.create(680, 650, 'floorHitBox').setVisible(false);
        platforms.create(8, 478, 'fStephb').setVisible(false);
        platforms.create(30, 505, 'sStephb').setVisible(false);
        platforms.create(55, 535, 'tStephb').setVisible(false);
        platforms.create(89, 569, 'foStephb').setVisible(false);
        platforms.create(129, 596, 'ftStephb').setVisible(false);
        platforms.create(332, 534, 'handlehitbox').setVisible(false);
        platforms.create(332, 443, 'handlehitbox').setVisible(false);
        platforms.create(332, 362, 'handlehitbox').setVisible(false);
        platforms.create(510, 502, 'DrawerHitBox').setVisible(false);
        platforms.create(680, 457, 'DrawerHitBox').setVisible(false);
        platforms.create(340, 337, 'DrawerHitBox').setVisible(false);
        
        //Set Visible plat
        this.plat = this.physics.add.staticGroup()
        this.plat.create(380,330,'HandlerButton').setVisible(false);

        //lightning
		this.add.image(1260,580,'Lightning').setScale(0.2);

        //collisions with platforms
		this.physics.add.collider(this.player, platforms);

        //collisions with player
        this.physics.add.collider(this.player, this.collectible, this.GetCollectible, null, this)
        this.physics.add.collider(this.player, this.plat,  this.collectibleSetVisible, null, this);

        //Przechodzenie między scenami veria alpha (działa)
		let Swaper = this.physics.add.staticGroup();
		Swaper.create(1263,586, 'DoorsHB').setVisible(false);
		this.physics.add.collider(this.player,Swaper,this.SceneSwap,null,this);
    }

    update() {
        if (this.cursors.left.isDown)
		{
			this.player.setVelocityX(-90);
		}
		else if (this.cursors.right.isDown)
		{
			this.player.setVelocityX(90);
		}
		else
		{
			this.player.setVelocityX(0);
		}

		if (this.cursors.up.isDown && this.player.body.touching.down)
		{
			this.player.setVelocityY(-200);

		} else if(this.cursors.down.isDown) {

			this.player.setVelocityY(180);
		}
    }

    SceneSwap(){
		this.scene.start('fourth-scene');
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