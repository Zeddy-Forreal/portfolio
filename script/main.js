const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});
let featured = ["Zawn-Academy-Portal", "wave-tech-ecommerce", "Kurogane-Protocol", "zanark-portfolio-website"]
let top_repos = ["weekly-goals-tracker", "prayer-times-app", "kairo-portfolio", "Ten-Portfolio"];
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, parseInt(delay));
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

revealEls.forEach(el => revealObserver.observe(el));


const sections = document.querySelectorAll('.service-card, .work-card, .about-inner, .contact-inner');
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '0';
      entry.target.style.transform = 'translateY(30px)';
      entry.target.style.transition = `opacity 0.7s ease ${i * 80}ms, transform 0.7s ease ${i * 80}ms`;
      requestAnimationFrame(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      });
      sectionObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

sections.forEach(el => {
  el.style.opacity = '0';
  sectionObserver.observe(el);
});


const counts = document.querySelectorAll('.count');
let countersStarted = false;

const startCounters = () => {
  if (countersStarted) return;
  countersStarted = true;
  counts.forEach(counter => {
    const target = parseInt(counter.dataset.target);
    const duration = 1800;
    const step = target / (duration / 16);
    let current = 0;

    const update = () => {
      current += step;
      if (current < target) {
        counter.textContent = Math.floor(current);
        requestAnimationFrame(update);
      } else {
        counter.textContent = target;
      }
    };
    update();
  });
};

// Start counters when hero is visible
const heroObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) startCounters();
  });
}, { threshold: 0.3 });
const heroSection = document.querySelector('.hero');
if (heroSection) heroObserver.observe(heroSection);


const form = document.querySelector('form');
const submitBtn = document.getElementById('submitBtn');
const formSuccess = document.getElementById('formSuccess');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('fname').value.trim();
  const email = document.getElementById('femail').value.trim();
  const message = document.getElementById('fmessage').value.trim();

  if (!name || !email || !message) {
    [fname, femail, fmessage].forEach(id => {
      const el = document.getElementById(id.id || id);
      if (el && !el.value.trim()) {
        el.style.borderColor = '#ff6b35';
        el.style.animation = 'shake 0.3s ease';

        setTimeout(() => {
          el.style.borderColor = '';
          el.style.animation = '';
        }, 600);
      }
    });
    return;
  }

  submitBtn.disabled = true;
  submitBtn.querySelector('.btn-text').textContent = 'Sending...';

  const response = await fetch(form.action, {
    method: 'POST',
    body: new FormData(form),
    headers: {
      Accept: 'application/json'
    }
  });

  if (response.ok) {
    submitBtn.style.display = 'none';
    formSuccess.classList.add('show');
    form.reset();
  } else {
    alert('Something went wrong. Try again.');
    submitBtn.disabled = false;
    submitBtn.querySelector('.btn-text').textContent = 'Send Message';
  }
});


window.addEventListener('mousemove', (e) => {
  const bgText = document.querySelector('.hero-bg-text');
  if (!bgText) return;
  const xFactor = (e.clientX / window.innerWidth - 0.5) * 20;
  bgText.style.transform = `translateY(-50%) translateX(${xFactor}px)`;
});



const style = document.createElement('style');
style.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    20%, 60% { transform: translateX(-6px); }
    40%, 80% { transform: translateX(6px); }
  }
`;
document.head.appendChild(style);


let workGrid = document.getElementById("work-grid")
function add_projects() {
    workGrid.innerHTML = "";
    
    fetch("https://api.github.com/users/Zeddy-Forreal/repos")
        .then(res => res.json())
        .then(repos => {
            for (const repo of repos) {
                if (repo.name != "Zeddy-Forreal" && repo.name != "portfolio") {
                  workGrid.innerHTML+=`
                  <div class="work-card ${featured.includes(repo.name)? 'fav':top_repos.includes(repo.name)? 'top':''}">
                    <div class="work-img" style="background-image: URL(https://raw.githubusercontent.com/Zeddy-Forreal/${repo.name}/refs/heads/main/preview.png)">
                     
                  
                    </div>
                    <div class="work-info">
                      <div class="con">
                      <span class="work-tag">${repo.topics.join(" · ")}</span>
                      <a href="${repo.homepage}" target="_blank"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-external-link">
	<path stroke="none" d="M0 0h24v24H0z" fill="none" />
	<path d="M12 6h-6a2 2 0 0 0 -2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-6" />
	<path d="M11 13l9 -9" />
	<path d="M15 4h5v5" />
</svg></a>
                      </div>
                      <h3>${repo.name.split("-").join(" ")} ${featured.includes(repo.name)?` - <span>★</span>`:featured.includes(repo.name)?` - <span>★★</span>`:""}</h3>
                      <p>${repo.description}</p>
                    </div>
                  </div>
                  `
                   console.log(repo)
                }
            }
        });
        document.querySelector(".work-card.fav").classList.add("full")
}
add_projects()
