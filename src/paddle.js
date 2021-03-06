class Paddle {
	constructor(game, type) {
    this.game = game
		this.width = 0
		this.height = 0
		this.type = type

		this.pos = {
			x: 0,
			y: 0
		}
	}

	update(dt) {
		if (this.type == 'leftWall' || this.type == 'rightWall') {
			this.height = cvs.width*0.1
      this.width = cvs.height*0.01
		} else {
      this.width = cvs.width*0.1
      this.height = cvs.height*0.01
    }

		this.movePaddle()

    if(isCollision(this.game.ball, this) && 
      this.game.state === GSTATE.RUNNING) {
      repel(this.game.ball, this)  
    }
	}

	draw(ctx) {
		ctx.fillStyle = '#2b0719'
    ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height)
	}

	movePaddle() {
		if(this.type == 'floor') {
			this.pos.x = mouse.x - this.width/2 - 10
			this.pos.y = cvs.height-this.height
		} else if (this.type == 'ceiling') {
			this.pos.x = mouse.x - this.width/2 - 10
			this.pos.y = 0
		} else if (this.type == 'leftWall') {
			this.pos.x = 0
			this.pos.y = mouse.y - this.height/2
		} else if (this.type == 'rightWall') {
			this.pos.x = cvs.width - this.width
			this.pos.y = mouse.y - this.height/2
		}
	}

}
