/**
 * JEE Math Explorer — SPA renderer for the Quadratic Equations portal.
 *
 * Layout mirrors the learning-portal template: portal header, welcome banner,
 * tab bar (Student Notes / Playground / Chat / Quiz / Revision) and a
 * syllabus sidebar with the detailed notes.
 *
 * Content comes from window.LWM_DATA (see js/data.js).
 *
 * Hash routes:
 *   #/notes/:topicId   -> Student Notes for a topic
 *   #/playground       -> Parabola Playground
 *   #/chat             -> AI Teacher Chat
 *   #/quiz             -> Practice Quiz Arena
 *   #/revision         -> Quick Revision Sheet
 */
(function () {
  "use strict";

  var app = document.getElementById("app");
  var data = window.LWM_DATA || { topics: [] };

  // --- Chapter resolution --------------------------------------------------
  // The portal now hosts more than one chapter. Chapter 01 (Quadratic) keeps
  // its content at the top level of LWM_DATA; every other chapter provides a
  // self-contained content object (welcome / tabs / topics / revision / quiz).

  var CHAPTERS = data.chapters || [];
  var CHAPTER_IDS = CHAPTERS.map(function (c) { return c.id; });
  var currentChapterId = (CHAPTERS[0] || {}).id || "quadratic";

  function chapterMeta(id) {
    var found = null;
    CHAPTERS.forEach(function (c) { if (c.id === id) found = c; });
    return found || CHAPTERS[0] || { num: "01", label: "", playground: "parabola" };
  }

  function chapterContent(id) {
    if (id && data[id] && data[id].topics) return data[id];
    return {
      welcome: data.welcome,
      tabs: data.tabs,
      topics: data.topics,
      revision: data.revision,
      quiz: data.quiz
    };
  }

  function content() { return chapterContent(currentChapterId); }

  // --- Helpers -------------------------------------------------------------

  function esc(str) {
    return String(str == null ? "" : str).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function findTopic(id) {
    var found = null;
    (content().topics || []).forEach(function (t) { if (t.id === id) found = t; });
    return found;
  }

  function renderMath() {
    if (window.renderMathInElement) {
      window.renderMathInElement(app, {
        delimiters: [
          { left: "\\[", right: "\\]", display: true },
          { left: "\\(", right: "\\)", display: false }
        ],
        throwOnError: false
      });
    }
  }

  function activeTopicNum() {
    var t = findTopic(currentTopicId());
    return t ? t.num : "01";
  }

  // --- Graph plotter (pure SVG, no dependencies) ---------------------------

  var _graphSeq = 0;

  function round2(n) { return Math.round(n * 100) / 100; }

  function buildGraph(g) {
    var W = 520, H = 340;
    var padL = 46, padR = 18, padT = 18, padB = 36;
    var plotW = W - padL - padR, plotH = H - padT - padB;
    var a = g.a, b = g.b, c = g.c;
    function f(x) { return a * x * x + b * x + c; }

    var xmin = g.xmin, xmax = g.xmax;

    // Roots (explicit or computed from the discriminant).
    var roots = g.roots;
    if (!roots) {
      var D = b * b - 4 * a * c;
      if (D > 0) { var s = Math.sqrt(D); roots = [(-b - s) / (2 * a), (-b + s) / (2 * a)]; }
      else if (D === 0) { roots = [-b / (2 * a)]; }
      else { roots = []; }
    }
    roots = roots.slice().sort(function (p, q) { return p - q; });

    // Vertex.
    var vh = -b / (2 * a), vk = f(vh);

    // Auto range if not supplied.
    var ymin = g.ymin, ymax = g.ymax;
    if (ymin == null || ymax == null) {
      var lo = Infinity, hi = -Infinity;
      for (var i = 0; i <= 100; i++) {
        var xx = xmin + (xmax - xmin) * i / 100, yy = f(xx);
        if (yy < lo) lo = yy; if (yy > hi) hi = yy;
      }
      lo = Math.min(lo, 0); hi = Math.max(hi, 0);
      var padY = (hi - lo) * 0.14 || 1;
      if (ymin == null) ymin = Math.floor(lo - padY);
      if (ymax == null) ymax = Math.ceil(hi + padY);
    }

    function sx(x) { return padL + (x - xmin) / (xmax - xmin) * plotW; }
    function sy(y) { return padT + (ymax - y) / (ymax - ymin) * plotH; }

    var id = "g" + (++_graphSeq);
    var parts = [];

    // Clip region so the curve stays inside the plot box.
    parts.push('<defs><clipPath id="clip-' + id + '"><rect x="' + padL + '" y="' + padT +
      '" width="' + plotW + '" height="' + plotH + '"/></clipPath></defs>');

    // Sign bands (light blue = positive, light red = negative).
    if (g.bands && roots.length === 2) {
      var r1 = roots[0], r2 = roots[1];
      var posC = "#e2ecff", negC = "#fbe4e4";
      var midC = a > 0 ? negC : posC, outC = a > 0 ? posC : negC;
      parts.push('<rect x="' + round2(sx(xmin)) + '" y="' + padT + '" width="' + round2(sx(r1) - sx(xmin)) + '" height="' + plotH + '" fill="' + outC + '"/>');
      parts.push('<rect x="' + round2(sx(r1)) + '" y="' + padT + '" width="' + round2(sx(r2) - sx(r1)) + '" height="' + plotH + '" fill="' + midC + '"/>');
      parts.push('<rect x="' + round2(sx(r2)) + '" y="' + padT + '" width="' + round2(sx(xmax) - sx(r2)) + '" height="' + plotH + '" fill="' + outC + '"/>');
    }

    // Grid + tick labels.
    var xstep = Math.max(1, Math.round((xmax - xmin) / 12));
    var ystep = Math.max(1, Math.round((ymax - ymin) / 8));
    var gx, gy;
    for (gx = Math.ceil(xmin / xstep) * xstep; gx <= xmax; gx += xstep) {
      var px = round2(sx(gx));
      parts.push('<line x1="' + px + '" y1="' + padT + '" x2="' + px + '" y2="' + (padT + plotH) + '" stroke="#eef1f6"/>');
      parts.push('<text x="' + px + '" y="' + (padT + plotH + 18) + '" class="gx-lbl">' + gx + "</text>");
    }
    for (gy = Math.ceil(ymin / ystep) * ystep; gy <= ymax; gy += ystep) {
      var py = round2(sy(gy));
      parts.push('<line x1="' + padL + '" y1="' + py + '" x2="' + (padL + plotW) + '" y2="' + py + '" stroke="#eef1f6"/>');
      parts.push('<text x="' + (padL - 8) + '" y="' + (py + 4) + '" class="gy-lbl">' + gy + "</text>");
    }

    // Axes.
    if (ymin < 0 && ymax > 0) {
      var y0 = round2(sy(0));
      parts.push('<line x1="' + padL + '" y1="' + y0 + '" x2="' + (padL + plotW) + '" y2="' + y0 + '" stroke="#9aa4b8" stroke-width="1.3"/>');
    }
    if (xmin < 0 && xmax > 0) {
      var x0 = round2(sx(0));
      parts.push('<line x1="' + x0 + '" y1="' + padT + '" x2="' + x0 + '" y2="' + (padT + plotH) + '" stroke="#9aa4b8" stroke-width="1.3"/>');
    }

    // Optional dashed marker line (e.g. a test value k between roots).
    if (g.markX) {
      var mx = round2(sx(g.markX.x));
      parts.push('<line x1="' + mx + '" y1="' + padT + '" x2="' + mx + '" y2="' + (padT + plotH) + '" stroke="#e08a1e" stroke-width="1.4" stroke-dasharray="5 4"/>');
      if (g.markX.label) parts.push('<text x="' + (mx + 5) + '" y="' + (padT + 14) + '" class="mark-lbl">' + esc(g.markX.label) + "</text>");
    }

    // Curve.
    var d = "";
    for (var k = 0; k <= 160; k++) {
      var x = xmin + (xmax - xmin) * k / 160;
      d += (k === 0 ? "M" : "L") + round2(sx(x)) + " " + round2(sy(f(x))) + " ";
    }
    parts.push('<path d="' + d + '" fill="none" stroke="#4f7cf0" stroke-width="2.6" clip-path="url(#clip-' + id + ')"/>');

    // Roots as points on the x-axis.
    roots.forEach(function (r) {
      if (r < xmin || r > xmax) return;
      parts.push('<circle cx="' + round2(sx(r)) + '" cy="' + round2(sy(0)) + '" r="4.5" fill="#e0367e"/>');
      parts.push('<text x="' + round2(sx(r)) + '" y="' + round2(sy(0) - 10) + '" class="pt-lbl">' + round2(r) + "</text>");
    });

    // Vertex.
    if (g.vertex !== false && vh >= xmin && vh <= xmax) {
      parts.push('<circle cx="' + round2(sx(vh)) + '" cy="' + round2(sy(vk)) + '" r="4.5" fill="#16a085"/>');
      var vy = a > 0 ? round2(sy(vk) + 20) : round2(sy(vk) - 12);
      parts.push('<text x="' + round2(sx(vh)) + '" y="' + vy + '" class="vx-lbl">Vertex (' + round2(vh) + ", " + round2(vk) + ")</text>");
    }

    return (
      '<figure class="graph-figure">' +
        (g.title ? '<figcaption class="graph-title">' + esc(g.title) + "</figcaption>" : "") +
        '<svg viewBox="0 0 ' + W + " " + H + '" class="graph-svg" role="img" aria-label="' +
          esc(g.title || "Quadratic graph") + '">' + parts.join("") + "</svg>" +
        (g.caption ? '<figcaption class="graph-caption">' + esc(g.caption) + "</figcaption>" : "") +
      "</figure>"
    );
  }

  function graphBlock(section) {
    var list = section.graphs || (section.graph ? [section.graph] : []);
    if (!list.length) return "";
    var figs = list.map(buildGraph).join("");
    return '<div class="graph-row' + (list.length > 1 ? " multi" : "") + '">' + figs + "</div>";
  }

  // --- Static chrome (header + module label) -------------------------------

  function fillHeader() {
    var p = data.portal || {};
    setText("portal-series", p.series);
    setText("portal-grade", p.grade);
    setText("portal-student", p.student);
    setText("portal-level", p.level);
    var yr = document.getElementById("year");
    if (yr) yr.textContent = new Date().getFullYear();
  }

  function setText(id, value) {
    var el = document.getElementById(id);
    if (el) el.textContent = value || "";
  }

  function updateModuleLabel() {
    var chapter = chapterMeta(currentChapterId);
    setText("module-value", chapter.num + " // " + chapter.label);
  }

  // --- Shared building blocks ---------------------------------------------

  function welcomeBanner() {
    var w = content().welcome || {};
    var chapters = (data.chapters || []).map(function (c) {
      var isActive = c.id === currentChapterId;
      var cls = "chapter-btn" + (isActive ? " active" : "");
      var first = (chapterContent(c.id).topics || [])[0];
      var href = "#/" + c.id + "/notes/" + (first ? first.id : "");
      return '<a class="' + cls + '" href="' + href + '">CHAPTER ' + esc(c.num) + " // " + esc(c.label) + "</a>";
    }).join("");

    return (
      '<section class="welcome-card">' +
        '<div class="welcome-top">' +
          '<div class="welcome-main">' +
            '<div class="pill-row">' +
              '<span class="pill">WELCOME, MOHIT! 👋</span>' +
              '<span class="pill-ghost">✨ Syllabus Path Explorer</span>' +
            "</div>" +
            "<h1>" + esc(w.heading) + "</h1>" +
            "<p>" + esc(w.text) + "</p>" +
          "</div>" +
          '<aside class="tutor-box">' +
            '<div class="tutor-label">TUTOR\'S ADVICE:</div>' +
            "<p>" + esc(w.tutorAdvice) + "</p>" +
          "</aside>" +
        "</div>" +
        '<div class="chapter-row">' +
          '<span class="chapter-label">ACTIVE CHAPTER:</span>' +
          chapters +
        "</div>" +
      "</section>"
    );
  }

  function tabBar(activeTab) {
    var tabs = (content().tabs || []).map(function (t) {
      var href = t.id === "notes"
        ? "#/" + currentChapterId + "/notes/" + currentTopicId()
        : "#/" + currentChapterId + "/" + t.id;
      var cls = "tab" + (t.id === activeTab ? " active" : "");
      return (
        '<a class="' + cls + '" href="' + href + '">' +
          '<span aria-hidden="true">' + esc(t.icon) + "</span> " + esc(t.label) +
        "</a>"
      );
    }).join("");
    return '<nav class="tab-bar">' + tabs + "</nav>";
  }

  function syllabusSidebar(activeId) {
    var items = (content().topics || []).map(function (t) {
      var cls = "syllabus-item" + (t.id === activeId ? " active" : "");
      return (
        '<a class="' + cls + '" href="#/' + currentChapterId + "/notes/" + esc(t.id) + '">' +
          '<span class="s-num">' + esc(t.num) + "</span>" +
          '<span class="s-text">' +
            '<span class="s-title">' + esc(t.title) + "</span>" +
            '<span class="s-sub">' + esc(t.subtitle) + "</span>" +
          "</span>" +
          '<span class="s-arrow">›</span>' +
        "</a>"
      );
    }).join("");

    return (
      '<aside class="syllabus">' +
        '<div class="syllabus-title"><span class="dot"></span> SYLLABUS INDEX 📚</div>' +
        '<div class="syllabus-sub">Explore all ' + (content().topics || []).length + " core JEE foundation topics</div>" +
        '<div class="syllabus-list">' + items + "</div>" +
      "</aside>"
    );
  }

  // --- Views ---------------------------------------------------------------

  function sectionCard(s) {
    var tipGrid = "";
    if (s.teacherTip || s.commonMistake) {
      tipGrid =
        '<div class="tip-grid">' +
          '<div class="tip-card"><div class="tip-label">💡 TEACHER TIP</div><p>' + (s.teacherTip || "") + "</p></div>" +
          '<div class="tip-card mistake"><div class="tip-label">⚠️ COMMON MISTAKE</div><p>' + (s.commonMistake || "") + "</p></div>" +
        "</div>";
    }

    var examples = (s.examples || []).map(function (ex) {
      var steps = (ex.steps || []).map(function (st, i) {
        return '<li><span class="step-num">' + (i + 1) + "</span><span>" + st + "</span></li>";
      }).join("");
      return (
        '<div class="example">' +
          '<div class="ex-label">✔️ SOLVED PRACTICE EXAMPLE</div>' +
          '<div class="example-q">' + ex.question + "</div>" +
          (steps ? '<div class="step-label">STEP-BY-STEP SOLUTION:</div><ol class="steps">' + steps + "</ol>" : "") +
        "</div>"
      );
    }).join("");

    return (
      '<article class="panel section-card">' +
        '<div class="section-eyebrow">SECTION ' + esc(s.num) + "</div>" +
        "<h3>" + esc(s.title) + "</h3>" +
        (s.coreDefinition ? '<div class="block-label">CORE DEFINITION</div><p class="core-def">' + s.coreDefinition + "</p>" : "") +
        (s.whyThisWorks ? '<div class="why-box"><div class="why-label">✨ WHY THIS WORKS (SIMPLY EXPLAINED):</div><p>' + s.whyThisWorks + "</p></div>" : "") +
        graphBlock(s) +
        tipGrid +
        examples +
      "</article>"
    );
  }

  function viewNotes(topicId) {
    var t = findTopic(topicId) || (content().topics || [])[0];
    if (!t) { app.innerHTML = welcomeBanner() + tabBar("notes") + '<p class="placeholder">No topics available.</p>'; return; }

    var header =
      '<article class="panel">' +
        '<div class="topic-tags">' +
          '<span class="topic-badge">TOPIC ' + esc(t.num) + "</span>" +
          '<span class="topic-note-label"><span class="dot">●</span> JEE FOUNDATION NOTES</span>' +
        "</div>" +
        '<h2 class="topic-title">' + esc(t.title) + "</h2>" +
        '<p class="topic-intro">' + t.intro + "</p>" +
      "</article>";

    var intuition = t.intuition
      ? '<div class="panel intuition"><div class="intuition-label">🧠 ALGEBRAIN\'S KID-FRIENDLY INTUITION:</div><p>' + t.intuition + "</p></div>"
      : "";

    var sections =
      '<div class="panel"><div class="section-heading">DETAILED CONCEPTS &amp; WORKED EXAMPLES</div></div>' +
      (t.sections || []).map(sectionCard).join("");

    app.innerHTML =
      welcomeBanner() +
      tabBar("notes") +
      '<div class="notes-layout">' +
        syllabusSidebar(t.id) +
        '<div class="notes-main">' + header + intuition + sections + "</div>" +
      "</div>";
    renderMath();

    // On topic selection (not the first load), bring the content into view
    // instead of jumping to the top of the page.
    if (!isInitialLoad) {
      var layout = app.querySelector(".notes-layout");
      if (layout) {
        var top = layout.getBoundingClientRect().top + window.pageYOffset - 12;
        window.scrollTo({ top: top, behavior: "smooth" });
      }
    }
  }

  function viewRevision() {
    var rows = (content().revision || []).map(function (r) {
      return "<tr><td>" + esc(r.topic) + "</td><td>" + r.result + "</td></tr>";
    }).join("");

    var label = chapterMeta(currentChapterId).label || "";
    var pretty = label.charAt(0) + label.slice(1).toLowerCase();

    app.innerHTML =
      welcomeBanner() +
      tabBar("revision") +
      '<article class="panel">' +
        '<div class="topic-tags"><span class="topic-badge">QUICK REVISION</span>' +
        '<span class="topic-note-label"><span class="dot">●</span> ONE-PAGE MEMORY MAP</span></div>' +
        '<h2 class="topic-title">Quick Revision Sheet</h2>' +
        '<p class="topic-intro">The must-remember results for ' + esc(pretty) + '. Review these before every test.</p>' +
        '<table class="data-table"><thead><tr><th>Topic</th><th>Must-remember result</th></tr></thead><tbody>' +
        rows + "</tbody></table>" +
      "</article>";
    renderMath();
  }

  function viewQuiz() {
    var items = (content().quiz || []).map(function (q, i) {
      return (
        '<div class="quiz-item">' +
          '<div class="quiz-q"><span class="qn">' + (i + 1) + "</span><span>" + q.question + "</span></div>" +
          '<button class="reveal-btn" data-target="ans-' + i + '">Show answer</button>' +
          '<div class="quiz-answer" id="ans-' + i + '"><strong>Answer:</strong> ' + q.answer + "</div>" +
        "</div>"
      );
    }).join("");

    app.innerHTML =
      welcomeBanner() +
      tabBar("quiz") +
      '<article class="panel">' +
        '<div class="topic-tags"><span class="topic-badge">PRACTICE QUIZ ARENA 🏆</span>' +
        '<span class="topic-note-label"><span class="dot">●</span> TEST YOURSELF</span></div>' +
        '<h2 class="topic-title">Practice Quiz Arena</h2>' +
        '<p class="topic-intro">Solve each question on paper, then reveal the answer to check your work.</p>' +
        items +
      "</article>";

    Array.prototype.forEach.call(app.querySelectorAll(".reveal-btn"), function (btn) {
      btn.addEventListener("click", function () {
        var box = document.getElementById(btn.getAttribute("data-target"));
        if (!box) return;
        var open = box.classList.toggle("show");
        btn.textContent = open ? "Hide answer" : "Show answer";
      });
    });
    renderMath();
  }

  // --- Parabola Playground (interactive) -----------------------------------

  var PG = { a: 1, b: -4, c: 3 };

  function pgPlotSVG(a, b, c) {
    var W = 560, H = 430;
    var padL = 34, padR = 34, padT = 26, padB = 30;
    var plotW = W - padL - padR, plotH = H - padT - padB;
    function f(x) { return a * x * x + b * x + c; }

    var D = b * b - 4 * a * c;
    var roots = [];
    if (D > 0) { var s = Math.sqrt(D); roots = [(-b - s) / (2 * a), (-b + s) / (2 * a)]; }
    else if (D === 0) { roots = [-b / (2 * a)]; }
    roots.sort(function (p, q) { return p - q; });

    var h = -b / (2 * a), k = f(h);

    var xmin, xmax;
    if (roots.length) { xmin = Math.min(h - 4, roots[0] - 1.5); xmax = Math.max(h + 4, roots[roots.length - 1] + 1.5); }
    else { xmin = h - 6; xmax = h + 6; }
    if (xmin > 0) xmin = -1; if (xmax < 0) xmax = 1;

    var lo = Infinity, hi = -Infinity;
    for (var i = 0; i <= 100; i++) { var xx = xmin + (xmax - xmin) * i / 100, yy = f(xx); if (yy < lo) lo = yy; if (yy > hi) hi = yy; }
    lo = Math.min(lo, 0); hi = Math.max(hi, 0);
    var padY = (hi - lo) * 0.16 || 1;
    var ymin = lo - padY, ymax = hi + padY;

    function sx(x) { return padL + (x - xmin) / (xmax - xmin) * plotW; }
    function sy(y) { return padT + (ymax - y) / (ymax - ymin) * plotH; }

    var id = "pg" + (++_graphSeq);
    var p = [];
    p.push('<defs><clipPath id="clip-' + id + '"><rect x="' + padL + '" y="' + padT + '" width="' + plotW + '" height="' + plotH + '"/></clipPath></defs>');

    // Dashed grid.
    var xstep = Math.max(1, Math.round((xmax - xmin) / 12));
    var ystep = Math.max(1, Math.round((ymax - ymin) / 8));
    var gx, gy;
    for (gx = Math.ceil(xmin / xstep) * xstep; gx <= xmax; gx += xstep) {
      var px = round2(sx(gx));
      p.push('<line x1="' + px + '" y1="' + padT + '" x2="' + px + '" y2="' + (padT + plotH) + '" stroke="#e8ecf3" stroke-dasharray="3 4"/>');
    }
    for (gy = Math.ceil(ymin / ystep) * ystep; gy <= ymax; gy += ystep) {
      var py = round2(sy(gy));
      p.push('<line x1="' + padL + '" y1="' + py + '" x2="' + (padL + plotW) + '" y2="' + py + '" stroke="#e8ecf3" stroke-dasharray="3 4"/>');
      if (gy !== 0) p.push('<text x="' + (sx(0) + 6) + '" y="' + (py - 3) + '" class="pg-tick">' + gy + "</text>");
    }

    // Axes.
    var y0 = round2(sy(0)), x0 = round2(sx(0));
    if (ymin < 0 && ymax > 0) p.push('<line x1="' + padL + '" y1="' + y0 + '" x2="' + (padL + plotW) + '" y2="' + y0 + '" stroke="#8a94a6" stroke-width="1.4"/>');
    if (xmin < 0 && xmax > 0) p.push('<line x1="' + x0 + '" y1="' + padT + '" x2="' + x0 + '" y2="' + (padT + plotH) + '" stroke="#8a94a6" stroke-width="1.4"/>');
    p.push('<text x="' + (x0 + 6) + '" y="' + (padT + 12) + '" class="pg-axis">y-axis</text>');
    p.push('<text x="' + (padL + plotW - 6) + '" y="' + (y0 - 6) + '" class="pg-axis" text-anchor="end">x-axis</text>');

    // Curve.
    var d = "";
    for (var t = 0; t <= 180; t++) { var x = xmin + (xmax - xmin) * t / 180; d += (t === 0 ? "M" : "L") + round2(sx(x)) + " " + round2(sy(f(x))) + " "; }
    p.push('<path d="' + d + '" fill="none" stroke="#14233f" stroke-width="3" clip-path="url(#clip-' + id + ')"/>');

    // Roots.
    roots.forEach(function (r, idx) {
      if (r < xmin || r > xmax) return;
      p.push('<circle cx="' + round2(sx(r)) + '" cy="' + y0 + '" r="5.5" fill="#f5a623" stroke="#fff" stroke-width="1.5"/>');
      p.push('<text x="' + round2(sx(r)) + '" y="' + (y0 + 18) + '" class="pg-root">Root ' + (idx + 1) + ": " + round2(r).toFixed(2) + "</text>");
    });

    // Vertex.
    if (h >= xmin && h <= xmax) {
      p.push('<circle cx="' + round2(sx(h)) + '" cy="' + round2(sy(k)) + '" r="5.5" fill="#9aa4b8" stroke="#fff" stroke-width="1.5"/>');
      var vy = a > 0 ? round2(sy(k) - 10) : round2(sy(k) + 18);
      p.push('<text x="' + round2(sx(h)) + '" y="' + vy + '" class="pg-vertex">Vertex (' + round2(h).toFixed(1) + ", " + round2(k).toFixed(1) + ")</text>");
    }

    return { svg: '<svg viewBox="0 0 ' + W + " " + H + '" class="pg-svg" role="img" aria-label="Interactive parabola graph">' + p.join("") + "</svg>", D: D, roots: roots, h: h, k: k };
  }

  function pgEqHTML(a, b, c) {
    var out;
    if (a === 1) out = '<span class="eq-var">x<sup>2</sup></span>';
    else if (a === -1) out = '<span class="eq-op">−</span><span class="eq-var">x<sup>2</sup></span>';
    else out = '<span class="eq-num">' + a + '</span><span class="eq-var">x<sup>2</sup></span>';
    if (b !== 0) {
      out += ' <span class="eq-op">' + (b < 0 ? "−" : "+") + "</span> ";
      var ab = Math.abs(b);
      out += (ab === 1 ? "" : '<span class="eq-num">' + ab + "</span>") + '<span class="eq-var">x</span>';
    }
    if (c !== 0) out += ' <span class="eq-op">' + (c < 0 ? "−" : "+") + '</span> <span class="eq-num">' + Math.abs(c) + "</span>";
    out += ' <span class="eq-eq">=</span> <span class="eq-zero">0</span>';
    return out;
  }

  function pgUpdate() {
    var a = parseInt(document.getElementById("pg-a").value, 10);
    var b = parseInt(document.getElementById("pg-b").value, 10);
    var c = parseInt(document.getElementById("pg-c").value, 10);
    if (a === 0) { a = 1; document.getElementById("pg-a").value = "1"; } // 'a' can never be 0
    PG = { a: a, b: b, c: c };

    document.getElementById("pg-a-val").textContent = (a > 0 ? "+" : "") + a + (a > 0 ? " (Smile 😀)" : " (Frown 🙁)");
    document.getElementById("pg-b-val").textContent = (b > 0 ? "+" : "") + b;
    document.getElementById("pg-c-val").textContent = (c > 0 ? "+" : "") + c;

    document.getElementById("pg-eq").innerHTML = pgEqHTML(a, b, c);
    document.getElementById("pg-chip-a").textContent = "a = " + a;
    document.getElementById("pg-chip-b").textContent = "b = " + b;
    document.getElementById("pg-chip-c").textContent = "c = " + c;

    var res = pgPlotSVG(a, b, c);
    document.getElementById("pg-graph").innerHTML = res.svg;

    var badge = document.getElementById("pg-badge");
    badge.textContent = a > 0 ? "😀 SMILE (A > 0)" : "🙁 FROWN (A < 0)";
    badge.className = "pg-face " + (a > 0 ? "smile" : "frown");

    document.getElementById("pg-d").textContent = "D = " + res.D;
    var count, insight;
    if (res.D > 0) {
      count = "2 Distinct Keys 🔑🔑";
      insight = "Since D > 0, the curve slices through the ground at two separate points! These are your real, distinct roots: x₁ = " +
        res.roots[0].toFixed(2) + " and x₂ = " + res.roots[1].toFixed(2) + ".";
    } else if (res.D === 0) {
      count = "1 Repeated Key 🔑";
      insight = "Since D = 0, the curve just kisses the x-axis at a single point. The repeated root is x = " + res.h.toFixed(2) + ".";
    } else {
      count = "0 Real Keys";
      insight = "Since D < 0, the curve floats entirely " + (a > 0 ? "above" : "below") +
        " the x-axis and never touches it — so there are no real roots.";
    }
    document.getElementById("pg-count").textContent = count;
    document.getElementById("pg-insight").innerHTML = "<strong>Teacher's Insight:</strong> " + esc(insight);
  }

  function viewPlayground() {
    app.innerHTML =
      welcomeBanner() +
      tabBar("playground") +
      '<article class="panel playground">' +
        '<div class="pg-head">' +
          "<div>" +
            '<span class="topic-badge">INTERACTIVE GRAPHICS PLAYGROUND 🎨</span>' +
            '<h2 class="topic-title">Parabola Playground</h2>' +
            '<p class="topic-intro">Mohit, move the sliders below to shape your quadratic bowl! Watch the equation change, ' +
              "see it smile or frown, and find where the keys (roots) appear.</p>" +
          "</div>" +
          '<button class="reset-btn" id="pg-reset">🔄 RESET GRAPH</button>' +
        "</div>" +

        '<div class="pg-grid">' +
          '<div class="pg-controls">' +
            '<div class="pg-eq-card">' +
              '<div class="pg-eq-label">YOUR LIVE MACHINE EQUATION:</div>' +
              '<div class="pg-eq" id="pg-eq"></div>' +
              '<div class="pg-chips"><span class="pg-chip" id="pg-chip-a"></span>' +
                '<span class="pg-chip" id="pg-chip-b"></span><span class="pg-chip" id="pg-chip-c"></span></div>' +
            "</div>" +

            pgSlider("a", "WIDTH & DIRECTION", "A", -5, 5, PG.a, "Positive a makes the bowl smile. Negative a makes it frown!") +
            pgSlider("b", "LEFT & RIGHT SHIFT", "B", -10, 10, PG.b, "Moves the bowl's bottom left or right — it controls the symmetric center point!") +
            pgSlider("c", "Y-INTERCEPT HEIGHT", "C", -10, 10, PG.c, "Raises or lowers the whole bowl. It's where the parabola crosses the vertical line!") +

            '<div class="pg-report">' +
              '<div class="pg-report-title">✨ D-DETECTOR REPORT:</div>' +
              '<div class="pg-report-grid">' +
                '<div class="pg-stat"><div class="pg-stat-label">DISCRIMINANT</div><div class="pg-stat-val" id="pg-d"></div></div>' +
                '<div class="pg-stat"><div class="pg-stat-label">KEY ROOTS COUNT</div><div class="pg-stat-val small" id="pg-count"></div></div>' +
              "</div>" +
              '<div class="pg-insight" id="pg-insight"></div>' +
            "</div>" +
          "</div>" +

          '<div class="pg-graph-col">' +
            '<div class="pg-graph-card">' +
              '<div class="pg-face smile" id="pg-badge"></div>' +
              '<div id="pg-graph"></div>' +
            "</div>" +
            '<div class="pg-legend">' +
              '<span><i class="dot curve"></i> Parabola Curve</span>' +
              '<span><i class="dot root"></i> Roots (x-intercepts)</span>' +
              '<span><i class="dot vertex"></i> Vertex (Turning Point)</span>' +
            "</div>" +
          "</div>" +
        "</div>" +
      "</article>";

    ["a", "b", "c"].forEach(function (key) {
      document.getElementById("pg-" + key).addEventListener("input", pgUpdate);
    });
    document.getElementById("pg-reset").addEventListener("click", function () {
      document.getElementById("pg-a").value = "1";
      document.getElementById("pg-b").value = "-4";
      document.getElementById("pg-c").value = "3";
      pgUpdate();
    });

    pgUpdate();
  }

  function pgSlider(key, label, letter, min, max, value, help) {
    return (
      '<div class="pg-slider">' +
        '<div class="pg-slider-head">' +
          '<span class="pg-slider-label"><span class="dot"></span> ' + label + ' ( <b>' + letter + "</b> )</span>" +
          '<span class="pg-slider-val" id="pg-' + key + '-val"></span>' +
        "</div>" +
        '<input type="range" id="pg-' + key + '" min="' + min + '" max="' + max + '" step="1" value="' + value + '">' +
        '<div class="pg-slider-help">' + esc(help) + "</div>" +
      "</div>"
    );
  }

  // --- Progression Playground (AP / GP / HP / AGP explorer) ----------------

  var PROG = { type: "AP", a: 2, d: 3, r: 2, n: 8 };

  var PROG_TYPES = {
    AP:  { name: "Arithmetic (A.P.)", icon: "➕", face: "smile", badge: "➕ ARITHMETIC — ADD d" },
    GP:  { name: "Geometric (G.P.)", icon: "✖️", face: "gp", badge: "✖️ GEOMETRIC — MULTIPLY BY r" },
    HP:  { name: "Harmonic (H.P.)", icon: "🔄", face: "hp", badge: "🔄 HARMONIC — FLIP TO A.P." },
    AGP: { name: "Arith-Geometric (A.G.P.)", icon: "🔗", face: "agp", badge: "🔗 A.G.P. — A.P. × G.P." }
  };

  function progTerms(type, a, d, r, n) {
    var terms = [];
    for (var i = 0; i < n; i++) {
      if (type === "GP") terms.push(a * Math.pow(r, i));
      else if (type === "HP") { var den = a + i * d; terms.push(den === 0 ? Infinity : 1 / den); }
      else if (type === "AGP") terms.push((a + i * d) * Math.pow(r, i));
      else terms.push(a + i * d);
    }
    return terms;
  }

  function progNiceNum(x) {
    if (!isFinite(x)) return "∞";
    var r = Math.round(x * 1000) / 1000;
    return (Math.abs(r - Math.round(r)) < 1e-9) ? String(Math.round(r)) : String(r);
  }

  // Pretty reciprocal label for an H.P. term whose flipped-A.P. value is `den`.
  function hpFrac(den) {
    if (den === 0) return "∞";
    if (den === 1) return "1";
    if (den === -1) return "−1";
    return (den < 0 ? "−1/" + Math.abs(den) : "1/" + den);
  }

  // A "nice" grid step (1, 2, 5 × 10^k) so both huge G.P.s and tiny H.P.s read well.
  function niceStep(x) {
    if (!(x > 0)) return 1;
    var pow = Math.pow(10, Math.floor(Math.log(x) / Math.LN10));
    var f = x / pow;
    var nf = f < 1.5 ? 1 : (f < 3 ? 2 : (f < 7 ? 5 : 10));
    return nf * pow;
  }

  function progPlotSVG(terms, labelFn) {
    var W = 560, H = 430;
    var padL = 46, padR = 20, padT = 24, padB = 40;
    var plotW = W - padL - padR, plotH = H - padT - padB;
    var n = terms.length;

    var finite = terms.filter(function (v) { return isFinite(v); });
    var lo = Math.min(0, finite.length ? Math.min.apply(null, finite) : 0);
    var hi = Math.max(0, finite.length ? Math.max.apply(null, finite) : 1);
    if (hi === lo) hi = lo + 1;
    var padY = (hi - lo) * 0.12 || 1;
    var ymin = lo - padY, ymax = hi + padY;

    function sy(y) { return padT + (ymax - y) / (ymax - ymin) * plotH; }
    var slot = plotW / n;
    var barW = Math.max(6, Math.min(46, slot * 0.6));
    function cx(i) { return padL + slot * (i + 0.5); }

    var id = "prog" + (++_graphSeq);
    var p = [];
    p.push('<defs><clipPath id="clip-' + id + '"><rect x="' + padL + '" y="' + padT + '" width="' + plotW + '" height="' + plotH + '"/></clipPath></defs>');

    // Horizontal grid + y labels.
    var ystep = niceStep((ymax - ymin) / 6);
    var guard = 0;
    for (var gy = Math.ceil(ymin / ystep) * ystep; gy <= ymax && guard < 40; gy += ystep, guard++) {
      var py = round2(sy(gy));
      p.push('<line x1="' + padL + '" y1="' + py + '" x2="' + (padL + plotW) + '" y2="' + py + '" stroke="#eef1f6"/>');
      p.push('<text x="' + (padL - 8) + '" y="' + (py + 4) + '" class="prog-ylbl">' + progNiceNum(gy) + "</text>");
    }

    // Baseline (y = 0).
    var y0 = round2(sy(0));
    p.push('<line x1="' + padL + '" y1="' + y0 + '" x2="' + (padL + plotW) + '" y2="' + y0 + '" stroke="#9aa4b8" stroke-width="1.3"/>');

    // Bars + labels for each term.
    terms.forEach(function (v, i) {
      var ly;
      if (isFinite(v)) {
        var x = round2(cx(i) - barW / 2);
        var top = round2(sy(Math.max(0, v)));
        var bot = round2(sy(Math.min(0, v)));
        var hgt = Math.max(1, bot - top);
        p.push('<rect x="' + x + '" y="' + top + '" width="' + round2(barW) + '" height="' + round2(hgt) + '" rx="3" fill="' + (v < 0 ? "#e0544e" : "#4f7cf0") + '" opacity="0.85"/>');
        ly = v >= 0 ? top - 6 : bot + 14;
      } else {
        ly = padT + 12;
      }
      var lbl = labelFn ? labelFn(v, i) : progNiceNum(v);
      p.push('<text x="' + round2(cx(i)) + '" y="' + ly + '" class="prog-vlbl">' + esc(lbl) + "</text>");
      p.push('<text x="' + round2(cx(i)) + '" y="' + (padT + plotH + 16) + '" class="prog-ilbl">a' + (i + 1) + "</text>");
    });

    // Connecting line across finite tops (shows the growth shape).
    var d = "", started = false;
    terms.forEach(function (v, i) {
      if (!isFinite(v)) { started = false; return; }
      d += (started ? "L" : "M") + round2(cx(i)) + " " + round2(sy(v)) + " ";
      started = true;
    });
    p.push('<path d="' + d + '" fill="none" stroke="#14233f" stroke-width="2.2" clip-path="url(#clip-' + id + ')"/>');
    terms.forEach(function (v, i) {
      if (isFinite(v)) p.push('<circle cx="' + round2(cx(i)) + '" cy="' + round2(sy(v)) + '" r="3.4" fill="#f5a623" stroke="#fff" stroke-width="1.2"/>');
    });

    return '<svg viewBox="0 0 ' + W + " " + H + '" class="pg-svg" role="img" aria-label="Progression bar chart">' + p.join("") + "</svg>";
  }

  function progEqHTML(type, a, d, r) {
    var dsign = d < 0 ? "−" : "+";
    var apPart = '<span class="eq-num">' + a + '</span> <span class="eq-op">' + dsign + '</span> ' +
      '<span class="eq-num">(n−1)</span><span class="eq-op">·</span><span class="eq-num">' + Math.abs(d) + "</span>";
    var gpPow = ' <span class="eq-op">·</span> <span class="eq-num">' + r + '</span><span class="eq-var"><sup>(n−1)</sup></span>';
    if (type === "GP") return '<span class="eq-num">' + a + "</span>" + gpPow;
    if (type === "HP") return '<span class="eq-op">1 ⁄ (</span>' + apPart + '<span class="eq-op">)</span>';
    if (type === "AGP") return '<span class="eq-op">(</span>' + apPart + '<span class="eq-op">)</span>' + gpPow;
    return apPart;
  }

  function progInsight(type, a, d, r, n, terms, sum) {
    var last = terms[terms.length - 1];
    if (type === "AP") {
      var dir = d > 0 ? "climbs up" : (d < 0 ? "steps down" : "stays flat");
      return "This staircase " + dir + " by a fixed " + Math.abs(d) + " each step. The nth term is " +
        "a + (n−1)d = " + progNiceNum(last) + ", and the sum uses (average of first & last) × count = " +
        progNiceNum(sum) + ".";
    }
    if (type === "GP") {
      var inf = "";
      if (Math.abs(r) > 1) inf = " Since |r| > 1 the terms explode — the 'chessboard rice' kind of growth!";
      return "Each term is " + r + "× the one before it. The nth term is a·r^(n−1) = " + progNiceNum(last) +
        ", and the sum of these " + n + " terms is " + progNiceNum(sum) + "." + inf;
    }
    if (type === "HP") {
      var flip = [];
      for (var i = 0; i < Math.min(n, 4); i++) flip.push(progNiceNum(a + i * d));
      return "Flip every term upside-down and you get the A.P. " + flip.join(", ") + ", … (common difference d = " + d +
        "). Solve it as an A.P., then flip back: the nth term is 1 ⁄ (a + (n−1)d) = " + hpFrac(a + (n - 1) * d) + ".";
    }
    return "This hybrid multiplies the A.P. part (a, a+d, …) by the G.P. part (1, r, r²…) term by term. " +
      "The nth term is (a + (n−1)d)·r^(n−1) = " + progNiceNum(last) + ", and these " + n +
      " terms add to " + progNiceNum(sum) + ".";
  }

  function progUpdate() {
    var type = PROG.type;
    var a = parseInt(document.getElementById("prog-a").value, 10);
    var n = parseInt(document.getElementById("prog-n").value, 10);
    var dEl = document.getElementById("prog-d");
    var rEl = document.getElementById("prog-r");
    var d = dEl ? parseInt(dEl.value, 10) : PROG.d;
    var r = rEl ? parseInt(rEl.value, 10) : PROG.r;
    if (rEl && r === 0) { r = 2; rEl.value = "2"; } // r = 0 collapses a G.P.
    PROG = { type: type, a: a, d: d, r: r, n: n };

    document.getElementById("prog-a-val").textContent = (a > 0 ? "+" : "") + a;
    if (dEl) document.getElementById("prog-d-val").textContent = (d > 0 ? "+" : "") + d;
    if (rEl) document.getElementById("prog-r-val").textContent = (r > 0 ? "+" : "") + r;
    document.getElementById("prog-n-val").textContent = n + " terms";

    document.getElementById("prog-eq").innerHTML = progEqHTML(type, a, d, r);

    var chips = ["a = " + a];
    if (type === "AP" || type === "HP" || type === "AGP") chips.push("d = " + d);
    if (type === "GP" || type === "AGP") chips.push("r = " + r);
    chips.push("n = " + n);
    document.getElementById("prog-chips").innerHTML = chips.map(function (c) {
      return '<span class="pg-chip">' + esc(c) + "</span>";
    }).join("");

    var terms = progTerms(type, a, d, r, n);
    var sum = 0;
    terms.forEach(function (v) { if (isFinite(v)) sum += v; });
    var last = terms[terms.length - 1];
    var labelFn = type === "HP" ? function (v, i) { return hpFrac(a + i * d); } : null;

    // Sequence chips (with the operator that links consecutive terms).
    var arrow = type === "AP" ? (d < 0 ? "−" + Math.abs(d) : "+" + d)
      : type === "GP" ? "×" + r : "→";
    document.getElementById("prog-seq").innerHTML = terms.map(function (v, i) {
      var lbl = labelFn ? labelFn(v, i) : progNiceNum(v);
      return '<span class="prog-term' + (i === terms.length - 1 ? " last" : "") + '">' + esc(lbl) + "</span>";
    }).join('<span class="prog-arrow">' + esc(arrow) + "</span>");

    document.getElementById("prog-graph").innerHTML = progPlotSVG(terms, labelFn);

    document.getElementById("prog-last").textContent = labelFn ? labelFn(last, n - 1) : progNiceNum(last);
    document.getElementById("prog-sum").textContent = progNiceNum(sum);

    var meta = PROG_TYPES[type];
    var badge = document.getElementById("prog-badge");
    badge.textContent = meta.badge;
    badge.className = "pg-face " + meta.face;

    document.getElementById("prog-insight").innerHTML =
      "<strong>Teacher's Insight:</strong> " + esc(progInsight(type, a, d, r, n, terms, sum));
  }

  function progFirstTermCfg(type) {
    if (type === "HP") return { label: "FIRST TERM (flipped A.P.)", min: -10, max: 10,
      help: "For an H.P. this is the first term of the flipped A.P.; the first H.P. term is its reciprocal." };
    return { label: "FIRST TERM", min: -10, max: 10, help: "The starting value of your sequence — where it begins." };
  }

  function progStepSliders(type) {
    var out = [];
    if (type === "AP" || type === "HP" || type === "AGP") {
      out.push({
        id: "prog-d",
        label: type === "HP" ? "FLIPPED A.P. STEP" : "COMMON DIFFERENCE",
        letter: "d",
        min: type === "HP" ? -6 : -10,
        max: type === "HP" ? 6 : 10,
        value: PROG.d,
        help: type === "HP"
          ? "The reciprocals form an A.P.; d is that A.P.'s common difference."
          : "Each term adds a fixed d (the A.P. part). Positive climbs, negative steps down."
      });
    }
    if (type === "GP" || type === "AGP") {
      out.push({
        id: "prog-r", label: "COMMON RATIO", letter: "r", min: -4, max: 4, value: PROG.r,
        help: "Each term is multiplied by r (the G.P. part). |r| > 1 explodes; |r| < 1 shrinks."
      });
    }
    return out;
  }

  function viewProgressionPlayground() {
    var aCfg = progFirstTermCfg(PROG.type);
    var stepSliders = progStepSliders(PROG.type).map(function (s) {
      return pgSliderCustom(s.id, s.label, s.letter, s.min, s.max, s.value, s.help);
    }).join("");

    var toggle = Object.keys(PROG_TYPES).map(function (k) {
      var m = PROG_TYPES[k];
      return '<button class="prog-type-btn" data-type="' + k + '">' + m.icon + " " + esc(m.name) + "</button>";
    }).join("");

    app.innerHTML =
      welcomeBanner() +
      tabBar("playground") +
      '<article class="panel playground">' +
        '<div class="pg-head">' +
          "<div>" +
            '<span class="topic-badge">INTERACTIVE PROGRESSION PLAYGROUND 📊</span>' +
            '<h2 class="topic-title">Progression Playground</h2>' +
            '<p class="topic-intro">Mohit, switch between an Arithmetic (adding), Geometric (multiplying), ' +
              "Harmonic (flip-to-A.P.) or Arithmetic-Geometric (A.P. × G.P.) progression, then move the sliders " +
              "to build your own sequence. Watch the terms, the nth-term formula and the running sum update live!</p>" +
          "</div>" +
          '<button class="reset-btn" id="prog-reset">🔄 RESET</button>' +
        "</div>" +

        '<div class="pg-grid">' +
          '<div class="pg-controls">' +
            '<div class="prog-toggle" role="tablist">' + toggle + "</div>" +

            '<div class="pg-eq-card">' +
              '<div class="pg-eq-label">YOUR LIVE nth-TERM MACHINE:</div>' +
              '<div class="pg-eq"><span class="eq-op">a<sub>n</sub> =</span> <span id="prog-eq"></span></div>' +
              '<div class="pg-chips" id="prog-chips"></div>' +
            "</div>" +

            pgSliderCustom("prog-a", aCfg.label, "a", aCfg.min, aCfg.max, PROG.a, aCfg.help) +
            stepSliders +
            pgSliderCustom("prog-n", "NUMBER OF TERMS", "n", 2, 12, PROG.n, "How many terms to generate and add up.") +

            '<div class="pg-report">' +
              '<div class="pg-report-title">✨ SEQUENCE REPORT:</div>' +
              '<div class="pg-report-grid">' +
                '<div class="pg-stat"><div class="pg-stat-label">nth (LAST) TERM</div><div class="pg-stat-val" id="prog-last"></div></div>' +
                '<div class="pg-stat"><div class="pg-stat-label">SUM OF n TERMS</div><div class="pg-stat-val" id="prog-sum"></div></div>' +
              "</div>" +
              '<div class="pg-insight" id="prog-insight"></div>' +
            "</div>" +
          "</div>" +

          '<div class="pg-graph-col">' +
            '<div class="pg-graph-card">' +
              '<div class="pg-face smile" id="prog-badge"></div>' +
              '<div id="prog-graph"></div>' +
            "</div>" +
            '<div class="prog-seq-card">' +
              '<div class="prog-seq-label">GENERATED SEQUENCE:</div>' +
              '<div class="prog-seq" id="prog-seq"></div>' +
            "</div>" +
            '<div class="pg-legend">' +
              '<span><i class="dot curve"></i> Term value (bar)</span>' +
              '<span><i class="dot root"></i> Growth path</span>' +
            "</div>" +
          "</div>" +
        "</div>" +
      "</article>";

    // Wire up the four-way type toggle (re-renders with the right sliders).
    Array.prototype.forEach.call(app.querySelectorAll(".prog-type-btn"), function (btn) {
      if (btn.getAttribute("data-type") === PROG.type) btn.classList.add("active");
      btn.addEventListener("click", function () {
        var next = btn.getAttribute("data-type");
        if (next === PROG.type) return;
        PROG.type = next;
        viewProgressionPlayground();
      });
    });

    // Every range slider inside the controls column drives a live update.
    Array.prototype.forEach.call(app.querySelectorAll('.pg-controls input[type="range"]'), function (el) {
      el.addEventListener("input", progUpdate);
    });
    document.getElementById("prog-reset").addEventListener("click", function () {
      PROG = { type: PROG.type, a: 2, d: 3, r: 2, n: 8 };
      viewProgressionPlayground();
    });

    progUpdate();
    renderMath();
  }

  // Slider variant whose id is passed verbatim (no "pg-" prefix added).
  function pgSliderCustom(id, label, letter, min, max, value, help) {
    return (
      '<div class="pg-slider">' +
        '<div class="pg-slider-head">' +
          '<span class="pg-slider-label"><span class="dot"></span> ' + label + ' ( <b>' + letter + "</b> )</span>" +
          '<span class="pg-slider-val" id="' + id + '-val"></span>' +
        "</div>" +
        '<input type="range" id="' + id + '" min="' + min + '" max="' + max + '" step="1" value="' + value + '">' +
        '<div class="pg-slider-help">' + esc(help) + "</div>" +
      "</div>"
    );
  }

  function viewPlaceholder(tab, icon, title, text) {
    app.innerHTML =
      welcomeBanner() +
      tabBar(tab) +
      '<article class="panel placeholder">' +
        '<div class="ph-icon">' + icon + "</div>" +
        "<h2>" + esc(title) + "</h2>" +
        "<p>" + esc(text) + "</p>" +
      "</article>";
    renderMath();
  }

  // --- Router --------------------------------------------------------------

  var _lastTopic = null;
  var isInitialLoad = true;

  function currentTopicId() {
    var topics = content().topics || [];
    if (_lastTopic && topics.some(function (t) { return t.id === _lastTopic; })) return _lastTopic;
    return topics[0] ? topics[0].id : "";
  }

  function playgroundView() {
    var kind = chapterMeta(currentChapterId).playground;
    if (kind === "progression") return viewProgressionPlayground();
    return viewPlayground();
  }

  function router() {
    var hash = window.location.hash.replace(/^#/, "") || "/";
    var parts = hash.split("/").filter(Boolean);

    // Optional leading chapter id, e.g. #/progressions/notes/ap-basics.
    if (parts.length && CHAPTER_IDS.indexOf(parts[0]) !== -1) {
      currentChapterId = parts.shift();
    }

    var view = parts[0];

    // Tab switches and the initial load go to the top of the page; topic
    // selections inside Student Notes scroll to the content (handled in
    // viewNotes) so the syllabus index stays in view.
    if (view !== "notes") window.scrollTo(0, 0);

    updateModuleLabel();

    if (view === "notes" && parts[1]) {
      _lastTopic = parts[1];
      viewNotes(parts[1]);
    } else if (view === "notes") {
      viewNotes(currentTopicId());
    } else if (view === "revision") {
      viewRevision();
    } else if (view === "quiz") {
      viewQuiz();
    } else if (view === "playground") {
      playgroundView();
    } else if (view === "chat") {
      viewPlaceholder(
        "chat", "💬", "AI Teacher Chat",
        "Your AI teacher chat will live here. Meanwhile, use the Student Notes and Practice Quiz Arena to master every concept."
      );
    } else {
      viewNotes(currentTopicId());
    }
  }

  window.addEventListener("hashchange", router);
  window.addEventListener("DOMContentLoaded", function () {
    fillHeader();
    updateModuleLabel();
    router();
    isInitialLoad = false;
  });
})();
