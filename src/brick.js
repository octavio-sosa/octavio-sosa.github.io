class Brick {
  constructor(game, pos, color) {
    this.game = game

    this.width = cvs.height*0.01
    this.height = cvs.height*0.01

    this.pos = {
      x: pos.x,
      y: pos.y
    }

    this.color = color
    this.isHit = false
  }

  update(dt) {
    if(isCollision(this.game.ball, this)) {
        this.isHit = true //TODO: remove from gameObjs
        repel(this.game.ball, this) //updates ball.vel TODO
    }
  }

  draw(ctx) {
    ctx.fillStyle = this.color
    ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height)
  }
}
