import Phaser from 'phaser'
import eventsCenter from './EventsCenter'

export default class Fourth_Scene extends Phaser.Scene
{
    constructor()
	{
		super('fourth-scene')
	}
    create() {

        this.scene.launch('ui')
        this.scene.run('ui-scene')

        //bg
        this.add.image(0,0,'fourthscene').setOrigin(0);

        //audio
        this.game_music_labs = this.sound.add('Labs_bgAudio',{volume: 0.1},true)
		this.game_music_labs.loop = true;
		this.game_music_labs.play();

        this.game_music_Running_Sound = this.sound.add('Running_Sound',{volume: 0.1},true)

        this.game_music_crafting_sound = this.sound.add('crafting_sound',{volume: 0.3},true)
        
        this.game_music_tp = this.sound.add('tp_usage',{volume: 0.15},true)

        this.game_music_Running_Sound = this.sound.add('Running_Sound',{volume: 0.1},true)

        this.game_music_pickup = this.sound.add('item_pickup',{volume: 1},true)

        this.game_music_ded = this.sound.add('ded',{volume: 0.15},true)

        this.game_music_PotionCraftingSound = this.sound.add('PotionCraftingSound',{volume: 0.15},true)
        
        //collectible
		this.collectible = this.physics.add.sprite(20,45,'Collectible').setImmovable(true).setScale(0.3);
		this.collectible.body.setAllowGravity(false);

        //dodanie gracza
		this.player = this.physics.add.sprite(0,550,'play')
		this.player.setScale(0.2)
		this.player.setCollideWorldBounds();

        

        //hitboxes, platforms
		this.platforms = this.physics.add.staticGroup();
    	this.platforms.create(640, 580, 'floorfourth').setScale(0.9).setVisible(false);
    	this.platforms.create(640, 350, 'benchplat').setVisible(false);
        this.platforms.create(1185,210,'shelf').setVisible(false);
        this.platforms.create(70,155,'Leftshelf').setVisible(false);
        this.platforms.create(305,246,'HandlerButton').setVisible(false);
        
        // przesuwanie
        this.hit = this.physics.add.image(1150, 155, 'movebox').setVelocity(0,0).setBounce(0).setDepth(1).setCollideWorldBounds(true);

        //enemy
        this.PlatformEnemy1 = this.physics.add.sprite(150,545,'Enemy1');
		this.PlatformEnemy1.enableBody = true;

        //collisions with platforms
		this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.PlatformEnemy1, this.platforms);
        this.physics.add.collider(this.player, this.plat);
        this.physics.add.collider(this.player, this.collectible, this.GetCollectible, null, this)
        this.physics.add.collider(this.player, this.hit, function (player1,hit1) {
            
        });
        this.physics.add.collider(this.hit,this.platforms)

        //collisions with player
        this.physics.add.collider(this.player, this.PlatformEnemy1,  this.ReturnToMonke, null, this);

        //lightning
		this.add.image(1260,520,'Lightning').setScale(0.2);

		//swaping
		let Swaper = this.physics.add.staticGroup();
		Swaper.create(1250,520, 'Teleport');
		this.physics.add.collider(this.player,Swaper,this.SceneTp,null,this);
		
		//dodanie obsługi strzałek
		this.cursors = this.input.keyboard.createCursorKeys();

        // Crafting ------------------------------------------------------------------------------------------------
        const activeGameObjects = [
 
            this.add.image(1125, 165, 'ingr1').setName('ingr'), 
            this.add.image(295, 305, 'ingr2').setName('ingr2'),
            
        ];

        const activeItems = [   
            
            this.add.image(927,25, 'ingr1').setName('ingrclicked').setVisible(false).setScale(0.76), 
            this.add.image(972,25, 'ingr2').setName('ingr2clicked').setVisible(false).setScale(0.76)
            
            
        ];
      
            
            activeGameObjects.forEach(activeGameObject => activeGameObject.setInteractive(this.input.makePixelPerfect()));

            
            activeItems.forEach(activeItem => {
               
                activeItem.setInteractive({ draggable: true });
               
                activeItem.setScrollFactor(0);
            });

