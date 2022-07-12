import Phaser from "phaser";

//scenes
import mbg from '../assets/scenes/Menu_Background.png'
import gamebg from '../assets/scenes/Gamebg.png'
import secondscene from '../assets/scenes/Second_Scene.png'
import fourthscene from '../assets/scenes/Fourth_Scene.png'
import thirdscene  from '../assets/scenes/Third_Scene.png'
import fifthscene from '../assets/scenes/Fifth_Scene.png'
import ending1 from '../assets/scenes/Ending1.png'
import ending2 from '../assets/scenes/Ending2.png'
import Credits from '../assets/scenes/Credits.png'


//Speechbubbles
import MovemmentBubble from '../assets/MovemmentBubble.png'
import CollectibleBubble from '../assets/CollectibleBubble.png'
import CraftingBubble from '../assets/CraftingBubble.png'
import Crafting2Bubble from '../assets/Crafting2Bubble.png'

//player
import pl from '../assets/Player.png'

//collectible
import Collectible from '../assets/Collectible.png'

//lightning
import Lightning from '../assets/Lightning.png'

//Buttons
import start from '../assets/Start.png'
import pointer from '../assets/Pointer.png'
import galery from '../assets/Galery.png'
import credits from '../assets/Credits.png'

//Platforms
import APlatform from '../assets/FirstScene/APlatform.png'
import Chain from '../assets/FirstScene/Chain.png'

//Hitboxes, first scene
import SRHitbox from '../assets/FirstScene/Startingrock.png'
import R2Hitbox from '../assets/FirstScene/2Rock.png'
import R3Hitbox from '../assets/FirstScene/3Rock.png'
import R4Hitbox from '../assets/FirstScene/4Rock.png'
import R5Hitbox from '../assets/FirstScene/5Rock.png'
import SHitBox from '../assets/FirstScene/SandHitBox.png'
import MiniHitBox from '../assets/FirstScene/Mini_HitBox.png'
import CHitBox from '../assets/FirstScene/CHitBox.png'
import Teleport from '../assets/teleport.png'

//hitboxes, second scene
import scfhitbox from '../assets/SecondScene/scfhitbox.png'
import lhitbox from '../assets/SecondScene/lhitbox.png'
import PlanetHitBox from '../assets/SecondScene/PlanetHitBox.png'
import DPlanetHitBox from '../assets/SecondScene/DPlanetHitBox.png'

//hitboxes, third scene
import floorHitBox from '../assets/ThirdScene/floorHitBox.png'
import fStephb from '../assets/ThirdScene/fStephb.png'
import sStephb from '../assets/ThirdScene/sStephb.png'
import tStephb from '../assets/ThirdScene/tStephb.png'
import foStephb from '../assets/ThirdScene/foStephb.png'
import ftStephb from '../assets/ThirdScene/ftStephb.png'
import handlehitbox from '../assets/ThirdScene/handlehitbox.png'
import DrawerHitBox from '../assets/ThirdScene/DrawerHitBox.png'
import DoorsHB from '../assets/ThirdScene/DoorsHB.png'
//import HandlerButton from '../assets/ThirdScene/HandlerButton.png'
//import Bucket from '../assets/ThirdScene/Bucket.png'
//import DropZone_Doors from '../assets/ThirdScene/DropZone_Doors.png'
//import DoorKey from '../assets/ThirdScene/DoorKey.png'

//hitboxes, fourth scene
import Ground from '../assets/FourthScene/ground.png'
import Dropzone from '../assets/FourthScene/Dropbox.png'
import BenchPlat from '../assets/FourthScene/BenchPlat.png'
import Move from '../assets/FourthScene/Move.png'
import shelf from '../assets/FourthScene/shelf.png'

//hiiboxes, fifth scene
import FloorHB from '../assets/FifthScene/FloorHB.png'
import bigp from '../assets/FifthScene/bigP.png';
import tinyp from '../assets/FifthScene/tinyP.png';
import wardrobe from '../assets/FifthScene/Wardrobe.png';
import table from '../assets/FifthScene/table.png';
import farg from '../assets/FifthScene/farground.png'

//hitboxes
import AbyssHitBox from '../assets/AbyssHitBox.png'

//Enemy
import Enemy1 from '../assets/Enemy.png'
import Projectile from '../assets/Projectile.png'

//audio
import menu_theme from "url:../assets/audio/tlo_menu.mp3";
import game_theme from "url:../assets/audio/tlo_gry.mp3";
import button_press_audio from "url:../assets/audio/button_press.mp3";
import button_hover_audio from "url:../assets/audio/button_hover.mp3";
import { runInThisContext } from "vm";
import tp_usage from "url:../assets/audio/tp_usage.mp3"; //done
import Running_Sound from "url:../assets/audio/Running_Sound.mp3" //retarded but implemented
import Labs_bgAudio from "url:../assets/audio/Labs_bgAudio.mp3" //stopowac w 4 i 5 po zakonczeniu i po wypiciu poty
import item_pickup from "url:../assets/audio/podnoszenie.mp3" //gotem
import windbg from "url:../assets/audio/wind.mp3" //done
import XDestruction from "url:../assets/audio/rip_waza.mp3"
import unlock_doors from "url:../assets/audio/unlock_the_doors.mp3"
import open_the_door from "url:../assets/audio/open_the_door.mp3"

