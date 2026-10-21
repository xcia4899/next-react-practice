import styles from "./motion.module.css";

const forms = {
  brand: ["M 38 245 L 165 54 L 292 245 L 165 183 Z", "M 165 183 L 258 98 L 352 245 L 292 245 Z", "M 38 245 L 165 183 L 292 245 L 165 285 Z"],
  web: ["M 42 72 L 228 72 L 228 235 L 42 235 Z", "M 228 72 L 352 122 L 352 285 L 228 235 Z", "M 64 102 L 204 102 L 204 134 L 64 134 Z"],
  interface: ["M 62 56 L 192 56 L 192 186 L 62 186 Z", "M 216 128 L 346 128 L 346 258 L 216 258 Z", "M 62 210 L 192 210 L 192 282 L 62 282 Z"],
};

export type GeometryVariant = keyof typeof forms;

export function BrandGeometry({ variant = "brand", entrance = false }: { variant?: GeometryVariant; entrance?: boolean }) {
  return <div className={entrance ? styles.entrance : styles.geometry} data-geometry={variant}>
    <svg viewBox="0 0 400 340" aria-hidden="true" className="block h-auto w-full overflow-visible">
      <path d="M 20 305 H 380 M 20 35 H 380 M 20 20 V 320 M 380 20 V 320" fill="none" stroke="currentColor" strokeOpacity=".15" />
      <circle cx="165" cy="183" r="132" fill="none" stroke="currentColor" strokeOpacity=".1" />
      {forms[variant].map((path, index) => <path key={index} d={path} style={{ d: `path("${path}")` }} pathLength="1" className={styles.plane} />)}
      <path d="M 13 183 H 27 M 20 176 V 190 M 373 183 H 387 M 380 176 V 190" stroke="currentColor" />
    </svg>
    <div className="flex justify-between border-t border-line pt-3 text-xs tracking-widest text-muted"><span>CHENGYUE / FORM</span><span>0{Object.keys(forms).indexOf(variant) + 1}</span></div>
  </div>;
}
