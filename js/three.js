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
const light = new THREE.DirectionalLight(0xffffff, 5);
light.position.set(10, 10, 30);
scene.add(light);

// Создаем материал с оранжевым цветом и желеобразной прозрачностью
const jellyMaterial = new THREE.MeshStandardMaterial({
  color: 0x000000, 
  roughness: 0.4,
  metalness: 0.1,
  transparent: true,
  opacity: 1,
});

// Создаем геометрию сферы
const geometry = new THREE.SphereGeometry(2.8, 40, 40); // Увеличиваем количество сегментов для плавных деформаций
const jelly = new THREE.Mesh(geometry, jellyMaterial);
scene.add(jelly);

// Позиционируем камеру
camera.position.z = 5;

// Массив для хранения начальной позиции вершин
const initialPositions = geometry.attributes.position.array.slice();

// Параметры анимации
let time = 1;

// Функция для создания эффекта "желе"
function animateJelly() {
  const positions = geometry.attributes.position.array;
  for (let i = 0; i < positions.length; i += 3) {
    // Расчет на основе синусоидальной волны для движения по оси Y
    positions[i + 1] =
      initialPositions[i + 1] +
      Math.sin(time + positions[i] * 2 + positions[i + 2] * 2) * 0.1;
  }
  geometry.attributes.position.needsUpdate = true;
}

// Функция анимации
function animate() {
  requestAnimationFrame(animate);

  // Колебания "желе"
  time += 0.06;
  animateJelly();

  renderer.render(scene, camera);
}

animate(); // Запускаем анимацию

// Функция для обновления геометрии
// window.addEventListener("resize", () => {
//   const width = container.clientWidth;
//   const height = container.clientHeight;
//   renderer.setSize(width, height);
//   camera.aspect = width / height;
//   camera.updateProjectionMatrix();
//   // Проверка ширины экрана и обновление геометрии
//   if (width < 768) {
//     updateGeometry(1); // Уменьшенный радиус для маленьких экранов
//     camera.position.z = 6;
//   } else {
//     updateGeometry(2.8); // Оригинальный радиус для больших экранов
//     camera.position.z = 5;
//   }
// });

// // Функция для обновления геометрии
// function updateGeometry(newRadius) {
//   jelly.geometry.dispose(); // Освобождаем старую геометрию
//   geometry = new THREE.SphereGeometry(newRadius, 40, 40); // Создаем новую геометрию
//   jelly.geometry = geometry;
//   // Сохраняем начальные позиции для новой геометрии
//   initialPositions = geometry.attributes.position.array.slice();
// }

