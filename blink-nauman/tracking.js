// Pure state transition: one frame to enter; hysteresis and optional dwell to leave.
export function transition(state, sample, options, now) {
  const threshold = state.closed ? Math.max(0.05, options.threshold - 0.12) : options.threshold;
  const closed = sample.face && Math.min(sample.left, sample.right) >= threshold;
  const absent = options.away && (!sample.face || Math.abs(sample.turn) > 0.22);
  const margin = options.gazeThreshold ?? 0.18;
  const limit = state.active ? margin * 0.75 : margin;
  const base = options.baseline || {gazeX:0,gazeY:0,turn:0,pitch:0.3};
  const gazeAway = Math.abs((sample.gazeX ?? 0)-base.gazeX)>limit || Math.abs((sample.gazeY ?? 0)-base.gazeY)>limit;
  const headAway = Math.abs((sample.turn ?? 0)-base.turn)>0.20 || Math.abs((sample.pitch ?? base.pitch)-base.pitch)>0.18;
  // A blink cannot supply reliable gaze. Retain the previous state until eyes reopen.
  const active = options.mode === 'gaze' ? (!sample.face || (closed ? state.active : gazeAway || headAway)) : closed || absent;
  let releaseAt = state.releaseAt;
  if (active) releaseAt = Infinity;
  else if (state.active) releaseAt = now + options.hold;
  return {closed, active, releaseAt, other: active || now < releaseAt};
}
