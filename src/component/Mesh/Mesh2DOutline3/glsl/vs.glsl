#version 300 es

in vec3 vs_VertexPosition;
in vec3 vs_VertexPosition1;
in vec3 vs_VertexPosition2;
in vec3 vs_VertexPosition3;

uniform mat4 u_MCPC;
uniform mat4 u_VCPC;
uniform vec3 u_camTar;
uniform vec3 u_camEye;

bool getPoint(vec3 v1, vec3 v2, inout vec3 point)
{
  vec3 forward = u_camTar - u_camEye;
  forward = normalize(forward);

  vec3 v2v1 = v2 - v1;
  float child = dot(forward, v2v1);
  if (child < 0.00001 && child > -0.00001) {
    return false;
  }

  vec3 v3 = vec3(0, 0, 0);
  vec3 v3v1 = v3 - v1;
  float parent = dot(forward, v3v1);
  float u = parent / child;
  if (u < 0.00001 || u > 1.00000) {
    return false;
  }
  vec3 B = v2 - v1;
  B[0] *= u;
  B[1] *= u;
  B[2] *= u;
  vec3 A = v1;
  point = A + B;

  return true;
}

void main()
{
  gl_Position = vec4(2.0, 2.0, 2.0, 1.0);

  bool result[3];
  vec3 point[3];
  result[0] = getPoint(vs_VertexPosition1, vs_VertexPosition2, point[0]);
  result[1] = getPoint(vs_VertexPosition2, vs_VertexPosition3, point[1]);
  result[2] = getPoint(vs_VertexPosition3, vs_VertexPosition1, point[2]);

  int count = 0;
  for(int i = 0; i < 3; i++)
  {
    count += result[i] ? 1 : 0;
  }
  
  if(count != 2) return;

  int index = 0;
  for(int i = 0; i < 3; i++)
  {
    if(result[i] == true && index == gl_VertexID % 2) 
    {
      gl_Position = u_MCPC * vec4(point[i], 1.0);
      break;
    }

    index += result[i] ? 1 : 0;
  }
}