import { Color } from '@text/format/color'
import { Flags } from '@text/format/flags'

export abstract class Builder<T extends Builder<T>> {
  #extra: Builder<T>[] = []
  #color: string
  #bold: boolean
  #italic: boolean
  #obfuscated: boolean
  #strikethrough: boolean
  #underlined: boolean

  // biome-ignore lint/suspicious/noExplicitAny: Allow any for generic type
  append(component: Builder<any>): T {
    this.#extra.push(component)
    return this as unknown as T
  }

  color(color: Color | string): T {
    const isEnum = Object.values(Color).includes(color as Color)
    const isHex = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(String(color))

    if (!isEnum && !isHex) {
      throw new Error(
        `Invalid color: ${color}. Use a Color enum value or a valid hex code.`
      )
    }

    let final = color
    if (isEnum) {
      final = Color[color as Color]
        .toString()
        .replace(/([a-z])([A-Z])/g, '$1_$2')
        .toLowerCase()
    }

    this.#color = String(final)
    return this as unknown as T
  }

  decorate(...flags: Flags[]): T {
    for (const flag of flags) {
      switch (flag) {
        case Flags.Bold:
          this.#bold = true
          break
        case Flags.Italic:
          this.#italic = true
          break
        case Flags.Obfuscated:
          this.#obfuscated = true
          break
        case Flags.Strikethrough:
          this.#strikethrough = true
          break
        case Flags.Underlined:
          this.#underlined = true
          break
      }
    }

    return this as unknown as T
  }

  abstract toJSON(): string

  protected propertiesToJSON(): Record<string, unknown> {
    const props: Record<string, unknown> = {}

    if (this.#color) props.color = this.#color
    if (this.#bold) props.bold = this.#bold
    if (this.#italic) props.italic = this.#italic
    if (this.#obfuscated) props.obfuscated = this.#obfuscated
    if (this.#strikethrough) props.strikethrough = this.#strikethrough
    if (this.#underlined) props.underlined = this.#underlined

    if (this.#extra.length > 0) {
      props.extra = this.#extra.map((component) =>
        JSON.parse(component.toJSON())
      )
    }

    return props
  }
}
