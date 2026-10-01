import { Manrope, DM_Sans } from "next/font/google";

// Both are variable fonts: omitting `weight` loads a single file per family
// that covers every weight, instead of one file per weight.
export const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

export const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

