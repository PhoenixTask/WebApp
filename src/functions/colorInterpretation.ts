type ColorVariant = {
  bg: string;
  text: string;
  border: string;
};

export function colorVariant(color: string): ColorVariant {
  switch (color) {
    case "sky":
      return { bg: "bg-sky", text: "text-sky", border: "border-sky" };
    case "ocean":
      return { bg: "bg-ocean", text: "text-ocean", border: "border-ocean" };
    case "mint":
      return { bg: "bg-mint", text: "text-mint", border: "border-mint" };
    case "forest":
      return { bg: "bg-forest", text: "text-forest", border: "border-forest" };
    case "sun":
      return { bg: "bg-sun", text: "text-sun", border: "border-sun" };
    case "sand":
      return { bg: "bg-sand", text: "text-sand", border: "border-sand" };
    case "rose":
      return { bg: "bg-rose", text: "text-rose", border: "border-rose" };
    case "cherry":
      return { bg: "bg-cherry", text: "text-cherry", border: "border-cherry" };
    case "grape":
      return { bg: "bg-grape", text: "text-grape", border: "border-grape" };
    case "lavender":
      return {
        bg: "bg-lavender",
        text: "text-lavender",
        border: "border-lavender",
      };
    case "coal":
      return { bg: "bg-coal", text: "text-coal", border: "border-coal" };
    case "stone":
    default:
      return { bg: "bg-stone", text: "text-stone", border: "border-stone" };
  }
}

export const priorityColor = (priority: number) => {
  switch (priority) {
    case 0:
      return "text-neutral";
    case 1:
      return "text-success";
    case 2:
      return "text-info";
    case 3:
      return "text-warning";
    case 4:
      return "text-error";
  }
};
