const imgUploaded = document.getElementById('chooseImg');
const imgPreview = document.getElementById('imagePreview');

const bwCanvas = document.getElementById('bwCanvas');
const cartoonCanvas = document.getElementById('cartoonCanvas');
const antiqueCanvas = document.getElementById('antiqueCanvas');
const invertedCanvas = document.getElementById('invertedCanvas');

window.onload = function() {
    document.getElementById('chooseImg').value = '';
}

imgUploaded.addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = new Image();
            img.onload = function() {
                displayOriginalImage(img);
                blackAndWhiteFilter(img);
                cartoonCanvaFilter(img);
                antiqueCanvasFilter(img);
                invertedCanvasFilter(img);
                // oilPaintingCanvasFilter(img);
             
            }
            img.src = e.target.result;
        }
        reader.readAsDataURL(file);
    } else {
        clearCanvases();
    }
});

function displayOriginalImage(img) {
    imgPreview.width = img.width;
    imgPreview.height = img.height;
    imgPreview.getContext('2d').drawImage(img, 0, 0);
    imgPreview.style.display = "block";
}

function clearCanvases() {
    const canvases = ['bwCanvas', 'cartoonCanvas', 'antiqueCanvas', 'invertedCanvas', 'imagePreview'];
    canvases.forEach(canvasId => {
        const canvas = document.getElementById(canvasId);
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        canvas.style.display = 'none';
    });
}

function cartoonCanvaFilter(img) {
    const ctx = cartoonCanvas.getContext('2d');
    cartoonCanvas.width = img.width;
    cartoonCanvas.height = img.height;
    ctx.drawImage(img, 0, 0);

    const imageData = ctx.getImageData(0, 0, cartoonCanvas.width, cartoonCanvas.height);
    const data = imageData.data;
    applyCartoonFilter(data);

    ctx.putImageData(imageData, 0, 0);
    cartoonCanvas.style.display = 'block';
    const downloadBtn = document.getElementById('downloadCartoon');
    downloadBtn.href = cartoonCanvas.toDataURL("image/jpeg", 0.8);
    downloadBtn.classList.remove('hideButton');
}
function blackAndWhiteFilter(img) {
    const ctx = bwCanvas.getContext('2d');
    bwCanvas.width = img.width;
    bwCanvas.height = img.height;
    ctx.drawImage(img, 0, 0);

    const imageData = ctx.getImageData(0, 0, bwCanvas.width, bwCanvas.height);
    const data = imageData.data;
    applyBlackAndWhiteFilter(data);

    ctx.putImageData(imageData, 0, 0);
    bwCanvas.style.display = 'block';
    const downloadBtn = document.getElementById('downloadBW');
    downloadBtn.href = bwCanvas.toDataURL("image/jpeg", 0.8);
    downloadBtn.classList.remove('hideButton');
}
function antiqueCanvasFilter(img) {
    const ctx = antiqueCanvas.getContext('2d');
    antiqueCanvas.width = img.width;
    antiqueCanvas.height = img.height;
    ctx.drawImage(img, 0, 0);

    const imageData = ctx.getImageData(0, 0, antiqueCanvas.width, antiqueCanvas.height);
    const data = imageData.data;
    applyAntiqueFilter(data);

    ctx.putImageData(imageData, 0, 0);
    antiqueCanvas.style.display = 'block';
    const downloadBtn = document.getElementById('downloadAntique');
    downloadBtn.href = antiqueCanvas.toDataURL("image/jpeg", 0.8);
    downloadBtn.classList.remove('hideButton');
}
function invertedCanvasFilter(img) {
    const ctx = invertedCanvas.getContext('2d');
    invertedCanvas.width = img.width;
    invertedCanvas.height = img.height;
    ctx.drawImage(img, 0, 0);

    const imageData = ctx.getImageData(0, 0, invertedCanvas.width, invertedCanvas.height);
    const data = imageData.data;
    applyInvertedFilter(data);

    ctx.putImageData(imageData, 0, 0);
    invertedCanvas.style.display = 'block';
    const downloadBtn = document.getElementById('downloadInverted');
    downloadBtn.href = invertedCanvas.toDataURL("image/jpeg", 0.8);
    downloadBtn.classList.remove('hideButton');
}

