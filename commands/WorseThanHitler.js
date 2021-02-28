import HeavensDoor from '../structures/commands/HeavensDoor.js'

export default class WorseThanHitler extends HeavensDoor {
  /**
   * @param {string} category
   * @param {Array<*>} args
   */
  constructor(category, ...args) {
    super(...args)

    this.register(WorseThanHitler, {
      category: category,

      name: 'heavens door worse than hitler',
      aliases: ['worsethanhitler', 'wth'],
      description: 'Worse than Hitler image',
      usage: 'heavens door worse than hitler [image resolvable]',
      params: [
        {
          name: 'image resolvable',
          description: 'A link, a mentioned user or url to an image.',
          type: 'string',
          default: "Takes the author's profile picture"
        }
      ],
      example: 'heavens door worse than hitler'
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
      .resize({ width: 145, height: 167, fit: 'fill', position: 'center' })
      .extend({
        top: 32,
        bottom: 161,
        left: 44,
        right: 291,
        background: 'white'
      })
      .composite([
        {
          input: this.modules.heavensdoor.getAssetPath('worsethanhitler.png'),
          gravity: 'south'
        }
      ])
  }
}
