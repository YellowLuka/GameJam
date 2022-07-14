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
        this.scene.run('ui-scene')
        //bg
        this.add.image(0,0,'thirdscene').setOrigin(0);

		//audio
		this.game_music_labs = this.sound.add('Labs_bgAudio',{volume: 0.1},true)
		this.game_music_labs.loop = true;
		this.game_music_labs.play();

		this.game_music_pickup = this.sound.add('item_pickup',{volume: 1},true)

		this.game_music_Running_Sound = this.sound.add('Running_Sound',{volume: 0.1},true)

		this.game_music_XD = this.sound.add('XDestruction',{volume: 0.05},true)

		this.game_music_open_the_door = this.sound.add('open_the_door',{volume: 0.15},true)

		this.game_music_unlock_doors = this.sound.add('unlock_doors',{volume: 0.15},true)

        //adding keys handling
		this.cursors = this.input.keyboard.createCursorKeys();

        //adding player
		this.player = this.physics.add.sprite(8,440,'play')
		this.player.setScale(0.2)
		this.player.setCollideWorldBounds();

        //collectible
		this.collectible = this.physics.add.sprite(230,215,'Collectible').setImmovable(true).setScale(0.3).setVisible(false)
		this.collectible.body.setAllowGravity(false);

		//speech bubble
		this.bubble = this.add.image(1120,460,'ClosedDoorsBubble').setScale(0.2)

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

		// przesuwanie
        this.hit = this.physics.add.image(730, 429, 'Bucket').setVelocity(0,0).setBounce(0).setDepth(1).setCollideWorldBounds(true);
		
        //plat to destroy
		this.ptd = this.physics.add.sprite(1245,580,'DoorsHB').setImmovable(true).setVisible(false)
		this.ptd.body.setAllowGravity(false);

        //Set Visible plat
        this.plat = this.physics.add.staticGroup()
        this.plat.create(380,330,'HandlerButton').setVisible(false);

        //lightning
		this.add.image(1260,580,'Lightning').setScale(0.2);

        //collisions with platforms
		this.physics.add.collider(this.player, platforms);
		this.physics.add.collider(this.player, this.ptd)
		this.physics.add.collider(this.hit, platforms)

        //collisions with player
		this.physics.add.collider(this.player, this.ptd, this.BubbleSetVisible, null, this)
        this.physics.add.collider(this.player, this.collectible, this.GetCollectible, null, this)
        this.physics.add.collider(this.player, this.plat,  this.collectibleSetVisible, null, this);
		this.physics.add.collider(this.player, this.hit, this.DestroyTheBucket, null, this) 
            
        //Przechodzenie między scenami veria alpha (działa)
		let Swaper = this.physics.add.staticGroup();
		Swaper.create(1275,586, 'DoorsHB').setVisible(false);
		this.physics.add.collider(this.player,Swaper,this.SceneSwap,null,this);

		// Crafting ------------------------------------------------------------------------------------------------
        const activeGameObjects = [
 
            this.add.image(730, 429, 'DoorKey').setName('ingr').setScale(0.15) //klucz
            
        ];

        const activeItems = [   
            
            this.add.image(927,25, 'DoorKey').setName('ingrclicked').setVisible(false).setScale(0.15) //w ekwipunku
            
        ];
      
            
            activeGameObjects.forEach(activeGameObject => activeGameObject.setInteractive(this.input.makePixelPerfect()));

            
            activeItems.forEach(activeItem => {
               
                activeItem.setInteractive({ draggable: true });
               
                activeItem.setScrollFactor(0);
            });

           var Drag1 = false;
           

            
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
           
            const Brew = this.add.image(1249,557, 'DropZone_Doors').setName('BrewTable') //drzwi
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
                
                dropZone.name === 'BrewTable' && dropZone.setTint(0x787878); //nazwa
            });
           
            this.input.on(Phaser.Input.Events.DROP, (pointer, gameObject, dropZone) => {
              // dodawanie item do dropzone
                if (gameObject.name === 'ingrclicked') {
                    dropZone.clearTint();
                    gameObject.setVisible(false);
                    Drag1 = true;
                }
               if(Drag1){
                   this.ptd.destroy(); //destroy blokady
				   this.game_music_unlock_doors.play()
				   this.bubble.destroy();
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
                     }});
                 } 
               });
               //CraftingEnd ----------------------------------------------------------------------------------------------------------------------
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

		} else if(this.player.body.touching.down) {
			this.game_music_Running_Sound.play()
		} 
		if(this.player.x > 1150) {
			this.bubble.setVisible(true)
		} else if(this.player.x < 1150) {
			this.bubble.setVisible(false)
		}
    }

    SceneSwap(){
		this.game_music_labs.stop();
		this.game_music_open_the_door.play()
		this.scene.start('fourth-scene');
	}

    GetCollectible(){
		this.game_music_pickup.play();
    	this.collectible.destroy()
		eventsCenter.emit('update-count', this.count)
	}

    collectibleSetVisible(){
		this.collectible.setVisible(true)
	}

	DestroyTheBucket() {
			const promise1 = new Promise((resolve, reject) => {
				setTimeout(() => {
				  this.hit.destroy();
				  this.game_music_XD.play();
				}, 2200);
			  });  
		}
}