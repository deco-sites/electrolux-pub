import { adminIcons } from "../static/iconsMap.ts";

import { allowCorsFor, type FnContext } from "@deco/deco";
const icons = Array.from(
  Object.entries(adminIcons),
)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([iconName, icon]) => ({
    component: icon,
    label: iconName,
  }));
// Used to load all available icons that will be used for IconSelect widgets.
export default function IconsLoader(
  _props: unknown,
  req: Request,
  ctx: FnContext,
) {
  // Allow Cors
  Object.entries(allowCorsFor(req)).map(([name, value]) => {
    ctx.response.headers.set(name, value);
  });
  // Mapping icons to { value, label, icon }
  const iconsMap = icons.map((icon) => ({
    icon: icon.component,
    label: icon.label,
    value: icon.label,
  }));
  return iconsMap;
}
