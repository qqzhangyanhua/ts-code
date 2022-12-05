import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
//导入轨道控制器

// d目标,了解three.js的基本使用

//1 .创建场景
const scene = new THREE.Scene();

//2 创建相机
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
//设置相机位置
camera.position.set(0, 0, 10);
scene.add(camera);

//添加物体
//创建几何体

const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
//创建材质
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

//xiu修改物体的位置
// cube.position.set(5, 0, 0);
// cube.position.x = 2;
//缩放
// cube.scale.set(3, 2, 1);

//旋转
// cube.rotation.set(0, 0, 0.5);

//添加到场景中
scene.add(cube);

//初始化渲染器

const renderer = new THREE.WebGLRenderer();
//设置渲染器的大小
renderer.setSize(window.innerWidth, window.innerHeight);

//将渲染器的dom元素添加到body中
document.body.appendChild(renderer.domElement);

//使用渲染器,通过相机和场景来渲染
renderer.render(scene, camera);

//创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);

//添加坐标轴辅助
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

function render(scene, camera) {
  // 物体的移动用position
  cube.position.x += 0.01;
  if (cube.position.x > 5) {
    cube.position.x = 0;
  }
  renderer.render(scene, camera);
  requestAnimationFrame(render.bind(null, scene, camera));
}
render(scene, camera);
