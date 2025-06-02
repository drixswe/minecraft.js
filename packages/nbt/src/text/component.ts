import type { Color } from '@text/format/color'
import { KeybindComponent } from './builders/impl/keybind'
import { TextComponent } from './builders/impl/text'

// biome-ignore lint/complexity/noStaticOnlyClass: Utility class
export class Component {
  static text(content: string | number, color?: string | Color): TextComponent {
    const textComponent = new TextComponent(content)
    return color !== undefined ? textComponent.color(color) : textComponent
  }

  static keybind(keybind: string): KeybindComponent {
    return new KeybindComponent(keybind)
  }
}