//crafting
import hold from '../assets/Holder.png';
import ingr1 from '../assets/Crafting/Ingri1.png'
import ingr2 from '../assets/Crafting/Ingri2.png'
import ingr3 from '../assets/Crafting/Ingri3.png'
import ingr4 from '../assets/Crafting/Ingri4.png'
import ingr5 from '../assets/Crafting/Ingri5.png'
import potion1 from '../assets/Crafting/Potion1.png'
import potion2 from '../assets/Crafting/Potion2.png'
import potion3 from '../assets/Crafting/Potion3.png'
import computerbox from '../assets/FifthScene/ComputerBox.png'
import craftzone from '../assets/FifthScene/CraftZone.png'



export default class PreloadScene extends Phaser.Scene
{
    constructor(){
        super('preload')
    }
    
    
    preload(){
        //maps
        this.load.image('menu-bg',mbg)
        this.load.image('gamebg',gamebg)
        this.load.image('secondscene',secondscene)
        this.load.image('fourthscene',fourthscene)
        this.load.image('thirdscene',thirdscene)
        this.load.image('fifthscene',fifthscene)
        this.load.image('ending1',ending1)
        this.load.image('ending2',ending2)
        this.load.image('Credits',Credits)

        //crafting
        this.load.image('hold',hold)
        this.load.image('ingr1',ingr1)
        this.load.image('ingr2',ingr2)
        this.load.image('ingr3',ingr3)
        this.load.image('ingr4',ingr4)
        this.load.image('ingr5',ingr5)
        this.load.image('potion1',potion1)
        this.load.image('potion2',potion2)
        this.load.image('potion3',potion3)
        this.load.image('computer',computerbox)
        this.load.image('craftzone',craftzone)

        //buttons
        this.load.image('start',start)
        this.load.image('pointer',pointer)
        this.load.image('galery',galery)
        this.load.image('credits',credits)
        
        //collectible
        this.load.image('Collectible',Collectible)

        //lightning
        this.load.image('Lightning',Lightning)

        //player
        this.load.spritesheet('play',pl, { frameWidth: 360, frameHeight: 270 })

        //speech bubble
        this.load.image('MovemmentBubble',MovemmentBubble)
        this.load.image('CollectibleBubble',CollectibleBubble)
        this.load.image('CraftingBubble',CraftingBubble)
        this.load.image('Crafting2Bubble',Crafting2Bubble)

        //Platforms
        this.load.image('APlatform',APlatform)
        this.load.image('Chain',Chain)

        //hitboxes, first scene
        this.load.image('SRHitbox',SRHitbox)
        this.load.image('R2Hitbox',R2Hitbox)
        this.load.image('R3Hitbox',R3Hitbox)
        this.load.image('R4Hitbox',R4Hitbox)
        this.load.image('R5Hitbox',R5Hitbox)
        this.load.image('SHitBox',SHitBox)
        this.load.image('MiniHitBox',MiniHitBox)
        this.load.image('CHitBox',CHitBox)
        
        //hitboxes
        this.load.image('AbyssHitBox',AbyssHitBox)
        this.load.image('Teleport',Teleport)

        //hitboxes, secound scene
        this.load.image('scfhitbox',scfhitbox)
        this.load.image('lhitbox',lhitbox)
        this.load.image('PlanetHitBox',PlanetHitBox)
        this.load.image('DPlanetHitBox',DPlanetHitBox)

        //hitboxes, third scene
        this.load.image('floorHitBox',floorHitBox)
        this.load.image('fStephb',fStephb)
        this.load.image('sStephb',sStephb)
        this.load.image('tStephb',tStephb)
        this.load.image('foStephb',foStephb)
        this.load.image('ftStephb',ftStephb)
        this.load.image('handlehitbox',handlehitbox)
        this.load.image('DrawerHitBox',DrawerHitBox)
        this.load.image('DoorsHB',DoorsHB)
        //this.load.image('HandlerButton',HandlerButton)
        //this.load.image('Bucket',Bucket)
        //this.load.image('DropZone_Doors',DropZone_Doors)
        //this.load.image('DoorKey',DoorKey)

        //hitboxes, fourth scene
        this.load.image('floorfourth',Ground)
        this.load.image('dropzone',Dropzone)
        this.load.image('benchplat',BenchPlat)
        this.load.image('movebox',Move)
        this.load.image('shelf',shelf)

        //hitboxes, fifth scene
        this.load.image('FloorHB',FloorHB)
        this.load.image('bigplanet',bigp)
        this.load.image('tinyplanet',tinyp)
        this.load.image('table',table)
        this.load.image('wardrobe',wardrobe)
        this.load.image('far',farg)

        //enemy
        this.load.image('Enemy1',Enemy1)
        this.load.image('Projectile',Projectile)

        //audio
        this.load.audio('menu_theme',menu_theme)
        this.load.audio('game_theme',game_theme)
        this.load.audio('button_press_audio',button_press_audio)
        this.load.audio('button_hover_audio',button_hover_audio)
        this.load.audio('tp_usage',tp_usage)
        this.load.audio('Running_Sound',Running_Sound)
        this.load.audio('Labs_bgAudio',Labs_bgAudio)
        this.load.audio('item_pickup',item_pickup)
        this.load.audio('windbg',windbg)
        this.load.audio('XDestruction',XDestruction)
        this.load.audio('open_the_door',open_the_door)
        this.load.audio('unlock_doors',unlock_doors)
        
    }
    create(){
        this.scene.start('menu');
        
    }
}