/* ==========================================================================
   AADC ADMIN PANEL LOGIC (admin.js)
   ========================================================================== */

// â”€â”€ Constants â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const DEFAULT_PASSWORD = 'aadc@2025';
const LS_PASSWORD      = 'aadc_admin_pwd';
const LS_OVERRIDES     = 'aadc_team_overrides';
const LS_PHOTOS        = 'aadc_team_photos';

// â”€â”€ Baseline team data (mirrors team.js DEFAULT_TEAM_DATA) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const DEFAULT_MEMBERS = {
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
  "kallol-paul": {
    name: "Prof. (Dr.) Kallol Paul", role: "Vice-Chancellor", org: "University of Kalyani & Sadhu Ramchand Murmu University of Jhargram",
    email: "kalloldada@gmail.com", category: "Academic Expert",
    bio: "Prof. (Dr.) Kallol Paul serves as the Vice-Chancellor of University of Kalyani. A leading academician in Mathematics, he contributes to AADC by designing advanced research methodology workshops and capacity building seminars.",
    skills: ["Functional Analysis", "Academic Governance", "Research Ethics", "Capacity Building"]
  },
  "sivaji-chakravorti": {
    name: "Prof. (Dr.) Sivaji Chakravorti", role: "Professor, Dept. of Electrical Engineering", org: "Jadavpur University (Former Director, NIT Calicut)",
    email: "s.chakravorti@gmail.com", category: "Academic Expert",
    bio: "Prof. (Dr.) Sivaji Chakravorti is a distinguished professor of Electrical Engineering at Jadavpur University and former Director of NIT Calicut. He brings valuable insights on institutional development and technical education excellence.",
    skills: ["High Voltage Engineering", "Technical Pedagogy", "Institutional Leadership", "Accreditation Frameworks"]
  },
  "abhijit-chanda": {
    name: "Prof. Abhijit Chanda", role: "Director-IQAC & Professor, Dept. of Mechanical Engineering", org: "Jadavpur University",
    email: "abhijitchanda.biomed@gmail.com", category: "Academic Expert",
    bio: "Prof. Abhijit Chanda leads quality initiatives as the IQAC Director at Jadavpur University. At AADC, he focuses on training faculty on outcomes-based learning design and internal quality assurance parameters.",
    skills: ["Quality Control in Education", "Biomaterials", "IQAC Guidelines", "Outcome-Based Education"]
  },
  "amitava-datta": {
    name: "Prof. Amitava Datta", role: "Pro-Vice Chancellor", org: "Jadavpur University",
    email: "amitava.datta@jadavpuruniversity.in", category: "Academic Expert",
    bio: "Prof. Amitava Datta is the Pro-Vice Chancellor of Jadavpur University. He supports AADC's mission to bridge the gap between traditional research and modern educational technologies.",
    skills: ["Thermal Power Engineering", "Educational Technology", "Academic Administration", "Blended Learning"]
  },
  "rajat-acharyya": {
    name: "Dr. Rajat Acharyya", role: "Director (Additional Charge), UGC-HRDC & Professor, Dept. of Economics", org: "Jadavpur University",
    email: "rajat.acharyya@gmail.com", category: "Academic Expert",
    bio: "Dr. Rajat Acharyya is a renowned Professor of Economics and Director (Additional Charge) of UGC-Human Resource Development Centre at Jadavpur University. He contributes expertise in designing faculty grooming frameworks.",
    skills: ["International Economics", "Economics Pedagogy", "Human Resource Development", "Policy Design"]
  },
  "biswajit-ghosh": {
    name: "Prof. Biswajit Ghosh", role: "Professor & HoD, Dept. of Sociology & Associate Dean-SOLACS", org: "Adamas University",
    email: "biswajit.ghosh1@adamasuniversity.ac.in", category: "Academic Expert",
    bio: "Prof. Biswajit Ghosh heads the Sociology Department and serves as the Associate Dean of SOLACS at Adamas University. He guides multidisciplinary research and curriculum inclusion policies at AADC.",
    skills: ["Sociology of Education", "Multidisciplinary Studies", "Qualitative Methods", "Inclusive Curriculum"]
  },
  "pulok-kumar-mukherjee": {
    name: "Prof. Pulok Kumar Mukherjee", role: "Professor, Dept. of Pharmaceutical Technology, School of Natural Product Studies", org: "Jadavpur University",
    email: "pulokm@gmail.com", category: "Academic Expert",
    bio: "Prof. Pulok Kumar Mukherjee is a leading researcher in natural products chemistry. He acts as a mentor at AADC for capacity building in Indian Knowledge Systems and research commercialization.",
    skills: ["Ethnopharmacology", "IKS Integration", "Research Commercialization", "IP Rights & Patents"]
  },
  "asis-majumdar": {
    name: "Prof. Asis Majumdar", role: "Director & Prof., School of Water Resources Engineering, Director-IIPC", org: "Jadavpur University",
    email: "asism.ju@gmail.com", category: "Academic Expert",
    bio: "Prof. Asis Majumdar is a senior expert in water resources and Director of IIPC at Jadavpur University. He guides the implementation of collaborative research frameworks and university-industry linkages at AADC.",
    skills: ["Water Resources", "Industry-Academia Collaboration", "Project Management", "Sustainable Dev"]
  },
  "kanchan-mallick": {
    name: "Mr. Kanchan Mallick", role: "Regional Head Ã¢â‚¬â€œ Trend Micro India Pvt Ltd (East India, Bangladesh & Bhutan)", org: "Trend Micro India Pvt Ltd",
    email: "kanchan_m@trendmicro.com", category: "Industry Leader",
    bio: "Mr. Kanchan Mallick is a prominent technology industry leader, serving as Regional Head for Trend Micro in East India, Bangladesh, and Bhutan. He facilitates AADC workshops on cyber security education and digital asset safety.",
    skills: ["Cyber Security", "IT Infrastructure", "Industry-Academia Bridging", "Asset Protection"]
  },
  "debasish-pal": {
    name: "Mr. Debasish Pal", role: "Finance Officer", org: "Tripura University",
    email: "debasishpal@tripurauniv.ac.in", category: "Administrator",
    bio: "Mr. Debasish Pal is the Finance Officer at Tripura University. He coordinates AADC sessions focused on financial governance, public accounts management, and administrative efficiency.",
    skills: ["Financial Governance", "Procurement & Audit", "Public Accounts", "Budgetary Controls"]
  },
  "debajyoti-konar": {
    name: "Dr. Debajyoti Konar", role: "Registrar", org: "Presidency University",
    email: "registrar@presiuniv.ac.in", category: "Administrator",
    bio: "Dr. Debajyoti Konar is the Registrar of Presidency University. He shares his vast expertise in university governance, academic laws, administrative compliance, and university admissions management.",
    skills: ["University Administration", "Academic Laws", "Compliance", "Crisis Management"]
  },
  "amiya-kumar-panda": {
    name: "Prof. Amiya Kumar Panda", role: "Vice Chancellor", org: "Rani Rashmoni Green University",
    email: "vcrrgu@gmail.com", category: "Academic Expert",
    bio: "Prof. Amiya Kumar Panda is the Vice Chancellor of Rani Rashmoni Green University. A pioneer in chemical sciences, he leads environmental and scientific sustainability workshops for academic administrators.",
    skills: ["Colloidal Chemistry", "Scientific Sustainability", "University Governance", "Biotechnology"]
  },
  "sanjukta-mondal-parui": {
    name: "Dr. Sanjukta Mondal Parui", role: "Associate Professor, Dept. of Zoology & Director-IQAC", org: "Lady Brabourne College",
    email: "sanj.kitparu@gmail.com", category: "Academic Expert",
    bio: "Dr. Sanjukta Mondal Parui is the IQAC Director and an Associate Professor of Zoology at Lady Brabourne College. She facilitates AADC sessions on student-centric pedagogy and quality benchmarks in collegiate education.",
    skills: ["Collegiate Quality Control", "Zoology", "Student Mentorship", "IQAC Management"]
  },
  "ashish-pundhir": {
    name: "Dr. Ashish Pundhir", role: "MD (Community Medicine), Diploma in Community & Mental Health (NIMHANS), Dept. of Community Medicine & Family Medicine", org: "AIIMS, Kalyani",
    email: "ashish.cmfm@aiimskalyani.edu.in", category: "Academic Expert",
    bio: "Dr. Ashish Pundhir is an MD in Community Medicine and holds a Diploma in Community & Mental Health from NIMHANS. He designs programs for healthcare educators and research ethics training.",
    skills: ["Community Medicine", "Mental Health Education", "Public Health Policy", "Research Ethics"]
  },
  "debanjan-chakrabarti": {
    name: "Mr. Debanjan Chakrabarti", role: "Director, East and Northeast India", org: "British Council",
    email: "debanjan.chakrabarti@britishcouncil.org", category: "Industry Leader",
    bio: "Mr. Debanjan Chakrabarti directs British Council initiatives in East and Northeast India. He works with AADC to foster international partnerships, language teaching frameworks, and global academic collaboration.",
    skills: ["International Education", "Language Pedagogy", "Cultural Relations", "Partnership Ecosystems"]
  },
  "sudeshna-mukhopadhyay": {
    name: "Ms. Sudeshna Mukhopadhyay", role: "Vice President", org: "Havells India Ltd.",
    email: "sudeshna.mukhopadhyay@outlook.com", category: "Industry Leader",
    bio: "Ms. Sudeshna Mukhopadhyay is an executive leader with Havells India. She provides expert sessions for AADC on corporate social responsibility, leadership management, and designing university courses aligned to industry expectations.",
    skills: ["Corporate Management", "Leadership Coaching", "Industry-Academia Linkage", "Brand Strategy"]
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
    name: "Dr. Saptarshi Chatterjee", role: "Associate Professor & Associate Director Ã¢â‚¬â€œ Planning & Monitoring", org: "Adamas University",
    email: "saptarshi.chatterjee@adamasuniversity.ac.in", category: "Academic Expert",
    bio: "Dr. Saptarshi Chatterjee is an Associate Professor of Biotechnology and serves as the Associate Director of Planning & Monitoring at Adamas University. He handles outcome tracking and coordination for AADC events.",
    skills: ["Biotechnology", "Planning & Monitoring", "Academic Coordination", "Analytics"]
  },
  "chiranjib-bhattacharya": {
    name: "Dr. Chiranjib Bhattacharya", role: "President", org: "West Bengal Council of Higher Secondary Education (WBCHSE)",
    email: "president@wbchse.org", category: "Academic Expert",
    bio: "Dr. Chiranjib Bhattacharya is the President of WBCHSE. He brings invaluable input on secondary and higher education transitions, curriculum alignment, and policy integration to support AADC higher education initiatives.",
    skills: ["Secondary Education Alignment", "Educational Policy", "Council Governance", "Quality Benchmarks"]
  }
}

