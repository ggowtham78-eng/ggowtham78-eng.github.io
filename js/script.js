/* ==========================================================
   G. GOWTHAM PORTFOLIO — SHARED JAVASCRIPT
   Home navigation + Software Work Gallery + Featured Projects
   ========================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* =========================
       HOME PAGE NAVIGATION
       ========================= */
    const links = [...document.querySelectorAll('.home-page .nav-links a')];
    const sections = [...document.querySelectorAll('.home-page header[id], .home-page section[id]')];

    if (links.length && sections.length) {
        function setActiveNav(id){
            links.forEach(link => link.classList.remove('active'));
            const activeLink = links.find(link => (link.getAttribute('href') || '') === '#' + id);
            if(activeLink) activeLink.classList.add('active');
        }

        function updateActiveNav(){
            const y = window.scrollY + 180;
            let current = sections[0];
            sections.forEach(section => {
                if(section.offsetTop <= y) current = section;
            });
            if(current) setActiveNav(current.id);
        }

        updateActiveNav();
        window.addEventListener('scroll', updateActiveNav, {passive:true});

        links.forEach(link => {
            link.addEventListener('click', () => {
                const href = link.getAttribute('href') || '';
                if(href.startsWith('#')) setActiveNav(href.substring(1));
            });
        });
    }

    /* =========================
       OLD IMAGE LIGHTBOX SUPPORT
       ========================= */
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxClose = document.getElementById('lightboxClose');

    if(lightbox && lightboxImage && lightboxClose){
        document.querySelectorAll('.gallery-page .gallery-image img').forEach(img => {
            img.addEventListener('click', function(){
                if(this.naturalWidth > 0){
                    lightboxImage.src = this.src;
                    lightbox.classList.add('show');
                }
            });
        });

        lightboxClose.addEventListener('click', () => {
            lightbox.classList.remove('show');
            lightboxImage.src = '';
        });

        lightbox.addEventListener('click', e => {
            if(e.target === lightbox){
                lightbox.classList.remove('show');
                lightboxImage.src = '';
            }
        });
    }

    /* =========================
       SOFTWARE COVER IMAGES
       PNG/JPG/JPEG/WEBP supported
       ========================= */
    document.querySelectorAll('[data-gallery-cover]').forEach(img => {
        img.onerror = () => { img.style.display = 'none'; };
        setImageFromBase(img, img.dataset.base, true);
    });
});


/* ==========================================================
   SOFTWARE / WORK GALLERY
   ========================================================== */

