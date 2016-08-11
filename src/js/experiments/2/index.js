import { randomInt, randomNormalized } from '../../lib/random'

import Experiments from '../../classes/Experiments'
import Circle from './Circle'

export default class Neon extends Experiments {
  constructor () {
    super('Neon')

    this.circles = null
    this.circlesLength = null
    this.circlesColor = null

    this.createCircles()

    this.update()
  }

  createCircle () {
    const radius = 10 + Math.abs(randomNormalized() * 10)
    const stroke = this.colors[this.circlesColor][randomInt(0, this.colors.length - 1)]
    const x = this.mouse.x + (randomNormalized() * 200)
    const y = this.mouse.y + (randomNormalized() * 200)

    const circle = new Circle(radius, stroke, x, y)

    this.circles.push(circle)
  }

  destroyCircle (index) {
    this.circles.splice(index, 1)
  }

  createCircles () {
    this.circles = []
    this.circlesLength = 500
    this.circlesColor = randomInt(0, this.colors.length - 1)

    for (let i = 0, length = this.circlesLength; i <= length; i++) {
      this.createCircle()
    }
  }

  update () {
    super.update()

    this.stats.begin()

    this.context.fillStyle = '#000'
    this.context.globalAlpha = 0.1
    this.context.globalCompositeOperation = 'source-over'
    this.context.fillRect(0, 0, window.innerWidth, window.innerHeight)

    this.circles.forEach((circle, index) => {
      circle.move(this.mouse.x, this.mouse.y)
      circle.draw(this.context)

      if (!circle.alive) {
        this.destroyCircle(index)
        this.createCircle()
      }
    })

    this.stats.end()
  }

  dblclick () {
    super.dblclick()

    this.createCircles()
  }

  resize () {
    super.resize()

    this.createCircles()
  }
}
