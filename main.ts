// This function creates all of the things that increase the players' score.
function createCollectibles () {
    for (let index = 0; index < 100; index++) {
        thingies = sprites.create(collectibles[randint(0, 2)], SpriteKind.Projectile)
        thingies.x = randint(25, 235)
        thingies.y = randint(25, 220)
    }
}
// When a player reaches 1000 points, they win.
mp.onScore(1000, function (winner) {
    mp.gameOverPlayerWin(winner)
})
// This gives the players points for picking up the collectibles.
sprites.onOverlap(SpriteKind.Player, SpriteKind.Projectile, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    if (sprite == player1) {
        info.player1.changeScoreBy(5)
    } else {
        info.player2.changeScoreBy(5)
    }
})
let allCollectibles: Sprite[] = []
let thingies: Sprite = null
let player1: Sprite = null
let collectibles: Image[] = []
// These are the 3 collectibles.
collectibles = [img`
    . . 2 2 b b b b b . . . . . . . 
    . 2 b 4 4 4 4 4 4 b . . . . . . 
    2 2 4 4 4 4 d d 4 4 b . . . . . 
    2 b 4 4 4 4 4 4 d 4 b . . . . . 
    2 b 4 4 4 4 4 4 4 d 4 b . . . . 
    2 b 4 4 4 4 4 4 4 4 4 b . . . . 
    2 b 4 4 4 4 4 4 4 4 4 e . . . . 
    2 2 b 4 4 4 4 4 4 4 b e . . . . 
    . 2 b b b 4 4 4 b b b e . . . . 
    . . e b b b b b b b e e . . . . 
    . . . e e b 4 4 b e e e b . . . 
    . . . . . e e e e e e b d b b . 
    . . . . . . . . . . . b 1 1 1 b 
    . . . . . . . . . . . c 1 d d b 
    . . . . . . . . . . . c 1 b c . 
    . . . . . . . . . . . . c c . . 
    `, img`
    . . b b b b . . 
    . b 5 5 5 5 b . 
    b 5 d 3 3 d 5 b 
    b 5 3 5 5 1 5 b 
    c 5 3 5 5 1 d c 
    c d d 1 1 d d c 
    . f d d d d f . 
    . . f f f f . . 
    `, img`
    ................
    ................
    ................
    ................
    ................
    ................
    ................
    ................
    ................
    ................
    ................
    ................
    ................
    ................
    ................
    ................
    ................
    ................
    ................
    ................
    ................
    ................
    ................
    ................
    ................
    ................
    ................
    ................
    ................
    ................
    ................
    ................
    .....88.........
    .....868........
    ......868.......
    .......868......
    .......866......
    .......8676.....
    ......67656.....
    .....656758.....
    ....65775868....
    ....65656868....
    ....87678868....
    ....87678668....
    ....87677668....
    ....8776768.....
    .....87678......
    ......8768......
    `]
createCollectibles()
tiles.setCurrentTilemap(tilemap`level1`)
// These create the players.
player1 = sprites.create(img`
    ........................
    ........................
    ........................
    ........................
    ..........ffff..........
    ........ff1111ff........
    .......fb111111bf.......
    .......f11111111f.......
    ......fd11111111df......
    ......fd11111111df......
    ......fddd1111dddf......
    ......fbdbfddfbdbf......
    ......fcdcf11fcdcf......
    .......fb111111bf.......
    ......fffcdb1bdffff.....
    ....fc111cbfbfc111cf....
    ....f1b1b1ffff1b1b1f....
    ....fbfbffffffbfbfbf....
    .........ffffff.........
    ...........fff..........
    ........................
    ........................
    ........................
    ........................
    `, SpriteKind.Player)
let player2 = sprites.create(img`
    ........................
    ........................
    ........................
    .......ffff.............
    .....fff22fff...........
    ....fff2222fff..........
    ...fffeeeeeefff.........
    ...ffe222222eef.........
    ...fe2ffffff2ef.........
    ...ffffeeeeffff......ccc
    ..ffefbf44fbfeff....cddc
    ..ffefbf44fbfeff...cddc.
    ..fee4dddddd4eef.ccddc..
    .fdfeeddddd4eeffecddc...
    .fbffee4444ee4fddccc....
    .fbf4f222222f1edde......
    .fcf.f222222f44ee.......
    ..ff.f445544f...........
    .....ffffffff...........
    ......ff..ff............
    ........................
    ........................
    ........................
    ........................
    `, SpriteKind.Player)
player1.setStayInScreen(true)
player2.setStayInScreen(true)
controller.player1.moveSprite(player1)
controller.player2.moveSprite(player2)
// The camera only follows player 1 because I don't know how to do anything else.
scene.cameraFollowSprite(player1)
// This runs forever; it moves the players randomly(ish) and creates more collectibles once they start to run out.
forever(function () {
    allCollectibles = sprites.allOfKind(SpriteKind.Projectile)
    player1.vx = randint(-1000, 1000)
    player1.vy = randint(-1000, 1000)
    player2.vx = randint(-1000, 1000)
    player2.vy = randint(-1000, 1000)
    if (allCollectibles.length < 20) {
        createCollectibles()
    }
})
