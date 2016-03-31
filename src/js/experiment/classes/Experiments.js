import Stats from 'stats-js'

export default class Experiments {
  constructor (title, description) {
    this.stats = null

    this.wrapper = null

    this.title = title
    this.description = description

    this.canvas = null
    this.context = null

    this.createWrapper()
    this.createStats()
    this.createCanvas()
    this.createContext()

    this.wrapper.addEventListener('click', () => this.click())
    this.wrapper.addEventListener('resize', () => this.resize())
  }

  createWrapper () {
    const wrapper = document.createElement('div')
    const wrapperInfo = document.createElement('div')
    const wrapperTitle = document.createElement('h2')
    const wrapperDescription = document.createElement('p')

    wrapper.classList.add('experiment')
    wrapper.appendChild(wrapperInfo)

    wrapperInfo.appendChild(wrapperTitle)
    wrapperInfo.appendChild(wrapperDescription)
    wrapperInfo.classList.add('experiment-info')

    wrapperTitle.innerHTML = this.title
    wrapperTitle.classList.add('experiment-info-title')

    wrapperDescription.innerHTML = this.description
    wrapperDescription.classList.add('experiment-info-desc')

    document.body.appendChild(wrapper)

    this.wrapper = wrapper
  }

  createStats () {
    this.stats = new Stats()

    this.stats.domElement.style.display = 'none'
    this.stats.domElement.style.left = 0
    this.stats.domElement.style.position = 'absolute'
    this.stats.domElement.style.top = 0
    this.stats.domElement.style.zIndex = 50

    window.addEventListener('keydown', (e) => {
      switch (e.keyCode) {
        case 68:
          this.stats.domElement.style.display = (this.stats.domElement.style.display === 'block') ? 'none' : 'block'
          break
      }
    })

    this.wrapper.appendChild(this.stats.domElement)
  }

  createCanvas () {
    this.canvas = document.createElement('canvas')

    this.canvas.height = window.innerHeight
    this.canvas.width = window.innerWidth

    this.wrapper.appendChild(this.canvas)
  }

  createContext () {
    this.context = this.canvas.getContext('2d')
    this.context.fillRect(0, 0, window.innerWidth, window.innerHeight)
  }

  click () {
    this.context.clearRect(0, 0, window.innerWidth, window.innerHeight)
  }

  resize () {
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
  }

  destroy () {
    this.context = null

    this.canvas.parentNode.removeChild(this.canvas)
    this.canvas = null

    this.stats.domElement.parentNode.removeChild(this.stats.domElement)
    this.stats = null

    this.wrapper.innerHTML = ''
    this.wrapper.parentNode.removeChild(this.wrapper)
    this.wrapper = null
  }
}