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

  // --- Helpers -------------------------------------------------------------

  function esc(str) {
    return String(str == null ? "" : str).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function findTopic(id) {
    var found = null;
    data.topics.forEach(function (t) { if (t.id === id) found = t; });
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
    var chapter = (data.chapters || [])[0] || { num: "01", label: "QUADRATIC EQUATIONS" };
    setText("module-value", chapter.num + " // " + chapter.label);
  }

  // --- Shared building blocks ---------------------------------------------

  function welcomeBanner() {
    var w = data.welcome || {};
    var chapters = (data.chapters || []).map(function (c) {
      var cls = "chapter-btn" + (c.active ? " active" : " locked");
      return '<div class="' + cls + '">CHAPTER ' + esc(c.num) + " // " + esc(c.label) + "</div>";
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
    var tabs = (data.tabs || []).map(function (t) {
      var href = t.id === "notes" ? "#/notes/" + currentTopicId() : "#/" + t.id;
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
    var items = (data.topics || []).map(function (t) {
      var cls = "syllabus-item" + (t.id === activeId ? " active" : "");
      return (
        '<a class="' + cls + '" href="#/notes/' + esc(t.id) + '">' +
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
        '<div class="syllabus-sub">Explore all ' + (data.topics || []).length + " core JEE foundation topics</div>" +
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
    var t = findTopic(topicId) || (data.topics || [])[0];
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
    var rows = (data.revision || []).map(function (r) {
      return "<tr><td>" + esc(r.topic) + "</td><td>" + r.result + "</td></tr>";
    }).join("");

    app.innerHTML =
      welcomeBanner() +
      tabBar("revision") +
      '<article class="panel">' +
        '<div class="topic-tags"><span class="topic-badge">QUICK REVISION</span>' +
        '<span class="topic-note-label"><span class="dot">●</span> ONE-PAGE MEMORY MAP</span></div>' +
        '<h2 class="topic-title">Quick Revision Sheet</h2>' +
        '<p class="topic-intro">The must-remember results for Quadratic Equations. Review these before every test.</p>' +
        '<table class="data-table"><thead><tr><th>Topic</th><th>Must-remember result</th></tr></thead><tbody>' +
        rows + "</tbody></table>" +
      "</article>";
    renderMath();
  }

  function viewQuiz() {
    var items = (data.quiz || []).map(function (q, i) {
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
    if (_lastTopic) return _lastTopic;
    var first = (data.topics || [])[0];
    return first ? first.id : "";
  }

  function router() {
    var hash = window.location.hash.replace(/^#/, "") || "/";
    var parts = hash.split("/").filter(Boolean);

    var view = parts[0];

    // Tab switches and the initial load go to the top of the page; topic
    // selections inside Student Notes scroll to the content (handled in
    // viewNotes) so the syllabus index stays in view.
    if (view !== "notes") window.scrollTo(0, 0);

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
      viewPlaceholder(
        "playground", "📈", "Parabola Playground",
        "An interactive graphing space is coming soon. For now, sketch each parabola using the vertex x = −b/2a and the discriminant to see whether it cuts, touches or misses the x-axis."
      );
    } else if (view === "chat") {
      viewPlaceholder(
        "chat", "💬", "AI Teacher Chat",
        "Your AI teacher chat will live here. Meanwhile, use the Student Notes and Practice Quiz Arena to master every quadratic concept."
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
