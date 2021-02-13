import HeavensDoor from '../structures/commands/HeavensDoor.js'

export default class President extends HeavensDoor {
  /**
   * @param {string} category
   * @param {Array<*>} args
   */
  constructor(category, ...args) {
    super(...args)

    this.register(President, {
      category: category,

      name: 'heavens door president',
      aliases: ['prez'],
      description: 'Provided image is now the president',
      usage: 'heavens door president [image resolvable]',
      params: [
        {
          name: 'image resolvable',
          description: 'A link, a mentioned user or url to an image.',
          type: 'image_resolvable',
          default: "Takes the author's profile picture"
        }
      ],
      example: 'heavens door president'
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

  async modifyImage() {
    return this.sharp(this.filename)
      .resize({ width: 236, height: 197, fit: 'fill', position: 'center' })
      .extend({
        top: 380,
        bottom: 21,
        left: 331,
        right: 32,
        background: 'transparent'
      })
      .composite([
        {
          input: this.modules.heavensdoor.getAssetPath('president.png'),
          gravity: 'south'
        }
      ])
  }
}
