import HeavensDoor from '../structures/commands/HeavensDoor.js'

export default class Boku extends HeavensDoor {
  /**
   * @param {string} category
   * @param {Array<*>} args
   */
  constructor(category, ...args) {
    super(...args)

    this.register(Boku, {
      category: category,

      name: 'heavens door boku',
      aliases: ['bnha'],
      description: 'Boku loves provided image',
      usage: 'heavens door boku [image resolvable]',
      params: [
        {
          name: 'image resolvable',
          description: 'A link, a mentioned user or url to an image.',
          type: 'image_resolvable',
          default: "Takes the author's profile picture"
        }
      ],
      examples: ['heavens door boku']
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
      .resize({ width: 464, height: 321, fit: 'fill', position: 'center' })
      .extend({
        top: 148,
        bottom: 206,
        left: 248,
        right: 488,
        background: 'transparent'
      })
      .composite([
        {
          input: this.modules.heavensdoor.getAssetPath('boku.png'),
          gravity: 'south'
        }
      ])
  }
}