function applyBlackAndWhiteFilter(data) {
    for (let i = 0; i < data.length; i += 4) {
        const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        data[i] = avg;
        data[i + 1] = avg;
        data[i + 2] = avg;
    }
}

function applyCartoonFilter(data) {
    // Example cartoon filter logic (basic version)
    for(let i = 0; i < data.length; i += 4) {
        data[i] = Math.round(data[i] / 50) * 50;
        data[i + 1] = Math.round(data[i + 1] / 50) * 50;
        data[i + 2] = Math.round(data[i + 2] / 50) * 50;
    }
}

function applyAntiqueFilter(data) {
    for(let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        data[i] = 0.393 * r + 0.769 * g + 0.189 * b;
        data[i + 1] = 0.349 * r + 0.686 * g + 0.168 * b;
        data[i + 2] = 0.272 * r + 0.534 * g + 0.131 * b;
    }
}

function applyInvertedFilter(data) {
    for(let i = 0; i < data.length; i += 4) {
        data[i] = 255 - data[i];
        data[i + 1] = 255 - data[i + 1];
        data[i + 2] = 255 - data[i + 2];
    }
}

function oilPaintingCanvasFilter(img) {
    const ctx = oilPaintingCanvas.getContext('2d');
    oilPaintingCanvas.width = img.width;
    oilPaintingCanvas.height = img.height;
    
    ctx.drawImage(img, 0, 0);

    const imageData = ctx.getImageData(0, 0, oilPaintingCanvas.width, oilPaintingCanvas.height);
    const data = imageData.data;
    console.log(imageData);
    applyOilPaintingEffect(data, oilPaintingCanvas.width, oilPaintingCanvas.height);

    ctx.putImageData(imageData, 0, 0);
    oilPaintingCanvas.style.display = 'block';
    const downloadBtn = document.getElementById('downloadOilPainting');
    downloadBtn.href = oilPaintingCanvas.toDataURL("image/jpeg", 0.8);
    downloadBtn.classList.remove('hideButton');
}

function applyOilPaintingEffect(data, width, height) {
    const radius =4;
    const levels = 4;
    const intensityHistogram = new Array(levels).fill(0);
    const intensityColorSum = Array(levels).fill(0).map(() => ({r: 0, g: 0, b: 0, count: 0}));

    for (let y = 0; y < height; y++){
        for (let x = 0; x < width; x++) {
            intensityHistogram.fill(0);
            intensityColorSum.forEach(obj => {
                obj.r = obj.g = obj.b = obj.count = 0;
            });

            for (let j = -radius; j <= radius; j++) {
                for (let i = -radius; i <= radius; i++) {
                    const currentX = x + i;
                    const currentY = y + j;

                    if (currentX >= 0 && currentY >= 0 && currentX < width && currentY < height) {
                        const idx = (currentY * width + currentX) * 4;
                        const level = data[idx] * 0.299 + data[idx + 1] * 0.587 + data[idx + 2] * 0.114;
                        const bin = Math.min(Math.floor(level * (levels - 1) / 255), levels - 1);

                        intensityHistogram[bin]++;
                        intensityColorSum[bin].r += data[idx];
                        intensityColorSum[bin].g += data[idx + 1];
                        intensityColorSum[bin].b += data[idx + 2];
                        intensityColorSum[bin].count++;

                    }
                }
            }

            const maxBin = intensityHistogram.indexOf(Math.max(...intensityHistogram));
            const dominantColor = intensityColorSum[maxBin];
            const outputIdx = (y * width + x) * 4;
            data[outputIdx] = dominantColor.r / dominantColor.count;
            data[outputIdx + 1] = dominantColor.g / dominantColor.count;
            data[outputIdx + 2] = dominantColor.b / dominantColor.count;
        }
    }
}