const softwareGalleryData = {
    autocad: {
        number: '01 / AUTOCAD',
        title: 'AutoCAD',
        description: '2D Drafting & Engineering Documentation',
        folder: 'assets/software/autocad/',
        images: [
            ['autocad-01', 'AutoCAD Industrial Site Layout', 'Detailed camp layout showing functional zones, internal circulation, utilities and parking arrangements.'],
            ['autocad-02', 'Site Plan & Access Layout', 'Overall site plan showing equipment blocks, internal roads, parking areas and access arrangements.']
        ]
    },
    revit: {
        number: '02 / REVIT',
        title: 'Revit',
        description: 'BIM Modelling & Multidisciplinary Coordination',
        folder: 'assets/software/revit/',
        images: [
            ['revit-09', 'High-Rise Building BIM Model', 'Review the coordinated building envelope, floor levels, façade elements and overall model geometry.'],
            ['revit-07', 'Site, Terrain & Landscape', 'Coordinate building levels with terrain, grading, access and landscape elements.'],
            ['revit-02', 'Viaduct Structural Drawing Sheet', 'Review deck continuity, pier spacing and pile-supported bridge geometry.'],
            ['revit-03', 'Viaduct — Overall Model', 'Review the bridge alignment, deck continuity, pier spacing and pile-supported geometry.'],
            ['revit-04', 'Deck-to-Pier Structural Interface', 'Check structural interfaces and keep deck-to-pier geometry coordinated.'],
            ['revit-05', 'Pier Reinforcement Detail', 'Review reinforcement placement against concrete geometry and constructability.'],
            ['revit-08', 'Coordinated 3D, Plan & Section Views', 'Communicate the design through coordinated 3D, plan and section views.'],
            ['revit-01', 'Material Quantity Takeoff', 'Use model schedules to quantify concrete, compare element counts and support cost planning.'],
            ['revit-06', 'Multi-Category Material Takeoff Sheet', 'Use model schedules to quantify concrete, compare element counts and support cost planning.']
        ]
    },
    civil3d: {
        number: '03 / CIVIL 3D',
        title: 'Civil 3D',
        description: 'Civil & Infrastructure Design',
        folder: 'assets/software/civil3d/',
        images: [
            ['civil3d-01', 'Surface Modelling', 'Survey and existing ground data'],
            ['civil3d-02', 'Alignment Design', 'Horizontal and vertical infrastructure geometry'],
            ['civil3d-03', 'Profile Design', 'Levels, gradients and longitudinal design'],
            ['civil3d-04', 'Corridor Modelling', 'Road and infrastructure development'],
            ['civil3d-05', 'Grading & Site Development', 'Site formation and terrain development']
        ]
    },
    navisworks: {
        number: '04 / NAVISWORKS',
        title: 'Navisworks',
        description: 'BIM Coordination, Clash Detection & 4D Review',
        folder: 'assets/software/navisworks/',
        images: [
            // Reordered to match the requested sequence: old 3, 1, 4, 5, 2.
            ['navisworks-02', 'Federated Model Coordination', 'Federate structural, architectural and MEP models; review model hierarchy and discipline interfaces.'],
            ['navisworks-03', 'Selection Sets & 4D Task Coordination', 'Link model selection sets to task dates and review the planned construction sequence before watching the 4D video.'],
            ['navisworks-04', 'Clash Detection Matrix', 'Prioritize clash tests by discipline and tolerance, then review clash locations and generated reports.'],
            ['navisworks-05', 'Clash Resolution Report', 'Track resolved and outstanding clashes, communicate ownership and verify coordination outcomes.'],
            ['navisworks-01', 'TimeLiner & 4D Planning', 'Review construction tasks, planned dates and model-resource links in the TimeLiner workflow.']
        ],
        videoPrefix: 'navisworks',
        extraVideoNames: ['Navisworks.mp4'],
        downloadLink: 'assets/software/revit/material-quantity-takeoff.xlsx'
    },
    synchro: {
        number: '05 / SYNCHRO 4D',
        title: 'Synchro 4D Pro',
        description: '4D Construction Planning, Simulation & Progress Review',
        folder: 'assets/software/synchro/',
        images: [
            ['synchro-01', '3D + Schedule', 'Model and construction schedule integration'],
            ['synchro-02', 'Gantt & Activities', 'Time-based construction planning'],
            ['synchro-03', 'Resource Linking', 'Activities linked with model resources'],
            ['synchro-04', 'Construction Simulation', 'Visualizing planned construction sequence'],
            ['synchro-05', 'Progress & Status', 'Construction progress visualization']
        ],
        videoPrefix: 'synchro',
        extraVideoNames: ['Synchro.mp4']
    },
    acc: {
        number: '06 / AUTODESK CONSTRUCTION CLOUD',
        title: 'Autodesk Construction Cloud (ACC)',
        description: 'Cloud Collaboration & BIM Project Sharing',
        folder: 'assets/software/acc/',
        images: [
            ['acc-01', 'ACC Work Sample 01', 'Autodesk Construction Cloud assignment evidence'],
            ['acc-02', 'ACC Work Sample 02', 'Cloud-based BIM collaboration and project workflow'],
            ['acc-03', 'ACC Work Sample 03', 'Autodesk Construction Cloud project coordination evidence'],
            ['acc-04', 'ACC Work Sample 04', 'Cloud project sharing and collaboration workflow'],
            ['acc-05', 'ACC Work Sample 05', 'BIM project information and review evidence'],
            ['acc-06', 'ACC Work Sample 06', 'Cloud-based project collaboration evidence'],
            ['acc-07', 'ACC Work Sample 07', 'Model coordination and information sharing workflow'],
            ['acc-08', 'ACC Work Sample 08', 'Autodesk Construction Cloud project workflow evidence'],
            ['acc-09', 'ACC Work Sample 09', 'BIM collaboration and project review evidence'],
            ['acc-10', 'ACC Work Sample 10', 'Cloud collaboration assignment screenshot'],
            ['acc-11', 'ACC Work Sample 11', 'Autodesk Construction Cloud work sample']
        ]
    }
};
let activeSoftwareKey = null;
let activeSoftwareImages = [];
let activeSoftwareIndex = 0;
let previousBodyOverflow = '';
let softwareTouchStartX = 0;
let softwareTouchStartY = 0;