// â”€â”€ Helpers â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const $  = id => document.getElementById(id);
const ls = {
  get: key           => { try { return JSON.parse(localStorage.getItem(key) || 'null'); } catch(e){ return null; } },
  set: (key, val)    => localStorage.setItem(key, JSON.stringify(val)),
  del: key           => localStorage.removeItem(key)
};

function getPassword()  { return ls.get(LS_PASSWORD) || DEFAULT_PASSWORD; }
function getOverrides() { return ls.get(LS_OVERRIDES) || {}; }
function getPhotos()    { return ls.get(LS_PHOTOS)    || {}; }

// Merge default + overrides for display
function getMergedMembers() {
  const overrides = getOverrides();
  const result = {};
  Object.keys(DEFAULT_MEMBERS).forEach(id => {
    result[id] = Object.assign({}, DEFAULT_MEMBERS[id], overrides[id] || {});
  });
  // Include any extra members added by admin
  Object.keys(overrides).forEach(id => {
    if (!result[id]) result[id] = { ...overrides[id] };
  });
  return result;
}

// â”€â”€ Auth â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function checkLogin() {
  if (sessionStorage.getItem('aadc_logged_in') === '1') showDashboard();
}

function attemptLogin() {
  const pwd = $('admin-password').value;
  if (pwd === getPassword()) {
    sessionStorage.setItem('aadc_logged_in', '1');
    showDashboard();
  } else {
    $('login-error').classList.add('show');
    $('admin-password').value = '';
    $('admin-password').focus();
  }
}

