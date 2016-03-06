export default class BasePass {

	constructor(renderer, option) {

		this.scene = new THREE.Scene()

		this.renderer = renderer

		// camera
		this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 1, 1000)
		this.camera.position.set(0, 0, 10)
		this.scene.add(this.camera)

		this.uniforms = option.uniforms

		let mat = new THREE.ShaderMaterial({
			uniforms: this.uniforms,
			vertexShader: option.vertexShader || require('./shaders/base-pass.vert'),
			fragmentShader: option.fragmentShader
		})

		let plane = new THREE.Mesh(
			new THREE.PlaneGeometry(2, 2),
			mat
		)

		this.scene.add(plane)
	}

	setSize(width, height) {
		this.renderer.setSize(width, height)
	}

	render(targetRenderer) {
		this.renderer.render(this.scene, this.camera, targetRenderer)
	}
}
