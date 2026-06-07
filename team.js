/* ==========================================================================
   AADC TEAM PAGE ENGINE (team.js) — with Admin Override Support
   ========================================================================== */

// Default team data (hardcoded baseline)
const DEFAULT_TEAM_DATA = {
  "samit-ray": {
    name: "Prof. (Dr.) Samit Ray", role: "Chancellor", org: "Adamas University",
    email: "chancellor@adamasuniversity.ac.in", category: "Leadership",
    bio: "Prof. (Dr.) Samit Ray is a visionary educationist and the Chancellor of Adamas University. Under his leadership, the university has established key collaborations, including this flagship centre with the Association of Indian Universities (AIU), to build outcome-driven faculty ecosystems and modern collegiate infrastructures.",
    skills: ["Institutional Governance", "Academic Leadership", "Strategic Planning", "NEP 2020 Implementation"]
  },
  "suranjan-das": {
    name: "Professor Suranjan Das", role: "Vice Chancellor", org: "Adamas University",
    email: "vc@adamasuniversity.ac.in", category: "Leadership",
    bio: "Professor Suranjan Das is a renowned historian and academic administrator. Formerly the Vice Chancellor of Jadavpur University and University of Calcutta, he brings decades of research excellence and administrative leadership to the AADC initiative.",
    skills: ["Historical Research", "Educational Policy", "Academic Governance", "International Collaborations"]
  },
  "radha-tamal-goswami": {
    name: "Prof. (Dr.) Radha Tamal Goswami", role: "Pro-Vice Chancellor", org: "Adamas University",
    email: "provc@adamasuniversity.ac.in", category: "Leadership",
    bio: "Prof. (Dr.) Radha Tamal Goswami serves as the Pro-Vice Chancellor of Adamas University. He actively guides curriculum restructuring, outcome tracking, and professional development programs conducted at AADC.",
    skills: ["Computational Engineering", "Curriculum Design", "Quality Assurance", "Institutional Planning"]
  },
  "biswajit-ghosh": {
    name: "Prof. Biswajit Ghosh", role: "Professor & HoD, Dept. of Sociology & Associate Dean-SOLACS", org: "Adamas University",
    email: "biswajit.ghosh1@adamasuniversity.ac.in", category: "Academic Expert",
    bio: "Prof. Biswajit Ghosh heads the Sociology Department and serves as the Associate Dean of SOLACS at Adamas University. He guides multidisciplinary research and curriculum inclusion policies at AADC.",
    skills: ["Sociology of Education", "Multidisciplinary Studies", "Qualitative Methods", "Inclusive Curriculum"]
  },
  "ajitava-raychaudhuri": {
    name: "Prof. (Dr.) Ajitava Raychaudhuri", role: "Dean of SoLAS & HoD, Dept. of Economics", org: "Adamas University",
    email: "ajitava.raychaudhuri@adamasuniversity.ac.in", category: "Academic Expert",
    bio: "Prof. (Dr.) Ajitava Raychaudhuri is the Dean of the School of Liberal Arts and Social Sciences at Adamas University. A noted economist, he contributes significantly to AADC in designing multidisciplinary curriculum options under NEP 2020.",
    skills: ["Development Economics", "Liberal Arts Pedagogy", "NEP 2020 Guidelines", "Macroeconomics"]
  },
  "rudra-prasad-saha": {
    name: "Prof. (Dr.) Rudra Prasad Saha", role: "Dean Academics, Dean of SoLB", org: "Adamas University",
    email: "dean.academics@adamasuniversity.ac.in", category: "Academic Expert",
    bio: "Prof. (Dr.) Rudra Prasad Saha oversees academic quality as the Dean Academics of Adamas University. He guides outcomes-based course plans, credit transfers, and faculty assessment metrics within AADC.",
    skills: ["Molecular Biology", "Outcomes-Based Education", "Credit Systems", "Syllabus Design"]
  },
  "moumita-mukherjee": {
    name: "Prof. (Dr.) Moumita Mukherjee", role: "Dean of Research & Development", org: "Adamas University",
    email: "moumita.mukherjee@adamasuniversity.ac.in", category: "Academic Expert",
    bio: "Prof. (Dr.) Moumita Mukherjee directs the research division at Adamas University. She serves as a core facilitator for AADC research methodology workshops, guiding investigators in grant proposals and high-impact publications.",
    skills: ["Semiconductor Devices", "Research Funding", "Patent Drafting", "Research Mentorship"]
  },
  "saptarshi-chatterjee": {
    name: "Dr. Saptarshi Chatterjee", role: "Associate Professor & Associate Director – Planning & Monitoring", org: "Adamas University",
    email: "saptarshi.chatterjee@adamasuniversity.ac.in", category: "Academic Expert",
    bio: "Dr. Saptarshi Chatterjee is an Associate Professor of Biotechnology and serves as the Associate Director of Planning & Monitoring at Adamas University. He handles outcome tracking and coordination for AADC events.",
    skills: ["Biotechnology", "Planning & Monitoring", "Academic Coordination", "Analytics"]
  }
};

