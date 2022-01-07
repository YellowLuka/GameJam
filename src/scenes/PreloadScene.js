import Phaser from "phaser";

import mbg from '../assets/Menu_Background.png'
import start from '../assets/Start.png'
import exit from '../assets/exit.png'
import galery from '../assets/Galery.png'
import options from '../assets/Options.png'
import load from '../assets/load.png'
import pointer from '../assets/Pointer.png'
import gamebg from '../assets/Gamebg.png'
import pl from '../assets/Player.png'
import platform from '../assets/Platform.png'
import watter from '../assets/Watter.png'


export default class PreloadScene extends Phaser.Scene
{
    constructor(){
        super('preload')
    }
    preload(){
        this.load.image('menu-bg',mbg)
        this.load.image('start',start)
        this.load.image('exit',exit)
        this.load.image('galery',galery)
        this.load.image('options',options)
        this.load.image('load',load)
        this.load.image('pointer',pointer)
        this.load.image('gamebg',gamebg)
        this.load.spritesheet('play',pl, { frameWidth: 360, frameHeight: 270 })
        this.load.image('platforms',platform)
        this.load.image('watter',watter)
    }
    create(){
        this.scene.start('menu');
        
    }
}