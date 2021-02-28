import HeavensDoor from '../structures/commands/HeavensDoor.js'

export default class Melania extends HeavensDoor {
  /**
   * @param {string} category
   * @param {Array<*>} args
   */
  constructor(category, ...args) {
    super(...args)

    this.register(Melania, {
      category: category,

      name: 'heavens door melania',
      aliases: ['trump4'],
      description: 'Malia is about to sell provided image',
      usage: 'heavens door melania [image resolvable]',
      params: [
        {
          name: 'image resolvable',
          description: 'A link, a mentioned user or url to an image.',
          type: 'string',
          default: "Takes the author's profile picture"
        }
      ],
      example: 'heavens door melania'
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
      .resize({ width: 296, height: 361, fit: 'fill', position: 'center' })
      .extend({
        top: 54,
        bottom: 545,
        left: 187,
        right: 56,
        background: 'transparent'
      })
      .composite([
        {
          input: this.modules.heavensdoor.getAssetPath('melania.png'),
          gravity: 'south'
        }
      ])
  }
}
