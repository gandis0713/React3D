const cubeSize = 1.0;

// prettier-ignore
export const cubeVertex = [
  -cubeSize,  cubeSize, -cubeSize,
  -cubeSize, -cubeSize, -cubeSize,
   cubeSize, -cubeSize, -cubeSize,
   cubeSize, -cubeSize, -cubeSize,
   cubeSize,  cubeSize, -cubeSize,
  -cubeSize,  cubeSize, -cubeSize,

  -cubeSize, -cubeSize,  cubeSize,
  -cubeSize, -cubeSize, -cubeSize,
  -cubeSize,  cubeSize, -cubeSize,
  -cubeSize,  cubeSize, -cubeSize,
  -cubeSize,  cubeSize,  cubeSize,
  -cubeSize, -cubeSize,  cubeSize,

   cubeSize, -cubeSize, -cubeSize,
   cubeSize, -cubeSize,  cubeSize,
   cubeSize,  cubeSize,  cubeSize,
   cubeSize,  cubeSize,  cubeSize,
   cubeSize,  cubeSize, -cubeSize,
   cubeSize, -cubeSize, -cubeSize,

  -cubeSize, -cubeSize,  cubeSize,
  -cubeSize,  cubeSize,  cubeSize,
   cubeSize,  cubeSize,  cubeSize,
   cubeSize,  cubeSize,  cubeSize,
   cubeSize, -cubeSize,  cubeSize,
  -cubeSize, -cubeSize,  cubeSize,

  -cubeSize,  cubeSize, -cubeSize,
   cubeSize,  cubeSize, -cubeSize,
   cubeSize,  cubeSize,  cubeSize,
   cubeSize,  cubeSize,  cubeSize,
  -cubeSize,  cubeSize,  cubeSize,
  -cubeSize,  cubeSize, -cubeSize,

  -cubeSize, -cubeSize, -cubeSize,
  -cubeSize, -cubeSize,  cubeSize,
   cubeSize, -cubeSize, -cubeSize,
   cubeSize, -cubeSize, -cubeSize,
  -cubeSize, -cubeSize,  cubeSize,
   cubeSize, -cubeSize,  cubeSize

  ];

// prettier-ignore
export const F = [
  // left column front
    -150,   -150,  -150,
   30,   -150,  -150,
    -150, 150,  -150,
    -150, 150,  -150,
   30,   -150,  -150,
   30, 150,  -150,

  // top rung front
   30,   -150,  -150,
  100,   -150,  -150,
   30,  30,  -150,
   30,  30,  -150,
  100,   -150,  -150,
  100,  30,  -150,

  // middle rung front
   30,  60,  -150,
   67,  60,  -150,
   30,  90,  -150,
   30,  90,  -150,
   67,  60,  -150,
   67,  90,  -150,

  // left column back
    -150,   -150,  30,
   30,   -150,  30,
    -150, 150,  30,
    -150, 150,  30,
   30,   -150,  30,
   30, 150,  30,

  // top rung back
   30,   -150,  30,
  100,   -150,  30,
   30,  30,  30,
   30,  30,  30,
  100,   -150,  30,
  100,  30,  30,

  // middle rung back
   30,  60,  30,
   67,  60,  30,
   30,  90,  30,
   30,  90,  30,
   67,  60,  30,
   67,  90,  30,

  // top
    -150,   -150,   -150,
  100,   -150,   -150,
  100,   -150,  30,
    -150,   -150,   -150,
  100,   -150,  30,
    -150,   -150,  30,

  // top rung right
  100,   -150,   -150,
  100,  30,   -150,
  100,  30,  30,
  100,   -150,   -150,
  100,  30,  30,
  100,   -150,  30,

  // under top rung
  30,   30,   -150,
  30,   30,  30,
  100,  30,  30,
  30,   30,   -150,
  100,  30,  30,
  100,  30,   -150,

  // between top rung and middle
  30,   30,   -150,
  30,   30,  30,
  30,   60,  30,
  30,   30,   -150,
  30,   60,  30,
  30,   60,   -150,

  // top of middle rung
  30,   60,   -150,
  30,   60,  30,
  67,   60,  30,
  30,   60,   -150,
  67,   60,  30,
  67,   60,   -150,

  // right of middle rung
  67,   60,   -150,
  67,   60,  30,
  67,   90,  30,
  67,   60,   -150,
  67,   90,  30,
  67,   90,   -150,

  // bottom of middle rung.
  30,   90,   -150,
  30,   90,  30,
  67,   90,  30,
  30,   90,   -150,
  67,   90,  30,
  67,   90,   -150,

  // right of bottom
  30,   90,   -150,
  30,   90,  30,
  30,  150,  30,
  30,   90,   -150,
  30,  150,  30,
  30,  150,   -150,

  // bottom
  -150,   150,   -150,
  -150,   150,  30,
  30,  150,  30,
  -150,   150,   -150,
  30,  150,  30,
  30,  150,   -150,

  // left side
  -150,   -150,   -150,
  -150,   -150,  30,
  -150, 150,  30,
  -150,   -150,   -150,
  -150, 150,  30,
  -150, 150,   -150,
];

// prettier-ignore
export const normals = [
  0, 0, -1,
  0, 0, -1,
  0, 0, -1,
  0, 0, -1,
  0, 0, -1,
  0, 0, -1,
  
  0, 0, 1,
  0, 0, 1,
  0, 0, 1,
  0, 0, 1,
  0, 0, 1,
  0, 0, 1,

  0, 1, 0,
  0, 1, 0,
  0, 1, 0,
  0, 1, 0,
  0, 1, 0,
  0, 1, 0,

  0, -1, 0,
  0, -1, 0,
  0, -1, 0,
  0, -1, 0,
  0, -1, 0,
  0, -1, 0,

  -1, 0, 0,
  -1, 0, 0,
  -1, 0, 0,
  -1, 0, 0,
  -1, 0, 0,
  -1, 0, 0,
  
  1, 0, 0,
  1, 0, 0,
  1, 0, 0,
  1, 0, 0,
  1, 0, 0,
  1, 0, 0,
];
