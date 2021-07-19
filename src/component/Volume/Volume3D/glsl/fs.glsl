#version 300 es

precision highp float;
precision highp int;

in vec3 fs_vertexVC;

out vec4 outColor;
// uniform highp isampler3D u_volume;
uniform highp sampler3D u_volume;
uniform highp sampler2D u_color;
uniform highp sampler2D u_jitter;
uniform vec3 u_Dim;
uniform vec3 u_Extent;
uniform vec3 u_Bounds;
uniform vec3 u_Spacing;
uniform float u_camNear;
uniform float u_camFar;
uniform float u_camTar;
uniform float u_width;
uniform float u_height;
uniform float u_depth;
uniform highp vec2 u_boxX;
uniform highp vec2 u_boxY;
uniform highp vec2 u_boxZ;
uniform float u_isoMinValue;
uniform float u_isoMaxValue;

uniform vec3 u_planeNormal0;
uniform vec3 u_planeNormal1;
uniform vec3 u_planeNormal2;
uniform vec3 u_planeNormal3;
uniform vec3 u_planeNormal4;
uniform vec3 u_planeNormal5;
uniform float u_planeDist0;
uniform float u_planeDist1;
uniform float u_planeDist2;
uniform float u_planeDist3;
uniform float u_planeDist4;
uniform float u_planeDist5;
uniform vec3 u_Center;

uniform highp mat4 u_MCVC;
uniform highp mat4 u_VCMC;

// ivec4 getTextureValue(vec3 coord)
vec4 getTextureValue(vec3 coord)
{
  return texture(u_volume, coord);
}

// ivec4 getIsoSurface(vec3 coord)
// {
//   ivec4 color = texture(u_volume, coord);
//   if(color.r >= u_isoMinValue && color.r <= u_isoMaxValue)
//   {
//     return ivec4(color);
//   }

//   return ivec4(-1, -1, -1, -1);
// }

vec4 getIsoSurface(vec3 coord)
{
  vec4 color = texture(u_volume, coord);
  if(color.r >= u_isoMinValue && color.r <= u_isoMaxValue)
  {
    return vec4(color);
  }

  return vec4(-1, -1, -1, -1);
}

bool getCollisionPosition(vec3 planePos, vec3 planeNor, out vec3 pos)
{
  vec3 near = fs_vertexVC + vec3(0, 0, u_boxZ[1]);
  vec3 far = fs_vertexVC + vec3(0, 0, u_boxZ[0]);

  float A = dot(planeNor, (planePos - near));
  float B = dot(planeNor, (far - near));

  if(B == 0.)
  {
    pos = vec3(0, 0, 0);
    return false;
  }

  float u = A / B;
  if(u <= 1. && u >= 0.)
  {
    pos = near + u * (far - near);
    return true;
  }
  else 
  {
    pos = vec3(0, 0, 0);
    return false;
  }
}

