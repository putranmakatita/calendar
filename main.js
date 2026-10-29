const BLN = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"],
    HR = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"],
    HB = ["Muharam", "Safar", "Rabiulawal", "Rabiulakhir", "Jumadilawal", "Jumadilakhir", "Rajab", "Syakban", "Ramadan", "Syawal", "Zulkaidah", "Zulhijah"],
    PS = ["Legi", "Pahing", "Pon", "Wage", "Kliwon"],
    T = { nas: "Libur Nasional", cuti: "Cuti Bersama", besar: "Hari Besar", int: "Hari Internasional" };
const BESAR = [[3, 1, "Serangan Umum 1 Maret"], [3, 9, "Hari Musik Nasional"], [3, 30, "Hari Film Nasional"], [4, 21, "Hari Kartini"], [5, 2, "Hari Pendidikan Nasional"], [5, 20, "Hari Kebangkitan Nasional"], [7, 1, "Hari Bhayangkara"], [7, 23, "Hari Anak Nasional"], [8, 14, "Hari Pramuka"], [9, 9, "Hari Olahraga Nasional"], [9, 17, "Hari Palang Merah Indonesia"], [10, 1, "Hari Kesaktian Pancasila"], [10, 2, "Hari Batik Nasional"], [10, 5, "HUT TNI"], [10, 22, "Hari Santri"], [10, 28, "Hari Sumpah Pemuda"], [11, 10, "Hari Pahlawan"], [11, 12, "Hari Kesehatan Nasional"], [11, 25, "Hari Guru Nasional"], [12, 19, "Hari Bela Negara"], [12, 22, "Hari Ibu"]];
const INT = [[1, 27, "Hari Peringatan Holocaust"], [2, 4, "Hari Kanker Sedunia"], [2, 14, "Hari Valentine"], [2, 21, "Hari Bahasa Ibu Internasional"], [3, 8, "Hari Perempuan Internasional"], [3, 14, "Hari Pi"], [3, 22, "Hari Air Sedunia"], [4, 1, "April Mop"], [4, 7, "Hari Kesehatan Sedunia"], [4, 22, "Hari Bumi"], [4, 23, "Hari Buku Sedunia"], [5, 3, "Hari Kebebasan Pers Sedunia"], [5, 31, "Hari Tanpa Tembakau Sedunia"], [6, 5, "Hari Lingkungan Hidup Sedunia"], [6, 8, "Hari Laut Sedunia"], [6, 20, "Hari Pengungsi Sedunia"], [7, 11, "Hari Kependudukan Sedunia"], [8, 12, "Hari Pemuda Internasional"], [9, 8, "Hari Aksara Internasional"], [9, 21, "Hari Perdamaian Internasional"], [9, 27, "Hari Pariwisata Sedunia"], [10, 1, "Hari Lansia Internasional"], [10, 5, "Hari Guru Sedunia"], [10, 10, "Hari Kesehatan Jiwa Sedunia"], [10, 16, "Hari Pangan Sedunia"], [10, 24, "Hari PBB"], [10, 31, "Halloween"], [11, 20, "Hari Anak Sedunia"], [12, 1, "Hari AIDS Sedunia"], [12, 3, "Hari Disabilitas Internasional"], [12, 10, "Hari HAM Internasional"], [12, 24, "Malam Natal"], [12, 31, "Malam Tahun Baru"]];
const HJ = { "1-1": ["Tahun Baru Islam", "nas"], "7-27": ["Isra Mi’raj Nabi Muhammad SAW", "nas"], "9-1": ["Awal Ramadan", "besar"], "9-17": ["Nuzulul Qur’an", "besar"], "10-1": ["Hari Raya Idul Fitri", "nas"], "10-2": ["Hari Raya Idul Fitri (hari ke-2)", "nas"], "12-9": ["Hari Arafah", "besar"], "12-10": ["Hari Raya Idul Adha", "nas"], "3-12": ["Maulid Nabi Muhammad SAW", "nas"] };
let Y, M, sel, off = 0; const on = { nas: 1, cuti: 1, besar: 1, int: 1 }, cache = {};
const U = (y, m, d) => Date.UTC(y, m, d), D = 864e5, jdOf = t => t / D + 2440587.5,
    key = t => { const x = new Date(t); return x.getUTCMonth() + "-" + x.getUTCDate() },
    dt = t => new Date(t);
