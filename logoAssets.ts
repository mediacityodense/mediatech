const logoModules = import.meta.glob('./Images/logoer/*.{png,jpg,jpeg,webp,svg}', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

export const resolveLogoAsset = (fileName: string) =>
  logoModules[`./Images/logoer/${fileName}`];
