import HeavensDoor from '../structures/commands/HeavensDoor.js'

export default class Mask extends HeavensDoor {
  /**
   * @param {string} category
   * @param {Array<*>} args
   */
  constructor(category, ...args) {
    super(...args)

    this.register(Mask, {
      category: category,

      name: 'heavens door mask',
      aliases: [],
      description: 'A person wears the provided image to hide their angery',
      usage: 'heavens door mask [image resolvable]',
      params: [
        {
          name: 'image resolvable',
          description: 'A link, a mentioned user or url to an image.',
          type: 'image_resolvable',
          default: "Takes the author's profile picture"
        }
      ],
      example: 'heavens door mask'
    })
  }

  /**
   * @param {string} command string representing what triggered the command
   */
  async run(command) {
    try {
      const out = await this.modifyImage()

      await this.send("**Heaven's Door**", {
        files: [
          {
            attachment: out,
            name: `${this.name}.png`
          }
        ]
      })
    } catch (e) {
      this.send(
        'Unknown error occured, notify the creator of the bot if this persists:\n' +
        e.stack
      )
    }

    return true
  }

  modifyImage() {
    return this.sharp(this.filename)
      .resize({ width: 170, height: 217, fit: 'fill', position: 'center' })
      .extend({
        top: 89,
        bottom: 77,
        left: 210,
        right: 26,
        background: 'transparent'
      })
      .composite([
        {
          input: this.modules.heavensdoor.getAssetPath('mask.png'),
          gravity: 'south'
        }
      ])
  }
}
