import HeavensDoor from '../structures/commands/HeavensDoor.js'

export default class Steam extends HeavensDoor {
  /**
   * @param {string} category
   * @param {Array<*>} args
   */
  constructor(category, ...args) {
    super(...args)

    this.register(Steam, {
      category: category,

      name: 'heavens door steam',
      aliases: ['epicgamesstore'],
      description: 'Provided image is the new steam update',
      usage: 'heavens door steam [image resolvable]',
      params: [
        {
          name: 'image resolvable',
          description: 'A link, a mentioned user or url to an image.',
          type: 'image_resolvable',
          default: "Takes the author's profile picture"
        }
      ],
      example: 'heavens door steam'
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
      .resize({ width: 404, height: 316, fit: 'fill', position: 'center' })
      .extend({
        top: 186,
        bottom: 16,
        left: 26,
        right: 30,
        background: 'transparent'
      })
      .composite([
        {
          input: this.modules.heavensdoor.getAssetPath('steam.png'),
          gravity: 'south'
        }
      ])
  }
}