// ── Merge localStorage admin overrides ──────────────────────────────────────
function loadTeamData() {
  const data = JSON.parse(JSON.stringify(DEFAULT_TEAM_DATA)); // deep clone
  try {
    const textOverrides = JSON.parse(localStorage.getItem('aadc_team_overrides') || '{}');
    Object.keys(textOverrides).forEach(id => {
      if (data[id]) Object.assign(data[id], textOverrides[id]);
      else data[id] = textOverrides[id]; // new member added by admin
    });
  } catch(e) { console.warn('Override parse error:', e); }
  return data;
}

/*function getPhotoSrc(memberId, fallback) {
  try {
    const photos = JSON.parse(localStorage.getItem('aadc_team_photos') || '{}');
    if (photos[memberId]) return photos[memberId]; // base64 override
  } catch(e) {}
  return `assets/team/${memberId}.jpg`;
}*/

function getPhotoSrc(memberId) {

  const photoMap = {

    // Leadership
    "samit-ray": "assets/team_new_photos/Samit-Ray-Image.jpg",
    "suranjan-das": "assets/team_new_photos/Suranjan-Das-Image.jpg",
    "radha-tamal-goswami": "assets/team_new_photos/Radha-Tamal-Goswami.jpg",

    // Academic Experts
    "kallol-paul": "assets/team_new_photos/Kallol-Paul.jpg",
    "sivaji-chakravorti": "assets/team_new_photos/sivaji-chakravorti.jpg",
    "abhijit-chanda": "assets/team_new_photos/Abhijit-Chanda-2.jpg",
    "amitava-datta": "assets/team_new_photos/Amitava-Dutta-new.jpg",
    "rajat-acharyya": "assets/team_new_photos/rajat-acharyya.jpg",
    "biswajit-ghosh": "assets/team_new_photos/biswajit-ghosh.jpg",
    "pulok-kumar-mukherjee": "assets/team_new_photos/pulok-kumar-mukherjee.jpg",
    "asis-majumdar": "assets/team_new_photos/asis-majumdar.jpg",
    "amiya-kumar-panda": "assets/team_new_photos/Amiya-Kumar-Panda-2.jpg",
    "sanjukta-mondal-parui": "assets/team_new_photos/sanjukta-mondal-parui.jpg",
    "ashish-pundhir": "assets/team_new_photos/Ashish-Pundhir-2.jpg",
    "ajitava-raychaudhuri": "assets/team_new_photos/Ajitava-Raychaudhuri.jpg",
    "rudra-prasad-saha": "assets/team_new_photos/Rudra-Prasad-Saha-2.jpg",
    "moumita-mukherjee": "assets/team_new_photos/Moumita-Mukherjee.jpg",
    "saptarshi-chatterjee": "assets/team_new_photos/Saptarshi-Chatterjee.jpg",
    "chiranjib-bhattacharya": "assets/team_new_photos/chiranjib-bhattacharya.jpg",

    // Industry Leaders
    "kanchan-mallick": "assets/team_new_photos/Kanchan-Mallick-2.jpg",
    "debanjan-chakrabarti": "assets/team_new_photos/Debanjan-Chakrabarti-2.jpg",
    "sudeshna-mukhopadhyay": "assets/team_new_photos/Sudeshna-Mukhopadhyay-2.jpg",

    // Administrators
    "debasish-pal": "assets/team_new_photos/Debasish-Pal.jpg",
    "debajyoti-konar": "assets/team_new_photos/Debajyoti-Konar.jpg"

  };

  if (photoMap[memberId]) {
    return photoMap[memberId];
  }

  return "assets/team_1.jpg";
}

// ── Apply photo overrides to all <img> tags on page ─────────────────────────
function applyPhotoOverrides() {
  try {
    const photos = JSON.parse(localStorage.getItem('aadc_team_photos') || '{}');
    Object.keys(photos).forEach(id => {
      document.querySelectorAll(`img[data-member-id="${id}"]`).forEach(img => {
        img.src = photos[id];
      });
    });
  } catch(e) {}
}

function categoryToSlug(category) {
  const normalized = (category || '').toLowerCase();
  if (normalized.includes('leadership')) return 'leadership';
  if (normalized.includes('industry')) return 'industry';
  if (normalized.includes('administrator')) return 'admin';
  return 'academic';
}

