import * as THREE from "three";
//倒入轨道控制器
import {
    OrbitControls
} from "three/examples/jsm/controls/OrbitControls.js";
//倒入动画库
import gsap from 'gsap';
import * as dat from 'dat.gui'
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


//导入纹理
const textureLoader = new THREE.TextureLoader();
textureLoader.load()
//添加物体
const cubeGeometry = new THREE.BoxBufferGeometry(1, 1, 1)
//材质
const basicMaterial = new THREE.MeshBasicMaterial({
    color: "#ffff00"
});
const cube = new THREE.Mesh(cubeGeometry, basicMaterial);
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

//设置控制器组尼 ，让控制器更有真实
controls.enableDamping = true;

//添加坐标辅助器
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);
//设置时钟
const clock = new THREE.Clock();



function render() {
    // 设置阻尼必须调用update
    controls.update()

    renderer.render(scene, camera);
    requestAnimationFrame(render);
}
render();

// 缩放的时候
window.addEventListener('resize', () => {
    console.log('resize', )
    // 更新摄像头
    camera.aspect = window.innerWidth / window.innerHeight;
    // 更新摄像机的投影矩阵
    camera.updateProjectionMatrix();

    //更新渲染器
    renderer.setSize(window.innerWidth, window.innerHeight);
    // 设置渲染器的像素比
    renderer.setPixelRatio(window.devicePixelRatio)
});

//双击
window.addEventListener('dblclick', () => {
    // 双击进入全屏
    const full = document.fullscreenElement;

    if (!full) {
        renderer.domElement.requestFullscreen();

    } else {
        document.exitFullscreen();
    }

});