function setSoftwareMediaVisibility(type){
    const image = document.getElementById('softwareGalleryMainImage');
    const video = document.getElementById('softwareGalleryMainVideo');
    if(!image || !video) return;

    image.style.display = type === 'image' ? 'block' : 'none';
    video.style.display = type === 'video' ? 'block' : 'none';

    if(type !== 'video'){
        video.pause();
        video.removeAttribute('src');
        video.load();
    }
}

// Resolve cover images by trying supported extensions. Several gallery assets
// are stored as JPG, so assigning a fixed PNG path causes missing-image errors.
function setImageFromBase(img, base, hideIfMissing = false){
    if(!img || !base) return;
    findSoftwareImage(base).then(src => {
        if(src){
            img.src = src;
            img.style.display = '';
        } else if(hideIfMissing){
            img.style.display = 'none';
        }
    });
}

function findSoftwareImage(base){
    const extensions = ['.png','.jpg','.jpeg','.webp'];
    return new Promise(resolve => {
        let i = 0;
        const next = () => {
            if(i >= extensions.length){ resolve(null); return; }
            const src = base + extensions[i++];
            const img = new Image();
            img.onload = () => resolve(src);
            img.onerror = next;
            img.src = src;
        };
        next();
    });
}

function findSoftwareVideo(src){
    return new Promise(resolve => {
        const video = document.createElement('video');
        video.preload = 'metadata';
        video.onloadedmetadata = () => resolve(src);
        video.onerror = () => resolve(null);
        video.src = src;
    });
}

async function discoverSoftwareVideos(project){
    const found = [];
    const prefix = project.videoPrefix;
    if(prefix){
        const checks = [];
        for(let i = 1; i <= 20; i++){
            const n = String(i).padStart(2,'0');
            checks.push({src: project.folder + prefix + '-' + n + '.mp4', title: formatVideoTitle(prefix, i)});
        }
        const results = await Promise.all(checks.map(async item => {
            const src = await findSoftwareVideo(item.src);
            return src ? {type:'video', src, title:item.title, description:videoDescription(project.title, iSafe(item.title))} : null;
        }));
        found.push(...results.filter(Boolean));
    }

    if(project.extraVideoNames){
        const extra = await Promise.all(project.extraVideoNames.map(async name => {
            const src = await findSoftwareVideo(project.folder + name);
            return src ? {type:'video', src, title:prettyFileTitle(name), description:videoDescription(project.title, prettyFileTitle(name))} : null;
        }));
        found.push(...extra.filter(Boolean));
    }
    return found;
}

function formatVideoTitle(prefix, index){
    const names = {
        navisworks: 'Navisworks Video ' + String(index).padStart(2,'0'),
        synchro: 'Synchro 4D Video ' + String(index).padStart(2,'0'),
        '4d': '4D Construction Video ' + String(index).padStart(2,'0'),
        render: 'Rendering Video ' + String(index).padStart(2,'0')
    };
    return names[prefix] || 'Project Video ' + String(index).padStart(2,'0');
}

function iSafe(value){ return value || 'Construction video'; }

function prettyFileTitle(name){
    return name.replace(/\.mp4$/i,'').replace(/[-_]+/g,' ').replace(/\b\w/g, m => m.toUpperCase());
}

