class Brickset {
  constructor(game, rule) {
    this.game = game
    this.rule = rule
    this.rules = this.getRules()
    this.scale = 0.075
    this.pos = {
      x: cvs.width*this.scale,
      y: cvs.width*this.scale
    }

    this.widthPix = cvs.width - 2*cvs.width*this.scale
    this.heightPix = cvs.width - 2*cvs.width*this.scale

    this.brickSize = {
      width: cvs.height*0.0075,
      height: cvs.height*0.0075
    }

    this.setSize = {
      cols: Math.floor(this.widthPix/this.brickSize.width),
      rows: Math.floor(this.heightPix/this.brickSize.height)
    }

    this.color = '#e86ce0'

    let matrix = this.genMatrix(this.rule)
    this.bricks = this.genBricks(matrix)

  }

  genBlockTriple(rule, triBlocks) {
    let genBlocks = [0, 0, 0]

    let bits = ' '
    for(let i = 0; i < triBlocks.length; i++) {
      bits += triBlocks[i]
    }

    let bitsVal = parseInt(bits, 2) //convert bit word to int
    let result = rule.result[bitsVal]

    genBlocks[1] = result

    return genBlocks
  }

  genMatrix(ruleName) {
    //init
    let matrix = []
    let rule = {
      name: ' ',
      result: [0, 0, 0, 0, 0, 0, 0, 0]
    }

    //collect rule description
    this.rules.forEach( r => {
      if(r.name == ruleName) {
        rule = r        
      }
    })

    // initialize rows
    let row = new Array(this.setSize.cols-1).fill(0)
    let nextRow = new Array(this.setSize.cols-1).fill(0)
    row[Math.floor(this.setSize.cols/2)] = 1//set mid element to 1

    matrix.push(row)

    // generate next row from previous row
    for(let i = 1; i < this.setSize.rows; i++) { //all rows but first
      for(let j = 0; j <= this.setSize.cols-3; j++) { //end 3 blocks from end
        let triBlocks = row.slice(j, j+3)
        let genTriBlocks = this.genBlockTriple(rule, triBlocks)
        nextRow[j+1] = genTriBlocks[1]
      }
      matrix.push([...nextRow])
      row = [...nextRow]
      nextRow.fill(0)
    }

    return matrix
  }

  genBricks(matrix) {
    let bricks = []
    let pos = {
      x: this.pos.x,
      y: this.pos.y
    }

    let rows = matrix.length
    let cols = matrix[0].length

    for(let i = 0; i < rows; i++) {
      for(let j = 0; j < cols; j++) {
        if(matrix[i][j]) {
          let brick = new Brick(this.game, pos, this.color)
          bricks.push(brick)
        }
        pos.x += this.brickSize.width
      }
      pos.x = this.pos.x
      pos.y += this.brickSize.height
    }

    return bricks
  }

  getRules() {
    let rules = []

    let rule_90 = {
      name: '90',
      result: [0, 1, 0, 1, 1, 0, 1, 0]
      //index: binary num, value: resulting middle val
    }

    rules.push(rule_90)

    return rules
  }
}

