/* ═══════════════════════════════════════════════════════════════════
   $42069 · MATRIX MEME FORGE
   drop an image → digital-rain reveal → downloadable GIF
   runs 100% client-side · no upload · namespaced, self-contained
   ═══════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  const $ = (id) => document.getElementById(id);

  const dropzone     = $('mg-dropzone');
  const fileInput    = $('mg-fileInput');
  const dropzoneText = $('mg-dropzoneText');
  const generateBtn  = $('mg-generateBtn');
  const previewWrap  = $('mg-previewWrap');
  const liveCanvas   = $('mg-liveCanvas');
  const srcCanvas    = $('mg-srcCanvas');
  const progressWrap = $('mg-progressWrap');
  const progressBar  = $('mg-progressBar');
  const statusEl     = $('mg-status');
  const downloadWrap = $('mg-downloadWrap');
  const downloadLink = $('mg-downloadLink');

  // bail quietly if the section isn't on the page
  if (!dropzone || !fileInput || !generateBtn) return;

  const liveCtx = liveCanvas.getContext('2d');
  const srcCtx  = srcCanvas.getContext('2d');

  const densitySlider  = $('mg-density');
  const speedSlider    = $('mg-speed');
  const durationSlider = $('mg-duration');
  const charsetSelect  = $('mg-charset');
  const loopmodeSelect = $('mg-loopmode');

  $('mg-densityVal').textContent  = densitySlider.value;
  $('mg-speedVal').textContent    = speedSlider.value;
  $('mg-durationVal').textContent = parseFloat(durationSlider.value).toFixed(1);

  densitySlider.oninput  = () => $('mg-densityVal').textContent  = densitySlider.value;
  speedSlider.oninput    = () => $('mg-speedVal').textContent    = speedSlider.value;
  durationSlider.oninput = () => $('mg-durationVal').textContent = parseFloat(durationSlider.value).toFixed(1);

  let loadedImage  = null;
  let workerBlobUrl = null;

  // Pre-fetch gif.worker.js and turn it into a same-origin blob URL.
  // Some browsers block cross-origin Worker construction; this avoids that.
  async function getWorkerScriptUrl() {
    if (workerBlobUrl) return workerBlobUrl;
    const resp = await fetch('https://cdnjs.cloudflare.com/ajax/libs/gif.js/0.2.0/gif.worker.js');
    if (!resp.ok) throw new Error('Could not load gif worker script');
    const blob = await resp.blob();
    workerBlobUrl = URL.createObjectURL(blob);
    return workerBlobUrl;
  }

  const CHARSETS = {
    matrix: 'アイウエオカキクケコサシスセソ0123456789ﾊﾋﾌﾍﾎﾗﾘﾙﾚﾛﾜｦﾝ',
    binary: '01',
    '420': '420 69',
    hex: '0123456789ABCDEF'
  };

  function setupDropzone() {
    dropzone.addEventListener('click', () => fileInput.click());
    ['dragenter', 'dragover'].forEach(evt =>
      dropzone.addEventListener(evt, e => { e.preventDefault(); dropzone.classList.add('drag'); })
    );
    ['dragleave', 'drop'].forEach(evt =>
      dropzone.addEventListener(evt, e => { e.preventDefault(); dropzone.classList.remove('drag'); })
    );
    dropzone.addEventListener('drop', e => {
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    });
    fileInput.addEventListener('change', e => {
      const file = e.target.files[0];
      if (file) handleFile(file);
    });
  }

  function handleFile(file) {
    if (!file.type.startsWith('image/')) {
      statusEl.textContent = 'ERROR: please drop an image file';
      return;
    }
    const reader = new FileReader();
    reader.onload = e => {
      const img = new Image();
      img.onload = () => {
        loadedImage = img;
        dropzoneText.textContent = `✓ LOADED: ${file.name}`;
        generateBtn.disabled = false;
        drawPreviewFrame(img, 1);
        previewWrap.style.display = 'block';
        statusEl.textContent = 'ready · hit GENERATE to render the haze';
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  // Draw the image scaled + letterboxed into a square working canvas
  function prepareSourceCanvas(img, size) {
    srcCanvas.width = size;
    srcCanvas.height = size;
    srcCtx.fillStyle = '#000';
    srcCtx.fillRect(0, 0, size, size);
    const scale = Math.min(size / img.width, size / img.height);
    const w = img.width * scale;
    const h = img.height * scale;
    srcCtx.drawImage(img, (size - w) / 2, (size - h) / 2, w, h);
    return srcCtx.getImageData(0, 0, size, size);
  }

  function drawPreviewFrame(img, revealAmount) {
    const size = 400;
    liveCanvas.width = size;
    liveCanvas.height = size;
    const imgData = prepareSourceCanvas(img, size);
    renderMatrixFrame(liveCtx, imgData, size, 0.45, revealAmount, CHARSETS.matrix);
  }

  // Core renderer: matrix rain that reveals the source image based on reveal (0..1)
  function renderMatrixFrame(ctx, imgData, size, density, reveal, chars, rngState) {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, size, size);

    const fontSize = Math.max(10, Math.floor(size / 45));
    const cols = Math.floor(size / fontSize);
    const rows = Math.floor(size / fontSize);
    ctx.font = `${fontSize}px monospace`;
    ctx.textBaseline = 'top';

    function rand(seed) {
      const x = Math.sin(seed * 12.9898) * 43758.5453;
      return x - Math.floor(x);
    }

    for (let cx = 0; cx < cols; cx++) {
      const colSeed = cx * 31.17;
      const colReveal = clamp01((reveal * cols - cx + cols * 0.15) / (cols * 0.15));

      for (let cy = 0; cy < rows; cy++) {
        const px = cx * fontSize;
        const py = cy * fontSize;

        const sx = Math.min(size - 1, px + Math.floor(fontSize / 2));
        const sy = Math.min(size - 1, py + Math.floor(fontSize / 2));
        const idx = (sy * size + sx) * 4;
        const r = imgData.data[idx], g = imgData.data[idx + 1], b = imgData.data[idx + 2];

        const cellSeed = colSeed + cy * 7.77 + (rngState || 0);
        const showChar = rand(cellSeed) < density || colReveal > 0.05;

        if (!showChar && colReveal < 0.5) continue;

        if (colReveal > 0.92) {
          if (rand(cellSeed + 99) < 0.04) {
            ctx.fillStyle = `rgba(${r},${g},${b},1)`;
            ctx.fillRect(px, py, fontSize, fontSize);
            ctx.fillStyle = 'rgba(0,255,65,0.5)';
            const ch = chars[Math.floor(rand(cellSeed + rngState) * chars.length)];
            ctx.fillText(ch, px, py);
          } else {
            ctx.fillStyle = `rgb(${r},${g},${b})`;
            ctx.fillRect(px, py, fontSize, fontSize);
          }
          continue;
        }

        const ch = chars[Math.floor(rand(cellSeed + (rngState || 0) * 1.7) * chars.length)];
        const glow = 0.4 + 0.6 * rand(cellSeed + (rngState || 0) * 0.3);

        if (colReveal > 0.5) {
          ctx.fillStyle = `rgba(${r},${g},${b},${colReveal})`;
          ctx.fillRect(px, py, fontSize, fontSize);
        }

        const greenIntensity = Math.floor(150 + 105 * glow * (1 - colReveal * 0.5));
        ctx.fillStyle = colReveal > 0.5
          ? `rgba(${Math.floor(r * 0.3)}, ${greenIntensity}, ${Math.floor(b * 0.3 + 60)}, ${1 - colReveal * 0.6})`
          : `rgba(20, ${greenIntensity}, 60, ${0.5 + glow * 0.5})`;
        ctx.fillText(ch, px, py);

        if (rand(cellSeed + (rngState || 0)) > 0.93 && colReveal < 0.6) {
          ctx.fillStyle = '#ccffcc';
          ctx.fillText(ch, px, py);
        }
      }
    }
  }

  function clamp01(v) { return Math.max(0, Math.min(1, v)); }

  generateBtn.addEventListener('click', generateGif);

  async function generateGif() {
    if (!loadedImage) return;
    if (typeof GIF === 'undefined') {
      statusEl.textContent = 'ERROR: GIF encoder not loaded (check your connection)';
      return;
    }
    generateBtn.disabled = true;
    downloadWrap.style.display = 'none';
    progressWrap.style.display = 'block';
    progressBar.style.width = '0%';
    statusEl.textContent = 'loading encoder…';

    let workerUrl;
    try {
      workerUrl = await getWorkerScriptUrl();
    } catch (err) {
      statusEl.textContent = 'ERROR: could not load GIF encoder (check your connection)';
      progressWrap.style.display = 'none';
      generateBtn.disabled = false;
      return;
    }

    statusEl.textContent = 'rendering frames…';

    const size = 400;
    const imgData = prepareSourceCanvas(loadedImage, size);
    const chars = CHARSETS[charsetSelect.value];
    const density = densitySlider.value / 100;
    const speedFactor = speedSlider.value / 100;
    const totalDuration = parseFloat(durationSlider.value);
    const fps = 15;
    const frameDelay = Math.round(1000 / fps);
    const totalFrames = Math.round(totalDuration * fps);
    const mode = loopmodeSelect.value;

    const gif = new GIF({
      workers: 2,
      quality: 10,
      width: size,
      height: size,
      workerScript: workerUrl,
      repeat: 0
    });

    gif.on('abort', () => {
      statusEl.textContent = 'ERROR: GIF rendering was aborted';
      progressWrap.style.display = 'none';
      generateBtn.disabled = false;
    });

    const renderCanvas = document.createElement('canvas');
    renderCanvas.width = size;
    renderCanvas.height = size;
    const rctx = renderCanvas.getContext('2d');

    try {
      for (let f = 0; f < totalFrames; f++) {
        const t = f / (totalFrames - 1);
        let reveal;

        if (mode === 'reveal') {
          const revealStart = 0.15;
          const revealEnd = 0.15 + 0.55 * (1 - speedFactor * 0.6);
          reveal = clamp01((t - revealStart) / (revealEnd - revealStart));
        } else if (mode === 'pulse') {
          const wave = Math.abs(((t * 2) % 2) - 1);
          reveal = wave;
        } else {
          reveal = 1;
        }

        rctx.clearRect(0, 0, size, size);
        const effectiveDensity = mode === 'rainforever' ? density * 1.3 : density;
        renderMatrixFrame(rctx, imgData, size, Math.min(0.95, effectiveDensity), reveal, chars, f * 2.3);

        gif.addFrame(rctx, { copy: true, delay: frameDelay });
        liveCtx.drawImage(renderCanvas, 0, 0);

        progressBar.style.width = `${Math.round((f / totalFrames) * 50)}%`;
        statusEl.textContent = `rendering frame ${f + 1}/${totalFrames}…`;
        await new Promise(r => setTimeout(r, 0));
      }
    } catch (err) {
      statusEl.textContent = 'ERROR while rendering frames: ' + err.message;
      progressWrap.style.display = 'none';
      generateBtn.disabled = false;
      return;
    }

    statusEl.textContent = 'encoding GIF (this can take a moment)…';

    gif.on('progress', p => {
      progressBar.style.width = `${50 + Math.round(p * 50)}%`;
    });

    gif.on('finished', blob => {
      const url = URL.createObjectURL(blob);
      downloadLink.href = url;
      downloadWrap.style.display = 'block';
      progressWrap.style.display = 'none';
      statusEl.textContent = `done · ${(blob.size / 1024).toFixed(0)} KB · ${totalFrames} frames`;
      generateBtn.disabled = false;

      const img = document.createElement('img');
      img.src = url;
      img.alt = '42069 matrix meme';
      previewWrap.innerHTML = '';
      previewWrap.appendChild(img);
    });

    gif.render();
  }

  setupDropzone();
})();