function videoDescription(category, title){
    if(category === 'Synchro 4D Pro' && /synchro 4d video 01|synchro 01/i.test(title))
        return '4D construction sequence showing equipment placement alongside the planned structural work.';
    if(category === 'Synchro 4D Pro')
        return '4D construction planning video showing model-linked activities and sequence review.';
    return `${category} video showcase — ${title}.`;
}

async function openSoftwareGallery(key){
    const project = softwareGalleryData[key];
    const modal = document.getElementById('softwareGallery');
    if(!project || !modal) return;

    activeSoftwareKey = key;
    const galleryModal = document.getElementById('softwareGallery');
    if(galleryModal) galleryModal.classList.toggle('revit-gallery-active', key === 'revit');
    activeSoftwareImages = [];
    activeSoftwareIndex = 0;

    document.getElementById('softwareGalleryNumber').textContent = project.number;
    document.getElementById('softwareGalleryTitle').textContent = project.title;
    document.getElementById('softwareGalleryDescription').textContent = project.description;
    const workbookLink = document.getElementById('softwareGalleryDownload');
    if(workbookLink){
        workbookLink.hidden = key !== 'revit';
        workbookLink.href = project.downloadLink || 'assets/software/revit/material-quantity-takeoff.xlsx';
    }

    previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    modal.classList.add('show');
    modal.setAttribute('aria-hidden','false');
const mainImage = document.getElementById('softwareGalleryMainImage');
    const mainVideo = document.getElementById('softwareGalleryMainVideo');
    const thumbs = document.getElementById('softwareGalleryThumbnails');

    mainImage.removeAttribute('src');
    mainVideo.pause();
    mainVideo.removeAttribute('src');
    mainVideo.load();
    setSoftwareMediaVisibility('none');
    const sideInfo = document.getElementById('softwareGallerySideInfo');
    if(sideInfo) sideInfo.hidden = true;
    thumbs.innerHTML = '';
    document.getElementById('softwareGalleryCounter').textContent = '0 / 0';

    const imageChecks = (project.images || []).map(item =>
        findSoftwareImage(project.folder + item[0]).then(src => src ? {
            type:'image', src, title:item[1], description:item[2]
        } : null)
    );

    const [imageResults, videoResults] = await Promise.all([
        Promise.all(imageChecks),
        discoverSoftwareVideos(project)
    ]);

    if(activeSoftwareKey !== key) return;

    activeSoftwareImages = [...imageResults.filter(Boolean), ...videoResults];

    if(!activeSoftwareImages.length){
        const sideInfo = document.getElementById('softwareGallerySideInfo');
        if(sideInfo) sideInfo.hidden = true;
        document.getElementById('softwareGalleryImageTitle').textContent = '';
        document.getElementById('softwareGalleryImageDescription').textContent = '';
        return;
    }

    createSoftwareThumbnails();
    showSoftwareImage(0);
}

function closeSoftwareGallery(){
    const modal = document.getElementById('softwareGallery');
    if(!modal) return;
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden','true');
    document.body.style.overflow = previousBodyOverflow;
    const mainImage = document.getElementById('softwareGalleryMainImage');
    const mainVideo = document.getElementById('softwareGalleryMainVideo');
    if(mainImage) mainImage.removeAttribute('src');
    if(mainVideo){ mainVideo.pause(); mainVideo.removeAttribute('src'); mainVideo.load(); }
    const sideInfo = document.getElementById('softwareGallerySideInfo');
    if(sideInfo) sideInfo.hidden = true;
    activeSoftwareKey = null;
    activeSoftwareImages = [];
    activeSoftwareIndex = 0;
}

