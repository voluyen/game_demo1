namespace SpriteKind {
    export const ground = SpriteKind.create()
    export const Weapon = SpriteKind.create()
    export const Start = SpriteKind.create()
    export const Monster = SpriteKind.create()
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile0`, function (sprite, location) {
    currentLevel += 1
    if (currentLevel != numberOfLevel) {
        setLevelMap(currentLevel)
    }
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (rightdir == true) {
        projectile = sprites.createProjectileFromSprite(assets.image`phi_tieu`, ninja, 100, 0)
    } else {
        projectile2 = sprites.createProjectileFromSprite(assets.image`phi_tieu`, ninja, -100, 0)
    }
})
function monsterRun () {
    Monster01.setVelocity(-30, 0)
    Monster02.setVelocity(-30, 0)
    Monster03.setVelocity(-30, 0)
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile5 = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . 1 c . . . 
        . . . . . . . . . . . . c . . . 
        . . . . . . . . . . . 1 c . . . 
        . . . . . . . . . . . 1 c . . . 
        . . . . . . . . . . . . c . . . 
        . . . . . . . . . . . 1 c . . . 
        . . . . . . . . . . . c . . . . 
        . . . . . . . . . 1 1 c . . . . 
        . . . . . . . . . . c . . . . . 
        . . . . . . . . 1 c . . . . . . 
        . . . . . . . . c 1 . . . . . . 
        . . . . . . . 1 c . . . . . . . 
        . 1 1 . 1 1 . c . . . . . . . . 
        c c c c c c c 1 . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, ninja, 100, 0)
    pause(100)
    projectile5.destroy()
    if (rightdir == true) {
        animation.runImageAnimation(
        ninja,
        assets.animation`myAnim8`,
        50,
        false
        )
    } else {
        animation.runImageAnimation(
        ninja,
        assets.animation`myAnim8`,
        50,
        false
        )
    }
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    rightdir = false
})
function setMain () {
    tiles.placeOnTile(ninja, tiles.getTileLocation(0, 1))
    info.setScore(0)
}
function mainDie () {
    info.changeLifeBy(-1)
    tiles.placeOnTile(ninja, tiles.getTileLocation(0, 1))
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Monster, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    mainDie()
})
function createMonster () {
    Monster01 = sprites.create(assets.image`monster01`, SpriteKind.Monster)
    Monster02 = sprites.create(assets.image`monster03`, SpriteKind.Monster)
    Monster03 = sprites.create(assets.image`monster02`, SpriteKind.Monster)
    tiles.placeOnTile(Monster01, tiles.getTileLocation(6, 11))
    tiles.placeOnTile(Monster02, tiles.getTileLocation(11, 20))
    tiles.placeOnTile(Monster03, tiles.getTileLocation(20, 23))
}
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    rightdir = true
})
scene.onOverlapTile(SpriteKind.Monster, sprites.dungeon.floorLight0, function (sprite, location) {
    Monster01.setVelocity(-40, 0)
    Monster02.setVelocity(-70, 0)
    Monster02.setVelocity(-72, 0)
})
function setLevelMap (lv: number) {
    clearMap()
    if (lv == 1) {
        tiles.setCurrentTilemap(tilemap`map-demo`)
    } else {
        tiles.setCurrentTilemap(tilemap`tilemap1`)
        createMonster()
        monsterRun()
    }
    setMain()
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`trap`, function (sprite, location) {
    info.changeScoreBy(-1)
    mainDie()
})
scene.onOverlapTile(SpriteKind.Monster, sprites.dungeon.purpleOuterWest1, function (sprite, location) {
    Monster01.setVelocity(40, 0)
    Monster02.setVelocity(70, 0)
})
scene.onOverlapTile(SpriteKind.Monster, assets.tile`trap`, function (sprite, location) {
    Monster03.setVelocity(72, 0)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`dameTile1`, function (sprite, location) {
    info.changeScoreBy(-1)
    mainDie()
})
function clearMap () {
    for (let value of sprites.allOfKind(SpriteKind.Weapon)) {
        value.destroy()
    }
}
let projectile5: Sprite = null
let Monster03: Sprite = null
let Monster02: Sprite = null
let Monster01: Sprite = null
let projectile2: Sprite = null
let projectile: Sprite = null
let rightdir = false
let dame: Sprite = null
let currentLevel = 0
let numberOfLevel = 0
let ninja: Sprite = null
scene.setBackgroundColor(6)
ninja = sprites.create(assets.image`myImage1`, SpriteKind.Player)
multilights.toggleLighting(true)
multilights.addLightSource(ninja, 12)
scene.cameraFollowSprite(ninja)
controller.moveSprite(ninja, 65, 65)
ninja.setStayInScreen(true)
info.setLife(3)
numberOfLevel = 2
currentLevel = 1
setLevelMap(currentLevel)
let weapon1 = sprites.create(assets.image`weapon1`, SpriteKind.Weapon)
tiles.placeOnRandomTile(weapon1, assets.tile`weapon1`)
while (true) {
    dame = sprites.createProjectileFromSprite(assets.image`dame1`, weapon1, 0, 50)
    pause(1000)
}
