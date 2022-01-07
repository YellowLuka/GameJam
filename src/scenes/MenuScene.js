import Phaser from "phaser";

export default class MenuScene extends Phaser.Scene
{
    constructor(){
        super('menu')
    }
    

    create(){
        this.add.image(0,0,'menu-bg').setOrigin(0)
        let StartButton = this.add.image(640,150, 'start').setScale(0.3)
        this.add.image(640,225, 'galery').setScale(0.3)
        this.add.image(640,330, 'exit').setScale(0.3)

        let Pointer = this.add.image(100,100, 'pointer')
        Pointer.setScale(0.75)
        Pointer.setVisible(false)

       // To całe w dół jest to ustawienie przycisku interatywnego, robimy tyle ich ile się uda zrobić gry xD

        StartButton.setInteractive();

        StartButton.on("pointerover",()=>{
            Pointer.setVisible(true)
            Pointer.x = StartButton.x - 150;
            Pointer.y = StartButton.y
            
        })
        StartButton.on("pointerout",()=>{
            Pointer.setVisible(false)
        })
        StartButton.on("pointerup",()=>{
            this.scene.start('game-scene');
        })
    }
}