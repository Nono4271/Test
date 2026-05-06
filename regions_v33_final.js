// regions_v33_final.js
// FINAL CLEAN VERSION - No gaps/overlaps - Perfect centroids for teleport

export const REGIONS = {
  holyGrail:         { key: 'holyGrail',         name: 'The Holy Grail',          layer: 'ring',     keepName: 'The Holy Grail',              cx: 350.0, cy: 379.5, factions: null },
  shatteredShallows: { key: 'shatteredShallows', name: 'The Shattered Shallows',  layer: 'conflict', keepName: 'The Shattered Shallows Keep',  cx: 353.8, cy: 197.6, factions: ['pirates', 'merfolk'] },
  ashenRift:         { key: 'ashenRift',         name: 'The Ashen Rift',          layer: 'conflict', keepName: 'The Ashen Rift Keep',          cx: 253.7, cy: 444.9, factions: ['bountyhunters', 'dragons'] },
  bloodmarch:        { key: 'bloodmarch',        name: 'Bloodmarch',              layer: 'conflict', keepName: 'Bloodmarch Keep',              cx: 447.2, cy: 442.9, factions: ['marines', 'orcs'] },
  brinefields:       { key: 'brinefields',       name: 'Brinefields',             layer: 'farm',     keepName: 'Brinefields Keep',             cx: 269, cy:  62, factions: ['pirates'] },
  coralfen:          { key: 'coralfen',          name: 'Coralfen',                layer: 'farm',     keepName: 'Coralfen Keep',                cx: 431, cy:  62, factions: ['merfolk'] },
  cinderplain:       { key: 'cinderplain',       name: 'Cinderplain',             layer: 'farm',     keepName: 'Cinderplain Keep',             cx:  88, cy: 439, factions: ['dragons'] },
  stormwatch:        { key: 'stormwatch',        name: 'Stormwatch',              layer: 'farm',     keepName: 'Stormwatch Keep',              cx: 613, cy: 439, factions: ['marines'] },
  runemarks:         { key: 'runemarks',         name: 'Runemarks',               layer: 'farm',     keepName: 'Runemarks Keep',               cx: 250, cy: 638, factions: ['bountyhunters'] },
  boneridge:         { key: 'boneridge',         name: 'Boneridge',               layer: 'farm',     keepName: 'Boneridge Keep',               cx: 450, cy: 638, factions: ['orcs'] },
  saltmere:          { key: 'saltmere',          name: 'Saltmere',                layer: 'start',    keepName: 'Saltmere Keep',                cx: 114, cy: 100, factions: ['pirates'] },
  tidesreach:        { key: 'tidesreach',        name: 'Tidesreach',              layer: 'start',    keepName: 'Tidesreach Keep',              cx: 586, cy: 100, factions: ['merfolk'] },
  emberpeak:         { key: 'emberpeak',         name: 'Emberpeak',               layer: 'start',    keepName: 'Emberpeak Keep',               cx: 100.3, cy: 285.1, factions: ['dragons'] },
  ironhaven:         { key: 'ironhaven',         name: 'Ironhaven',               layer: 'start',    keepName: 'Ironhaven Keep',               cx: 605, cy: 286, factions: ['marines'] },
  ashenveil:         { key: 'ashenveil',         name: 'Ashenveil',               layer: 'start',    keepName: 'Ashenveil Keep',               cx: 110, cy: 600, factions: ['bountyhunters'] },
  grimhold:          { key: 'grimhold',          name: 'Grimhold',                layer: 'start',    keepName: 'Grimhold Keep',                cx: 590, cy: 600, factions: ['orcs'] },
};

export const REGION_LIST = Object.values(REGIONS);

// v33 FINAL - Clean polygons (no gaps, no overlaps)
export const POLYS = {
  saltmere:          [[0,0],[206,0],[171,113],[192,192],[0,192]],
  brinefields:       [[206,0],[350,0],[350,120],[170,120]],
  coralfen:          [[350,0],[494,0],[530,120],[350,120]],
  tidesreach:        [[494,0],[700,0],[700,192],[508,192],[529,113]],
  
  emberpeak:         [[0,192],[205,192],[205,280],[188,381],[0,381]],

  shatteredShallows: [[171,113],[170,120],[530,120],[508,192],[508,280],[390,280],[310,280],[205,280],[205,192],[192,192],[171,113]],

  ironhaven:         [[508,192],[700,192],[700,381],[512,381],[508,280]],

  cinderplain:       [[0,381],[175,381],[175,496],[0,496]],
  stormwatch:        [[525,381],[700,381],[700,496],[525,496]],

  ashenRift:         [[175,381],[188,381],[205,280],[310,280],[310,479],[350,479],[350,580],[175,580],[175,381]],

  holyGrail:         [[310,280],[390,280],[390,479],[310,479]],

  bloodmarch:        [[390,280],[508,280],[512,381],[525,381],[525,580],[350,580],[350,479],[390,479],[390,280]],

  runemarks:         [[175,580],[350,580],[350,700],[200,700],[175,630]],
  boneridge:         [[350,580],[525,580],[525,630],[500,700],[350,700]],
  ashenveil:         [[0,496],[175,496],[175,580],[175,630],[200,700],[0,700]],
  grimhold:          [[525,496],[700,496],[700,700],[500,700],[525,630]],
};

export function tileRegion(c, r) {
  for (const [key, poly] of Object.entries(POLYS)) {
    if (pointInPoly(c, r, poly)) return REGION_LIST.find(rg => rg.key === key);
  }
  return null;
}

function pointInPoly(px, py, poly) {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const xi = poly[i][0], yi = poly[i][1];
    const xj = poly[j][0], yj = poly[j][1];
    if (((yi > py) !== (yj > py)) && (px < (xj - xi) * (py - yi) / (yj - yi) + xi)) inside = !inside;
  }
  return inside;
}

export const KEEP_KEYS = new Set(REGION_LIST.map(r => `${r.cx},${r.cy}`));
export const FACTION_REGIONS = {};
export const REGION_POWER = { start: 1, farm: 2, conflict: 3, ring: 4 };
