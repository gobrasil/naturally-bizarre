/* global requestAnimationFrame */

import { randomInt } from '../../lib/random'

import Experiments from '../../classes/Experiments'
import Walker from './Walker'

export default class Experiment extends Experiments {
  constructor () {
    super('Root', 'Traditional random walk made by 2,500 walkers spread in the screen.')

    this.walkers = null
    this.walkersLength = 2500
    this.walkersColor = null

    this.createWalkers()

    this.update()
  }

  createWalker () {
    const color = this.colors[this.walkersColor][randomInt(0, this.colors.length - 1)]
    const x = randomInt(0, window.innerWidth)
    const y = randomInt(0, window.innerHeight)

    const walker = new Walker(color, x, y)

    this.walkers.push(walker)
  }

  createWalkers () {
    this.walkers = []
    this.walkersColor = randomInt(0, this.colors.length - 1)

    for (let i = 0, length = this.walkersLength; i <= length; i++) {
      this.createWalker()
    }
  }

  update () {
    this.stats.begin()

    this.walkers.forEach(walker => walker.draw(this.context))

    this.stats.end()

    requestAnimationFrame(this.update.bind(this))
  }

  dblclick () {
    super.dblclick()

    this.createWalkers()
  }

  resize () {
    super.resize()

    this.createWalkers()
  }
}
