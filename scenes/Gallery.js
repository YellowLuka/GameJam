import Phaser from "phaser";

export default class GalleryScene extends Phaser.Scene
{
    constructor(){
        super('gallery')
    }
    create()
    {
        this.add.image(100,100,'pika1').setOrigin(0)
        let pikar = this.add.image(100,100,'pika2').setOrigin(0)
        pikar.setVisible(true)
    }
   
}