function softwareBimInsight(key, item){
    const title = (item.title || '').toLowerCase();
    const insights = {
        revit: [
            [/material quantity|takeoff/, 'Use model schedules to quantify concrete, compare element counts and support cost planning.'],
            [/drawing sheet/, 'Communicate the design through coordinated 3D, plan and section views.'],
            [/overall model/, 'Review deck continuity, pier spacing and pile-supported bridge geometry.'],
            [/deck and pier/, 'Check structural interfaces and keep deck-to-pier geometry coordinated.'],
            [/reinforcement/, 'Review reinforcement placement against concrete geometry and constructability.'],
            [/topography|site/, 'Coordinate building levels with terrain, grading, access and landscape elements.'],
            [/structural model/, 'Cross-check the 3D structure against plan and section views before issuing drawings.']
        ],
        civil3d: [
            [/surface|grading/, 'Validate existing-ground levels and surface contours before design development.'],
            [/alignment/, 'Coordinate horizontal geometry with project constraints and downstream profile design.'],
            [/profile/, 'Review gradients, elevations and vertical geometry for design continuity.'],
            [/corridor/, 'Coordinate corridor geometry and modelled road components along the alignment.']
        ],
        navisworks: [
            [/model coordination/, 'Federate architecture, structure and MEP models; check discipline interfaces and maintain a clear model hierarchy.'],
            [/selection sets|model organization/, 'Build reusable discipline-based selection sets to isolate elements and run consistent coordination checks.'],
            [/clash detection matrix/, 'Set clash-test priorities and tolerances, review conflict locations and produce traceable clash reports.'],
            [/clash resolution/, 'Track resolved clashes, communicate outstanding issues and verify that coordination actions are closed.'],
            [/timeliner|4d|time/, 'Link model selection sets to task dates and review the planned construction sequence.'],
            [/clash/, 'Identify and review model conflicts before construction to support multidisciplinary coordination.'],
            [/review|model/, 'Use model navigation and viewpoints to communicate coordination issues clearly.']
        ],
        synchro: [
            [/video|equipment|plan with/, 'Review equipment access, activity sequence and model-resource relationships during 4D planning.'],
            [/gantt|activities/, 'Check activity logic, durations and dependencies against the construction programme.'],
            [/resource|3d|schedule/, 'Connect model resources to scheduled activities to visualize planned work over time.']
        ],
        acc: [
            [/work sample 01/, 'Review a shared 3D model in the browser to support cloud-based design coordination.'],
            [/work sample 02/, 'Use a controlled project file area to keep BIM deliverables organized and accessible.'],
            [/work sample 03/, 'Maintain a clear project document structure for coordinated model and drawing exchange.'],
            [/work sample 04/, 'Support desktop-to-cloud file access while keeping project information organized.'],
            [/work sample 05/, 'Review project information and shared documents as part of a coordinated BIM workflow.'],
            [/work sample 06/, 'Inspect model information in a browser-based viewer without requiring a desktop authoring tool.'],
            [/work sample 07/, 'Review drawing and model views together to support cross-discipline coordination.'],
            [/work sample 08/, 'Keep current project documents accessible to the team through a shared cloud workspace.'],
            [/work sample 09/, 'Use project-level tools and status views to follow up on BIM coordination activities.'],
            [/work sample 10/, 'Organize and retrieve current project files for document control and collaboration.'],
            [/work sample 11/, 'Review cloud project status and collaboration tools within the project workspace.']
        ]
    };
    const list = insights[key] || [];
    for(const [pattern, text] of list){ if(pattern.test(title)) return text; }
    if(item.type === 'video' && ['synchro','videos','navisworks'].includes(key))
        return key === 'synchro' ? 'Review equipment access, task sequence and model-resource relationships during 4D planning.' : 'Use the video to communicate model coordination and construction sequence to project stakeholders.';
    return '';
}

