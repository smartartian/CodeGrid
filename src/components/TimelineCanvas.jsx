import { useEffect, useRef } from "react";

// Canvas 实现的时间线：绘制主线/节点/卡片，支持拖拽滚动、hover 高亮、入场动效
const CARD_W = 176;
const CARD_H = 150;
const GAP = 28;
const LINE_Y = 34; // 主线 y（圆点中心）
const CARD_TOP = 48;
const DATE_Y = 18;

const COLORS = {
  navy: "#0d4a8a",
  navyLight: "#1a4b8c",
  linkBlue: "#0d5eaf",
  red: "#c41e2a",
  wash: "#f0f4f8",
  washBorder: "#d9e2ec",
  text: "#333333",
  textSoft: "#555555",
  textMuted: "#888888",
  paper: "#ffffff",
  redGlow: "rgba(196,30,42,0.12)",
};

const FONT = "'Microsoft YaHei','PingFang SC','Hiragino Sans GB','Noto Sans CJK SC',sans-serif";

function reducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export default function TimelineCanvas({ articles }) {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const stateRef = useRef({
    offset: 0,
    dragging: false,
    startX: 0,
    startOffset: 0,
    moved: false,
    hover: -1,
    width: 0,
    dpr: 1,
    t0: 0,
    done: false,
  });

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    const st = stateRef.current;

    const n = articles.length;
    const contentW = n * (CARD_W + GAP) - GAP;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = wrap.clientWidth;
      st.width = w;
      st.dpr = dpr;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(450 * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = "450px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const maxOffset = Math.max(0, contentW + 16 - w);
      st.offset = Math.min(st.offset, maxOffset);
      if (!st.done) st.done = true;
    }

    function wrapText(text, maxWidth) {
      if (ctx.measureText(text).width <= maxWidth) return [text];
      let line = "";
      const lines = [];
      for (const ch of text) {
        if (ctx.measureText(line + ch).width > maxWidth) {
          lines.push(line);
          line = ch;
          if (lines.length === 2) break;
        } else {
          line += ch;
        }
      }
      if (lines.length === 2) {
        const last = lines[1];
        let cut = last;
        while (ctx.measureText(cut + "…").width > maxWidth && cut.length > 0) {
          cut = cut.slice(0, -1);
        }
        lines[1] = cut + "…";
        return lines;
      }
      lines.push(line);
      return lines;
    }

    function draw() {
      ctx.clearRect(0, 0, st.width, 450);
      const x0 = Math.max(8, (st.width - contentW) / 2);
      const left = x0 - st.offset;

      // 主线：渐变
      const grad = ctx.createLinearGradient(0, 0, st.width, 0);
      grad.addColorStop(0, COLORS.washBorder);
      grad.addColorStop(0.5, COLORS.navy);
      grad.addColorStop(1, COLORS.red);
      ctx.globalAlpha = 0.55;
      ctx.strokeStyle = grad;
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(left, LINE_Y);
      ctx.lineTo(left + contentW, LINE_Y);
      ctx.stroke();
      ctx.globalAlpha = 1;

      articles.forEach((a, i) => {
        const cx = left + i * (CARD_W + GAP) + CARD_W / 2;
        const delay = i * 90;
        const elapsed = st.done ? 9999 : performance.now() - st.t0;
        let prog = (elapsed - delay) / 500;
        if (st.done) prog = 1;
        if (reducedMotion()) prog = 1;
        if (prog < 0) prog = 0;
        if (prog > 1) prog = 1;
        const ease = 1 - Math.pow(1 - prog, 3);

        ctx.save();
        ctx.globalAlpha = ease;
        const lift = (1 - ease) * 14;

        // 日期
        ctx.fillStyle = COLORS.textMuted;
        ctx.font = `12px ${FONT}`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(a.date, cx, DATE_Y - lift * 0.4);

        // 圆点
        const isHover = st.hover === i;
        ctx.beginPath();
        ctx.arc(cx, LINE_Y, isHover ? 9.5 : 8, 0, Math.PI * 2);
        ctx.fillStyle = isHover ? COLORS.redGlow : "rgba(0,0,0,0)";
        ctx.fill();
        ctx.beginPath();
        ctx.arc(cx, LINE_Y, isHover ? 7.5 : 7, 0, Math.PI * 2);
        ctx.fillStyle = COLORS.paper;
        ctx.fill();
        ctx.lineWidth = 3;
        ctx.strokeStyle = COLORS.red;
        ctx.stroke();

        // 卡片
        const cardY = CARD_TOP - lift * 4;
        const cardX = left + i * (CARD_W + GAP);
        // 顶部深蓝条
        ctx.fillStyle = COLORS.navy;
        ctx.fillRect(cardX, cardY, CARD_W, 3);
        // 主体渐变
        const bg = ctx.createLinearGradient(0, cardY + 3, 0, cardY + CARD_H);
        bg.addColorStop(0, COLORS.wash);
        bg.addColorStop(1, COLORS.paper);
        ctx.fillStyle = bg;
        ctx.strokeStyle = isHover ? COLORS.navyLight : COLORS.washBorder;
        ctx.lineWidth = 1;
        roundRect(ctx, cardX, cardY + 3, CARD_W, CARD_H - 3, 4);
        ctx.fill();
        ctx.stroke();

        // 分类标签（深蓝底白字）
        const catW = Math.min(
          CARD_W - 24,
          ctx.measureText(a.category).width + 18,
        );
        ctx.fillStyle = COLORS.navy;
        roundRect(ctx, cardX + (CARD_W - catW) / 2, cardY + 12, catW, 20, 3);
        ctx.fill();
        ctx.fillStyle = "#fff";
        ctx.font = `11px ${FONT}`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(a.category, cardX + CARD_W / 2, cardY + 23);

        // 标题（两行截断）
        ctx.fillStyle = isHover ? COLORS.red : COLORS.linkBlue;
        ctx.font = `600 14px ${FONT}`;
        const titleLines = wrapText(a.title, CARD_W - 26);
        titleLines.forEach((line, li) => {
          ctx.fillText(line, cardX + CARD_W / 2, cardY + 52 + li * 21);
        });

        // 标签小字（单行截断）
        const tagText = a.tags.join(" · ");
        ctx.fillStyle = COLORS.textMuted;
        ctx.font = `11px ${FONT}`;
        let shown = tagText;
        while (
          ctx.measureText(shown).width > CARD_W - 26 &&
          shown.length > 0
        ) {
          shown = shown.slice(0, -1);
        }
        if (shown !== tagText) shown += "…";
        ctx.fillText(shown, cardX + CARD_W / 2, cardY + CARD_H - 16);

        ctx.restore();
      });

      if (!st.done) {
        requestAnimationFrame(draw);
      }
    }

    function roundRect(c, x, y, w, h, r) {
      c.beginPath();
      c.moveTo(x + r, y);
      c.arcTo(x + w, y, x + w, y + h, r);
      c.arcTo(x + w, y + h, x, y + h, r);
      c.arcTo(x, y + h, x, y, r);
      c.arcTo(x, y, x + w, y, r);
      c.closePath();
    }

    function nodeIndexAt(px) {
      const x0 = Math.max(8, (st.width - contentW) / 2);
      const rel = px + st.offset - x0;
      const i = Math.floor(rel / (CARD_W + GAP));
      if (i < 0 || i >= n) return -1;
      const cardX = i * (CARD_W + GAP);
      if (rel >= cardX && rel <= cardX + CARD_W) return i;
      return -1;
    }

    function onPointerDown(e) {
      st.dragging = true;
      st.moved = false;
      st.startX = e.clientX;
      st.startOffset = st.offset;
      canvas.setPointerCapture(e.pointerId);
    }

    function onPointerMove(e) {
      if (st.dragging) {
        const dx = e.clientX - st.startX;
        if (Math.abs(dx) > 4) st.moved = true;
        const maxOffset = Math.max(0, contentW + 16 - st.width);
        st.offset = Math.max(0, Math.min(maxOffset, st.startOffset - dx));
      }
      st.hover = st.dragging ? -1 : nodeIndexAt(e.offsetX);
      draw();
    }

    function onPointerUp(e) {
      st.dragging = false;
      if (st.hover >= 0 && !st.moved) {
        const a = articles[st.hover];
        window.location.href = `/article/${a.id}`;
      }
      st.moved = false;
      canvas.releasePointerCapture?.(e.pointerId);
    }

    function onPointerLeave() {
      st.hover = -1;
      draw();
    }

    function onResize() {
      resize();
      draw();
    }

    resize();
    st.t0 = performance.now();
    st.done = false;
    requestAnimationFrame(draw);

    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("resize", onResize);
    return () => {
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("resize", onResize);
    };
  }, [articles]);

  return (
    <div className="timeline-canvas" ref={wrapRef}>
      <canvas ref={canvasRef} aria-label="文章时间线" role="img" />
    </div>
  );
}