function logout() {
  sessionStorage.removeItem('aadc_logged_in');
  location.reload();
}

function showDashboard() {
  $('login-screen').style.display = 'none';
  $('admin-shell').style.display  = 'grid';
  renderMembersGrid();
  updateStats();
  updateDataPreview();
}

// â”€â”€ Navigation â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
let currentView = 'members';

function switchView(view) {
  ['members','export','settings'].forEach(v => {
    $(`view-${v}`).style.display = v === view ? 'block' : 'none';
  });
  document.querySelectorAll('.sidebar-link').forEach(l => {
    l.classList.toggle('active', l.getAttribute('data-view') === view);
  });
  const titles = { members:'Team Members', export:'Export / Import', settings:'Settings' };
  const subs   = { members:'Edit photos, bios, roles, and skills for each team member.',
                   export: 'Download, upload or reset your team data overrides.',
                   settings:'Change admin panel password.' };
  $('view-title').textContent    = titles[view];
  $('view-subtitle').textContent = subs[view];
  if (view === 'export') updateDataPreview();
  currentView = view;
}

// â”€â”€ Stats â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function updateStats() {
  const members   = getMergedMembers();
  const overrides = getOverrides();
  const photos    = getPhotos();
  const all = Object.values(members);

  $('stat-total').textContent      = all.length;
  $('stat-leadership').textContent = all.filter(m => m.category === 'Leadership').length;
  $('stat-academic').textContent   = all.filter(m => m.category === 'Academic Expert').length;
  $('stat-industry').textContent   = all.filter(m => m.category === 'Industry Leader').length;
  $('stat-admin').textContent      = all.filter(m => m.category === 'Administrator').length;

  const modCount = new Set([...Object.keys(overrides), ...Object.keys(photos)]).size;
  $('stat-modified').textContent = modCount;
}

