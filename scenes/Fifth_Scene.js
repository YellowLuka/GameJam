import Phaser from 'phaser'
import eventsCenter from './EventsCenter'

export default class Fifth_Scene extends Phaser.Scene
{
    constructor()
	{
		super('fifth-scene')
	}

    create() {
        this.scene.launch('ui')
        //bg
        this.add.image(0,0,'fifthscene').setOrigin(0);
        this.add.image(793,333,'far').setOrigin(0).setDepth(-2);

        //audio
        this.game_music_Running_Sound = this.sound.add('Running_Sound',{volume: 0.1},true)

        this.game_music_labs = this.sound.add('Labs_bgAudio',{volume: 0.1},true)
		this.game_music_labs.loop = true;
		this.game_music_labs.play();

        //adding keys handling
		this.cursors = this.input.keyboard.createCursorKeys();

        //adding player
		this.player = this.physics.add.sprite(8,536,'play')
		this.player.setScale(0.2)
		this.player.setCollideWorldBounds();
        
        //platforms
        let platforms = this.physics.add.staticGroup();
        platforms.create(630, 570, 'FloorHB').setVisible(false);
        platforms.create(720, 170, 'bigplanet').setVisible(false);
        platforms.create(450, 220, 'tinyplanet').setVisible(false);
        platforms.create(190, 390, 'wardrobe').setVisible(false);
        platforms.create(360, 440, 'table').setVisible(false);
        platforms.create(500, 490, 'tinyplanet').setVisible(false);

        //collisions with platforms
		this.physics.add.collider(this.player, platforms);

        //audio
        this.game_music_labs = this.sound.add('Labs_bgAudio',{volume: 0.1},true)
		this.game_music_labs.loop = true;
		this.game_music_labs.play();

         //***************************************************************************************************************************/
         //dropzoned
         

         //Aktywne Itemki
 
         const activeGameObjects = [
 
            this.add.image(805, 460, 'ingr3').setName('ingr').setDepth(-1), 
            this.add.image(165, 325, 'ingr2').setName('ingr2'),
            this.add.image(315, 525, 'ingr5').setName('ingr3'),
            
        ];

        const activeItems = [   
            
            this.add.image(927,25, 'ingr3').setName('ingrclicked').setVisible(false).setScale(0.76), 
            this.add.image(972,25, 'ingr2').setName('ingr2clicked').setVisible(false).setScale(0.76),
            this.add.image(1015,25, 'ingr5').setName('ingr3clicked').setVisible(false).setScale(0.76),
            this.add.image(1060,25, 'potion1').setName('Potion1clicked').setVisible(false).setScale(0.6),
            this.add.image(1107,25, 'potion2').setName('Potion2clicked').setVisible(false).setScale(0.7),
            this.add.image(1150,25, 'potion3').setName('Potion3clicked').setVisible(false).setScale(0.7)
            
            
        ];
      
            
            activeGameObjects.forEach(activeGameObject => activeGameObject.setInteractive(this.input.makePixelPerfect()));

            
            activeItems.forEach(activeItem => {
               
                activeItem.setInteractive({ draggable: true });
               
                activeItem.setScrollFactor(0);
            });

           var Drag1 = false;
           var Drag2 = false;
           var Drag3 = false; 

            
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
           
            const Brew = this.add.image(420, 405, 'craftzone').setName('BrewTable');
            Brew.setInteractive({dropZone: true});

            const Computer = this.add.image(310, 410, 'computer').setName('Computer');
            Computer.setInteractive({dropZone: false});

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
                dropZone.name === 'Computer' && dropZone.setTint(0x787878);
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
               else if (gameObject.name === 'ingr3clicked') {
                dropZone.clearTint();
                gameObject.setVisible(false);
                Drag3 = true;
                }
                else if (gameObject.name === 'Potion1clicked') {
                    this.scene.stop('ui')
                    this.scene.start('ending1')
                    
                }
                else if (gameObject.name === 'Potion2clicked') {
                    this.scene.stop('ui')
                    this.scene.start('ending2')
                   
                }
                else if (gameObject.name === 'Potion3clicked') {
                    dropZone.clearTint();
                    this.scene.stop('ui')
                    this.scene.start('ending3')
                   

                    
               }
              
               if(Drag1 && Drag2){
                    activeItems.find(activeItem => activeItem.name === 'Potion2clicked').setVisible(true);
                    Brew.input.dropZone = false;
                    Computer.input.dropZone = true;
               }

               if(Drag2 && Drag3){
                activeItems.find(activeItem => activeItem.name === 'Potion1clicked').setVisible(true);
                Brew.input.dropZone = false;
                Computer.input.dropZone = true;
               }

                if(Drag1 && Drag3){
                    activeItems.find(activeItem => activeItem.name === 'Potion3clicked').setVisible(true);
                    Brew.input.dropZone = false;
                    Computer.input.dropZone = true;
                    
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
                 } else if (gameObject.name === 'ingr2') {
                     this.tweens.add({ targets: gameObject, alpha: 0, duration: 200, onComplete: () => {
                         activeItems.find(activeItem => activeItem.name === 'ingr2clicked').setVisible(true);
                     }});
                 } 
                 else if (gameObject.name === 'ingr3') {
                    this.tweens.add({ targets: gameObject, alpha: 0, duration: 200, onComplete: () => {
                        activeItems.find(activeItem => activeItem.name === 'ingr3clicked').setVisible(true);
                    }});
                }
                
               });
               //*********************************************************************************************************************/
        
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
        
    }
}