const h2j = (y, m, d) => d + Math.ceil(29.5 * (m - 1)) + (y - 1) * 354 + Math.floor((3 + 11 * y) / 30) + 1948438.5;
function hij(t) { const j = jdOf(t) - off, y = Math.floor((30 * (j - 1948439.5) + 10646) / 10631), m = Math.min(12, Math.ceil((j - (29 + h2j(y, 1, 1))) / 29.5) + 1); return [y, m, j - h2j(y, m, 1) + 1] }
function easter(y) { const a = y % 19, b = Math.floor(y / 100), c = y % 100, d = Math.floor(b / 4), e = b % 4, f = Math.floor((b + 8) / 25), g = Math.floor((b - f + 1) / 3), h = (19 * a + b - d - g + 15) % 30, i = Math.floor(c / 4), k = c % 4, l = (32 + 2 * e + 2 * i - h - k) % 7, m = Math.floor((a + 11 * h + 22 * l) / 451), n = h + l - 7 * m + 114; return U(y, Math.floor(n / 31) - 1, n % 31 + 1) }
const SY = 29.530588853;
function moons(y, ref, tz) { const out = []; let n = Math.ceil((jdOf(U(y, 0, 1)) - 3 - ref) / SY); for (; ; n++) { const j = ref + n * SY + tz / 24, t = (Math.floor(j + .5) - 2440588) * D; if (dt(t).getUTCFullYear() > y) break; if (dt(t).getUTCFullYear() == y) out.push(t) } return out }
function nth(y, m, wd, n) { const f = dt(U(y, m, 1)).getUTCDay(); return U(y, m, 1 + (wd - f + 7) % 7 + 7 * (n - 1)) }
function build(y) {
    const k = y + "|" + off; if (cache[k]) return cache[k];
    const E = {}, add = (t, n, c) => { if (dt(t).getUTCFullYear() !== y) return; (E[key(t)] = E[key(t)] || []).push({ n, c }) };
    add(U(y, 0, 1), "Tahun Baru Masehi", "nas"); add(U(y, 7, 17), "Hari Kemerdekaan RI", "nas"); add(U(y, 11, 25), "Hari Raya Natal", "nas");
    add(U(y, 4, 1), "Hari Buruh Internasional", y >= 2014 ? "nas" : "int");
    add(U(y, 5, 1), "Hari Lahir Pancasila", y >= 2017 ? "nas" : "besar");
    BESAR.forEach(([m, d, n]) => add(U(y, m - 1, d), n, "besar")); INT.forEach(([m, d, n]) => add(U(y, m - 1, d), n, "int"));
    add(nth(y, 4, 0, 2), "Hari Ibu (Mother’s Day)", "int"); add(nth(y, 5, 0, 3), "Hari Ayah (Father’s Day)", "int"); add(nth(y, 10, 4, 4), "Thanksgiving (AS)", "int");
    const e = easter(y); add(e - 2 * D, "Wafat Isa Almasih", "nas"); add(e, "Hari Paskah", y >= 2024 ? "nas" : "besar"); add(e + 39 * D, "Kenaikan Isa Almasih", "nas");
    let fitri = 0;
    for (let t = U(y, 0, 1); t <= U(y, 11, 31); t += D) { const [, hm, hd] = hij(t), v = HJ[hm + "-" + hd]; if (v) { add(t, v[0], v[1]); if (hm == 10 && hd == 1) fitri = t } }
    if (y >= 2003 && fitri) { [-2, -1, 2, 3].forEach(i => { const t = fitri + i * D, w = dt(t).getUTCDay(); if (w && w < 6) add(t, "Cuti Bersama Idul Fitri", "cuti") }) }
    if (y >= 2010) { const t = U(y, 11, 26), w = dt(t).getUTCDay(); if (w && w < 6) add(t, "Cuti Bersama Natal", "cuti") }
    const wk = moons(y, 2451564.696, 7).find(t => { const x = dt(t), m = x.getUTCMonth(), d = x.getUTCDate(); return (m == 4 && d >= 6) || (m == 5 && d <= 5) });
    if (wk) add(wk, "Hari Raya Waisak", "nas");
    const ny = moons(y, 2451550.26, 8).find(t => dt(t).getUTCMonth() == 2);
    if (ny) add(ny, "Hari Raya Nyepi (Tahun Baru Saka)", "nas");
    try {
        const f = new Intl.DateTimeFormat("en-u-ca-chinese-nu-latn", { month: "numeric", day: "numeric", timeZone: "UTC" });
        for (let t = U(y, 0, 18); t <= U(y, 1, 25); t += D) {
            const p = Object.fromEntries(f.formatToParts(t).map(x => [x.type, x.value]));
            if (p.month == "1" && p.day == "1") { add(t, "Tahun Baru Imlek", y >= 2003 ? "nas" : "int"); break }
        }
    } catch (_) { }
    return cache[k] = E
}
const $ = id => document.getElementById(id), pad = n => String(n).padStart(2, "0");
const evs = t => (build(dt(t).getUTCFullYear())[key(t)] || []);
const vis = t => evs(t).filter(e => on[e.c]).sort((a, b) => "nas cuti besar int".indexOf(a.c) - "nas cuti besar int".indexOf(b.c));
const pas = t => PS[(((Math.round((t - U(1945, 7, 17)) / D)) % 5) + 5) % 5];
function render() {
    const first = dt(U(Y, M, 1)).getUTCDay(), dim = dt(U(Y, M + 1, 0)).getUTCDate(), now = new Date(), td = U(now.getFullYear(), now.getMonth(), now.getDate());
    let h = HR.map(d => `<div class="dh">${d.slice(0, 3)}</div>`).join("") + '<div class="cell blank"></div>'.repeat(first);
    const hijM = new Set();
    for (let d = 1; d <= dim; d++) {
        const t = U(Y, M, d), ev = vis(t), w = dt(t).getUTCDay(), hd = hij(t), c = ev.some(e => e.c == "nas") ? "nas" : ev.some(e => e.c == "cuti") ? "cuti" : "";
        hijM.add(hd[1] + " " + hd[0]);
        const chips = ev.slice(0, 2).map(e => `<div class="${e.c}"><i class="dot"></i><span>${e.n}</span></div>`).join("") + (ev.length > 2 ? `<div><span style="color:var(--mut)">+${ev.length - 2}</span></div>` : "");
        h += `<button class="cell ${c} ${w == 0 ? "sun" : ""} ${t == td ? "today" : ""} ${t == sel ? "sel" : ""}" data-t="${t}" aria-label="${d} ${BLN[M]} ${Y}${ev.length ? ": " + ev.map(e => e.n).join(", ") : ""}"><span class="n">${d}</span><span class="h">${hd[2] == 1 ? hd[2] + " " + HB[hd[1] - 1].slice(0, 3) : hd[2]}</span><div class="ev">${chips}</div></button>`
    }
    $("grid").innerHTML = h;
    const hs = [...hijM].map(x => { const [m, y] = x.split(" "); return HB[m - 1] + " " + y + " H" });
    $("title").innerHTML = `${BLN[M]} ${Y}<span>${hs[0]}${hs.length > 1 ? " – " + hs[hs.length - 1] : ""}</span>`;
    $("mon").value = M; $("yr").value = Y;
    $("prev").disabled = Y == 1990 && M == 0; $("next").disabled = Y == 2099 && M == 11;
    let nas = 0, cu = 0, list = "";
    for (let d = 1; d <= dim; d++) { const t = U(Y, M, d); vis(t).forEach(e => { if (e.c == "nas") nas++; if (e.c == "cuti") cu++; list += `<li data-t="${t}"><b>${d}</b><i class="dot ${e.c}"></i><div>${e.n}<br><em>${T[e.c]} · ${HR[dt(t).getUTCDay()]}</em></div></li>` }) }
    $("mlist").innerHTML = list || '<li class="empty">Tidak ada agenda dengan filter ini.</li>';
    $("stat").textContent = `${nas} libur nasional · ${cu} cuti bersama`;
    detail(); year();
}
function detail() {
    if (!sel) sel = U(Y, M, 1);
    const x = dt(sel), hd = hij(sel), ev = vis(sel);
    $("detail").innerHTML = `<h3>${HR[x.getUTCDay()]} ${pas(sel)}, ${x.getUTCDate()} ${BLN[x.getUTCMonth()]} ${x.getUTCFullYear()}</h3><div class="sub">${hd[2]} ${HB[hd[1] - 1]} ${hd[0]} H</div>` +
        (ev.length ? `<ul class="list">${ev.map(e => `<li style="cursor:default"><i class="dot ${e.c}"></i><div>${e.n}<br><em>${T[e.c]}</em></div></li>`).join("")}</ul>` : '<div class="empty">Tidak ada hari libur atau peringatan.</div>');
}
function year() {
    let n = 0, h = "";
    for (let t = U(Y, 0, 1); t <= U(Y, 11, 31); t += D) { evs(t).filter(e => e.c == "nas" || e.c == "cuti").forEach(e => { n++; const x = dt(t); h += `<div><b>${x.getUTCDate()} ${BLN[x.getUTCMonth()].slice(0, 3)}</b><span class="${e.c}">● </span>${e.n}</div>` }) }
    $("ysum").textContent = `Daftar libur nasional & cuti bersama ${Y} (${n})`; $("ylist").innerHTML = h;
}
function go(dm) { let m = M + dm, y = Y; if (m < 0) { m = 11; y-- } if (m > 11) { m = 0; y++ } if (y < 1990 || y > 2099) return; M = m; Y = y; sel = U(Y, M, 1); render() }
$("mon").innerHTML = BLN.map((b, i) => `<option value="${i}">${b}</option>`).join("");
$("yr").innerHTML = Array.from({ length: 110 }, (_, i) => `<option>${1990 + i}</option>`).join("");
$("chips").innerHTML = Object.keys(T).map(k => `<button class="chip ${k}" data-k="${k}" aria-pressed="true"><i></i><span>${T[k]}</span></button>`).join("");
$("chips").onclick = e => { const b = e.target.closest("[data-k]"); if (!b) return; on[b.dataset.k] ^= 1; b.setAttribute("aria-pressed", !!on[b.dataset.k]); render() };
$("grid").onclick = e => { const b = e.target.closest("[data-t]"); if (b) { sel = +b.dataset.t; render() } };
$("mlist").onclick = e => { const b = e.target.closest("[data-t]"); if (b) { sel = +b.dataset.t; render() } };
$("prev").onclick = () => go(-1); $("next").onclick = () => go(1);
$("mon").onchange = e => { M = +e.target.value; sel = U(Y, M, 1); render() };
$("yr").onchange = e => { Y = +e.target.value; sel = U(Y, M, 1); render() };
$("off").onchange = e => { off = +e.target.value; render() };
$("today").onclick = () => { const n = new Date(); Y = Math.min(2099, Math.max(1990, n.getFullYear())); M = n.getMonth(); sel = U(n.getFullYear(), M, n.getDate()); render() };
$("theme").onclick = () => { const r = document.documentElement, d = r.dataset.theme ? r.dataset.theme == "dark" : matchMedia("(prefers-color-scheme:dark)").matches; r.dataset.theme = d ? "light" : "dark" };
addEventListener("keydown", e => { if (/SELECT|INPUT/.test(e.target.tagName)) return; if (e.key == "ArrowLeft") go(-1); if (e.key == "ArrowRight") go(1) });
$("today").click();