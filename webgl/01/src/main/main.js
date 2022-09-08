import * as THREE from "three";
//倒入轨道控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
// console.log(THREE);

//目标：创建一个立方体

// 1 创建场景
const scene = new THREE.Scene();

//2 创建相机
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 0, 10);
scene.add(camera);

//添加物体
//创建集合体
const cubeGeometry = new THREE.BoxGeometry();
const cubMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
//根据几何体和材质创建物体
const cube = new THREE.Mesh(cubeGeometry, cubMaterial);

//修改物体的位置
// cube.position.set(5,0,0)

//将物体添加到场景中

//目标：物体的缩放---
// cube.scale.set(3, 2, 1);

//旋转
// cube.rotation.set(0, 0, 0.5);
scene.add(cube);

//初始化渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

//将渲染器的dom元素添加到body中
console.log("document", document.body);
document.body.appendChild(renderer.domElement);

//使用渲染器 通过相机和场景渲染出场景
// renderer.render(scene, camera);

//c创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);

//添加坐标辅助器
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);


function render() {
    // 物品移动
    cube.position.x+=0.01;
    //旋转
    cube.rotation.x+=0.01;
    if(cube.position.x>5){
        cube.position.x  =0;
    }
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}
render();
