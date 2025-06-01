import { Color } from '@text/format/color'
import { KeybindComponent } from './builders/impl/keybind'
import { TextComponent } from './builders/impl/text'

// biome-ignore lint/complexity/noStaticOnlyClass: Utility class
export class Component {
  static text(
    content: string | number,
    color: Color = Color.White
  ): TextComponent {
    return new TextComponent(content).color(color)
  }

  static keybind(keybind: string): KeybindComponent {
    return new KeybindComponent(keybind)
  }
}
