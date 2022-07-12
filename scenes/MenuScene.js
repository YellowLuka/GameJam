import Phaser from "phaser";

export default class MenuScene extends Phaser.Scene
{
    constructor(){
        super('menu')
    }
    

    create(){
        this.add.image(0,0,'menu-bg').setOrigin(0)
        let StartButton = this.add.image(640,150, 'start').setScale(0.3)
        let GaleryButton = this.add.image(640,225, 'galery').setScale(0.3)
        let CreditsButton = this.add.image(640,300, 'credits').setScale(0.5)
        var menu_music = this.sound.add('menu_theme',{volume: 0.1})
        var button_press_audio = this.sound.add('button_press_audio',{volume: 0.02})
        var button_hover_audio = this.sound.add('button_hover_audio',{volume: 0.3})
        menu_music.play();
        let Pointer = this.add.image(100,100, 'pointer')
        Pointer.setScale(0.75)
        Pointer.setVisible(false)

       // To całe w dół jest to ustawienie przycisku interatywnego, robimy tyle ich ile się uda zrobić gry xD

        StartButton.setInteractive();

        StartButton.on("pointerover",()=>{
            Pointer.setVisible(true)
            Pointer.x = StartButton.x - 150;
            Pointer.y = StartButton.y
            button_hover_audio.play();
        })

        StartButton.on("pointerout",()=>{
            Pointer.setVisible(false)
        })

        StartButton.on("pointerup",()=>{
            this.scene.start('ending1');
            button_press_audio.play()
            menu_music.stop();
        })

        GaleryButton.setInteractive();

        GaleryButton.on("pointerover",()=>{
            Pointer.setVisible(true)
            Pointer.x = GaleryButton.x - 150;
            Pointer.y = GaleryButton.y
            button_hover_audio.play();
        })

        GaleryButton.on("pointerout",()=>{
            Pointer.setVisible(false)
        })

        GaleryButton.on("pointerup",()=>{
            this.scene.start('ending1');
            button_press_audio.play()
            menu_music.stop();
        })

        CreditsButton.setInteractive();

        CreditsButton.on("pointerover",()=>{
            Pointer.setVisible(true)
            Pointer.x = CreditsButton.x - 150;
            Pointer.y = CreditsButton.y
            button_hover_audio.play();
        })

        CreditsButton.on("pointerout",()=>{
            Pointer.setVisible(false)
        })

        CreditsButton.on("pointerup",()=>{
            this.scene.start('credits');
            button_press_audio.play()
            menu_music.stop();
        })
    }
}