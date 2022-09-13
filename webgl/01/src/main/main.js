 import * as THREE from "three";
//导入控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
//  初始化场景
const scene = new THREE.Scene();

//初始化相机
const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight,0.1,2000);


//设置相机位置
camera.position.set(-50,50,100);
//更新摄像头
camera.aspect = window.innerWidth / window.innerHeight;
// 更新摄像机的投影矩阵
camera.updateProjectionMatrix();
scene.add(camera);

//初始化渲染器
const renderer = new THREE.WebGLRenderer({
  //设置抗锯齿
  antialias:true,
});
renderer.outputEncoding = THREE.sRGBEncoding;
// 设置宽高比列
renderer.setSize(window.innerWidth, window.innerHeight);

//监听屏幕大小的改变，修改渲染器和相机的比列
window.addEventListener('resize', () => {
  // 更新摄像头
  camera.aspect = window.innerWidth / window.innerHeight;
  // 更新摄像机的投影矩阵
  camera.updateProjectionMatrix();

  //更新渲染器
  renderer.setSize(window.innerWidth, window.innerHeight);
  // 设置渲染器的像素比
  renderer.setPixelRatio(window.devicePixelRatio)
});


// 添加到画布
document.body.appendChild(renderer.domElement);


// 实例化控制器
 const controls = new OrbitControls( camera,renderer.domElement)


function render() {
  //渲染场景
  renderer.render(scene, camera);
  // 引擎自动更新渲染器
  requestAnimationFrame(render);
};
render();


// 添加平面
// const planGeometry = new THREE.PlaneGeometry(100,100);
// const planMaterial = new THREE.MeshBasicMaterial({
//   color:0xffffff,
// })
// const plane = new THREE.Mesh(planGeometry, planMaterial);
// scene.add(plane);



// 创建一个巨大的天空球
const  skyGeometry = new THREE.SphereGeometry(1000,60,40)
