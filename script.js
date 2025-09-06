const { jsPDF } = window.jspdf;
const filesEl = document.getElementById('files');
document.getElementById('gen').addEventListener('click', async () => {
    const files = filesEl.files;
    if (!files.length) return alert('Choose images first');
    const doc = new jsPDF('p', 'mm', 'a4');
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const dataUrl = await new Promise((res, rej) => {
            const r = new FileReader();
            r.onload = () => res(r.result);
            r.onerror = rej;
            r.readAsDataURL(file);
        });
        if (i > 0) doc.addPage();
        // Fit image to page width (keeping aspect). 190mm width here with 10mm margin.
        doc.addImage(dataUrl, 'JPEG', 10, 10, 190, 0);
    }
    doc.save('images.pdf');
});

const nav_logo = document.getElementById("logo");
nav_logo.addEventListener("click", ()=> {
    window.location = "index.html";

});