function showSoftwareImage(index){
    if(!activeSoftwareImages.length) return;
    if(index < 0) index = activeSoftwareImages.length - 1;
    if(index >= activeSoftwareImages.length) index = 0;
    activeSoftwareIndex = index;

    const item = activeSoftwareImages[index];
    const mainImage = document.getElementById('softwareGalleryMainImage');
    const mainVideo = document.getElementById('softwareGalleryMainVideo');

    if(item.type === 'video'){
        setSoftwareMediaVisibility('video');
        mainVideo.src = item.src;
        mainVideo.load();
        mainVideo.setAttribute('aria-label', item.title);
    } else {
        setSoftwareMediaVisibility('image');
        mainImage.src = item.src;
        mainImage.alt = item.title;
    }

    document.getElementById('softwareGalleryCounter').textContent = `${index + 1} / ${activeSoftwareImages.length}`;
    document.getElementById('softwareGalleryImageTitle').textContent = item.title;
    document.getElementById('softwareGalleryImageDescription').textContent = item.description;

    const sideInfo = document.getElementById('softwareGallerySideInfo');
    const sideTitle = document.getElementById('softwareGallerySideTitle');
    const sideText = document.getElementById('softwareGallerySideText');
    const insight = softwareBimInsight(activeSoftwareKey, item);
    if(sideInfo){
        sideInfo.hidden = !insight;
        if(sideTitle) sideTitle.textContent = insight ? 'BIM application' : '';
        if(sideText) sideText.textContent = insight;
    }

    const workbookLink = document.getElementById('softwareGalleryDownload');
    if(workbookLink) workbookLink.hidden = !(activeSoftwareKey === 'revit' && index === 7);
document.querySelectorAll('.software-gallery-thumb').forEach((thumb, i) => {
        thumb.classList.toggle('active', i === index);
    });

    const activeThumb = document.querySelector('.software-gallery-thumb.active');
    if(activeThumb) activeThumb.scrollIntoView({behavior:'smooth',block:'nearest',inline:'center'});
}

function nextSoftwareImage(){ showSoftwareImage(activeSoftwareIndex + 1); }
function previousSoftwareImage(){ showSoftwareImage(activeSoftwareIndex - 1); }

function createSoftwareThumbnails(){
    const container = document.getElementById('softwareGalleryThumbnails');
    container.innerHTML = '';
    activeSoftwareImages.forEach((item,index) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'software-gallery-thumb';
        button.title = item.title;
        button.setAttribute('aria-label', `View ${item.title}`);

        if(item.type === 'video'){
            const wrap = document.createElement('span');
            wrap.className = 'software-gallery-video-thumb';
            const video = document.createElement('video');
            video.src = item.src;
            video.muted = true;
            video.playsInline = true;
            video.preload = 'metadata';
            wrap.appendChild(video);
            const play = document.createElement('span');
            play.className = 'software-gallery-video-play';
            play.textContent = '▶';
            wrap.appendChild(play);
            button.appendChild(wrap);
        } else {
            const img = document.createElement('img');
            img.src = item.src;
            img.alt = item.title;
            button.appendChild(img);
        }

        button.addEventListener('click', () => showSoftwareImage(index));
        container.appendChild(button);
    });
}

/* Mobile swipe for software image/video gallery */
const softwareGalleryMain = document.querySelector('.software-gallery-main');
if(softwareGalleryMain){
    softwareGalleryMain.addEventListener('touchstart', e => {
        const t = e.changedTouches[0];
        softwareTouchStartX = t.clientX;
        softwareTouchStartY = t.clientY;
    }, {passive:true});

    softwareGalleryMain.addEventListener('touchend', e => {
        const t = e.changedTouches[0];
        const dx = t.clientX - softwareTouchStartX;
        const dy = t.clientY - softwareTouchStartY;
        if(Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.2){
            if(dx < 0) nextSoftwareImage();
            else previousSoftwareImage();
        }
    }, {passive:true});
}

/* =========================================================
   FEATURED PROJECT PHOTO GALLERY
   Supports PNG / JPG / JPEG / WEBP and mobile swipe.
   ========================================================= */

