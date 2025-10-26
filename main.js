// -------------------- SCROLL RESET --------------------

// Empêche le navigateur de restaurer la position précédente
window.history.scrollRestoration = "manual";

// Replace tout en haut au rechargement
window.addEventListener('beforeunload', () => {
  window.scrollTo(0, 0);
});


// -------------------- MODAL --------------------

const body     = document.querySelector('body'); 
const pic      = document.querySelector('.picOfMe');
const modal    = document.querySelector('.welcome');
const btnYes   = document.getElementById('yes');
const btnNo    = document.getElementById('no');
const btnOk    = document.getElementById('ok');
const text     = document.getElementById('text');
const question = document.getElementById('question');
const title    = document.getElementById('title');

// 👉 fonction pour ouvrir la modal + bloquer scroll
function openModal() {
  modal.style.display = 'flex';
  body.classList.add('no-scroll');
}

// 👉 fonction pour fermer la modal + réactiver scroll + lancer l’animation
function closeModal() {
  modal.style.display = 'none';
  body.classList.remove('no-scroll');

  // Lance l’effet d’écriture une fois la modal fermée
  setTimeout(() => {
    startTypewriter();
  }, 100); // petit délai pour laisser respirer la transition
}

btnYes.addEventListener('click', (e) => {
  e.preventDefault();
  closeModal(); 
});

btnNo.addEventListener('click', (e) => {
  e.preventDefault();
  title.style.display = 'none';
  question.style.display = 'none';
  text.textContent = 'Est-ce que vous en êtes sûr ?';
  btnYes.style.display = 'none';
  btnNo.style.display = 'none';
  btnOk.style.display = 'block';

  pic.classList.add('fade-out');
  setTimeout(() => {
    pic.src = './images/chat.jpg';
    pic.alt = 'Image alternative d\' un chat triste après clic sur Non';
    pic.classList.remove('fade-out');
  }, 200);
});

btnOk.addEventListener('click', (e) => {
  e.preventDefault();
  closeModal(); 
});

window.addEventListener('load', openModal);


// -------------------- MAGIC TEXT --------------------

function startTypewriter() {
  const aboutText = document.querySelector(".aboutText");
  const paragraphs = aboutText.querySelectorAll("p");
  
  // Sauvegarde les textes et vide la zone (y compris le curseur existant)
  const texts = Array.from(paragraphs).map(p => p.textContent.trim());
  aboutText.innerHTML = "";

  let pIndex = 0;
  let charIndex = 0;

  function typeWriter() {
    if (pIndex < texts.length) {
      if (!aboutText.children[pIndex]) {
        aboutText.appendChild(document.createElement("p"));
      }
      let currentP = aboutText.children[pIndex];
      let fullText = texts[pIndex];

      if (charIndex < fullText.length) {
        currentP.textContent += fullText.charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, 40); // vitesse par caractère
      } else {
        pIndex++;
        charIndex = 0;
        setTimeout(typeWriter, 400); // pause avant le paragraphe suivant
      }
    } else {
      // Curseur clignotant à la fin
      const lastP = aboutText.lastElementChild;
      const cursor = document.createElement("span");
      cursor.classList.add("cursor");
      lastP.appendChild(cursor);
    }
  }

  typeWriter();
}


// -------------------- NAV PARCOURS --------------------

const linkExp   = document.getElementById('linkExp');
const linkStudy = document.getElementById('linkStudy');
const divExp    = document.getElementById('textExp');
const divStudy  = document.getElementById('textStudy');

function showSection(section) {
  if (section === 'exp') {
    divExp.style.display = 'block';
    divStudy.style.display = 'none';
    linkExp.classList.add('active');
    linkStudy.classList.remove('active');
  } else if (section === 'study') {
    divExp.style.display = 'none';
    divStudy.style.display = 'block';
    linkExp.classList.remove('active');
    linkStudy.classList.add('active');
  }
}

linkExp.addEventListener('click', (e) => {
  e.preventDefault();
  showSection('exp');
});

linkStudy.addEventListener('click', (e) => {
  e.preventDefault();
  showSection('study');
});

showSection('exp');


// -------------------- NAV COMPÉTENCES --------------------

const linkFront = document.getElementById('linkFront');
const linkBack  = document.getElementById('linkBack');
const linkOther = document.getElementById('linkOther');

const divFront  = document.querySelector('#skill .front');
const divBack   = document.querySelector('#skill .back');
const divOther  = document.querySelector('#skill .other');

function showSectionSkill(section) {
  if (section === 'front') {
    divFront.style.display = 'block';
    divBack.style.display = 'none';
    divOther.style.display = 'none';
    linkFront.classList.add('active');
    linkBack.classList.remove('active');
    linkOther.classList.remove('active');
  } else if (section === 'back') {
    divFront.style.display = 'none';
    divBack.style.display = 'block';
    divOther.style.display = 'none';
    linkFront.classList.remove('active');
    linkBack.classList.add('active');
    linkOther.classList.remove('active');
  } else if (section === 'other') {
    divFront.style.display = 'none';
    divBack.style.display = 'none';
    divOther.style.display = 'block';
    linkFront.classList.remove('active');
    linkBack.classList.remove('active');
    linkOther.classList.add('active');
  }
}

linkFront.addEventListener('click', (e) => {
  e.preventDefault();
  showSectionSkill('front');
});

linkBack.addEventListener('click', (e) => {
  e.preventDefault();
  showSectionSkill('back');
});

linkOther.addEventListener('click', (e) => {
  e.preventDefault();
  showSectionSkill('other');
});

// affiché par défaut
showSectionSkill('front');
