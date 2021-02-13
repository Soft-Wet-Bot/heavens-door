import HeavensDoor from '../structures/commands/HeavensDoor.js'

export default class WhoDidThis extends HeavensDoor {
  /**
   * @param {string} category
   * @param {Array<*>} args
   */
  constructor(category, ...args) {
    super(...args)

    this.register(WhoDidThis, {
      category: category,

      name: 'heavens door who did this',
      aliases: ['whodidthis', 'wdt'],
      description: 'Who did this image',
      usage: 'heavens door 9gag [image resolvable]',
      params: [
        {
          name: 'image resolvable',
          description: 'A link, a mentioned user or url to an image.',
          type: 'image_resolvable',
          default: "Takes the author's profile picture"
        }
      ],
      example: 'heavens door who did this'
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
      .resize({
        width: 717,
        height: 406,
        fit: 'contain',
        position: 'center',
        background: 'white'
      })
      .extend({ top: 158, bottom: 153, left: 0, right: 0, background: 'white' })
      .composite([
        {
          input: this.modules.heavensdoor.getAssetPath('whodidthis.png'),
          gravity: 'south'
        }
      ])
  }
}
