import * as THREE from "three";
//倒入轨道控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
//倒入动画库
import gsap from "gsap";
import * as dat from "dat.gui";
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
// 控制器--链式调用
const gui = new dat.GUI();
gui
  .add(cube.position, "x")
  .min(0)
  .max(5)
  .step(0.01)
  .name("移动x轴")
  .onChange((val) => {
    console.log("值被修改了", val);
  })
  .onFinishChange((val) => {
    console.log("完全停下来", val);
  });

// 修改颜色
const params = {
  color: "#ffff00",
  fn: () => {
    //
    gsap.to(cube.position, { x: 4, direction: 3, yoyo: true, repeat: -1 });
  },
};
gui
  .addColor(params, "color")
  .onChange((val) => {
    console.log("color被修改了", val);
    cube.material.color.set(val);
  })
  .name("修改颜色");
// 设置选项框
gui.add(cube, "visible").name("是否显示");

// 设置点击触发某个事件
gui.add(params, "fn").name("设置动画");

const folder = gui.addFolder("设置立方体");
folder.add(cube.material, "wireframe").name("设置线框");

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

//设置控制器组尼 ，让控制器更有真实
controls.enableDamping = true;

//添加坐标辅助器
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);
//设置时钟
const clock = new THREE.Clock();

// 设置动画
gsap.to(cube.position, { x: 5, direction: 15 });
gsap.to(cube.rotation, { x: 2 * Math.PI, direction: 5 });
function render() {
  // 设置阻尼必须调用update
  controls.update();
  // 物品移动
  // cube.position.x+=0.01;
  // //旋转
  // cube.rotation.x+=0.01;
  // if(cube.position.x>5){
  //     cube.position.x  =0;
  // }

  //获取时钟运行总时长
  // let time = clock.getElapsedTime();
  // let deltaTime = clock.getDelta();
  // console.log('时钟运行总时长',time)
  // console.log("两次获取的间隔时间", deltaTime);
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}
render();

// 缩放的时候
window.addEventListener("resize", () => {
  console.log("resize");
  // 更新摄像头
  camera.aspect = window.innerWidth / window.innerHeight;
  // 更新摄像机的投影矩阵
  camera.updateProjectionMatrix();

  //更新渲染器
  renderer.setSize(window.innerWidth, window.innerHeight);
  // 设置渲染器的像素比
  renderer.setPixelRatio(window.devicePixelRatio);
});

//双击
window.addEventListener("dblclick", () => {
  // 双击进入全屏
  const full = document.fullscreenElement;

  if (!full) {
    renderer.domElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});