function categoryLabel(category) {
  return category || 'Academic Expert';
}

function renderSkillTags(container, skills) {
  if (!container) return;
  container.innerHTML = '';
  (skills || []).slice(0, 3).forEach(skill => {
    const tag = document.createElement('span');
    tag.className = 'skill-tag';
    tag.textContent = skill;
    container.appendChild(tag);
  });
}

function updateDirectoryCard(wrapper, id, data) {
  const category = categoryToSlug(data.category);
  wrapper.setAttribute('data-category', category);
  wrapper.setAttribute('data-name', (data.name || '').toLowerCase());
  wrapper.setAttribute('data-role', (data.role || '').toLowerCase());
  wrapper.setAttribute('data-org', (data.org || '').toLowerCase());

  const img = wrapper.querySelector('img');
  if (img) {
    img.src = getPhotoSrc(id);
    //img.src = getPhotoSrc(id);
    img.alt = data.name || 'Team member';
    img.setAttribute('data-member-id', id);
    img.onerror = () => { img.src = 'assets/team_1.jpg'; };
  }

  const badge = wrapper.querySelector('.team-card-badge');
  if (badge) {
    badge.className = `team-card-badge ${category}`;
    badge.textContent = categoryLabel(data.category);
  }

  const name = wrapper.querySelector('.team-card-info h3');
  const role = wrapper.querySelector('.team-card-info .role');
  const org = wrapper.querySelector('.team-card-info .org');
  if (name) name.textContent = data.name || '';
  if (role) role.textContent = data.role || '';
  if (org) org.textContent = data.org || '';
}

function createDirectoryCard(id, data) {
  const wrapper = document.createElement('div');
  wrapper.className = 'team-card-wrap';
  wrapper.innerHTML = `
    <div class="team-card glass-card fade-up">
      <div class="team-img-wrap">
        <img src="" alt="">
      </div>
      <div class="team-card-info">
        <span class="team-card-badge"></span>
        <h3></h3>
        <p class="role"></p>
        <p class="org"></p>
        <button class="btn btn-secondary open-profile-btn" data-member-id="${id}">View Profile</button>
      </div>
    </div>`;
  updateDirectoryCard(wrapper, id, data);
  return wrapper;
}

function renderTeamContent(teamData) {
  const directory = document.getElementById('directory-grid');
  const seenIds = new Set();

  document.querySelectorAll('.team-card-wrap').forEach(wrapper => {
    const id = wrapper.querySelector('.open-profile-btn[data-member-id]')?.getAttribute('data-member-id');
    if (!id || !teamData[id]) return;
    seenIds.add(id);
    updateDirectoryCard(wrapper, id, teamData[id]);
  });

  if (directory) {
    Object.keys(teamData).forEach(id => {
      if (!seenIds.has(id)) directory.appendChild(createDirectoryCard(id, teamData[id]));
    });
  }

  document.querySelectorAll('.spotlight-card[data-member-id]').forEach(card => {
    const id = card.getAttribute('data-member-id');
    const data = teamData[id];
    if (!data) return;

    const img = card.querySelector('img');
    if (img) {
      img.src = getPhotoSrc(id);
      //img.src = getPhotoSrc(id);
      img.alt = data.name || 'Team member';
      img.setAttribute('data-member-id', id);
      img.onerror = () => { img.src = 'assets/team_1.jpg'; };
    }

    const title = card.querySelector('.spotlight-info h3');
    const role = card.querySelector('.spotlight-role');
    const desc = card.querySelector('.spotlight-desc');
    const badge = card.querySelector('.spotlight-category');
    if (title) title.textContent = data.name || '';
    if (role) role.textContent = [data.role, data.org].filter(Boolean).join(', ');
    if (desc) desc.textContent = data.bio || '';
    if (badge) badge.textContent = categoryLabel(data.category);
    renderSkillTags(card.querySelector('.spotlight-skills'), data.skills);
  });
}

