const THREE = require('three')

class App {

	constructor() {}

	init() {

		this.initScene()
		this.initSource()
	}

	initScene() {

		this.scene = new THREE.Scene()
		this.renderer = new THREE.WebGLRenderer({
			canvas: document.getElementById('canvas'),
			antialias: false
		})

		// camera
		this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 1, 1000)
		this.camera.position.set(0, 0, 10)
		// this.camera.rotation.set(0, -Math.PI / 4, 0)
		this.scene.add(this.camera)

		let kumiko = new THREE.TextureLoader().load('/assets/kumiko.png')
		console.log(kumiko)

		this.uniforms = {
			resolution: {type: 'v2', value: new THREE.Vector2()},
			texture: {
				type: 't',
				value: kumiko
			}
		}

		let mat = new THREE.ShaderMaterial({
			uniforms: this.uniforms,
			vertexShader: require('./shaders/fill.vert'),
			fragmentShader: require('./shaders/filter.frag')
		})
		let plane = new THREE.Mesh(
			new THREE.PlaneGeometry(2, 2),
			mat
		)
		this.scene.add(plane)

		window.addEventListener('resize', this.onResize.bind(this))
		window.addEventListener('click', this.onClick.bind(this))

		this.onResize()
		this.animate()
	}

	initSource() {

		// let loader = new THREE.TextureLoader()

		// loader.load('/assets/kumiko.png', (tex) => {
		// 	console.log('loaded Ohmae')
		// 	this.uniforms.image.value = tex
		// 	console.log(this.uniforms)
		// })
	}

	animate() {
		this.renderer.render(this.scene, this.camera)
	}

	onResize() {
		const w = window.innerWidth
		const h = window.innerHeight

		this.renderer.setSize(w, h)
		this.renderer.render(this.scene, this.camera)
		this.uniforms.resolution.value.set(w, h)
	}

	onClick() {

	}


}


new App().init()
