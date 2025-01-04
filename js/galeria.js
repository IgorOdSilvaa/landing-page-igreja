// Container da galeria
const gallery = document.getElementById("gallery");

// Formulário do superadmin
const addImageForm = document.getElementById("addImageForm");
const imageUrlInput = document.getElementById("imageUrl");
const imageTitleInput = document.getElementById("imageTitle");

// Simulação de usuário superadmin
const isSuperAdmin = true; // Mude para `false` para simular um usuário comum
if (isSuperAdmin) {
  document.getElementById("adminPanel").style.display = "block";
}

// Recuperar imagens salvas no LocalStorage
document.addEventListener("DOMContentLoaded", () => {
  const savedImages = JSON.parse(localStorage.getItem("galleryImages")) || [];
  savedImages.forEach(({ url, title }) => addImageToGallery(url, title, false));
});

// Função para adicionar imagem na galeria e no LocalStorage
addImageForm.addEventListener("submit", (event) => {
  event.preventDefault();

  // Recuperar URL e título
  const imageUrl = imageUrlInput.value;
  const imageTitle = imageTitleInput.value;

  // Validar se o URL foi preenchido
  if (imageUrl) {
    addImageToGallery(imageUrl, imageTitle);

    // Salvar no LocalStorage
    const savedImages = JSON.parse(localStorage.getItem("galleryImages")) || [];
    savedImages.push({ url: imageUrl, title: imageTitle });
    localStorage.setItem("galleryImages", JSON.stringify(savedImages));

    // Limpar o formulário
    imageUrlInput.value = "";
    imageTitleInput.value = "";
  } else {
    alert("Por favor, insira uma URL válida.");
  }
});

// Função para adicionar a imagem na galeria
function addImageToGallery(url, title, appendToDOM = true) {
  const imgElement = document.createElement("div");
  imgElement.classList.add("gallery-item");
  imgElement.innerHTML = `
    <img src="${url}" alt="${title || "Imagem"}">
    ${title ? `<p>${title}</p>` : ""}
  `;

  // Adicionar na galeria
  if (appendToDOM) {
    gallery.appendChild(imgElement);
  }
}
