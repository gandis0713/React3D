import React, { useEffect, useState } from 'react';
import { createShader, createRenderShaderProgram } from '../../../webgl/shader/Shader';
import vertexShaderSource from './glsl/vs.glsl';
import fragmentShaderSource from './glsl/fs.glsl';
import { vertex, F, normals } from './resource';
import { vec3, mat4 } from 'gl-matrix';
import { openSTLByUrl } from '../../../common/OpenSTLFile';

const vertices = [];
const vertices1 = [];
const vertices2 = [];
const vertices3 = [];

const camEye = vec3.create();
camEye[0] = 0;
camEye[1] = 0;
camEye[2] = 1;
const camUp = vec3.create();
camUp[0] = 0;
camUp[1] = 1;
camUp[2] = 0;
const camTar = vec3.create();
camTar[0] = 0;
camTar[1] = 0;
camTar[2] = 0;
const MCWC = mat4.create();
const WCVC = mat4.create();
const VCPC = mat4.create();

const MCVC = mat4.create();
const MCPC = mat4.create();
let lines = [];

function Mesh2DOutline3() {
  console.log('create TextureRendering');

  let isDragging = false;
  let gl;
  let glCanvas;

  let vbo_vertexPosition1;
  let vbo_vertexPosition2;
  let vbo_vertexPosition3;

  let renderShaderProgram;

  let u_MCPC;
  let u_VCPC;
  let u_camTar;
  let u_camEye;

  let prePosition = [0, 0];

  let width = 0;
  let height = 0;
  let halfWidth = 0;
  let halfHeight = 0;
  const onMounted = function() {
    // initialize
    glCanvas = document.getElementById('_glcanvas');
    glCanvas.addEventListener('mousedown', mouseDownEvent, false);
    glCanvas.addEventListener('mousemove', mouseMoveEvent, false);
    glCanvas.addEventListener('mouseup', mouseUpEvent, false);
    gl = glCanvas.getContext('webgl2');

    if (!gl) {
      alert('Unable to initialize WebGL.');
      return;
    }

    width = gl.canvas.width;
    height = gl.canvas.height;
    halfWidth = width / 2;
    halfHeight = height / 2;

    mat4.identity(MCWC);
    mat4.scale(MCWC, MCWC, [20, 20, 20]);
    mat4.lookAt(WCVC, camEye, camTar, camUp);
    mat4.ortho(VCPC, -halfWidth, halfWidth, -halfHeight, halfHeight, -1000, 1000);
    mat4.multiply(MCVC, WCVC, MCWC);
    mat4.multiply(MCPC, VCPC, MCVC);

    gl.viewport(0, 0, width, height);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // create shader
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

    renderShaderProgram = createRenderShaderProgram(gl, vertexShader, fragmentShader);

    u_MCPC = gl.getUniformLocation(renderShaderProgram, 'u_MCPC');
    u_VCPC = gl.getUniformLocation(renderShaderProgram, 'u_VCPC');
    u_camTar = gl.getUniformLocation(renderShaderProgram, 'u_camTar');
    u_camEye = gl.getUniformLocation(renderShaderProgram, 'u_camEye');

    // initialize buffer

    const rotateMat = mat4.create();
    mat4.identity(rotateMat);
    mat4.rotateX(rotateMat, rotateMat, (89 * Math.PI) / 180.0);
    let temp = [];
    openSTLByUrl('assets/stl/Implant01.stl')
      .then((data) => {
        data
          .getPoints()
          .getData()
          .forEach((data) => {
            temp.push(data);
          });
        openSTLByUrl('assets/stl/Crown_23.stl')
          .then((data) => {
            data
              .getPoints()
              .getData()
              .forEach((data) => {
                temp.push(data);
              });

            for (let i = 0; i < temp.length; i += 3) {
              const point = vec3.create();
              point[0] = temp[i];
              point[1] = temp[i + 1];
              point[2] = temp[i + 2];
              vec3.transformMat4(point, point, rotateMat);
              if (i % 9 === 0) {
                vertices1.push(point[0]);
                vertices1.push(point[1]);
                vertices1.push(point[2]);
                vertices1.push(point[0]);
                vertices1.push(point[1]);
                vertices1.push(point[2]);
              }

              if (i % 9 === 3) {
                vertices2.push(point[0]);
                vertices2.push(point[1]);
                vertices2.push(point[2]);
                vertices2.push(point[0]);
                vertices2.push(point[1]);
                vertices2.push(point[2]);
              }

              if (i % 9 === 6) {
                vertices3.push(point[0]);
                vertices3.push(point[1]);
                vertices3.push(point[2]);
                vertices3.push(point[0]);
                vertices3.push(point[1]);
                vertices3.push(point[2]);
              }
            }

            vbo_vertexPosition1 = gl.createBuffer();
            vbo_vertexPosition2 = gl.createBuffer();
            vbo_vertexPosition3 = gl.createBuffer();

            gl.bindBuffer(gl.ARRAY_BUFFER, vbo_vertexPosition1);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices1), gl.STATIC_DRAW);

            gl.bindBuffer(gl.ARRAY_BUFFER, vbo_vertexPosition2);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices2), gl.STATIC_DRAW);

            gl.bindBuffer(gl.ARRAY_BUFFER, vbo_vertexPosition3);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices3), gl.STATIC_DRAW);
            drawScene();
          })
          .catch((error) => {
            console.log(error.message);
          });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const drawScene = function() {
    if (!gl) {
      console.log(' glContext return ');
      return;
    }

    // gl.enable(gl.CULL_FACE);
    // gl.enable(gl.DEPTH_TEST);
    // Clear the canvas AND the depth buffer.
    gl.clearColor(0, 0, 0, 1); // clear to blue
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    const vertexID1 = gl.getAttribLocation(renderShaderProgram, 'vs_VertexPosition1');
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo_vertexPosition1);
    gl.vertexAttribPointer(vertexID1, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vertexID1);

    const vertexID2 = gl.getAttribLocation(renderShaderProgram, 'vs_VertexPosition2');
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo_vertexPosition2);
    gl.vertexAttribPointer(vertexID2, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vertexID2);

    const vertexID3 = gl.getAttribLocation(renderShaderProgram, 'vs_VertexPosition3');
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo_vertexPosition3);
    gl.vertexAttribPointer(vertexID3, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vertexID3);

    gl.useProgram(renderShaderProgram);
    // gl.bindVertexArray(vao);

    gl.uniform3fv(u_camTar, camTar);
    gl.uniform3fv(u_camEye, camEye);
    gl.uniformMatrix4fv(u_MCPC, false, MCPC);
    gl.uniformMatrix4fv(u_VCPC, false, VCPC);

    gl.drawArrays(gl.LINES, 0, vertices3.length / 3);
  };

  const mouseMoveEvent = (event) => {
    if (isDragging === true) {
      const diffX = event.offsetX - halfWidth - prePosition[0];
      const diffY = halfHeight - event.offsetY - prePosition[1];

      const screenNormal = [0, 0, 1];
      const dir = [diffX, diffY, 0];
      const axis = vec3.create();
      vec3.cross(axis, dir, screenNormal);

      vec3.normalize(axis, axis);

      let dgreeX = vec3.dot(axis, [1, 0, 0]);
      let dgreeY = vec3.dot(axis, [0, 1, 0]);

      const degreeAmount = 2.5;
      dgreeX = (dgreeX * Math.PI) / 180.0;
      dgreeY = (dgreeY * Math.PI) / 180.0;
      dgreeX *= degreeAmount;
      dgreeY *= degreeAmount;

      const camTarToEye = vec3.create();
      vec3.subtract(camTarToEye, camEye, camTar);
      vec3.normalize(camTarToEye, camTarToEye);
      const camRight = vec3.create();
      vec3.cross(camRight, camUp, camTarToEye);
      vec3.normalize(camRight, camRight);

      const camPitch = mat4.create();
      mat4.fromRotation(camPitch, dgreeX, camRight);
      const camYaw = mat4.create();
      mat4.fromRotation(camYaw, dgreeY, camUp);

      vec3.transformMat4(camEye, camEye, camPitch);
      vec3.transformMat4(camEye, camEye, camYaw);

      vec3.subtract(camTarToEye, camEye, camTar);
      vec3.normalize(camTarToEye, camTarToEye);
      vec3.cross(camUp, camTarToEye, camRight);
      vec3.normalize(camUp, camUp);

      vec3.cross(camRight, camUp, camTarToEye);
      vec3.normalize(camRight, camRight);

      mat4.lookAt(WCVC, camEye, camTar, camUp);

      mat4.multiply(MCVC, WCVC, MCWC);
      mat4.multiply(MCPC, VCPC, MCVC);

      prePosition[0] = event.offsetX - halfWidth;
      prePosition[1] = halfHeight - event.offsetY;

      drawScene();
    }
  };

  const mouseDownEvent = (event) => {
    isDragging = true;

    prePosition[0] = event.offsetX - halfWidth;
    prePosition[1] = halfHeight - event.offsetY;

    drawScene();
  };

  const mouseUpEvent = (event) => {
    isDragging = false;
  };

  useEffect(onMounted, []);
  return (
    <>
      <canvas id="_glcanvas" width="640" height="480" />
    </>
  );
}

export default Mesh2DOutline3;