// â”€â”€ Members Grid â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function renderMembersGrid(filter = '') {
  const members   = getMergedMembers();
  const overrides = getOverrides();
  const photos    = getPhotos();
  const grid      = $('members-grid');
  grid.innerHTML  = '';

  const query = filter.toLowerCase();

  Object.keys(members).forEach(id => {
    const m = members[id];
    const isModified = overrides[id] || photos[id];
    const matchSearch = !query || m.name.toLowerCase().includes(query) ||
                        (m.role||'').toLowerCase().includes(query) ||
                        (m.org||'').toLowerCase().includes(query);
    if (!matchSearch) return;

    const imgSrc = photos[id] || `assets/team/${id}.jpg`;
    const catClass = m.category ? m.category.split(' ')[0] : 'Academic';

    const card = document.createElement('div');
    card.className = 'member-card' + (isModified ? ' is-modified' : '');
    card.setAttribute('data-id', id);
    card.innerHTML = `
      <img class="card-img" src="${imgSrc}" alt="${m.name}"
           onerror="this.src='assets/team_1.jpg'">
      <span class="card-badge ${catClass}">${m.category || 'Academic'}</span>
      <div class="card-modified-dot" title="Modified by admin"></div>
      <div class="card-edit-overlay"><span>âœ Edit</span></div>
      <div class="card-body">
        <div class="card-name">${m.name}</div>
        <div class="card-role">${m.role || ''}</div>
        <div class="card-org">${m.org  || ''}</div>
      </div>`;
    card.addEventListener('click', () => openEditModal(id));
    grid.appendChild(card);
  });
}

// â”€â”€ Edit Modal â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
let currentEditId   = null;
let pendingPhotoB64 = null;

