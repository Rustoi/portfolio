import * as THREE from "three";

// Получаем контейнер для анимации (элемент jelly-animation)
const container = document.querySelector(".jelly-animation");

// Создаем сцену, камеру и рендерер
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  container.clientWidth / container.clientHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({ alpha: true }); // Прозрачный фон
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

// Создаем свет
const light = new THREE.DirectionalLight(0xffffff, 10);
light.position.set(-20, 44, 40);
scene.add(light);

// Создаем материал с оранжевым цветом и желеобразной прозрачностью
const jellyMaterial = new THREE.MeshStandardMaterial({
  color: 0x000000, // Оранжевый цвет
  roughness: 0.5,
  metalness: 0.5,
  transparent: true,
  opacity: 1,
});

// Создаем геометрию сферы
const geometry = new THREE.SphereGeometry(2.9, 42, 42); // Увеличиваем количество сегментов для плавных деформаций
const jelly = new THREE.Mesh(geometry, jellyMaterial);
scene.add(jelly);

// Позиционируем камеру
camera.position.z = 5;

// Массив для хранения начальной позиции вершин
const initialPositions = geometry.attributes.position.array.slice();

// Параметры анимации
let time = 0;

// Функция для создания эффекта "желе"
function animateJelly() {
  const positions = geometry.attributes.position.array;
  for (let i = 0; i < positions.length; i += 3) {
    // Расчет на основе синусоидальной волны для движения по оси Y
    positions[i + 1] =
      initialPositions[i + 1] +
      Math.sin(time + positions[i] * 2 + positions[i + 2] * 3) * 0.1;
  }
  geometry.attributes.position.needsUpdate = true;
}

// Функция анимации
function animate() {
  requestAnimationFrame(animate);

  // Колебания "желе"
  time += 0.05;
  animateJelly();

  renderer.render(scene, camera);
}

animate(); // Запускаем анимацию

// Обновление размеров окна и контейнера
window.addEventListener("resize", () => {
  const width = container.clientWidth;
  const height = container.clientHeight;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});
