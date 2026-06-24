// Simple 2D Pseudo-Random Noise
float noise(in vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

// 2D Value Noise
float valueNoise(in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    vec2 u = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);
    return mix(mix(noise(i + vec2(0.0, 0.0)), noise(i + vec2(1.0, 0.0)), u.x),
        mix(noise(i + vec2(0.0, 1.0)), noise(i + vec2(1.0, 1.0)), u.x), u.y);
}

// Fractal Brownian Motion (fBm)
#define NUM_OCTAVES 4
float fbm(in vec2 st) {
    float v = 0.0;
    float a = 0.5;
    vec2 shift = vec2(100.0);
    mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
    for (int i = 0; i < NUM_OCTAVES; ++i) {
        v += a * valueNoise(st);
        st = rot * st * 2.0 + shift;
        a *= 0.5;
    }
    return v;
}

void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    // Normalize coordinates
    vec2 uv = fragCoord / iResolution.xy;
    uv.x *= iResolution.x / iResolution.y;

    // Scale space (lower = larger waves, higher = tighter waves)
    vec2 st = uv * 2.0;

    // --- DOMAIN WARPING (Fluid Motion) ---
    vec2 q = vec2(fbm(st + 0.03 * iTime), fbm(st + vec2(1.0)));
    vec2 r = vec2(fbm(st + 1.0 * q + vec2(1.7, 9.2) + 0.02 * iTime),
            fbm(st + 1.0 * q + vec2(8.3, 2.8) + 0.02 * iTime));

    // Smooth continuous noise field
    float v = fbm(st + r);

    // --- ULTRA-SHARP ISOLINES ---
    float numLines = 18.0;
    float scaledVal = v * numLines;

    // Calculate the exact rate of change of the noise per screen pixel.
    // This allows us to know exactly how "wide" a pixel is in noise-space.
    float delta = fwidth(scaledVal);

    // Distance to the nearest whole integer (the exact line "height")
    float distToLine = abs(scaledVal - round(scaledVal));

    // LINE THICKNESS CONTROL
    // 1.0 means exactly 1 screen pixel wide.
    // Increase to 1.5 or 2.0 if you want them slightly more visible but still sharp.
    float targetPixelWidth = 1.2;

    // Use smoothstep strictly inside the pixel bounds to achieve anti-aliasing (smooth edges)
    // without letting the color bleed out across the background.
    float isoline = smoothstep(targetPixelWidth * delta, 0.0, distToLine);

    // --- COLORS ---
    // uBackgroundColor and uLineColor are declared as uniforms in the wrapper shader
    vec3 finalColor = mix(uBackgroundColor, uLineColor, isoline);

    fragColor = vec4(finalColor, 1.0);
}