function openEditModal(id) {
  currentEditId   = id;
  pendingPhotoB64 = null;

  const members = getMergedMembers();
  const photos  = getPhotos();
  const m = members[id] || {};

  $('edit-member-id').value = id;
  $('edit-name').value      = m.name     || '';
  $('edit-role').value      = m.role     || '';
  $('edit-org').value       = m.org      || '';
  $('edit-email').value     = m.email    || '';
  $('edit-bio').value       = m.bio      || '';
  $('edit-skills').value    = Array.isArray(m.skills) ? m.skills.join(', ') : (m.skills||'');
  $('edit-category').value  = m.category || 'Academic Expert';
  $('edit-modal-title').textContent = 'Edit: ' + (m.name || id);
  $('edit-status').textContent = '';
  $('edit-status').style.color = '';

  const imgSrc = photos[id] || `assets/team/${id}.jpg`;
  const preview = $('edit-photo-preview');
  preview.src = imgSrc;
  preview.onerror = () => { preview.src = 'assets/team_1.jpg'; };

  $('edit-modal').style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeEditModal() {
  $('edit-modal').style.display = 'none';
  document.body.style.overflow  = '';
  currentEditId   = null;
  pendingPhotoB64 = null;
}

function saveEditModal() {
  const id   = currentEditId;
  if (!id) return;

  const name = $('edit-name').value.trim();
  const role = $('edit-role').value.trim();
  const org  = $('edit-org').value.trim();
  if (!name || !role || !org) {
    showEditStatus('Name, Role and Organisation are required.', false);
    return;
  }

  const skillsRaw = $('edit-skills').value.trim();
  const skills = skillsRaw ? skillsRaw.split(',').map(s => s.trim()).filter(Boolean) : [];

  // Save text overrides
  const overrides = getOverrides();
  overrides[id] = {
    name, role, org,
    email:    $('edit-email').value.trim(),
    bio:      $('edit-bio').value.trim(),
    category: $('edit-category').value,
    skills
  };
  ls.set(LS_OVERRIDES, overrides);

  // Save photo override if changed
  if (pendingPhotoB64) {
    const photos = getPhotos();
    photos[id] = pendingPhotoB64;
    ls.set(LS_PHOTOS, photos);
  }

  showEditStatus('Saved successfully!', true);
  renderMembersGrid($('admin-search').value);
  updateStats();
  updateDataPreview();

  setTimeout(closeEditModal, 800);
}

function resetPhoto() {
  if (!currentEditId) return;
  const photos = getPhotos();
  delete photos[currentEditId];
  ls.set(LS_PHOTOS, photos);
  pendingPhotoB64 = null;
  const preview = $('edit-photo-preview');
  preview.src = `assets/team/${currentEditId}.jpg`;
  preview.onerror = () => { preview.src = 'assets/team_1.jpg'; };
  showEditStatus('Photo reset to default.', true);
  renderMembersGrid($('admin-search').value);
}

function showEditStatus(msg, ok) {
  const el = $('edit-status');
  el.textContent = msg;
  el.style.color = ok ? '#10B981' : '#EF4444';
}

// â”€â”€ Photo Upload â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function handlePhotoUpload(file) {
  if (!file || !file.type.startsWith('image/')) return;
  const reader = new FileReader();
  reader.onload = e => {
    pendingPhotoB64 = e.target.result;
    $('edit-photo-preview').src = pendingPhotoB64;
    showEditStatus('Photo ready â€” click Save to apply.', true);
  };
  reader.readAsDataURL(file);
}

// â”€â”€ Add Member Modal â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function openAddModal() {
  ['new-id','new-name','new-role','new-org','new-email','new-bio','new-skills'].forEach(f => { $(f).value=''; });
  $('new-category').value = 'Academic Expert';
  $('add-status').textContent = '';
  $('add-modal').style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeAddModal() {
  $('add-modal').style.display = 'none';
  document.body.style.overflow = '';
}

function saveAddModal() {
  const id = $('new-id').value.trim().toLowerCase().replace(/\s+/g,'-');
  const name = $('new-name').value.trim();
  const role = $('new-role').value.trim();
  const org  = $('new-org').value.trim();

  if (!id)   { $('add-status').textContent='ID is required.'; $('add-status').style.color='#EF4444'; return; }
  if (!name) { $('add-status').textContent='Name is required.'; $('add-status').style.color='#EF4444'; return; }
  if (!role) { $('add-status').textContent='Role is required.'; $('add-status').style.color='#EF4444'; return; }
  if (!org)  { $('add-status').textContent='Organisation is required.'; $('add-status').style.color='#EF4444'; return; }

  const skillsRaw = $('new-skills').value.trim();
  const overrides = getOverrides();
  overrides[id] = {
    name, role, org,
    email:    $('new-email').value.trim(),
    bio:      $('new-bio').value.trim(),
    category: $('new-category').value,
    skills:   skillsRaw ? skillsRaw.split(',').map(s=>s.trim()).filter(Boolean) : []
  };
  ls.set(LS_OVERRIDES, overrides);

  $('add-status').textContent = 'Member added!';
  $('add-status').style.color = '#10B981';
  renderMembersGrid();
  updateStats();
  updateDataPreview();
  setTimeout(closeAddModal, 700);
}

// â”€â”€ Export / Import / Reset â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function updateDataPreview() {
  const overrides = getOverrides();
  const photos    = getPhotos();
  const preview = Object.assign({}, overrides);
  // Don't dump full base64 in preview; just note which IDs have photo overrides
  if (Object.keys(photos).length) {
    preview.__photo_overrides = Object.keys(photos);
  }
  $('data-preview').textContent = JSON.stringify(preview, null, 2);
}

