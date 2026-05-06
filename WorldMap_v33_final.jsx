import { useState, useMemo, useEffect } from "react";
import { REGION_LIST } from "../../constants/regions.js";
import { PLAYABLE_FACTIONS } from "../../constants/factions.js";
import { ISO_W, ISO_H, TW, TH, TOP_PAD, ROWS } from "../../constants/geometry.js";
import { ICON_SCALE, HIT_PAD } from "../../constants/device.js";

const FAC_COLOR = { player: "#44aaff" };
PLAYABLE_FACTIONS.forEach(f => { FAC_COLOR[f.key] = f.c; });

function keepColor(owner) {
  if (!owner) return "#b8a88a";
  if (owner === "player") return "#44aaff";
  return FAC_COLOR[owner] || "#cc8844";
}

// Design space: 700×700
const DW = 700, DH = 700;

// v33 FINAL clean polygons
const POLYS = { /* Paste full POLYS here from regions.js */ };

// ... (rest of your original WorldMap.jsx with the new region rendering logic)

export default function WorldMap({ tiles, onClose, onTeleport, panRef, zoom }) {
  // ... your existing state and logic ...

  return (
    <div style={{ /* your styles */ }}>
      {/* Top bar */}
      {/* Map SVG */}
      <svg viewBox={`0 0 ${DW} ${DH}`} ... >
        {/* Base */}
        <rect width={DW} height={DH} fill="#0a0a0f"/>

        {/* Regions with grayed-out logic */}
        {Object.entries(POLYS).map(([key, poly]) => {
          const reg = keeps.find(k => k.key === key);
          if (!reg) return null;

          const isSel = selected === key;
          const owned = reg.owner;
          const isHG = key === "holyGrail";

          let fillColor = "#1a1a1f";
          let opacity = 0.65;
          let strokeColor = "#2a2a2f";
          let strokeOpacity = 0.4;

          if (isHG) {
            fillColor = "rgba(240,192,64,0.15)";
            opacity = 1.0;
            strokeColor = "#f0c040";
            strokeOpacity = 0.9;
          } else if (owned) {
            fillColor = owned === "player" ? "#44aaff" : (FAC_COLOR[owned] || "#cc8844");
            opacity = 0.75;
            strokeColor = fillColor;
            strokeOpacity = 0.85;
          }

          return (
            <g key={key} style={{ cursor: "pointer" }} onClick={() => setSelected(isSel ? null : key)}>
              <polygon points={scalePts(poly, sx, sy)} fill={fillColor} opacity={opacity} clipPath={isHG ? "url(#hg-clip)" : undefined} />
              <polygon points={scalePts(poly, sx, sy)} fill="none" stroke={strokeColor} strokeWidth={isSel ? 2.5 : 1} strokeOpacity={strokeOpacity} />
              {isSel && <polygon points={scalePts(poly, sx, sy)} fill="white" opacity={0.1}/>}
            </g>
          );
        })}

        {/* Holy Grail glow, icons, labels, etc. - keep your original code here */}
        {/* ... */}
      </svg>
    </div>
  );
}
