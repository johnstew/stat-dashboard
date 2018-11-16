import React, { Component } from 'react';
import * as THREE from 'three';

const homeRunData = {
  launchSpeed: 106.000001,
  launchAngle: 30.000001,
  totalDistance: 429,
  coordinates: {
    coordX: 110.58006036082529,
    coordY: 17.54192101425582,
    landingPosX: -35.2579518715961,
    landingPosY: 427.48279857976337
  },
  trajectoryData: {
    trajectoryPolynomialX: [
      17.953641853805618,
      -47.785715529449035,
      19.42977276671014,
      -3.398978193204823,
      -0.7845600359480832,
      0.5648372220325301,
      -0.12491478842188641,
      0.012787884173502963,
      -0.0005116782848867642
    ],
    trajectoryPolynomialY: [
      -66.31634863346272,
      160.5211813028262,
      -36.11032539848496,
      9.681963294491283,
      -2.516707210792061,
      0.5691870257391934,
      -0.08869025651715008,
      0.00782796474781931,
      -0.00029018914747536324
    ],
    trajectoryPolynomialZ: [
      -36.393471357507615,
      91.5299905886195,
      -15.65007934327053,
      0.2973915221293711,
      0.08933182403782632,
      -0.05388748620348726,
      0.01194164933460883,
      -0.0011875818416647143,
      0.000045182991279599504
    ],
    validTimeInterval: [0.4714241300024811, 3.463147770437759]
  }
};

export default class HomeRunCard extends Component {
  constructor(props) {
    super(props);

    this.canvasRef = React.createRef();

    this.animate = this.animate.bind(this);
  }

  componentDidMount() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    var geometry = new THREE.BoxGeometry(5, 32, 32);
    var material = new THREE.MeshBasicMaterial({ color: 0x0000ff });
    this.cube = new THREE.Mesh(geometry, material);
    this.scene.add(this.cube);

    this.camera.position.z = 5;

    this.animate();
  }

  animate() {
    requestAnimationFrame(this.animate);

    // this.cube.rotation.x += 0.01;
    // this.cube.rotation.y += 0.01;

    this.renderer.render(this.scene, this.camera);
  }

  render() {
    return (
      <div>
        <h1>Home Run Render</h1>
        <div id="scene" ref={this.sceneRef} />
      </div>
    );
  }
}