function exportJSON() {
  const payload = {
    version:   1,
    exported:  new Date().toISOString(),
    overrides: getOverrides(),
    photos:    getPhotos()
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href = url; a.download = 'aadc_team_data.json';
  a.click(); URL.revokeObjectURL(url);
}

function importJSON(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    try {
      const payload = JSON.parse(e.target.result);
      if (payload.overrides) ls.set(LS_OVERRIDES, payload.overrides);
      if (payload.photos)    ls.set(LS_PHOTOS,    payload.photos);
      renderMembersGrid();
      updateStats();
      updateDataPreview();
      alert('Data imported successfully!');
    } catch(err) {
      alert('Invalid JSON file. Please upload a valid export file.');
    }
  };
  reader.readAsText(file);
}

function resetAll() {
  if (!confirm('Reset ALL admin changes? This cannot be undone.')) return;
  ls.del(LS_OVERRIDES);
  ls.del(LS_PHOTOS);
  renderMembersGrid();
  updateStats();
  updateDataPreview();
  alert('All overrides have been reset to defaults.');
}

// â”€â”€ Password Change â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function changePassword() {
  const current  = $('current-pwd').value;
  const newPwd   = $('new-pwd').value;
  const confirm  = $('confirm-pwd').value;
  const msgEl    = $('settings-msg');

  if (current !== getPassword()) {
    msgEl.textContent = 'Current password is incorrect.';
    msgEl.className   = 'settings-msg err';
    return;
  }
  if (newPwd.length < 6) {
    msgEl.textContent = 'New password must be at least 6 characters.';
    msgEl.className   = 'settings-msg err';
    return;
  }
  if (newPwd !== confirm) {
    msgEl.textContent = 'New passwords do not match.';
    msgEl.className   = 'settings-msg err';
    return;
  }
  ls.set(LS_PASSWORD, newPwd);
  msgEl.textContent = 'Password updated successfully!';
  msgEl.className   = 'settings-msg ok';
  ['current-pwd','new-pwd','confirm-pwd'].forEach(f => $(f).value = '');
}

// â”€â”€ EVENT BINDINGS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
document.addEventListener('DOMContentLoaded', () => {

  // Login
  checkLogin();
  $('login-btn').addEventListener('click', attemptLogin);
  $('admin-password').addEventListener('keydown', e => { if(e.key==='Enter') attemptLogin(); });

  // Logout
  $('logout-btn').addEventListener('click', logout);

  // Sidebar nav
  document.querySelectorAll('.sidebar-link').forEach(link => {
    link.addEventListener('click', e => { e.preventDefault(); switchView(link.getAttribute('data-view')); });
  });

  // Add member
  $('add-member-btn').addEventListener('click', openAddModal);
  $('add-save').addEventListener('click', saveAddModal);
  $('add-cancel').addEventListener('click', closeAddModal);
  $('add-close').addEventListener('click', closeAddModal);
  $('add-backdrop').addEventListener('click', closeAddModal);

  // Edit modal
  $('edit-save').addEventListener('click', saveEditModal);
  $('edit-cancel').addEventListener('click', closeEditModal);
  $('edit-close').addEventListener('click', closeEditModal);
  $('edit-backdrop').addEventListener('click', closeEditModal);
  $('reset-photo-btn').addEventListener('click', resetPhoto);

  // Photo upload via click on preview
  $('edit-photo-wrap').addEventListener('click', () => $('edit-photo-input').click());
  $('edit-photo-input').addEventListener('change', e => handlePhotoUpload(e.target.files[0]));

  // Drag & drop photo
  $('edit-photo-wrap').addEventListener('dragover', e => { e.preventDefault(); e.currentTarget.style.border = '2px dashed #1E5EFF'; });
  $('edit-photo-wrap').addEventListener('dragleave', e => { e.currentTarget.style.border = ''; });
  $('edit-photo-wrap').addEventListener('drop', e => {
    e.preventDefault(); e.currentTarget.style.border = '';
    handlePhotoUpload(e.dataTransfer.files[0]);
  });

  // Admin search
  $('admin-search').addEventListener('input', e => renderMembersGrid(e.target.value));

  // Export / Import / Reset
  $('export-json-btn').addEventListener('click', exportJSON);
  $('import-json-btn').addEventListener('click', () => $('import-file').click());
  $('import-file').addEventListener('change', e => importJSON(e.target.files[0]));
  $('reset-all-btn').addEventListener('click', resetAll);

  // Settings
  $('change-pwd-btn').addEventListener('click', changePassword);

  // Keyboard ESC to close modals
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    if ($('edit-modal').style.display !== 'none') closeEditModal();
    if ($('add-modal').style.display  !== 'none') closeAddModal();
  });
});