const projectGalleryData = {
    modular: {
        title: 'Modular Building',
        description: 'Modular building BIM: coordinate repeatable units, structural interfaces, assembly sequencing and site connections.',
        folder: 'assets/projects/modular-building/',
        images: [
            ['modular-01', 'Modular Building – Project View', 'Review overall module arrangement, access and relationship between the building and site.'],
            ['modular-02', 'Modular Building – BIM Model', 'Coordinate modular geometry, structural interfaces and repeatable components before assembly.']
        ]
    },
    'data-center': {
        title: 'Modular Data Center',
        description: 'Data-center BIM coordination: align modular structure, equipment clearances and MEP service routes for coordinated installation.',
        folder: 'assets/projects/data-center/',
        images: [
            ['data-center-01', 'Data Center – Overall BIM View', 'Review the federated layout of modular rooms, access zones and major service interfaces.'],
            ['data-center-02', 'Data Center – Elevation', 'Check vertical coordination, module levels and equipment clearances.'],
            ['data-center-03', 'Data Center – Equipment Layout', 'Coordinate equipment footprints with electrical, mechanical and maintenance access requirements.'],
            ['data-center-04', 'Data Center – End View', 'Review end-of-module clearances and the arrangement of coordinated building services.']
        ]
    },
    'peb-industrial': {
        title: 'PEB / Industrial Buildings',
        description: 'Structural BIM, fabrication coordination and digital construction workflow.',
        folder: 'assets/projects/peb-industrial/',
        images: [
            ['peb-01', 'PEB Industrial – 3D Structural Sheet', 'Review the coordinated steel framing and overall industrial building layout in the Revit sheet view.'],
            ['peb-02', 'PEB Industrial – Overall Structural Model', 'Inspect the building-wide steel roof framing, grid layout and structural arrangement in the 3D model.']
        ]
    },
    transportation: {
        title: 'MRT Station & Viaduct',
        description: 'Structural BIM, multidisciplinary coordination and 4D/5D construction workflows.',
        folder: 'assets/projects/transportation/',
        images: [
            ['mrt-01', 'MRT – Project View', 'Transportation infrastructure BIM work'],
            ['mrt-02', 'MRT – Station Model', 'Station modelling and multidisciplinary coordination'],
            ['mrt-03', 'MRT – Viaduct Model', 'Viaduct and infrastructure coordination']
        ]
    }
};

let activeProjectKey = null;
let activeProjectImages = [];
let activeProjectIndex = 0;
let projectTouchStartX = 0;
let projectTouchStartY = 0;

function findProjectImage(base){
    const extensions = ['.png', '.jpg', '.jpeg', '.webp'];
    return new Promise(resolve => {
        let i = 0;
        const next = () => {
            if(i >= extensions.length){ resolve(null); return; }
            const src = base + extensions[i++];
            const img = new Image();
            img.onload = () => resolve(src);
            img.onerror = next;
            img.src = src;
        };
        next();
    });
}

function openProjectGallery(key){
    const project = projectGalleryData[key];
    const modal = document.getElementById('projectGallery');
    if(!project || !modal) return;

    activeProjectKey = key;
    activeProjectImages = [];
    activeProjectIndex = 0;

    document.getElementById('projectGalleryTitle').textContent = project.title;
    document.getElementById('projectGalleryDescription').textContent = project.description;
    document.getElementById('projectGalleryCurrent').textContent = '0';
    document.getElementById('projectGalleryTotal').textContent = '0';

    const main = document.getElementById('projectGalleryMainImage');
    const empty = document.getElementById('projectGalleryEmpty');
    const thumbs = document.getElementById('projectGalleryThumbnails');
    main.removeAttribute('src');
    main.style.display = 'none';
    thumbs.innerHTML = '';

    modal.classList.add('show');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    Promise.all(project.images.map(item =>
        findProjectImage(project.folder + item[0]).then(src =>
            src ? {src, title:item[1], description:item[2]} : null
        )
    )).then(results => {
        activeProjectImages = results.filter(Boolean);
        if(!activeProjectImages.length){
            empty.hidden = false;
            document.getElementById('projectGalleryCurrent').textContent = '0';
            document.getElementById('projectGalleryTotal').textContent = '0';
            return;
        }
        document.getElementById('projectGalleryTotal').textContent = activeProjectImages.length;
        createProjectThumbnails();
        showProjectImage(0);
    });
}

function closeProjectGallery(){
    const modal = document.getElementById('projectGallery');
    if(!modal) return;
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    activeProjectKey = null;
    activeProjectImages = [];
    activeProjectIndex = 0;
}