// ============================================================
// PAGE BOOTSTRAP
// ============================================================
document.addEventListener('DOMContentLoaded', () => {

  // Tag every team image with its member ID for override injection
  document.querySelectorAll('.open-profile-btn[data-member-id]').forEach(btn => {
    const id = btn.getAttribute('data-member-id');
    const card = btn.closest('.team-card, .spotlight-card');
    if (card) {
      const img = card.querySelector('img');
      if (img) img.setAttribute('data-member-id', id);
    }
  });

  // 1. PAGE LOADER
  const loader = document.getElementById('loader');
  if (loader) {
    setTimeout(() => { loader.style.opacity = '0'; setTimeout(() => loader.remove(), 500); }, 600);
  }

  // 2. HAMBURGER MENU
  const hamburger = document.getElementById('hamburger-btn');
  const navMenu   = document.getElementById('navbar-links');
  const navbar    = document.getElementById('main-navbar');
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
    document.addEventListener('click', e => {
      if (!navbar.contains(e.target) && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      }
    });
  }

  // 3. STICKY NAVBAR
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });

  // 4. SCROLL REVEAL
  const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.fade-up').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(25px)';
    el.style.transition = 'opacity 0.6s cubic-bezier(0.4,0,0.2,1), transform 0.6s cubic-bezier(0.4,0,0.2,1)';
    revealObserver.observe(el);
  });

  // 5. COUNTER ANIMATION
  const countObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.getAttribute('data-target'), 10);
      const suffix = el.getAttribute('data-suffix') || '';
      let current = 0;
      const step = Math.max(Math.floor(target / 80), 1);
      const tick = () => {
        current = Math.min(current + step, target);
        el.innerText = current + suffix;
        if (current < target) requestAnimationFrame(tick);
      };
      tick();
      obs.unobserve(el);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.counter').forEach(el => countObserver.observe(el));

  // 6. APPLY PHOTO OVERRIDES
  applyPhotoOverrides();

  // ── TEAM DATA (with admin overrides merged) ─────────────────────────────
  const teamData = loadTeamData();
  renderTeamContent(teamData);
  applyPhotoOverrides();

  // ── PROFILE MODAL ────────────────────────────────────────────────────────
  const modal         = document.getElementById('profile-modal');
  const modalBackdrop = document.getElementById('modal-backdrop');
  const modalClose    = document.getElementById('modal-close');

  const openProfile = (id) => {
    const data = teamData[id];
    if (!data || !modal) return;

    // Populate modal fields
    const photoSrc = getPhotoSrc(id);
    const img = document.getElementById('modal-img');
    img.src = photoSrc;
    img.onerror = () => { img.src = 'assets/team_1.jpg'; };

    document.getElementById('modal-name').textContent     = data.name;
    document.getElementById('modal-role').textContent     = data.role;
    document.getElementById('modal-org').textContent      = data.org;
    document.getElementById('modal-category').textContent = data.category;
    document.getElementById('modal-email').textContent    = data.email;
    //document.getElementById('modal-email-link').href      = `mailto:${data.email}`;
    const emailLink = document.getElementById('modal-email-link');
    emailLink.href = `https://mail.google.com/mail/?view=cm&fs=1&to=${data.email}`;
    emailLink.target = "_blank";
    document.getElementById('modal-bio').textContent      = data.bio;

    const skillsEl = document.getElementById('modal-skills');
    skillsEl.innerHTML = '';
    (data.skills || []).forEach(s => {
      const tag = document.createElement('span');
      tag.className = 'skill-tag';
      tag.textContent = s;
      skillsEl.appendChild(tag);
    });

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeProfile = () => {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  document.querySelectorAll('.open-profile-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      openProfile(btn.getAttribute('data-member-id'));
    });
  });

  if (modalClose)    modalClose.addEventListener('click', closeProfile);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeProfile);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.classList.contains('active')) closeProfile();
  });

  // ── SEARCH & FILTER ───────────────────────────────────────────────────────
  const searchInput = document.getElementById('search-input');
  const filterBtns  = document.querySelectorAll('.filter-btn');
  const teamWrappers = document.querySelectorAll('.team-card-wrap');

  let activeFilter = 'all';
  let searchQuery  = '';

  const applyFilters = () => {
    teamWrappers.forEach(wrap => {
      const cat  = wrap.getAttribute('data-category');
      const name = (wrap.getAttribute('data-name') || '').toLowerCase();
      const role = (wrap.getAttribute('data-role') || '').toLowerCase();
      const org  = (wrap.getAttribute('data-org')  || '').toLowerCase();

      const matchCat    = activeFilter === 'all' || cat === activeFilter;
      const matchSearch = !searchQuery || name.includes(searchQuery) || role.includes(searchQuery) || org.includes(searchQuery);

      if (matchCat && matchSearch) {
        wrap.style.display = 'block';
        requestAnimationFrame(() => wrap.classList.remove('fade-out'));
      } else {
        wrap.classList.add('fade-out');
        setTimeout(() => { if (wrap.classList.contains('fade-out')) wrap.style.display = 'none'; }, 400);
      }
    });
  };

  if (searchInput) {
    searchInput.addEventListener('input', e => {
      searchQuery = e.target.value.toLowerCase().trim();
      applyFilters();
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.getAttribute('data-filter');
      applyFilters();
    });
  });

});
