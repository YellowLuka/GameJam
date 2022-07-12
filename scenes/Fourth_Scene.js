import Phaser from 'phaser'
import eventsCenter from './EventsCenter'

export default class Fourth_Scene extends Phaser.Scene
{
    constructor()
	{
		super('fourth-scene')
	}
    create()
	{
        this.scene.launch('ui')
       
		//tlo
		this.add.image(0,0,'fourthscene').setOrigin(0);
		
		//audio
		var game_music = this.sound.add('game_theme',{volume: 0.07})
		game_music.play();
        

		//dodanie gracza
		this.player = this.physics.add.sprite(0,550,'play')
		this.player.setScale(0.2)
		this.player.setCollideWorldBounds();

		//platformy hitboxy
		this.platforms = this.physics.add.staticGroup();
    	this.platforms.create(640, 580, 'floorfourth').setScale(0.9).setVisible(false);
    	this.platforms.create(640, 350, 'benchplat').setVisible(false);
        this.platforms.create(1185,210,'shelf').setVisible(false);
		
		

		//chmurki dialogowe
		//this.add.image(300,60,'bubble').setScale(0.7);
		 
        // przesuwanie
        this.hit = this.physics.add.image(1150, 155, 'movebox').setVelocity(0,0).setBounce(0).setDepth(1).setCollideWorldBounds(true);

        this.physics.add.collider(this.player, this.hit, function (player1,hit1) {
            
        });
        this.physics.add.collider(this.hit,this.platforms)

		
		

		//collisions with platforms
		this.physics.add.collider(this.player, this.platforms);

		//Przechodzenie między scenami veria alpha (działa)
		let Keepo = this.physics.add.staticGroup();
		Keepo.create(1280,550, 'platforms').setVisible(false);
		this.physics.add.collider(this.player,Keepo,this.SceneSwap,null,this);
		
		//dodanie obsługi strzałek
		this.cursors = this.input.keyboard.createCursorKeys();

        //***************************************************************************************************************************/
         //dropzoned
         

         //Aktywne Itemki
 
         const activeGameObjects = [
 
             this.add.image(1125, 165, 'ingr1').setName('ingr'), 
             this.add.image(295, 305, 'ingr2').setName('ingr2'),
             
         ];
 
         const activeItems = [   
             
             this.add.image(927,25, 'ingr').setName('ingrclicked').setVisible(false), 
             this.add.image(972,25, 'ingr2').setName('ingr2clicked').setVisible(false)
             
             
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
                    this.scene.start('menu')
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
                });
                //*********************************************************************************************************************/
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

       

	}

    SceneSwap() {
        this.player.x = 1250;
        this.player.y = 160;
    }
}