bool getRayPosition(out vec3 StartPos, out vec3 EndPos) 
{
  vec3 coliPosTemp[6];
  bool isColi = false;
  int count = 0;
  vec3 coliPos[2];

  vec3 center = vec3(0, 0, 0);
  vec3 origin = vec3(0.5, 0.5, 0.5);

  vec3 plane0Center = center + u_planeNormal0 * 0.5;
  isColi = getCollisionPosition(plane0Center, u_planeNormal0, coliPosTemp[count]);
  if(isColi == true)
  {
    vec3 indexPos = vec3(dot(u_planeNormal1, coliPosTemp[count]),
                       dot(u_planeNormal3, coliPosTemp[count]),
                       dot(u_planeNormal5, coliPosTemp[count]));
    indexPos += origin;
    if(indexPos.y >= 0. && indexPos.z >= 0. && 
    indexPos.y <= 1. && indexPos.z <= 1. )
    {
      coliPos[count] = indexPos;
      count++;
    }
  }

  vec3 plane1Center = center + u_planeNormal1 * 0.5;
  isColi = getCollisionPosition(plane1Center, u_planeNormal1, coliPosTemp[count]);
  if(isColi == true)
  {
    vec3 indexPos = vec3(dot(u_planeNormal1, coliPosTemp[count]),
                       dot(u_planeNormal3, coliPosTemp[count]),
                       dot(u_planeNormal5, coliPosTemp[count]));
    indexPos += origin;
    if(indexPos.y >= 0. && indexPos.z >= 0. && 
    indexPos.y <= 1. && indexPos.z <= 1. )
    {
      coliPos[count] = indexPos;
      count++;
    }
  }
  
  vec3 plane2Center = center + u_planeNormal2 * 0.5;
  isColi = getCollisionPosition(plane2Center, u_planeNormal2, coliPosTemp[count]);
  if(isColi == true)
  {
    vec3 indexPos = vec3(dot(u_planeNormal1, coliPosTemp[count]),
                       dot(u_planeNormal3, coliPosTemp[count]),
                       dot(u_planeNormal5, coliPosTemp[count]));
    indexPos += origin;
    if(indexPos.x >= 0. && indexPos.z >= 0. && 
    indexPos.x <= 1. && indexPos.z <= 1. )
    {
      coliPos[count] = indexPos;
      count++;
    }
  }

  vec3 plane3Center = center + u_planeNormal3 * 0.5;
  isColi = getCollisionPosition(plane3Center, u_planeNormal3, coliPosTemp[count]);
  if(isColi == true)
  {
    vec3 indexPos = vec3(dot(u_planeNormal1, coliPosTemp[count]),
                       dot(u_planeNormal3, coliPosTemp[count]),
                       dot(u_planeNormal5, coliPosTemp[count]));
    indexPos += origin;
    if(indexPos.x >= 0. && indexPos.z >= 0. && 
    indexPos.x <= 1. && indexPos.z <= 1. )
    {
      coliPos[count] = indexPos;
      count++;
    }
  }

  vec3 plane4Center = center + u_planeNormal4 * 0.5;
  isColi = getCollisionPosition(plane4Center, u_planeNormal4, coliPosTemp[count]);
  if(isColi == true)
  {
    vec3 indexPos = vec3(dot(u_planeNormal1, coliPosTemp[count]),
                       dot(u_planeNormal3, coliPosTemp[count]),
                       dot(u_planeNormal5, coliPosTemp[count]));
    indexPos += origin;
    if(indexPos.x >= 0. && indexPos.y >= 0. && 
    indexPos.x <= 1. && indexPos.y <= 1. )
    {
      coliPos[count] = indexPos;
      count++;
    }
  }

  vec3 plane5Center = center + u_planeNormal5 * 0.5;
  isColi = getCollisionPosition(plane5Center, u_planeNormal5, coliPosTemp[count]);
  if(isColi == true)
  {
    vec3 indexPos = vec3(dot(u_planeNormal1, coliPosTemp[count]),
                       dot(u_planeNormal3, coliPosTemp[count]),
                       dot(u_planeNormal5, coliPosTemp[count]));
    indexPos += origin;
    if(indexPos.x >= 0. && indexPos.y >= 0. && 
    indexPos.x <= 1. && indexPos.y <= 1. )
    {
      coliPos[count] = indexPos;
      count++;
    }
  }

  if(count == 2)
  {
    if(coliPosTemp[0].z > coliPosTemp[1].z)
    {
      StartPos = coliPos[0];
      EndPos = coliPos[1];
    }
    else
    {
      StartPos = coliPos[1];
      EndPos = coliPos[0];
    }
    return true;
  }
  else if(count == 1 || count == 3)
  {
    StartPos = fs_vertexVC + vec3(0, 0, u_boxZ[1]);  
    StartPos += origin;  
    StartPos = vec3(dot(u_planeNormal1, StartPos),
                    dot(u_planeNormal3, StartPos),
                    dot(u_planeNormal5, StartPos));

    EndPos = fs_vertexVC + vec3(0, 0, u_boxZ[0]);   
    EndPos += origin;
    EndPos = vec3(dot(u_planeNormal1, EndPos),
                  dot(u_planeNormal3, EndPos),
                  dot(u_planeNormal5, EndPos));
    return true;
  }

  return false;

}

