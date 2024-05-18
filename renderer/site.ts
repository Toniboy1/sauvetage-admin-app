/**
 * All the pages that are available in the application
 */
export const pages = [
  {
    name: "Nouveau rapport",
    href: "/intervention",
    role: "unauthenticated",
  },
  {
    name: "Alarmes",
    href: "/alarmes",
    role: "authenticated",
  },
  {
    name: "Sauveteurs",
    href: "/people",
    role: "authenticated",
  },
  {
    name: "Gravité",
    href: "/severities",
    role: "authenticated",
  },
  {
    name: "Types d'interventions",
    href: "/interventions",
    role: "authenticated",
  },
  {
    name: "Moyens supplémentaires",
    href: "/other_means",
    role: "authenticated",
  },
  {
    name: "Causes",
    href: "/causes",
    role: "authenticated",
  },
  {
    name: "Actions",
    href: "/actions",
    role: "authenticated",
  },
  {
    name: "Météo",
    href: "/weathers",
    role: "authenticated",
  },
  {
    name: "Lac",
    href: "/lake_states",
    role: "authenticated",
  },
  {
    name: "Vents",
    href: "/winds",
    role: "authenticated",
  },
  {
    name: "Lieux",
    href: "/common_locations",
    role: "authenticated",
  },
  {
    name: "Rapports d'interventions",
    href: "/",
    role: "unauthenticated",
  },
  {
    name: "Connexion",
    href: "/auth/signin",
    role: "unauthenticated",
  },
];

/**
 * Generate nav according env
 * @param path context path
 * @returns path
 */
export const path = (path:string)=>{
  let prefixPath = path;
  if (process.env.CAPACITOR) {
    prefixPath = `/Users/anthonyfasano/sauvetage-admin-app/renderer/dist/capacitor/${path}/index.html`
    prefixPath = prefixPath.replace('//', '/')
  }
  return prefixPath;
}

