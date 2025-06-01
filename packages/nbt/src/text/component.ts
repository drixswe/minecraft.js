import { Color } from '@text/format/color'
import { TextComponent } from './builders/impl/text'

// biome-ignore lint/complexity/noStaticOnlyClass: Utility class
export class Component {
  static text(
    content: string | number,
    color: Color = Color.White
  ): TextComponent {
    return new TextComponent(content).paint(color)
  }
}
