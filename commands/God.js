import HeavensDoor from '../structures/commands/HeavensDoor.js'

export default class God extends HeavensDoor {
  /**
   * @param {string} category
   * @param {Array<*>} args
   */
  constructor(category, ...args) {
    super(...args)

    this.register(God, {
      category: category,

      name: 'heavens door god',
      aliases: ['allah', 'buddha'],
      description: 'The provided image is god',
      usage: 'heavens door god [image resolvable]',
      params: [
        {
          name: 'image resolvable',
          description: 'A link, a mentioned user or url to an image.',
          type: 'image_resolvable',
          default: "Takes the author's profile picture"
        }
      ],
      example: 'heavens door god'
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
      .resize({ width: 154, height: 154, fit: 'fill', position: 'center' })
      .extend({
        top: 23,
        bottom: 126,
        left: 38,
        right: 426,
        background: 'transparent'
      })
      .composite([
        {
          input: this.modules.heavensdoor.getAssetPath('god.png'),
          gravity: 'south'
        }
      ])
  }
}