// void applyLight(float value, vec3 StartPos, vec3 steps, out vec4 color)
// {
//     vec4 result;
//     result.x = getTextureValue(StartPos + vec3(steps.x, 0.0, 0.0)).r - value;
//     result.y = getTextureValue(StartPos + vec3(0.0, steps.y, 0.0)).r - value;
//     result.z = getTextureValue(StartPos + vec3(0.0, 0.0, steps.z)).r - value;

//     result.xyz /= 0.01;

//     result.w = length(result.xyz);

//     result.xyz =
//       result.x * u_planeNormal1 +
//       result.y * u_planeNormal3 +
//       result.z * u_planeNormal5;

//     if (result.w > 0.0)
//     {
//       result.xyz /= result.w;
//     }

//     float vDiffuse = 0.7;
//     float vAmbient = 0.2;
//     float vSpecular = 0.1;
//     float vSpecularPower = 0.1;
//     vec3 lightColor = vec3(1,1,1);
//     vec3 lightDir = vec3(1, 1, 1);
//     vec3 diffuse = vec3(0.0, 0.0, 0.0);
//     vec3 specular = vec3(0.0, 0.0, 0.0);
//     float df = abs(dot(result.rgb, -lightDir));
//     diffuse += (df * lightColor);
//     vec3 halfAngle = vec3(0,0, 0.5); // TODO calculate
//     float sf = pow( abs(dot(halfAngle, result.rgb)), vSpecularPower);
//     specular += (sf * lightColor);
//     color.rgb = color.rgb*(diffuse*vDiffuse + vAmbient) + specular*vSpecular;
    
// }

void main() {

  vec3 StartPos;
  vec3 EndPos;
  bool inVolume = getRayPosition(StartPos,  EndPos);
  if(inVolume == false)
  {
    // return;
    discard;
  }

  vec3 rayDir = EndPos - StartPos;
  float rayLength = length(rayDir);
  float countf = rayLength * 124.0 * 1.0;
  vec3 steps = rayDir / countf;
  highp int count = int(countf);
  vec4 sum = vec4(0.);

  // apply jittering.
  vec2 coordf = gl_FragCoord.xy / 32.0;
  vec2 coord = vec2(int(coordf.x), int(coordf.y));
  float jitter = texture(u_jitter, coordf - coord).r;
  // StartPos += (steps * jitter);
  

  // Average Intensity.

  for(int i = 0; i < count; i++)
  {
    float value = getTextureValue(StartPos).r;
    vec4 color = texture(u_color, vec2(value, 0.5));

    // vec2 vecRG = getTextureValue(StartPos).bb;
    // float value = vecRG[0] * 255.0 * 256.0 + vecRG[1] * 255.0 - 1140.0;
    // vec4 color = texture(u_color, vec2(value / 65535.0, 0.5));

    // ivec4 iValue = getTextureValue(StartPos);
    // float value = float(iValue[0] + 1140) / 8140.0;
    // vec4 color = texture(u_color, vec2(value, 0.5));

    // applyLight(value, StartPos, steps, color);

    // color C = A Ci (1 - A) + C sum 
    sum += vec4(color.rgb*color.a, color.a)*(1.0 - sum.a);
    
    if(sum.a >= 1.0)
    {
      break;
    }
    StartPos += steps;
  }


  // MAX Intensity.

  // float maxValue = 0.0;
  // for(int i = 0; i < count; i++)
  // {
  //   float value = getTextureValue(StartPos).r;
  //   maxValue = max(maxValue, value);
  //   if(maxValue >= 1.0)
  //   {
  //     break;
  //   }
  //   StartPos += steps;
  // }
  
  // sum = vec4(maxValue, maxValue, maxValue, 1.0);



  // Iso surface.

  // for(int i = 0; i < count; i++)
  // {
  //   vec4 color = getIsoSurface(StartPos);
  //   if(color.a > 0.0)
  //   {
  //     sum = vec4(color.r, color.r, color.r, color.r);
  //     applyLight(color.r, StartPos, steps, sum);
  //     break;
  //   }

  //   StartPos += steps;
  // }
  
  outColor = vec4(sum.rgb, 1.0);
}