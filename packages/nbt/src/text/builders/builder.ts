import { Color } from '@text/format/color'
import { Flags } from '@text/format/flags'

interface Options {
  color?: string
  bold?: boolean
  italic?: boolean
  underlined?: boolean
  strikethrough?: boolean
  obfuscated?: boolean
}

export abstract class Builder {
  private options: Partial<Options> = {}
  private extra: Builder[] = []

  append(component: Builder): this {
    this.extra.push(component)
    return this
  }

  color(color: string | Color): this {
    const isEnum = Object.values(Color).includes(color as Color)
    const isHex = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(color)

    if (!isEnum && !isHex) {
      throw new Error(
        `Invalid color: "${color}". Use a Color enum value or a valid hex code.`
      )
    }

    this.options.color = color
    return this
  }

  decorate(...flags: Flags[]): this {
    for (const flag of flags) {
      switch (flag) {
        case Flags.Bold:
          this.options.bold = true
          break
        case Flags.Italic:
          this.options.italic = true
          break
        case Flags.Obfuscated:
          this.options.obfuscated = true
          break
        case Flags.Strikethrough:
          this.options.strikethrough = true
          break
        case Flags.Underlined:
          this.options.underlined = true
          break
      }
    }

    return this
  }

  protected build(): Options & { extra?: Builder[] } {
    return {
      ...this.options,
      extra: this.extra.length > 0 ? this.extra : undefined
    }
  }

  abstract toJSON(): string
}
