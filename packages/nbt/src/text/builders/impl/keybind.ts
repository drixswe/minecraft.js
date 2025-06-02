import { Builder } from '../builder'

export class KeybindComponent extends Builder<KeybindComponent> {
  private keybind: string

  constructor(keybind: string) {
    super()
    this.keybind = keybind
  }

  override toJSON(): string {
    return JSON.stringify({
      keybind: this.keybind,
      ...this.build()
    })
  }
}
