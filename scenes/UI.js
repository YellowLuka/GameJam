import Phaser from 'phaser'

export default class UIScene extends Phaser.Scene
{
    constructor(){
        super('ui')
        this.maxColumns = 8;
        this.uiScale = 1;
        this.gridSpacing = 4;
        this.margin = 8;
        this._tileSize = 40;

    }

    
    get tileSize()
    {
        return this._tileSize * this.uiScale;
    }


    create()
    {  
        for(let i = 0 ; i < this.maxColumns ; i++)
        {
            let x = 900 +  (this.margin + this.tileSize / 2 + (i % this.maxColumns)*(this.tileSize + this.gridSpacing));
            let InvSlot = this.add.sprite(x,25,"hold");
            InvSlot.setScale(this.uiScale);
        }
        
    }   
}
