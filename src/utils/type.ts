export type ObjectPropByName = Record<string, any>;

export type LinkToPage = {
  icon?: string; // Icon name to use as <AppIcon icon={icon} />
  path?: string; // URL to navigate to
  title?: string; // Title or primary text to display
  subtitle?: string; // Sub-title or secondary text to display
};
