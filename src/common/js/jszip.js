import JSZip from 'jszip';
import FileSaver from 'file-saver';

export default function toZip(imgSrcList, fileName) {
    let zip = new JSZip();
    let imgFolder = zip.folder(fileName);
    for(let i = 0; i < imgSrcList.length; i++) {
        let src = imgSrcList[i];
        let tempImage = new Image();
        tempImage.src = src;
        tempImage.crossOrigin = '*';
        tempImage.onload = () => {
            imgFolder.file((i + 1) + '.jpg', getBase64Image(tempImage).substring(22), { base64: true });
        };
    }
    setTimeout(() => {
        zip.generateAsync({ type: 'blob' }).then(function(content) {
            FileSaver.saveAs(content, 'images.zip');
        });
    }, 3000);
}

function getBase64Image(img) {
    let canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    let ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, img.width, img.height);
    let ext = img.src.substring(img.src.lastIndexOf('.') + 1).toLowerCase();
    let dataURL = canvas.toDataURL('image/' + ext);
    return dataURL;
}
