export const categories = {
  skin_tone: ["deep brown", "ebony", "light brown", "medium brown"],
  age_range: ["20s", "30s–40s", "50+"],
  facial_features: ["angular cheekbones", "fuller cheeks", "round face", "square jaw"],
  beard_style: ["clean-shaven", "full beard", "goatee"],
  hair_style: ["bald", "braids", "salt-and-pepper", "short fade", "twists", "waves"],
  body_build: ["lean athletic", "medium build", "slender", "stocky/muscular"],
  mobility_device: [
    "manual custom ergonomic design",
    "manual everyday lightweight frame",
    "manual sports chair (angled wheels, low backrest)",
    "power advanced tech model (modern design, joystick + digital display)",
    "power compact urban model (sleek, minimalist, joystick + digital display)",
    "power rugged outdoor model (all-terrain wheels, sturdy frame, joystick + digital display)"
  ],
  apparel: [
    "blazer", "cap", "collared shirt", "compression wear", "dress pants",
    "easy-access closures", "hemmed pants for seated fit", "hoodie", "jeans", "joggers", "loafers",
    "performance shirt", "shorts", "sneakers", "stretch fabrics", "t-shirt"
  ],
  expression: ["confident smile", "determined", "focused", "joyful", "relaxed"],
  pose: ["leaning forward", "mid-motion", "relaxed recline", "seated upright"],
  activity: ["socializing", "stretching", "training", "typing", "weight training"],
  environment: [
    "ceremony venue", "coffee shop", "gym", "home", "meeting room", "office",
    "park", "presentation hall", "sports field", "urban street"
  ],
  style_details: [
    "cinematic style with rich contrast and dramatic lighting",
    "clean vector art style with clear lines and muted palette",
    "detailed digital painting with soft shadows and warm tones",
    "modern graphic style with bold colors and simple composition",
    "realistic illustration with vibrant colors and natural lighting"
  ]
} as const;

export type CategoryKey = keyof typeof categories;

export interface GeneratedPrompt {
  skin_tone: string;
  age_range: string;
  facial_features: string;
  beard_style: string;
  hair_style: string;
  body_build: string;
  mobility_device: string;
  apparel: string;
  expression: string;
  pose: string;
  activity: string;
  environment: string;
  style_details: string;
  full_prompt: string;
}

export const categoryLabels: Record<CategoryKey, string> = {
  skin_tone: "Skin Tone",
  age_range: "Age Range",
  facial_features: "Facial Features",
  beard_style: "Beard Style",
  hair_style: "Hair Style",
  body_build: "Body Build",
  mobility_device: "Mobility Device",
  apparel: "Apparel",
  expression: "Expression",
  pose: "Pose",
  activity: "Activity",
  environment: "Environment",
  style_details: "Style Details"
};

export function getRandomChoice<T>(array: readonly T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

export function generatePrompt(selections: Record<CategoryKey, string>): GeneratedPrompt {
  const prompt = `African-American male with ${selections.skin_tone} skin tone, ${selections.age_range} age range, ${selections.facial_features}, ${selections.beard_style}, ${selections.hair_style} hair, ${selections.body_build} build, using ${selections.mobility_device} wheelchair, wearing ${selections.apparel}, ${selections.expression} expression, ${selections.pose} pose, ${selections.activity} in ${selections.environment}, ${selections.style_details}`;

  return {
    ...selections,
    full_prompt: prompt
  };
}