function showProjectImage(index){
    if(!activeProjectImages.length) return;
    if(index < 0) index = activeProjectImages.length - 1;
    if(index >= activeProjectImages.length) index = 0;
    activeProjectIndex = index;

    const item = activeProjectImages[index];
    const main = document.getElementById('projectGalleryMainImage');
    main.src = item.src;
    main.alt = item.title;
    main.style.display = 'block';

    document.getElementById('projectGalleryCurrent').textContent = index + 1;
    document.getElementById('projectGalleryTotal').textContent = activeProjectImages.length;

    document.querySelectorAll('.project-gallery-thumb').forEach((thumb, i) => {
        thumb.classList.toggle('active', i === index);
    });

    const activeThumb = document.querySelector('.project-gallery-thumb.active');
    if(activeThumb) activeThumb.scrollIntoView({behavior:'smooth', block:'nearest', inline:'center'});
}

function nextProjectImage(){ showProjectImage(activeProjectIndex + 1); }
function previousProjectImage(){ showProjectImage(activeProjectIndex - 1); }

function createProjectThumbnails(){
    const container = document.getElementById('projectGalleryThumbnails');
    container.innerHTML = '';
    activeProjectImages.forEach((item, index) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'project-gallery-thumb';
        button.title = item.title;
        button.setAttribute('aria-label', `View ${item.title}`);

        const img = document.createElement('img');
        img.src = item.src;
        img.alt = item.title;
        img.loading = 'lazy';
        button.appendChild(img);

        button.addEventListener('click', () => showProjectImage(index));
        container.appendChild(button);
    });
}

/* Close project gallery by clicking the dark background. */
document.addEventListener('click', e => {
    const modal = document.getElementById('projectGallery');
    if(modal && modal.classList.contains('show') && e.target === modal){
        closeProjectGallery();
    }
});

/* Mobile swipe: swipe left = next, swipe right = previous. */
document.addEventListener('DOMContentLoaded', () => {
    const area = document.querySelector('.project-gallery-main');
    if(!area) return;

    area.addEventListener('touchstart', e => {
        const touch = e.changedTouches[0];
        projectTouchStartX = touch.clientX;
        projectTouchStartY = touch.clientY;
    }, {passive:true});

    area.addEventListener('touchend', e => {
        const touch = e.changedTouches[0];
        const dx = touch.clientX - projectTouchStartX;
        const dy = touch.clientY - projectTouchStartY;

        if(Math.abs(dx) < 45 || Math.abs(dx) < Math.abs(dy)) return;
        if(dx < 0) nextProjectImage();
        else previousProjectImage();
    }, {passive:true});
});

/* =========================================================
   MOBILE NAVIGATION
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const menu = document.getElementById('siteNavigation');
    if(!toggle || !menu) return;

    const closeMenu = () => {
        menu.classList.remove('mobile-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open navigation menu');
    };

    toggle.addEventListener('click', () => {
        const open = menu.classList.toggle('mobile-open');
        toggle.setAttribute('aria-expanded', String(open));
        toggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
    });

    menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    document.addEventListener('click', event => {
        if(!menu.classList.contains('mobile-open')) return;
        if(!menu.contains(event.target) && !toggle.contains(event.target)) closeMenu();
    });

    window.addEventListener('resize', () => {
        if(window.innerWidth > 600) closeMenu();
    });
});

document.addEventListener('keydown', e => {
    const projectModal = document.getElementById('projectGallery');
    if(projectModal && projectModal.classList.contains('show')){
        if(e.key === 'Escape') closeProjectGallery();
        if(e.key === 'ArrowRight' && activeProjectImages.length) nextProjectImage();
        if(e.key === 'ArrowLeft' && activeProjectImages.length) previousProjectImage();
        return;
    }

    const modal = document.getElementById('softwareGallery');
    if(!modal || !modal.classList.contains('show')) return;
    if(e.key === 'Escape') closeSoftwareGallery();
    if(e.key === 'ArrowRight' && activeSoftwareImages.length) nextSoftwareImage();
    if(e.key === 'ArrowLeft' && activeSoftwareImages.length) previousSoftwareImage();
});

document.addEventListener('click', e => {
    const modal = document.getElementById('softwareGallery');
    if(modal && e.target === modal) closeSoftwareGallery();
});


