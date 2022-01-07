import Phaser from "phaser";

export default class ObjectFactory
{
    static createPlayer(playerConfig)
    {
        let player = new Player();
        player.setPosition(playerConfig.x, playerConfig.y);
        player.setEquipment(playConfig.equipment);
        return player;
    }
}