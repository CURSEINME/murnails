// tailwind.config.js
import tailwindcss from "tailwindcss";

export default {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [
    tailwindcss({
      theme: {
        extend: {
          colors: {
            primary: "rgb(59 130 246)",
            secondary: "rgb(16 185 129)",
            accent: "rgb(139 92 246)",
          },
        },
      },
    }),
  ],
};
