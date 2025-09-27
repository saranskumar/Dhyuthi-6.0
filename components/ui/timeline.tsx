"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

type Item = {
  time: string;
  event: string;
  description: string;
  color?: string;
};

export default function Timeline({ data }: { data: Item[] }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [progressPct, setProgressPct] = useState(0);
  const [dAttr, setDAttr] = useState("");
  const [svgHeight, setSvgHeight] = useState(480);

  // Build curved path from item positions (keeps same logic)
  const rebuildPath = useCallback(() => {
    const nodes = itemRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!nodes.length || !svgRef.current) return;

    const svgRect = svgRef.current.getBoundingClientRect();
    const leftX = Math.max(60, svgRect.width * 0.16); // left flow
    const points: { x: number; y: number }[] = nodes.map((el) => {
      const r = el!.getBoundingClientRect();
      // point vertically aligned to approx top third of card
      const y = r.top + r.height * 0.12 - svgRect.top;
      return { x: leftX, y };
    });

    // final end point a bit below last item
    const lastRect = nodes[nodes.length - 1]!.getBoundingClientRect();
    const endY = lastRect.bottom - svgRect.top + 96;
    points.push({ x: leftX, y: endY });

    const neededHeight = Math.max(svgRect.height, Math.ceil(endY + 40));
    setSvgHeight(neededHeight);

    if (!points.length) return;
    let d = `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`;
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const cur = points[i];
      const cx = ((prev.x + cur.x) / 2).toFixed(1);
      const cy = ((prev.y + cur.y) / 2).toFixed(1);
      d += ` Q ${cx} ${cy} ${cur.x.toFixed(1)} ${cur.y.toFixed(1)}`;
    }

    setDAttr(d);
  }, []);

  // Rebuild path on resize / layout changes
  useEffect(() => {
    rebuildPath();
    const ro = new ResizeObserver(() => rebuildPath());
    const el = containerRef.current;
    if (el) ro.observe(el);
    window.addEventListener("resize", rebuildPath);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", rebuildPath);
    };
  }, [data.length, rebuildPath]);

  // Active selection: pick the item whose center is nearest viewport center.
  // Use rAF-throttled scroll handler for smooth deterministic order (no random pops).
  useEffect(() => {
    let rafId = 0;
    const onScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const nodes = itemRefs.current.filter(Boolean) as HTMLDivElement[];
        if (!nodes.length) return;

        const viewportCenter = window.scrollY + window.innerHeight / 2;
        let bestIdx = 0;
        let bestDist = Infinity;

        nodes.forEach((n, idx) => {
          const rect = n!.getBoundingClientRect();
          const itemCenter = rect.top + window.scrollY + rect.height / 2;
          const dist = Math.abs(itemCenter - viewportCenter);
          if (dist < bestDist) {
            bestDist = dist;
            bestIdx = idx;
          }
        });

        // ensure deterministic progressive activation: only change if different index
        if (bestIdx !== activeIndex) {
          setActiveIndex(bestIdx);
        }

        // progress based on first/last card centers
        const firstRect = nodes[0]!.getBoundingClientRect();
        const lastRect = nodes[nodes.length - 1]!.getBoundingClientRect();
        const top = firstRect.top + window.scrollY;
        const bottom = lastRect.bottom + window.scrollY;
        const pct = Math.max(0, Math.min(1, (viewportCenter - top) / (bottom - top)));
        setProgressPct(pct * 100);

        // reveal path smoothly
        if (pathRef.current) {
          const total = pathRef.current.getTotalLength();
          const reveal = Math.max(0.02, pct);
          pathRef.current.style.strokeDasharray = `${total} ${total}`;
          pathRef.current.style.strokeDashoffset = `${total * (1 - reveal)}`;
        }
      });
    };

    // initial call
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.length, activeIndex]);

  // smooth scroll to item
  const scrollTo = (i: number) => {
    const el = itemRefs.current[i];
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
    setActiveIndex(i);
  };

  // Update the return JSX section:
  return (
  <div className="relative w-full py-8">
    <div className="relative max-w-4xl mx-auto" ref={containerRef}>
      {/* SVG path */}
      <svg
        ref={svgRef}
        className="absolute left-0 top-0 w-full pointer-events-none"
        width="100%"
        height={svgHeight}
        viewBox={`0 0 ${800} ${svgHeight}`}
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="tlGrad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        <path
          d={dAttr}
          fill="none"
          stroke="rgba(255,255,255,0.02)"
          strokeWidth={8}
          strokeLinecap="round"
        />
        <path
          ref={pathRef}
          d={dAttr}
          fill="none"
          stroke="url(#tlGrad)"
          strokeWidth={3}
          strokeLinecap="round"
        />
      </svg>

      {/* Timeline content */}
      <div className="space-y-8 relative z-10">
        {data.map((item, i) => {
          const color = item.color ?? "#7c3aed";

          // Day heading with improved styling
          if (!item.time && !item.description) {
            return (
              <div key={`day-${i}`} className="pl-8 md:pl-12 py-8">
                <div 
                  className="relative group flex items-center gap-4 w-fit"
                  style={{ "--day-color": color } as any}
                >
                  {/* Large dot for day marker */}
                  <div 
                    className="w-5 h-5 rounded-full transition-all duration-300"
                    style={{
                      background: `linear-gradient(135deg, ${color}, ${color}90)`,
                      boxShadow: `0 0 20px ${color}40`,
                      border: `2px solid ${color}80`
                    }}
                  />
                  
                  {/* Day text with custom styling */}
                  <div className="relative overflow-hidden rounded-xl px-6 py-3">
                    <div className="relative z-10 text-white font-bold tracking-wider">
                      {item.event}
                    </div>
                    
                    {/* Gradient background */}
                    <div 
                      className="absolute inset-0 opacity-20 transition-opacity duration-300 group-hover:opacity-30"
                      style={{
                        background: `linear-gradient(135deg, ${color}, transparent 60%)`,
                        backdropFilter: 'blur(8px)'
                      }}
                    />
                    
                    {/* Border */}
                    <div 
                      className="absolute inset-0 rounded-xl border transition-colors duration-300"
                      style={{
                        borderColor: `${color}30`,
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          }

          return (
            <div
              key={i}
              data-idx={i}
              ref={(el) => (itemRefs.current[i] = el)}
              className="timeline-item group"
            >
              {/* Checkpoint */}
              <div className="absolute -left-3 md:-left-4 top-0 z-20">
                <div
                  className="timeline-dot"
                  style={{
                    backgroundColor: `${color}40`,
                    borderColor: color,
                  }}
                />
              </div>

              {/* Card */}
              <div className="flex-1">
                <div className="timeline-card group-hover:transform-gpu group-hover:scale-[1.02] group-hover:bg-white/[0.03]">
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-semibold text-white/90 group-hover:text-white">
                        {item.event}
                      </h3>
                      <span className="text-xs text-white/50">{item.time}</span>
                    </div>
                    <p className="text-sm text-white/60 group-hover:text-white/80">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </div>
);
}