           var Drag1 = false;
           var Drag2 = false;

            
            this.input.on(Phaser.Input.Events.GAMEOBJECT_OVER, (pointer, gameObject) => {
                if (
                    activeGameObjects.find(activeGameObject => activeGameObject === gameObject)
                    || activeItems.find(activeItem => activeItem === gameObject)
                ) {
                    
                    gameObject.setTint(0x101010);
                }
            });
            this.input.on(Phaser.Input.Events.GAMEOBJECT_OUT, (pointer, gameObject) => {
                if (
                    activeGameObjects.find(activeGameObject => activeGameObject === gameObject)
                    || activeItems.find(activeItem => activeItem === gameObject)
                ) {
                    gameObject.clearTint();
                }
            });
           
            const Brew = this.add.image(340, 280, 'dropzone').setName('BrewTable');
            Brew.setInteractive({dropZone: true});

            // Drag items.
            this.input.on(Phaser.Input.Events.DRAG, (pointer, gameObject, dragX, dragY) => {
                gameObject.x = dragX;
                gameObject.y = dragY;
            });
            this.input.on(Phaser.Input.Events.DRAG_START, (pointer, gameObject) => {
                this.children.bringToTop(gameObject);
            });
            this.input.on(Phaser.Input.Events.DRAG_END, (pointer, gameObject, dropped) => {
                if (! dropped) {
                    gameObject.x = gameObject.input.dragStartX;
                    gameObject.y = gameObject.input.dragStartY;
                }
            });
            this.input.on(Phaser.Input.Events.DRAG_ENTER, (pointer, gameObject, dropZone) => {
                
                dropZone.name === 'BrewTable' && dropZone.setTint(0x787878);
            });
           
            this.input.on(Phaser.Input.Events.DROP, (pointer, gameObject, dropZone) => {
                
              // dodawanie item do dropzone
                if (gameObject.name === 'ingrclicked') {
                    dropZone.clearTint();
                    gameObject.setVisible(false);
                    Drag1 = true;
                }
                else if (gameObject.name === 'ingr2clicked') {
                   dropZone.clearTint();
                   gameObject.setVisible(false);
                   Drag2 = true;
               }
              
               if(Drag1 && Drag2){
                this.game_music_PotionCraftingSound.play()
                    this.game_music_labs.stop();
                   this.scene.start('dizzy-scene')
               } 
                
            });

             // Do something after clicking.
             let locks = {};
             this.input.on(Phaser.Input.Events.GAMEOBJECT_DOWN, (pointer, gameObject) => {
                 if (locks[gameObject.name]) { 
                     return;
                 }
                 else if (gameObject.name === 'ingr') {
                     this.tweens.add({ targets: gameObject, alpha: 0, duration: 200, onComplete: () => {
                         activeItems.find(activeItem => activeItem.name === 'ingrclicked').setVisible(true);
                         this.game_music_crafting_sound.play()
                     }});
                 } else if (gameObject.name === 'ingr2') {
                     this.tweens.add({ targets: gameObject, alpha: 0, duration: 200, onComplete: () => {
                         activeItems.find(activeItem => activeItem.name === 'ingr2clicked').setVisible(true);
                         this.game_music_crafting_sound.play()
                     }});
                 } 
               });
               //CraftingEnd ----------------------------------------------------------------------------------------------------------------------
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
        if (this.PlatformEnemy1.x < 230 && this.PlatformEnemy1.body.velocity.x <= 0) {
			this.PlatformEnemy1.setVelocityX(190);
		  } else if (this.PlatformEnemy1.x > 1165 && this.PlatformEnemy1.body.velocity.x >= 0) {
			this.PlatformEnemy1.setVelocityX(-190);
		  }
    }
    ReturnToMonke() {
        this.game_music_ded.play()
		this.game_music_labs.stop()
		this.scene.restart();
	}

    GetCollectible(){
		this.game_music_pickup.play();
		this.collectible.destroy()
		eventsCenter.emit('update-count', this.count)
	}

    SceneTp() {
        this.game_music_tp.play();
        this.player.x = (Math.random() * (1050 - 200 + 1)) + 200;
        this.player.y = 160;
        //chmurki dialogowe
		this.bubble = this.add.image(300,60,'CraftingBubble').setScale(0.2);
    }
}